
import React, { useState, useEffect, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Edit2, Plus, Trash2 } from 'react-feather'
import {
    GrayButton,
    DangerButton,
    SuccessButton
} from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'

import DataTable from '../../components/table/Index'
import DeleteModal from '../../components/modals/delete/Index'
import Requests from '../../utils/Requests/Index'

const Index = () => {
    const history = useHistory()
    const [limit, setLimit] = useState(10)
    const [totalPage, setTotalItems] = useState(0)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searching, setSearching] = useState(false)
    const [isDelete, setDelete] = useState({ value: null, show: false, loading: false })
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    const fetchData = useCallback(async (page) => {
        setLoading(true)
        const response = await Requests.Brand.Index(page, limit, header)

        setData(response.data)
        setTotalItems(response.pagination ? response.pagination.items : 0)
        setLoading(false)
    }, [limit, header])

    const handlePageChange = page => fetchData(page)

    const handleLimitChange = async (newLimit, page) => {
        setLoading(true)
        const response = await Requests.Brand.Index(page, newLimit, header)

        setData(response.data)
        setLimit(newLimit)
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
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            grow: 0,
        },
        {
            name: 'Image',
            grow: 0,
            cell: row => <img height="50px" width="50px" alt={row.image} src={row.image} />,
        },
        {
            name: 'Products',
            selector: row => row.products,
            sortable: true,
        },
        {
            name: 'Action',
            grow: 0,
            minWidth: "120px",
            cell: row =>
                <div>
                    <SuccessButton
                        style={{ borderRadius: "50%", padding: "6px 9px", marginRight: 5 }}
                        onClick={() => history.push(`/dashboard/brand/edit/${row._id}`)}
                    ><Edit2 size={16} />
                    </SuccessButton>
                    <DangerButton
                        style={{ borderRadius: "50%", padding: "6px 9px" }}
                        onClick={() => setDelete({ value: row, show: true })}
                    ><Trash2 size={16} />
                    </DangerButton>
                </div>
        },
    ]

    // Handle delete
    const handleDelete = async () => {
        setDelete({ ...isDelete, loading: true })

        await Requests.Brand.Delete(isDelete.value._id, header)
        fetchData(1)
        setDelete({ ...isDelete, show: false, loading: false })
    }

    // Handle search
    const handleSearch = async query => {
        setSearching(true)

        const response = await Requests.Brand.Search(query, header)
        setData(response.data)
        setSearching(false)
    }

    return (
        <div>
            <Layout
                page="dashboard / brand list"
                message="All Brands."
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/brand/store">
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
                        totalRows={totalPage}
                        pagination={true}
                        paginationServer={true}
                        handlePerRowsChange={handleLimitChange}
                        handlePageChange={handlePageChange}
                        searchable
                        search={handleSearch}
                        searching={searching}
                        clearSearch={() => fetchData(1)}
                    />
                </div>
            </Main>

            {/* Delete confirmation modal */}
            <DeleteModal
                show={isDelete.show}
                loading={isDelete.loading}
                message={
                    <div>
                        <h6>Want to delete {isDelete.value ? isDelete.value.name : "this"} brand ?</h6>
                        <img src={isDelete.value ? isDelete.value.image : null} className="img-fluid" style={{ height: 50 }} alt="Brand" />
                    </div>
                }
                onHide={() => setDelete({ value: null, show: false, loading: false })}
                doDelete={handleDelete}
            />
        </div>
    );
}

export default Index;