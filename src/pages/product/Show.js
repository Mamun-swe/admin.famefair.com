import React, { useEffect, useState, useCallback } from 'react'
import HtmlParser from 'react-html-parser'
import { ChevronLeft } from 'react-feather'
import { Link, useParams } from 'react-router-dom'
import { DangerButton, GrayButton, SuccessButton } from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import { Loader } from '../../components/loader/Index'
import Requests from '../../utils/Requests/Index'


const Show = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [cancelVendor, setCancelVendor] = useState(false)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    const fetchData = useCallback(async () => {
        setLoading(true)
        const response = await Requests.Product.Show(id, header)
        if (response) {
            console.log(response.data);
            setData(response.data)
        }
        setLoading(false)
    }, [id, header])


    useEffect(() => {
        fetchData()
    }, [fetchData])

    // Handle vendor request
    const handleVendorRequest = async () => {
        setCancelVendor(true)

        await Requests.Product.VendorRequest(id, header)
        fetchData()
        setCancelVendor(false)
    }

    if (loading) return <Loader />

    return (
        <div>
            <Layout
                page="dashboard / product show"
                message="Product details."
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/product">
                            <GrayButton type="button">
                                <ChevronLeft size={15} style={{ marginRight: 5 }} />
                                <span style={{ fontSize: 13 }}>BACK</span>
                            </GrayButton>
                        </Link>
                    </div>
                }
            />

            <Main>

                {/* Image gallery */}



                {/* Basic information */}
                <div className="col-12 mt-3">
                    <h5><b>{data.name}</b></h5>
                    <div className="d-flex">
                        <div className="pt-2">
                            <h6>Vendor request ( <span className="text-success">{data.vendorRequest}</span> )</h6>
                        </div>
                        <div className="ms-auto">
                            {data.vendorRequest === "Approved" ?
                                <DangerButton
                                    type="button"
                                    className="px-4"
                                    disabled={cancelVendor}
                                    onClick={handleVendorRequest}
                                >{cancelVendor ? "Canceling ..." : "Cancel"}</DangerButton>
                                :
                                <SuccessButton
                                    type="button"
                                    className="px-4"
                                    disabled={cancelVendor}
                                    onClick={handleVendorRequest}
                                >{cancelVendor ? "Loading ..." : "Approve"}</SuccessButton>
                            }
                        </div>
                    </div>
                </div>

                <div className="col-12"><hr /></div>

                {/* Product Full information */}
                <div className="col-12 col-lg-6 mb-3">
                    <table className="table table-sm table-borderless">
                        <tbody>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Status</p></td>
                                <td><p className="mb-0">: <span className="text-success">{data.isActive ? "Activated" : "Deactivated"}</span></p></td>
                            </tr>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Brand</p></td>
                                <td><p className="text-capitalize mb-0">: {data.brand ? data.brand.name : "N/A"}</p></td>
                            </tr>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Category</p></td>
                                <td>
                                    {data.category ?
                                        <p className="text-capitalize mb-0">: <Link to={`/dashboard/category/show/${data.category._id}`} className="text-decoration-none">{data.category.name}</Link></p>
                                        : "N/A"}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">SKU</p></td>
                                <td><p className="mb-0">: {data.sku || "N/A"}</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                    <table className="table table-sm table-borderless">
                        <tbody>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Stock Amount</p></td>
                                <td><p className="mb-0">: {data.stockAmount || 0}</p></td>
                            </tr>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Purchase Price</p></td>
                                <td><p className="mb-0">: Tk. {data.purchasePrice || 0}</p></td>
                            </tr>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Sale Price</p></td>
                                <td><p className="mb-0">: Tk. {data.salePrice || 0}</p></td>
                            </tr>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Tags</p></td>
                                <td>
                                    {data.tags && data.tags.length ?
                                        data.tags.map((item, i) =>
                                            <p key={i} className="text-capitalize float-start ms-2 bg-light px-2 py-1 mb-1">{item}</p>
                                        )
                                        : "N/A"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Vendor information */}
                <div className="col-12 col-lg-6 mb-lg-3">
                    <h6>Vendor information</h6>

                    <table className="table table-sm table-borderless mb-0">
                        <tbody>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Name</p></td>
                                <td>
                                    {data.vendor ?
                                        <p className="text-capitalize mb-0">:
                                            <Link to={`/dashboard/vendor/show/${data.vendor._id}`} className="text-decoration-none">{data.vendor.name}</Link></p>
                                        : "N/A"}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">E-mail</p></td>
                                <td><p className="mb-0">: {data.vendor ? data.vendor.email : "N/A"}</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-12 col-lg-6 mt-lg-4 mb-3">
                    <table className="table table-sm table-borderless">
                        <tbody>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Phone</p></td>
                                <td><p className="mb-0">: {data.vendor ? data.vendor.phone : "N/A"}</p></td>
                            </tr>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Address</p></td>
                                <td><p className="text-capitalize mb-0">: {data.vendor ? data.vendor.address : "N/A"}</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Additional information */}
                {data.additionalInfo && data.additionalInfo.length ?
                    <div className="col-12 col-lg-6 mb-3">
                        <h6 className="mb-3">Additional information</h6>

                        <table className="table table-sm">
                            <tbody>
                                {data.additionalInfo.map((item, i) =>
                                    <tr key={i}>
                                        <td style={{ minWidth: 100 }}><p className="text-dark mb-0">{item.title}</p></td>
                                        <td><p className="text-capitalize mb-0">{item.value}</p></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    : null}

                {/* Youtube embed video */}
                {data.video ?
                    <div className="col-12 col-lg-6 mb-3">
                        <h6 className="mb-3">Youtube embed video</h6>

                        <div style={{ width: 'auto', height: 'auto' }}>
                            <div className="embed-responsive embed-responsive-21by9">
                                <iframe
                                    className="embed-responsive-item"
                                    title={'Xiaomi Mi 11 ultra'}
                                    src={data.video} allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                    : null}

                {/* Description */}
                <div className="col-12 mb-4">
                    <h6 className="mb-3">Description</h6>

                    {HtmlParser(data.description)}
                </div>
            </Main>
        </div>
    );
};

export default Show;