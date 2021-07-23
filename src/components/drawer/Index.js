import React from 'react'
import './style.scss'
import {
    PieChart,
    BarChart2,
    Settings,
    Users,
    Tool,
    DollarSign,
    BarChart,
    Mail,
    Image,
    Plus,
    List,
    Gift,
    Layers,
    Archive,
    ShoppingCart,
    UserCheck,
    UserPlus,
    Star,
} from 'react-feather'
import { TreeMenu } from '../drawerMenu/Index'

const Index = (props) => {

    // Route paths
    const routes = [
        {
            title: "Dashboard",
            icon: <PieChart size={18} />,
            path: "/dashboard"
        },
        {
            title: "Banner",
            icon: <Image size={18} />,
            children: [
                {
                    title: "New Banner",
                    icon: <Plus size={18} />,
                    path: "/dashboard/banner/store"
                },
                {
                    title: "All Banner",
                    icon: <List size={18} />,
                    path: "/dashboard/banner"
                }
            ]
        },
        {
            title: "Brand",
            icon: <Gift size={18} />,
            children: [
                {
                    title: "New Brand",
                    icon: <Plus size={18} />,
                    path: "/dashboard/brand/store"
                },
                {
                    title: "All Brand",
                    icon: <List size={18} />,
                    path: "/dashboard/brand"
                }
            ]
        },
        {
            title: "Vendor",
            icon: <Users size={18} />,
            children: [
                {
                    title: "New Vendor",
                    icon: <Plus size={18} />,
                    path: "/dashboard/vendor/store"
                },
                {
                    title: "All Vendor",
                    icon: <List size={18} />,
                    path: "/dashboard/vendor"
                }
            ]
        },
        {
            title: "Category",
            icon: <Layers size={18} />,
            children: [
                {
                    title: "New Category",
                    icon: <Plus size={18} />,
                    path: "/dashboard/category/store"
                },
                {
                    title: "All Category",
                    icon: <List size={18} />,
                    path: "/dashboard/category"
                }
            ]
        },
        {
            title: "Product",
            icon: <Archive size={18} />,
            children: [
                {
                    title: "New Product",
                    icon: <Plus size={18} />,
                    path: "/dashboard/product/store"
                },
                {
                    title: "All Product",
                    icon: <List size={18} />,
                    path: "/dashboard/product"
                }
            ]
        },
        {
            title: "Order",
            icon: <ShoppingCart size={18} />,
            children: [
                {
                    title: "New Order",
                    icon: <Plus size={18} />,
                    path: "/dashboard/order/store"
                },
                {
                    title: "All Order",
                    icon: <List size={18} />,
                    path: "/dashboard/order"
                }
            ]
        },
        {
            title: "Admin List",
            icon: <UserCheck size={18} />,
            path: "/dashboard/messaging"
        },
        {
            title: "Customer",
            icon: <Users size={18} />,
            children: [
                {
                    title: "New Customer",
                    icon: <UserPlus size={18} />,
                    path: "/dashboard/inventory/product/list"
                },
                {
                    title: "All Customer",
                    icon: <List size={18} />,
                    path: "/dashboard/inventory/product/list"
                }
            ]
        },
        {
            title: "Subscribers",
            icon: <Mail size={18} />,
            path: "/dashboard/product-return-replacement"
        },
        {
            title: "Rating & Reviews",
            icon: <Star size={18} />,
            path: "/dashboard/sms"
        },
        {
            title: "Reports",
            icon: <BarChart2 size={18} />,
            children: [
                {
                    title: "Customer Report",
                    icon: <Users size={18} />,
                    path: "/dashboard/reports/customers"
                },
                {
                    title: "Purchase & Due",
                    icon: <DollarSign size={18} />,
                    path: "/dashboard/reports/purchase-due"
                },
                {
                    title: "Revenue Report",
                    icon: <BarChart size={18} />,
                    path: "/dashboard/reports/revenue"
                },
                {
                    title: "Sales Report",
                    icon: <DollarSign size={18} />,
                    path: "/dashboard/reports/sales"
                },
                {
                    title: "Service Revenue Report",
                    icon: <Tool size={18} />,
                    path: "/dashboard/reports/service-revenue"
                },
                {
                    title: "Stock Report",
                    icon: <BarChart2 size={18} />,
                    path: "/dashboard/reports/stock"
                }
            ]
        },
        {
            title: "Settings",
            icon: <Settings size={18} />,
            path: "/dashboard/settings"
        }
    ]

    return (
        <div>
            <div className="drawer-container">
                <div
                    onClick={props.onHide}
                    className={props.show ? "backdrop d-lg-none open-backdrop" : "backdrop d-lg-none"}
                />

                {/* Drawer */}
                <div className={props.show ? "drawer open-drawer" : "drawer"}>
                    <div className="drawer-body">
                        <TreeMenu options={routes} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index;