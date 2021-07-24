import React from 'react'
import './style.scss'
import { Layout, Main } from '../../components/layout/Index'
import { OrderChart, OrderStatusChart } from '../../components/chart/Index'
import { DollarSign, ShoppingBag, ShoppingCart, Users } from 'react-feather'

const Index = () => {
    return (
        <div>
            <Layout
                page="Dashboard"
                message="Welcome to dashboard"
                container="container-fluid"
            />

            <Main>
                <div className="dashboard-container col-12 mb-4">
                    <div className="row">

                        {/* Earning container */}
                        <div className="col-12 col-lg-4 col-xl-3">
                            <div className="card border-0">
                                <div className="card-body">
                                    <h5>Earnings</h5>
                                    <p>Total Earnings of the Month</p>
                                    <h4 className="mb-0"><b>Tk. 43,567.53</b></h4>
                                </div>
                            </div>
                        </div>

                        {/* Overview container */}
                        <div className="col-12 col-lg-8 col-xl-9">
                            <div className="card border-0">
                                <div className="card-body">
                                    <h5>Overview</h5>
                                    <p className="mb-4">All Earning Overview</p>

                                    <div className="row">

                                        {/* Total Sale */}
                                        <div className="col-6 col-md-3 col-lg-6 col-xl-3 mb-4 mb-xl-0">
                                            <div className="d-flex">
                                                <div className="icon-container flex-center flex-coulmn">
                                                    <ShoppingBag size={20} color="#063cdd" />
                                                </div>
                                                <div className="pl-2">
                                                    <p className="text-muted mb-1">Total Sale</p>
                                                    <h6 className="mb-0"><b>Tk. 43,567.53</b></h6>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Net Profit */}
                                        <div className="col-6 col-md-3 col-lg-6 col-xl-3 mb-4 mb-xl-0">
                                            <div className="d-flex">
                                                <div className="icon-container flex-center flex-coulmn">
                                                    <DollarSign size={20} color="#063cdd" />
                                                </div>
                                                <div className="pl-2">
                                                    <p className="text-muted mb-1">Net Profit</p>
                                                    <h6 className="mb-0"><b>Tk. 43,567.53</b></h6>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Total Order */}
                                        <div className="col-6 col-md-3 col-lg-6 col-xl-3 mb-4 mb-xl-0">
                                            <div className="d-flex">
                                                <div className="icon-container flex-center flex-coulmn">
                                                    <ShoppingCart size={20} color="#063cdd" />
                                                </div>
                                                <div className="pl-2">
                                                    <p className="text-muted mb-1">Total Order</p>
                                                    <h6 className="mb-0"><b>43,532</b></h6>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Customers */}
                                        <div className="col-6 col-md-3 col-lg-6 col-xl-3 mb-4 mb-xl-0">
                                            <div className="d-flex">
                                                <div className="icon-container flex-center flex-coulmn">
                                                    <Users size={20} color="#063cdd" />
                                                </div>
                                                <div className="pl-2">
                                                    <p className="text-muted mb-1">Customers</p>
                                                    <h6 className="mb-0"><b>43,567.53</b></h6>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary Chart */}
                <div className="col-12 mb-4">
                    <OrderChart />
                </div>

                {/* Order status chart */}
                <div className="col-12 col-xl-5 mb-4 mb-xl-0">
                    <div className="card border-0">
                        <div className="card-body">
                            <OrderStatusChart />
                        </div>
                    </div>
                </div>

                {/* Product of this month */}
                <div className="col-12 col-xl-7"></div>
            </Main>
        </div>
    );
}

export default Index;