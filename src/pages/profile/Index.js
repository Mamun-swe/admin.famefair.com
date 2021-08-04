
import React, { useState, useEffect } from 'react'
import './style.scss'
import { useForm } from 'react-hook-form'
import { Layout, Main } from '../../components/layout/Index'
import { Loader } from '../../components/loader/Index'
import { Images } from '../../utils/Images'
import { DangerButton, PrimaryButton, SuccessButton } from '../../components/button/Index'
import { isValidPhone } from '../../utils/_heplers'

const Index = () => {
    const [loading, setLoading] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isupdate, setUpdate] = useState(false)
    const [isEdit, setEdit] = useState(false)
    // const [header] = useState({
    //     headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    // })

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    // Submit data
    const onSubmit = async (data) => {
        try {
            setUpdate(true)

            setTimeout(() => {
                setUpdate(false)
                console.log(data)
            }, 1500);

        } catch (error) {
            setUpdate(false)
            console.log(error)
        }
    }

    if (loading) return <Loader />

    return (
        <div className="profile-container">
            <Layout
                page="dashboard / profile"
                message="Welcome to your profile."
                container="container-fluid"
            />

            <Main>
                {/* Basic info */}
                <div className="col-12 col-lg-5 col-xl-3 text-center mb-4 mb-lg-0">
                    <div className="img-container rounded-circle border">
                        <img src={Images.Avatar} className="img-fluid" alt="..." />
                    </div>
                    <br />
                    <h6 className="text-capitalize mb-1">admin famefair</h6>
                    <p className="text-lowercase mb-1">admin@famefair.com</p>
                    <p className="mb-0">01XXXXXXXXX</p>
                </div>

                {/* All info */}
                <div className="col-12 col-lg-7 col-xl-9">
                    {!isEdit ?

                        // Content container
                        <div className="content-container">
                            <div className="d-flex">
                                <div style={{ width: 130 }}>
                                    <p className="mb-2">Name</p>
                                    <p className="mb-2">E-mail</p>
                                    <p className="mb-2">Phone</p>
                                    <p className="mb-2">Role</p>
                                    <p className="mb-2">Present Address</p>
                                    <p className="mb-2">Permanent Address</p>
                                </div>
                                <div>
                                    <p className="mb-2">: Test user</p>
                                    <p className="text-lowercase mb-2">: example@gmail.com</p>
                                    <p className="mb-2">: 01XXXXXXXXX</p>
                                    <p className="mb-2">: Admin</p>
                                    <p className="mb-2">: Dhaka</p>
                                    <p className="mb-2">: Ashulia, Savar</p>
                                </div>
                            </div>

                            <div className="text-end text-lg-start">
                                <SuccessButton
                                    type="button"
                                    className="mt-3"
                                    style={{ padding: "10px 24px" }}
                                    onClick={() => setEdit(true)}
                                >Edit Information</SuccessButton>
                            </div>
                        </div>

                        :
                        // Edit container
                        <div className="edit-info-container">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">

                                    {/* Name */}
                                    <div className="col-12 col-lg-6">
                                        <div className="form-group mb-4">
                                            {errors.name && errors.name.message ?
                                                <small className="text-danger">{errors.name && errors.name.message}</small>
                                                : <small>Name</small>}

                                            <input
                                                type="text"
                                                placeholder="Your name"
                                                className={errors.name ? "form-control shadow-none error" : "form-control shadow-none"}
                                                {...register("name", { required: "Name is required" })}
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

                                    {/* Present Address */}
                                    <div className="col-12 col-lg-6">
                                        <div className="form-group mb-4">
                                            {errors.presentAddress && errors.presentAddress.message ?
                                                <p className="text-danger">{errors.presentAddress && errors.presentAddress.message}</p>
                                                : <p>Present Address</p>}

                                            <input
                                                type="text"
                                                className="form-control shadow-none"
                                                placeholder="Enter address"
                                                {...register("presentAddress", { required: "Present address is required" })}
                                            />
                                        </div>
                                    </div>

                                    {/* Permanent Address */}
                                    <div className="col-12 col-lg-6">
                                        <div className="form-group mb-4">
                                            {errors.permanentAddress && errors.permanentAddress.message ?
                                                <p className="text-danger">{errors.permanentAddress && errors.permanentAddress.message}</p>
                                                : <p>Permanent Address</p>}

                                            <input
                                                type="text"
                                                className="form-control shadow-none"
                                                placeholder="Enter address"
                                                {...register("permanentAddress", { required: "Permanent address is required" })}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 text-end">
                                        <PrimaryButton
                                            type="submit"
                                            className="px-4"
                                            disabled={isupdate}
                                        >{isupdate ? "Updating ..." : "Update"}</PrimaryButton>

                                        <DangerButton
                                            type="button"
                                            className="ms-2"
                                            style={{ padding: "10px 24px" }}
                                            onClick={() => setEdit(false)}
                                        >Cancel</DangerButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </Main>
        </div>
    );
}

export default Index;