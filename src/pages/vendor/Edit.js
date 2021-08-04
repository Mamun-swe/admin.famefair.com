import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ChevronLeft } from 'react-feather'
// import Requests from '../../utils/Requests/Index'
import { Layout, Main } from '../../components/layout/Index'
import { GrayButton, PrimaryButton } from '../../components/button/Index'

const Edit = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isLoading, setLoading] = useState(false)
    const [payment, setPayment] = useState('Cash')
    const [payPeriod, setPayPeriod] = useState({ value: null, error: null })
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    // Pay system handeller
    const paySystemHandeller = event => {
        const value = event.target.value
        console.log(value);
        setPayment(value)
        if (value === 'Cash') setPayPeriod({ value: null, error: null })
    }

    // Submit Form
    const onSubmit = async (data) => {

        if (payment === 'Credit') {
            if (!payPeriod.value) return setPayPeriod({ ...payPeriod, error: 'Pay period is required.' })
        }

        const vendorData = {
            ...data,
            payPeriod: payPeriod.value ? payPeriod.value : null
        }

        setLoading(true)
        console.log(vendorData)
        console.log(header)

        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }

    return (
        <div>
            <Layout
                page="dashboard / vendor edit"
                message="Edit Test vendor."
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/vendor">
                            <GrayButton type="button">
                                <ChevronLeft size={15} style={{ marginRight: 5 }} />
                                <span style={{ fontSize: 13 }}>BACK</span>
                            </GrayButton>
                        </Link>
                    </div>
                }
            />

            <Main>
                <div className="col-12">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Baic info */}
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

                            {/* E-mail */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.email && errors.email.message ?
                                        <p className="text-danger">{errors.email && errors.email.message}</p>
                                        : <p>E-mail</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter e-mail"
                                        {...register("email", {
                                            required: "E-mail is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
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
                                                value: /^(?:\+88|01)?\d+$/,
                                                message: "Phone number is not valid."
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.address && errors.address.message ?
                                        <p className="text-danger">{errors.address && errors.address.message}</p>
                                        : <p>Address</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter address"
                                        {...register("address", { required: "Address is required" })}
                                    />
                                </div>
                            </div>
                        </div>


                        {/* Bank info */}
                        <div className="row">
                            <div className="col-12 pt-2">
                                <p className="text-muted mb-0">Bank information</p>
                                <hr />
                            </div>

                            {/* Account name */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.accountName && errors.accountName.message ?
                                        <p className="text-danger">{errors.accountName && errors.accountName.message}</p>
                                        : <p>Account name</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter account name"
                                        {...register("accountName", { required: "Account name is required" })}
                                    />
                                </div>
                            </div>

                            {/* Account number */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.accountNumber && errors.accountNumber.message ? (
                                        <p className="text-danger">{errors.accountNumber && errors.accountNumber.message}</p>
                                    ) : <p>Account number</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter account number"
                                        {...register("accountNumber", { required: "Account number is required" })}
                                    />
                                </div>
                            </div>

                            {/* Branch */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.branchName && errors.branchName.message ?
                                        <p className="text-danger">{errors.branchName && errors.branchName.message}</p>
                                        : <p>Branch</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter brnach name"
                                        {...register("branchName", { required: "Branch name is required" })}
                                    />
                                </div>
                            </div>

                            {/* Routing Number */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.routingNumber && errors.routingNumber.message ?
                                        <p className="text-danger">{errors.routingNumber && errors.routingNumber.message}</p>
                                        : <p>Routing Number</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter routing number"
                                        {...register("routingNumber", { required: "Routing number is required" })}
                                    />
                                </div>
                            </div>
                        </div>


                        {/* Business & payment info */}
                        <div className="row">
                            <div className="col-12 pt-2">
                                <p className="text-muted mb-0">Business & payment information</p>
                                <hr />
                            </div>

                            {/* Trade licence */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.tradeLicence && errors.tradeLicence.message ?
                                        <p className="text-danger">{errors.tradeLicence && errors.tradeLicence.message}</p>
                                        : <p>Trade licence</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter trade licence"
                                        {...register("tradeLicence", { required: "Trade licence is required" })}
                                    />
                                </div>
                            </div>

                            {/* Pick Up location */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.pickupLocation && errors.pickupLocation.message ?
                                        <p className="text-danger">{errors.pickupLocation && errors.pickupLocation.message}</p>
                                        : <p>Pick Up location</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter pick up location"
                                        {...register("pickupLocation", { required: "Pickup location is required" })}
                                    />
                                </div>
                            </div>

                            {/* Payment system */}
                            <div className="col-12">
                                <div className="form-group mb-4">
                                    <p>Payment system</p>

                                    <select
                                        className="form-control shadow-none"
                                        onChange={paySystemHandeller}
                                    >
                                        <option value="Cash">Cash</option>
                                        <option value="Credit">Credit</option>
                                    </select>
                                </div>
                            </div>

                            {/* Payment period */}
                            {payment === 'Credit' ?
                                <div className="col-12">
                                    <div className="form-group mb-4">
                                        {payPeriod.error ?
                                            <p className="text-danger">{payPeriod.error}</p>
                                            : <p>Payment pay period</p>}

                                        <select
                                            className="form-control shadow-none"
                                            onChange={(event) => setPayPeriod({ value: event.target.value, error: null })}
                                            defaultValue={null}
                                        >
                                            <option value={null}>-- Select period --</option>
                                            <option value="Every 10 days">Every 10 days</option>
                                            <option value="Every 15 days">Every 15 days</option>
                                            <option value="Every 20 days">Every 20 days</option>
                                            <option value="Every 30 days">Every 30 days</option>
                                        </select>
                                    </div>
                                </div>
                                : null}
                        </div>


                        {/* Contact person 1 */}
                        <div className="row">
                            <div className="col-12 pt-2">
                                <p className="text-muted mb-0">Contact person 1</p>
                                <hr />
                            </div>

                            {/* Name */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.personOneName && errors.personOneName.message ?
                                        <p className="text-danger">{errors.personOneName && errors.personOneName.message}</p>
                                        : <p>Name</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter name"
                                        {...register("personOneName", { required: "Name is required" })}
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.personOnePhone && errors.personOnePhone.message ?
                                        <p className="text-danger">{errors.personOnePhone && errors.personOnePhone.message}</p>
                                        : <p>Phone</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter phone number"
                                        {...register("personOnePhone", {
                                            required: "Name is required",
                                            pattern: {
                                                value: /^(?:\+88|01)?\d+$/,
                                                message: "Phone number is not valid."
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* E-mail */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.personOneEmail && errors.personOneEmail.message ?
                                        <p className="text-danger">{errors.personOneEmail && errors.personOneEmail.message}</p>
                                        : <p>E-mail</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter e-mail"
                                        {...register("personOneEmail", {
                                            required: "E-mail is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                        </div>


                        {/* Contact person 2 */}
                        <div className="row">
                            <div className="col-12 pt-2">
                                <p className="text-muted mb-0">Contact person 2</p>
                                <hr />
                            </div>

                            {/* Name */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.personTwoName && errors.personTwoName.message ?
                                        <p className="text-danger">{errors.personTwoName && errors.personTwoName.message}</p>
                                        : <p>Name</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter name"
                                        {...register("personTwoName", { required: "Name is required" })}
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.personTwoPhone && errors.personTwoPhone.message ?
                                        <p className="text-danger">{errors.personTwoPhone && errors.personTwoPhone.message}</p>
                                        : <p>Phone</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter phone number"
                                        {...register("personTwoPhone", {
                                            required: "Name is required",
                                            pattern: {
                                                value: /^(?:\+88|01)?\d+$/,
                                                message: "Phone number is not valid."
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* E-mail */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {errors.personTwoEmail && errors.personTwoEmail.message ?
                                        <p className="text-danger">{errors.personTwoEmail && errors.personTwoEmail.message}</p>
                                        : <p>E-mail</p>}

                                    <input
                                        type="text"
                                        name="personTwoEmail"
                                        className="form-control shadow-none"
                                        placeholder="Enter e-mail"
                                        {...register("personTwoEmail", {
                                            required: "E-mail is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Management info */}
                        <div className="row">
                            <div className="col-12 pt-2">
                                <p className="text-muted mb-0">Management info</p>
                                <hr />
                            </div>

                            {/* Key Account Manager */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.keyAccountManager && errors.keyAccountManager.message ?
                                        <p className="text-danger">{errors.keyAccountManager && errors.keyAccountManager.message}</p>
                                        : <p>Key account manager</p>}

                                    <select
                                        className="form-control shadow-none"
                                        {...register("keyAccountManager", { required: "Manager is required" })}
                                    >
                                        <option value="Kaosar Ahammad Ashik">Kaosar Ahammad Ashik</option>
                                    </select>
                                </div>
                            </div>

                            {/* Secondary Key Account Manager */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.secondaryKeyAccountManager && errors.secondaryKeyAccountManager.message ?
                                        <p className="text-danger">{errors.secondaryKeyAccountManager && errors.secondaryKeyAccountManager.message}</p>
                                        : <p>Secondayr key account manager</p>}

                                    <select
                                        className="form-control shadow-none"
                                        {...register("secondaryKeyAccountManager", { required: "Manager is required" })}
                                    >
                                        <option value="Peona Afrose">Peona Afrose</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 text-end">
                                <PrimaryButton
                                    type="submit"
                                    className="px-4"
                                    disabled={isLoading}
                                >{isLoading ? 'Updating ...' : 'Update'}</PrimaryButton>
                            </div>
                        </div>

                    </form>
                </div>
            </Main>
        </div>
    );
}

export default Edit;
