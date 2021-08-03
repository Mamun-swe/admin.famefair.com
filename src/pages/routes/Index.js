
import {
    PieChart,
    // BarChart2,
    // Settings,
    Users,
    // Tool,
    // DollarSign,
    // BarChart,
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
import AdminIndex from '../admin/Index'
import AdminStore from '../admin/Create'
import AdminEdit from '../admin/Edit'

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
import ChangePassword from '../profile/ChangePassword'

export const routes = [
    {
        title: "Dashboard",
        name: "dashboard",
        path: "/dashboard/",
        exact: true,
        inDrawer: true,
        icon: <PieChart size={18} />,
        component: DashboardIndex
    },
    {
        title: "Banner",
        name: "banner",
        inDrawer: true,
        icon: <Image size={18} />,
        child: [
            {
                title: "All Banner",
                name: "banner index",
                path: "/dashboard/banner",
                exact: true,
                inDrawer: true,
                icon: <Plus size={18} />,
                component: BannerIndex
            },
            {
                title: "New Banner",
                name: "banner store",
                path: "/dashboard/banner/store",
                exact: true,
                inDrawer: true,
                icon: <List size={18} />,
                component: BannerStore
            }
        ]
    },
    {
        title: "Brand",
        name: "brand",
        icon: <Gift size={18} />,
        child: [
            {
                title: "All Brand",
                name: "brand index",
                path: "/dashboard/brand",
                exact: true,
                inDrawer: true,
                icon: <Plus size={18} />,
                component: BrandIndex
            },
            {
                title: "New Brand",
                name: "brand store",
                path: "/dashboard/brand/store",
                exact: true,
                inDrawer: true,
                icon: <Plus size={18} />,
                component: BrandStore
            },
            {
                title: "Edit Brand",
                name: "brand edit",
                path: "/dashboard/brand/edit/:id",
                exact: true,
                inDrawer: false,
                icon: null,
                component: BrandEdit
            }
        ]
    },
    {
        title: "Vendor",
        name: "vendor",
        inDrawer: true,
        icon: <Users size={18} />,
        child: [
            {
                title: "All Vendor",
                name: "vendor index",
                path: "/dashboard/vendor",
                exact: true,
                inDrawer: true,
                icon: <List size={18} />,
                component: VendorIndex
            },
            {
                title: "New Vendor",
                name: "vendor store",
                path: "/dashboard/vendor/store",
                exact: true,
                inDrawer: true,
                icon: <Plus size={18} />,
                component: VendorStore
            },
            {
                title: "Edit Vendor",
                name: "vendor edit",
                path: "/dashboard/vendor/edit/:id",
                exact: true,
                inDrawer: false,
                icon: null,
                component: VendorEdit
            },
            {
                title: "Show Vendor",
                name: "vendor show",
                path: "/dashboard/vendor/show/:id",
                exact: true,
                inDrawer: false,
                icon: null,
                component: VendorShow
            }
        ]
    },
    {
        title: "Category",
        name: "category",
        inDrawer: true,
        icon: <Layers size={18} />,
        child: [
            {
                title: "All Category",
                name: "category index",
                path: "/dashboard/category",
                exact: true,
                inDrawer: true,
                icon: <List size={18} />,
                component: CategoryIndex
            },
            {
                title: "New Category",
                name: "category store",
                path: "/dashboard/category/store",
                exact: true,
                inDrawer: true,
                icon: <Plus size={18} />,
                component: CategoryStore
            },
            {
                title: "Edit Category",
                name: "category edit",
                path: "/dashboard/category/edit/:id",
                exact: true,
                inDrawer: false,
                icon: null,
                component: CategoryEdit
            }
        ]
    },
    {
        title: "Product",
        name: "product",
        inDrawer: true,
        icon: <Archive size={18} />,
        child: [
            {
                title: "All Product",
                name: "product index",
                path: "/dashboard/product",
                exact: true,
                inDrawer: true,
                icon: <List size={18} />,
                component: ProductIndex
            },
            {
                title: "New Product",
                name: "product store",
                path: "/dashboard/product/store",
                exact: true,
                inDrawer: true,
                icon: <Plus size={18} />,
                component: ProductStore
            },
            {
                title: "Edit Product",
                name: "product edit",
                path: "/dashboard/product/edit/:id",
                exact: true,
                inDrawer: false,
                icon: null,
                component: ProductEdit
            },
            {
                title: "Show Product",
                name: "product show",
                path: "/dashboard/product/show/:id",
                exact: true,
                inDrawer: false,
                icon: null,
                component: ProductShow
            }
        ]
    },
    {
        title: "Order",
        name: "order",
        inDrawer: true,
        icon: <ShoppingCart size={18} />,
        child: [
            {
                title: "All Order",
                name: "order index",
                path: "/dashboard/order",
                exact: true,
                inDrawer: true,
                icon: <List size={18} />,
                component: OrderIndex
            },
            {
                title: "New Order",
                name: "order store",
                path: "/dashboard/order/store",
                exact: true,
                inDrawer: true,
                icon: <Plus size={18} />,
                component: OrderStore
            }
        ]
    },
    {
        title: "Admin",
        name: "admin",
        inDrawer: true,
        icon: <UserCheck size={18} />,
        child: [
            {
                title: "All Admin",
                name: "admin index",
                path: "/dashboard/admin",
                exact: true,
                inDrawer: true,
                icon: <List size={18} />,
                component: AdminIndex
            },
            {
                title: "New Admin",
                name: "admin store",
                path: "/dashboard/admin/store",
                exact: true,
                inDrawer: true,
                icon: <Plus size={18} />,
                component: AdminStore
            },
            {
                title: "Edit Admin",
                name: "admin edit",
                path: "/dashboard/admin/edit/:id",
                exact: true,
                inDrawer: false,
                icon: null,
                component: AdminEdit
            }
        ]
    },
    {
        title: "Customer",
        name: "customer",
        inDrawer: true,
        icon: <Users size={18} />,
        child: [
            {
                title: "All Customer",
                name: "customer index",
                path: "/dashboard/customer",
                exact: true,
                inDrawer: true,
                icon: <List size={18} />,
                component: CustomerIndex
            },
            {
                title: "New Customer",
                name: "customer store",
                path: "/dashboard/customer/store",
                exact: true,
                inDrawer: true,
                icon: <UserPlus size={18} />,
                component: CustomerStore
            },
            {
                title: "Show Customer",
                name: "customer show",
                path: "/dashboard/customer/show/:id",
                exact: true,
                inDrawer: false,
                icon: null,
                component: CustomerShow
            },
            {
                title: "Edit Customer",
                name: "customer edit",
                path: "/dashboard/customer/edit/:id",
                exact: true,
                inDrawer: false,
                icon: null,
                component: CustomerEdit
            }
        ]
    },
    {
        title: "Ratings & Reviews",
        name: "review",
        path: "/dashboard/review",
        exact: true,
        inDrawer: true,
        icon: <Star size={18} />,
        component: ReviewIndex
    },
    {
        title: "Subscribers",
        name: "subscriber",
        path: "/dashboard/subscriber",
        exact: true,
        inDrawer: true,
        icon: <Mail size={18} />,
        component: SubscriberIndex
    },
    {
        title: "Profile",
        name: "profile",
        inDrawer: false,
        icon: null,
        child: [
            {
                title: "Profile Show",
                name: "profile index",
                path: "/dashboard/profile",
                exact: true,
                inDrawer: false,
                icon: null,
                component: ProfileIndex
            },
            {
                title: "Change Password",
                name: "change-password",
                path: "/dashboard/profile/change-password",
                exact: true,
                inDrawer: false,
                icon: null,
                component: ChangePassword
            }
        ]
    }
]