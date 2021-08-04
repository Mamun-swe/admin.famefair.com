
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ChevronLeft } from 'react-feather'
import { Layout, Main } from '../../components/layout/Index'
import { GrayButton, PrimaryButton } from '../../components/button/Index'
import { SingleSelect, SearchableSelect } from '../../components/select/Index'
import { districts } from '../../utils/Districts'
import Requests from '../../utils/Requests/Index'
import { isValidPhone } from '../../utils/_heplers'

const Index = () => {
    const [loading, setLoading] = useState(false)
    // const [customer, setCustomer] = useState(null)
    const [shippingArea, setShippingArea] = useState({
        options: districts,
        value: null,
        error: null
    })
    const [selectedItems, setSelectedItems] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    // Handle search from API
    const handleSearch = async (inputValue) => {
        let results = []
        const response = await Requests.Product.SearchBySku(inputValue, header)

        if (response && response.length) {
            for (let i = 0; i < response.length; i++) {
                const element = response[i]
                results.push({
                    label: element.name,
                    value: element.slug,
                    image: element.thumbnail
                })
            }
        }

        return results
    }

    // Handle Selected values
    const handleSelectedValues = data => {
        setSelectedItems(data)
        console.log(data)
    }

    // Handle customer select
    const handleCustomer = data => {
        console.log(data);
    }

    // Submit Form
    const onSubmit = async (data) => {
        try {
            if (!shippingArea.value) return setShippingArea({ ...shippingArea, error: "Shipping area is required." })

            const formData = {
                ...data,
                shippingArea: shippingArea.value
            }

            setLoading(true)
            console.log(formData)

            setTimeout(() => {
                setLoading(false)
            }, 2000)
        } catch (error) {
            if (error) console.log(error)
        }
    }


    return (
        <div>
            <Layout
                page="dashboard / order create"
                message="Create a new order."
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/order">
                            <GrayButton type="button">
                                <ChevronLeft size={15} style={{ marginRight: 5 }} />
                                <span style={{ fontSize: 13 }}>BACK</span>
                            </GrayButton>
                        </Link>
                    </div>
                }
            />

            <Main>

                {/* Search container */}
                <div className="col-12 mb-4">
                    <SearchableSelect
                        isMulti={true}
                        placeholder="Search with sku"
                        search={handleSearch}
                        values={handleSelectedValues}
                    />
                </div>

                {/* Selected items */}
                <div className="col-12 mb-4">
                    <table className="table table-sm table-borderless">
                        <tbody>
                            {selectedItems && selectedItems.map((item, i) =>
                                <tr key={i}>
                                    <td style={{ width: 60 }}>
                                        <img src={item.image} style={{ width: 50, height: 50 }} alt={item.name} />
                                    </td>
                                    <td><p className="mb-0">{item.label}</p></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Select customer */}
                {selectedItems.length ?
                    <div className="col-12 col-lg-8 col-xl-5 m-auto">
                        <div className="d-flex">
                            <div className="flex-fill pe-2">
                                <SearchableSelect
                                    isMulti={false}
                                    placeholder="Search customer"
                                    search={handleSearch}
                                    values={handleCustomer}
                                />
                            </div>
                            <div>
                                <Link to="/dashboard/customer/store">
                                    <PrimaryButton
                                        type="button"
                                        className="px-4"
                                        style={{ borderRadius: 25 }}
                                    >Create</PrimaryButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                    : null}

                {/* Customer info */}
                {selectedItems.length ?
                    <div className="col-12 my-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">

                                {/* Name */}
                                <div className="col-12 col-lg-6">
                                    <div className="form-group mb-4">
                                        {errors.name && errors.name.message ?
                                            <p className="text-danger">{errors.name && errors.name.message}</p>
                                            : <p>Name</p>}

                                        <input
                                            type="text"
                                            className="form-control shadow-none"
                                            placeholder="Enter name"
                                            {...register("name", {
                                                required: "Name is required",
                                                minLength: {
                                                    value: 5,
                                                    message: "Minimun length 5 character"
                                                }
                                            })}
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="col-12 col-lg-6">
                                    <div className="form-group mb-4">
                                        {errors.phone && errors.phone.message ?
                                            <p className="text-danger">{errors.phone && errors.phone.message}</p>
                                            : <p>Phone</p>}

                                        <input
                                            type="text"
                                            className="form-control shadow-none"
                                            placeholder="Enter phone number"
                                            {...register("phone", {
                                                required: "Phone number is required",
                                                pattern: {
                                                    value: isValidPhone(),
                                                    message: "Phone number is not valid."
                                                }
                                            })}
                                        />
                                    </div>
                                </div>

                                {/* Shipping Area */}
                                <div className="col-12 col-lg-6">
                                    <div className="form-group mb-4">
                                        {shippingArea.error ? <p className="text-danger">{shippingArea.error}</p> : <p>Shipping area</p>}

                                        <SingleSelect
                                            placeholder="area"
                                            options={shippingArea.options}
                                            value={event => setShippingArea({ ...shippingArea, value: event.value, error: null })}
                                        />
                                    </div>
                                </div>

                                {/* Delivery address */}
                                <div className="col-12 col-lg-6">
                                    <div className="form-group mb-4">
                                        {errors.deliveryAddress && errors.deliveryAddress.message ?
                                            <p className="text-danger">{errors.deliveryAddress && errors.deliveryAddress.message}</p>
                                            : <p>Delivery address</p>}

                                        <input
                                            type="text"
                                            className="form-control shadow-none"
                                            placeholder="Enter address"
                                            {...register("deliveryAddress", { required: "Delivery address is required" })}
                                        />
                                    </div>
                                </div>

                                {/* Order status */}
                                <div className="col-12">
                                    <div className="form-group mb-4">
                                        {errors.orderStatus && errors.orderStatus.message ?
                                            <p className="text-danger">{errors.orderStatus && errors.orderStatus.message}</p>
                                            : <p>Order status</p>}

                                        <select
                                            type="text"
                                            className="form-control shadow-none"
                                            {...register("orderStatus", { required: "Order status is required" })}
                                        >
                                            <option value="">--- Select status ---</option>
                                            <option value="Created">Created</option>
                                            <option value="Pending">Pending</option>
                                            <option value="In Courier">In Courier</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="col-12 text-end">
                                    <PrimaryButton
                                        type="submit"
                                        className="px-4"
                                        disabled={loading}
                                    >
                                        {loading ? "Creating ..." : "Create Order"}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                    : null}

            </Main>
        </div>
    );
}

export default Index;