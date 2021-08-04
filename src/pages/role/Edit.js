
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ChevronLeft } from 'react-feather'
import {
    GrayButton,
    PrimaryButton
} from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import { MultiSelect } from '../../components/select/Index'

const Edit = () => {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()
    const [isLoading, setLoading] = useState(false)
    const [permissions, setPermissions] = useState({ options: [], values: [] })
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })


    // Handle permission
    const handlePermission = event => {
        setPermissions(exPermission => ({ ...exPermission, values: event.value }))
        clearErrors('permissions')
    }

    // Submit Form
    const onSubmit = async (data) => {
        try {
            if (!permissions.values.length) {
                return setError("permissions", {
                    type: "manual",
                    message: "Permissions is required.",
                });
            }

            const formData = {
                ...data,
                permissions: permissions.values
            }

            setLoading(true)
            console.log(formData)
            console.log(header)

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
                page="dashboard / role edit"
                message="Edit role for admin."
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/role">
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

                        {/* Role */}
                        <div className="form-group mb-4">
                            {errors.role && errors.role.message ?
                                <p className="text-danger">{errors.role && errors.role.message}</p>
                                : <p>Role</p>}

                            <input
                                type="text"
                                className="form-control shadow-none"
                                placeholder="Enter role title"
                                {...register("role", { required: "Role title is required" })}
                            />
                        </div>


                        {/* Permission */}
                        <div className="form-group mb-4">
                            {errors.permissions && errors.permissions.message ?
                                <p className="text-danger">{errors.permissions && errors.permissions.message}</p>
                                : <p>Permissions</p>}

                            <MultiSelect
                                placeholder="permissions"
                                error={errors.permissions}
                                options={permissions.options}
                                value={handlePermission}
                            />
                        </div>

                        <div className="text-end">
                            <PrimaryButton
                                type="submit"
                                className="px-4"
                                disabled={isLoading}
                            >{isLoading ? "Updating ..." : "Update"}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Main>
        </div>
    );
}

export default Edit;