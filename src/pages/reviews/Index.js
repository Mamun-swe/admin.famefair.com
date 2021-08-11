
import React, { useState, useEffect, useCallback } from 'react'
import { DangerButton, SuccessButton } from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import DataTable from '../../components/table/Index'
import Requests from '../../utils/Requests/Index'

const Index = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    const fetchData = useCallback(async (page) => {
        setLoading(true)
        const response = await Requests.Review.Index(page, perPage, header)

        setData(response.data)
        setTotalRows(response.data.length)
        setLoading(false)
    }, [perPage, header])

    const handlePageChange = page => fetchData(page)

    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true)
        const response = await Requests.Review.Index(page, newPerPage, header)

        setData(response.data)
        setPerPage(newPerPage)
        setLoading(false)
    }

    useEffect(() => {
        fetchData(1)
    }, [fetchData])

    const columns = [
        {
            name: 'Customer',
            selector: row => row.customer ? row.customer.name : "N/A"
        },
        {
            name: '',
            grow: 0,
            cell: row => <img height="50px" width="50px" alt="..." src={row.product ? row.product.thumbnail : null} />
        },
        {
            name: 'Product',
            selector: row => row.product ? row.product.name : null
        },
        {
            name: 'Rating',
            selector: row => row.rating,
            sortable: true
        },
        {
            name: 'Review',
            selector: row => row.review
        },
        {
            name: 'Status',
            cell: row =>
                <div>
                    {row.status === "Pending" ?
                        <p className="text-warning mb-0">{row.status}</p>
                        : row.status === "Canceled" ?
                            <p className="text-danger mb-0">{row.status}</p>
                            : <p className="text-success mb-0">{row.status}</p>
                    }
                </div>
        },
        {
            name: 'Action',
            grow: 0,
            minWidth: "110px",
            cell: row =>
                <div>
                    {row.id % 2 === 0 ?
                        <SuccessButton
                            style={{ padding: "5px 12px" }}
                            onClick={() => console.log("Approve action")}
                        >Approve</SuccessButton>

                        :
                        <DangerButton
                            style={{ padding: "5px 12px" }}
                            onClick={() => console.log("Cancel action")}
                        >Cancel</DangerButton>
                    }
                </div>
        }
    ]

    return (
        <div>
            <Layout
                page="dashboard / review list"
                message="Ratings & Reviews from customers"
                container="container-fluid"
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
        </div>
    );
}

export default Index;