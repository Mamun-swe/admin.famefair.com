import React, { useState } from 'react'
import './style.scss'
import { Switch, Route } from 'react-router-dom'

import Navbar from '../../components/navbar/Index'
import Drawer from '../../components/drawer/Index'

// --- Dashboard ---
import DashboardIndex from '../dashboard/Index'

// --- Banner ---
import BannerIndex from '../banner/Index'
import BannerStore from '../banner/Create'

// --- Brand ---
import BrandIndex from '../brand/Index'
import BrandStore from '../brand/Create'
import BrandEdit from '../brand/Edit'

// --- Vendor ---
import VendorIndex from '../vendor/Index'
import VendorStore from '../vendor/Create'
import VendorEdit from '../vendor/Edit'
import VendorShow from '../vendor/Show'

// --- Category ---
import CategoryIndex from '../category/Index'
import CategoryStore from '../category/Create'
import CategoryEdit from '../category/Edit'

// --- Product ---
import ProductIndex from '../product/Index'
import ProductStore from '../product/Create'
import ProductEdit from '../product/Edit'
import ProductShow from '../product/Show'

// --- Order ---
import OrderIndex from '../order/Index'
import OrderStore from '../order/Create'

// --- Admin ---
import AdminIndex from '../admins/Index'
import AdminStore from '../admins/Create'
import AdminEdit from '../admins/Edit'

// --- Customer ---
import CustomerIndex from '../customer/Index'
import CustomerStore from '../customer/Create'
import CustomerShow from '../customer/Show'
import CustomerEdit from '../customer/Edit'

// --- Reviews ---
import ReviewIndex from '../reviews/Index'

// --- Subscriber ---
import SubscriberIndex from '../subscriber/Index'

// --- Profile ---
import ProfileIndex from '../profile/Index'

// --- Change password ---
import ChangePasswordIndex from '../changePassword/Index'

import FourOFour from '../fourOfour/Index'

const Master = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className="master">
            <Navbar menu={true} drawer={() => setOpen(true)} />
            <Drawer show={open} onHide={() => setOpen(false)} />

            <div className="main">
                <Switch>

                    {/* --- Dashboard --- */}
                    <Route exact path="/dashboard/" component={DashboardIndex} />

                    {/* --- Banner --- */}
                    <Route exact path="/dashboard/banner" component={BannerIndex} />
                    <Route exact path="/dashboard/banner/store" component={BannerStore} />

                    {/* --- Brand --- */}
                    <Route exact path="/dashboard/brand" component={BrandIndex} />
                    <Route exact path="/dashboard/brand/store" component={BrandStore} />
                    <Route exact path="/dashboard/brand/edit/:id" component={BrandEdit} />

                    {/* --- Vendor --- */}
                    <Route exact path="/dashboard/vendor" component={VendorIndex} />
                    <Route exact path="/dashboard/vendor/store" component={VendorStore} />
                    <Route exact path="/dashboard/vendor/edit/:id" component={VendorEdit} />
                    <Route exact path="/dashboard/vendor/show/:id" component={VendorShow} />

                    {/* --- Category --- */}
                    <Route exact path="/dashboard/category" component={CategoryIndex} />
                    <Route exact path="/dashboard/category/store" component={CategoryStore} />
                    <Route exact path="/dashboard/category/edit/:id" component={CategoryEdit} />

                    {/* --- Product --- */}
                    <Route exact path="/dashboard/product" component={ProductIndex} />
                    <Route exact path="/dashboard/product/store" component={ProductStore} />
                    <Route exact path="/dashboard/product/edit/:id" component={ProductEdit} />
                    <Route exact path="/dashboard/product/show/:id" component={ProductShow} />

                    {/* --- Order --- */}
                    <Route exact path="/dashboard/order" component={OrderIndex} />
                    <Route exact path="/dashboard/order/store" component={OrderStore} />

                    {/* --- Admin --- */}
                    <Route exact path="/dashboard/admin" component={AdminIndex} />
                    <Route exact path="/dashboard/admin/store" component={AdminStore} />
                    <Route exact path="/dashboard/admin/edit/:id" component={AdminEdit} />

                    {/* --- Customer --- */}
                    <Route exact path="/dashboard/customer" component={CustomerIndex} />
                    <Route exact path="/dashboard/customer/store" component={CustomerStore} />
                    <Route exact path="/dashboard/customer/show/:id" component={CustomerShow} />
                    <Route exact path="/dashboard/customer/edit/:id" component={CustomerEdit} />

                    {/* --- Rating & Reviews --- */}
                    <Route exact path="/dashboard/reviews" component={ReviewIndex} />

                    {/* --- Subscriber --- */}
                    <Route exact path="/dashboard/subscriber" component={SubscriberIndex} />

                    {/* --- Profile --- */}
                    <Route exact path="/dashboard/profile" component={ProfileIndex} />

                    {/* --- Change Password --- */}
                    <Route exact path="/dashboard/change-password" component={ChangePasswordIndex} />


                    <Route path="*">
                        <FourOFour mt={"-70px"} />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Master;