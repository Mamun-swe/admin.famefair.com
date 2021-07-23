
import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2 } from 'react-feather'
import { GrayButton, DangerButton } from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import DataTable from '../../components/table/Index'
import DeleteModal from '../../components/modals/delete/Index'
import Requests from '../../utils/Requests/Index'

const Index = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const [isDelete, setDelete] = useState({ value: null, show: false, loading: false })
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    const fetchData = useCallback(async (page) => {
        setLoading(true)
        const response = await Requests.Banner.Index(page, perPage, header)

        setData(response.data)
        setTotalRows(response.data.length)
        setLoading(false)
    }, [perPage, header])

    const handlePageChange = page => fetchData(page)


    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true)
        const response = await Requests.Banner.Index(page, newPerPage, header)

        setData(response.data)
        setPerPage(newPerPage)
        setLoading(false)
    }

    useEffect(() => {
        fetchData(1)
    }, [fetchData])

    const columns = [
        {
            name: 'SL',
            selector: row => row.id,
            sortable: true,
            grow: 0,
        },
        {
            name: 'Image',
            grow: 0,
            cell: row => <img height="50px" width="50px" alt={row.image} src={row.image} />,
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
        },
        {
            name: 'Action',
            grow: 0,
            cell: row =>
                <div>
                    <DangerButton
                        style={{ borderRadius: "50%", padding: "6px 9px" }}
                        onClick={() => setDelete({ value: row, show: true })}
                    ><Trash2 size={16} /></DangerButton>
                </div>
        },
    ]

    // Handle delete
    const handleDelete = async data => {
        setDelete({ ...isDelete, loading: true })
        console.log(data)
        setTimeout(() => {
            setDelete({ ...isDelete, show: false, loading: false })
        }, 1000)
    }

    return (
        <div>
            <Layout
                page="dashboard / banner list"
                message="Banners that use in website."
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/banner/store">
                            <GrayButton type="button">
                                <Plus size={15} style={{ marginRight: 5 }} />
                                <span style={{ fontSize: 13 }}>ADD NEW</span>
                            </GrayButton>
                        </Link>
                    </div>
                }
            />

            <Main>
                <div className="col-12">
                    <DataTable
                        columns={columns}
                        data={data}
                        loading={loading}
                        totalRows={totalRows}
                        handlePerRowsChange={handlePerRowsChange}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </Main>

            {/* Delete confirmation modal */}
            <DeleteModal
                show={isDelete.show}
                loading={isDelete.loading}
                message={<h6>Want to delete {isDelete.value ? isDelete.value.email : null} ?</h6>}
                onHide={() => setDelete({ value: null, show: false, loading: false })}
                doDelete={handleDelete}
            />
        </div>
    );
}

export default Index;