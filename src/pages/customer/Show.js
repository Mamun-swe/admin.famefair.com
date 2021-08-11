import React, { useState, useEffect, useCallback } from 'react'
import {
    Link,
    //  useHistory,
    useParams
} from 'react-router-dom'
import {
    ChevronLeft,
    //   Eye,
    MapPin,
    Phone,
    User
} from 'react-feather'
import { Loader } from '../../components/loader/Index'
import { ShortName } from '../../components/shortName/Index'
import { Layout, Main } from '../../components/layout/Index'
import {
    GrayButton,
    //  SuccessButton
} from '../../components/button/Index'
import { DateFormate } from '../../utils/_heplers'

// import DataTable from '../../components/table/Index'
import Requests from '../../utils/Requests/Index'

const Show = () => {
    const { id } = useParams()
    // const history = useHistory()
    const [isLoading, setLoading] = useState(true)

    // const [data, setData] = useState([])
    const [customer, setCustomer] = useState({})
    // const [prodLoading] = useState(false)
    // const [totalRows, setTotalRows] = useState(0)
    // const [perPage, setPerPage] = useState(10)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    // Fetch data
    const fetchData = useCallback(async (page) => {
        setLoading(true)
        const customerResponse = await Requests.Customer.Show(id, header)
        // const response = await Requests.Order.Index(page, perPage, header)

        if (customerResponse) setCustomer(customerResponse.data)

        // setData(response.data)
        // setTotalRows(response.data.length)
        setLoading(false)
    }, [id, header])

    // const handlePageChange = page => fetchData(page)

    // Data paginate
    // const handlePerRowsChange = async (newPerPage, page) => {
    //     setLoading(true)
    //     const response = await Requests.Order.Index(page, newPerPage, header)

    //     setData(response.data)
    //     setPerPage(newPerPage)
    //     setLoading(false)
    // }

    useEffect(() => {
        fetchData(1)
    }, [id, header, fetchData])

    // const columns = [
    //     {
    //         name: 'Order ID',
    //         grow: 0,
    //         selector: row => 'FF' + row.id,
    //     },
    //     {
    //         name: 'Order Date',
    //         cell: row => <div>{DateFormate(Date.now())}</div>,
    //         sortable: true,
    //     },
    //     {
    //         name: 'Amount (tk)',
    //         selector: row => row.id + 5000,
    //         sortable: true,
    //     },
    //     {
    //         name: 'Order Status',
    //         selector: row => row.phone,
    //         sortable: true,
    //     },
    //     {
    //         name: 'Action',
    //         grow: 0,
    //         cell: row =>
    //             <div>
    //                 <SuccessButton
    //                     style={{ borderRadius: "50%", padding: "6px 9px" }}
    //                     onClick={() => history.push(`/dashboard/order/show/${row.id}`)}
    //                 ><Eye size={16} />
    //                 </SuccessButton>
    //             </div>
    //     },
    // ]

    if (isLoading) return <Loader />

    return (
        <div>
            <Layout
                page="dashboard / customer info"
                message={`Information of famefair.`}
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/customer">
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
                <div className="col-12 col-lg-4 col-xl-3">
                    <div className="card border-0">
                        <div className="card-body p-2">

                            <ShortName
                                name={customer.name}
                                x={80}
                                y={80}
                                size={40}
                            />

                            {/* Content container */}
                            <div className="pt-3">
                                <h6 className="text-capitalize">{customer.name}</h6>

                                <p className="pb-2 mb-2 border-bottom"><User size={15} /> <b>Personal Info.</b></p>
                                <p className="mb-4">{customer.gender} | {customer.maritalStatus} | {DateFormate(customer.dob)}</p>

                                <p className="pb-2 mb-2 border-bottom"><Phone size={14} /> <b>Contact</b></p>
                                <p className="mb-1">{customer.phone}</p>
                                <p className="text-lowercase mb-4">{customer.email || "N/A"}</p>

                                <p className="pb-2 mb-2 border-bottom"><MapPin size={14} /> <b>Last Delivered Addres</b></p>
                                <p className="text-capitalize mb-1">{customer.shippingArea[0] || "N/A"}</p>
                                <p className="text-capitalize mb-4">{customer.deliveryAddress[0] || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Orders history */}
                <div className="col-12 col-lg-8 col-xl-9">
                    <div className="card border-0">
                        <div className="card-body p-2">
                            <div className="row mb-4">
                                <div className="col-12">
                                    <h6 className="mb-0 ps-1">Orders History</h6>
                                    {/* <DataTable
                                        columns={columns}
                                        data={data}
                                        loading={prodLoading}
                                        totalRows={totalRows}
                                        handlePerRowsChange={handlePerRowsChange}
                                        handlePageChange={handlePageChange}
                                    /> */}
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
