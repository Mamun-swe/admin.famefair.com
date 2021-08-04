import React, { useState, useEffect, useCallback } from 'react'
import './style.scss'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import { Loader } from '../../components/loader/Index'
import { ShortName } from '../../components/shortName/Index'
import { Layout, Main } from '../../components/layout/Index'
import { GrayButton } from '../../components/button/Index'
import DataTable from '../../components/table/Index'
import Requests from '../../utils/Requests/Index'

const Show = () => {
    const { id } = useParams()
    const [isLoading, setLoading] = useState(true)
    const [vendor, setVendor] = useState({})

    const [data, setData] = useState([])
    const [prodLoading, setProdLoading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    // Fetch data
    const fetchData = useCallback(async () => {
        const response = await Requests.Vendor.Show(id, header)
        if (response) setVendor(response.data)
        setLoading(false)
    }, [id, header])

    // Fetch products
    const fetchProducts = useCallback(async (page) => {
        setProdLoading(true)
        const response = await Requests.Banner.Index(page, perPage, header)

        setData(response.data)
        setTotalRows(response.data.length)
        setProdLoading(false)
    }, [perPage, header])

    useEffect(() => {
        fetchData()
        fetchProducts(1)
    }, [id, header, fetchData, fetchProducts])

    // Handle product page change
    const handlePageChange = page => fetchData(page)

    // Handle product row change
    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true)
        const response = await Requests.Banner.Index(page, newPerPage, header)

        setData(response.data)
        setPerPage(newPerPage)
        setLoading(false)
    }

    // Data formate
    const columns = [
        {
            name: 'SL',
            selector: row => row.id,
            sortable: true,
            grow: 0
        },
        {
            name: 'Image',
            cell: row => <img height="50px" width="50px" alt={row.image} src={row.image} />,
            grow: 0
        },
        {
            name: 'Name',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true
        },
        {
            name: 'Price (tk)',
            selector: row => row.price,
            sortable: true,
            grow: 0
        }
    ]

    if (isLoading) return <Loader />

    return (
        <div className="vendor-show-container">
            <Layout
                page="dashboard / vendor info"
                message={`Information of ${vendor.username}.`}
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/vendor">
                            <GrayButton
                                type="button"
                            >
                                <ChevronLeft size={15} style={{ marginRight: 5 }} />
                                <span style={{ fontSize: 13 }}>BACK</span>
                            </GrayButton>
                        </Link>
                    </div>
                }
            />

            <Main>
                <div className="col-12 col-padding">
                    <div className="card border-0">
                        <div className="card-body p-2">
                            <div className="d-sm-flex vendor-profile-container">
                                {/* Name circle */}
                                {vendor.username ?
                                    <ShortName
                                        name={vendor.username}
                                        x={70}
                                        y={70}
                                        size={35}
                                    />
                                    : null}

                                {/* Content container */}
                                <div className="flex-fill content-container ps-sm-4">
                                    <table className="table-sm">
                                        <tbody>
                                            <tr>
                                                <td className="title-td">Name</td>
                                                <td>: {vendor.username}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">E-mail</td>
                                                <td className="text-lowercase">: {vendor.email}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">Phone</td>
                                                <td>: {vendor.phone}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">Address</td>
                                                <td>: {vendor.address.city}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bank information */}
                    <div className="card border-0">
                        <div className="card-body p-2">

                            {/* Bank info */}
                            <h6 className="mb-0 ps-1">Bank info</h6>
                            <hr className="my-2" />
                            <div className="row mb-4">
                                <div className="col-12 col-sm-6">
                                    <table className="table-sm">
                                        <tbody>
                                            <tr>
                                                <td className="title-td">Account name</td>
                                                <td>: {"N/A"}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">Account number</td>
                                                <td>: {"N/A"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <table className="table-sm">
                                        <tbody>
                                            <tr>
                                                <td className="title-td">Branch</td>
                                                <td>: {"N/A"}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">Routing number</td>
                                                <td>: {"N/A"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            {/* Business & payment info */}
                            <h6 className="mb-0 ps-1">Business & payment info</h6>
                            <hr className="my-2" />
                            <div className="row mb-4">
                                <div className="col-12 col-sm-6">
                                    <table className="table-sm">
                                        <tbody>
                                            <tr>
                                                <td className="title-td">Trade licence</td>
                                                <td>: {"N/A"}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">Pick Up location</td>
                                                <td>: {"N/A"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <table className="table-sm">
                                        <tbody>
                                            <tr>
                                                <td className="title-td">Payment system</td>
                                                <td>: {"N/A"}</td>
                                            </tr>
                                            {vendor.payPeriod ?
                                                <tr>
                                                    <td className="title-td">Payment period</td>
                                                    <td>: {vendor.payPeriod}</td>
                                                </tr>
                                                : null}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="row mb-4">
                                <div className="col-12 col-sm-6 mb-4 mb-sm-0">
                                    <h6 className="mb-0 ps-1">Contact person 1</h6>
                                    <hr className="my-2" />
                                    <table className="table-sm">
                                        <tbody>
                                            <tr>
                                                <td className="title-td">Name</td>
                                                <td>: {"N/A"}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">Phone</td>
                                                <td>: {"N/A"}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">E-mail</td>
                                                <td>: <span className="text-lowercase">{"N/A"}</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="col-12 col-sm-6">
                                    <h6 className="mb-0 ps-1">Contact person 2</h6>
                                    <hr className="my-2" />
                                    <table className="table-sm">
                                        <tbody>
                                            <tr>
                                                <td className="title-td">Name</td>
                                                <td>: {"N/A"}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">Phone</td>
                                                <td>: {"N/A"}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">E-mail</td>
                                                <td>: <span className="text-lowercase">{"N/A"}</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Management */}
                            <div className="row mb-4">
                                <div className="col-12 col-sm-6 mb-4 mb-sm-0">
                                    <h6 className="mb-0 ps-1">Key account manager</h6>
                                    <hr className="my-2" />
                                    <p className="me-1">{"N/A"}</p>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <h6 className="mb-0 ps-1">Secondary key account manager</h6>
                                    <hr className="my-2" />
                                    <p className="me-1">{"N/A"}</p>
                                </div>
                            </div>

                            {/* Products */}
                            <div className="row mb-4">
                                <div className="col-12">
                                    <h6 className="mb-0 ps-1">Products of {vendor.username}</h6>
                                    <hr className="my-2" />
                                    <DataTable
                                        columns={columns}
                                        data={data}
                                        loading={prodLoading}
                                        totalRows={totalRows}
                                        handlePerRowsChange={handlePerRowsChange}
                                        handlePageChange={handlePageChange}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Main>
        </div >
    );
}

export default Show;
