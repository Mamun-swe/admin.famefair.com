
import React, { useState } from 'react'
import { Plus } from 'react-feather'
import { GrayButton } from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import DataTable from '../../components/table/Index'
// import Requests from '../../utils/Requests/Index'

const Index = () => {
    const [data] = useState([])
    const [loading] = useState(false)
    // const [totalRows, setTotalRows] = useState(0)
    // const [perPage, setPerPage] = useState(10)
    // const [header] = useState({
    //     headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    // })

    // const fetchData = useCallback(async (page) => {
    //     setLoading(true)
    //     const response = await Requests.Vendor.Index(page, perPage, header)

    //     setData(response.data)
    //     setTotalRows(response.data.length)
    //     setLoading(false)
    // }, [perPage, header])

    // const handlePageChange = page => fetchData(page)

    // const handlePerRowsChange = async (newPerPage, page) => {
    //     setLoading(true)
    //     const response = await Requests.Vendor.Index(page, newPerPage, header)

    //     setData(response.data)
    //     setPerPage(newPerPage)
    //     setLoading(false)
    // }

    // useEffect(() => {
    //     fetchData(1)
    // }, [fetchData])

    const columns = [
        {
            name: 'E-mail',
            selector: row => row.email
        },
    ]

    return (
        <div>
            <Layout
                page="dashboard / subscribers list"
                message="All Subscribers."
                container="container-fluid"
                button={
                    <div>
                        <GrayButton type="button">
                            <Plus size={15} style={{ marginRight: 5 }} />
                            <span style={{ fontSize: 13 }}>Export XLSX</span>
                        </GrayButton>
                    </div>
                }
            />

            <Main>
                <div className="col-12">
                    <DataTable
                        columns={columns}
                        data={data}
                        loading={loading}
                        // totalRows={totalRows}
                        // handlePerRowsChange={handlePerRowsChange}
                        // handlePageChange={handlePageChange}
                    />
                </div>
            </Main>
        </div>
    );
}

export default Index;