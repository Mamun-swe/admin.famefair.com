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
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    // Fetch data
    const fetchData = useCallback(async () => {
        const response = await Requests.Vendor.Show(id, header)
        if (response) setVendor(response.data)
        setLoading(false)
    }, [id, header])


    useEffect(() => {
        fetchData()
    }, [id, header, fetchData])

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
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'SKU',
            selector: row => row.sku,
            sortable: true
        },
        {
            name: 'Stock Amount',
            selector: row => row.stockAmount,
            sortable: true
        },
        {
            name: 'Purchase Price (tk)',
            selector: row => row.purchasePrice,
            sortable: true,
            grow: 1
        },
        {
            name: 'Sale Price (tk)',
            selector: row => row.salePrice,
            sortable: true,
            grow: 1
        }
    ]

    if (isLoading) return <Loader />

    return (
        <div className="vendor-show-container">
            <Layout
                page="dashboard / vendor info"
                message={`Information of ${vendor.name}.`}
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
                    <div className="card border-0 mb-4">
                        <div className="card-body p-2">
                            <div className="d-sm-flex vendor-profile-container">
                                {/* Name circle */}
                                {vendor.name ?
                                    <ShortName
                                        name={vendor.name}
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
                                                <td>: {vendor.name}</td>
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
                                                <td>: {vendor.address}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* information */}
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
                                                <td>: {vendor.bank && vendor.bank.accountName ? vendor.bank.accountName : "N/A"}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">Account number</td>
                                                <td>: {vendor.bank && vendor.bank.accountNumber ? vendor.bank.accountNumber : "N/A"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <table className="table-sm">
                                        <tbody>
                                            <tr>
                                                <td className="title-td">Branch</td>
                                                <td>: {vendor.bank && vendor.bank.branchName ? vendor.bank.branchName : "N/A"}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">Routing number</td>
                                                <td>: {vendor.bank && vendor.bank.routingNumber ? vendor.bank.routingNumber : "N/A"}</td>
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
                                                <td>: {vendor.tradeLicence ? vendor.tradeLicence : "N/A"}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">Pick Up location</td>
                                                <td>: {vendor.pickupLocation ? vendor.pickupLocation : "N/A"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <table className="table-sm">
                                        <tbody>
                                            <tr>
                                                <td className="title-td">Payment system</td>
                                                <td>: {vendor.paymentSystem ? vendor.paymentSystem : "N/A"}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">Payment period</td>
                                                <td>: {vendor.payPeriod ? vendor.payPeriod : "N/A"}</td>
                                            </tr>
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
                                                <td>: {vendor.contactPersonOne && vendor.contactPersonOne.name ? vendor.contactPersonOne.name : "N/A"}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">Phone</td>
                                                <td>: {vendor.contactPersonOne && vendor.contactPersonOne.phone ? vendor.contactPersonOne.phone : "N/A"}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">E-mail</td>
                                                <td>: <span className="text-lowercase">{vendor.contactPersonOne && vendor.contactPersonOne.email ? vendor.contactPersonOne.email : "N/A"}</span></td>
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
                                                <td>: {vendor.contactPersonTwo && vendor.contactPersonTwo.name ? vendor.contactPersonTwo.name : "N/A"}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">Phone</td>
                                                <td>: {vendor.contactPersonTwo && vendor.contactPersonTwo.phone ? vendor.contactPersonTwo.phone : "N/A"}</td>
                                            </tr>
                                            <tr>
                                                <td className="title-td">E-mail</td>
                                                <td>: <span className="text-lowercase">{vendor.contactPersonTwo && vendor.contactPersonTwo.email ? vendor.contactPersonTwo.email : "N/A"}</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Management */}
                            <div className="row mb-5">
                                <div className="col-12 col-sm-6 mb-4 mb-sm-0">
                                    <h6 className="mb-0 ps-1">Key account manager</h6>
                                    <hr className="my-2" />
                                    <p className="me-1">{vendor.keyAccountManager ? vendor.keyAccountManager : "N/A"}</p>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <h6 className="mb-0 ps-1">Secondary key account manager</h6>
                                    <hr className="my-2" />
                                    <p className="me-1">{vendor.secondaryKeyAccountManager ? vendor.secondaryKeyAccountManager : "N/A"}</p>
                                </div>
                            </div>

                            {/* Products */}
                            <div className="row mb-4">
                                <div className="col-12">
                                    <h6 className="mb-0 ps-1">Products of {vendor.name}</h6>
                                    <hr className="my-2" />
                                    <DataTable
                                        columns={columns}
                                        data={vendor.products}
                                        loading={isLoading}
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
