
import React, { useState, useEffect, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Edit2, Eye, Plus } from 'react-feather'
import { GrayButton, SuccessButton } from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import DataTable from '../../components/table/Index'
import Requests from '../../utils/Requests/Index'

const Index = () => {
    const history = useHistory()
    const [limit, setLimit] = useState(10)
    const [totalItems, setTotalItems] = useState(0)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searching, setSearching] = useState(false)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    const fetchData = useCallback(async (page) => {
        setLoading(true)
        const response = await Requests.Product.Index(page, limit, header)

        setData(response.data)
        setTotalItems(response.pagination ? response.pagination.items : 0)
        setLoading(false)
    }, [limit, header])

    const handlePageChange = page => fetchData(page)

    const handleLimitChange = async (newLimit, page) => {
        setLoading(true)
        const response = await Requests.Product.Index(page, newLimit, header)

        setData(response.data)
        setLimit(newLimit)
        setLoading(false)
    }

    useEffect(() => {
        fetchData(1)
    }, [fetchData])

    const columns = [
        {
            name: 'Image',
            grow: 0,
            cell: row => <img height="50px" width="50px" alt={row.thumbnail} src={row.thumbnail} />,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
        },
        {
            name: 'Brand',
            selector: row => row.brand ? row.brand : "N/A",
            sortable: true,
        },
        {
            name: 'Vendor',
            selector: row => row.vendor,
            sortable: true,
        },
        {
            name: 'SKU',
            selector: row => row.sku,
            sortable: true,
        },
        {
            name: 'Purchase Price (tk)',
            selector: row => row.purchasePrice,
            sortable: true,
        },
        {
            name: 'Sale Price (tk)',
            selector: row => row.salePrice,
            sortable: true,
        },
        {
            name: 'Stock Amount',
            selector: row => row.stockAmount,
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
                        onClick={() => history.push(`/dashboard/product/show/${row._id}`)}
                    ><Eye size={16} />
                    </SuccessButton>
                    <SuccessButton
                        style={{ borderRadius: "50%", padding: "6px 9px", marginRight: 5 }}
                        onClick={() => history.push(`/dashboard/product/edit/${row._id}`)}
                    ><Edit2 size={16} />
                    </SuccessButton>
                </div>
        },
    ]

    // Handle search
    const handleSearch = async query => {
        setSearching(true)

        const response = await Requests.Product.Search(query, header)
        setData(response.data)
        setSearching(false)
    }

    return (
        <div>
            <Layout
                page="dashboard / product list"
                message={`${totalItems} products are available.`}
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/product/store">
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
                        totalRows={totalItems}
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
        </div>
    );
}

export default Index;