
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ChevronLeft } from 'react-feather'
import {
    GrayButton,
    PrimaryButton
} from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import { FileUploader } from '../../components/fileUploader/Single'
import { Loader } from '../../components/loader/Index'

import Requests from '../../utils/Requests/Index'

const Edit = () => {
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isUpdate, setUpdate] = useState(false)
    const [image, setImage] = useState({ value: null })
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    const fetchData = useCallback(async () => {
        const response = await Requests.Brand.Show(id, header)

        setData(response.data)
        setLoading(false)
    }, [id, header])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    // Handle form submission
    const onSubmit = async data => {

        setUpdate(true)
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('image', image.value)

        await Requests.Brand.Update(id, formData, header)
        setUpdate(false)
    }

    if (loading) return <Loader />

    return (
        <div>
            <Layout
                page="dashboard / brand edit"
                message="Edit test brand."
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/brand">
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

                        {/* Name */}
                        <div className="form-group mb-4">
                            {errors.name && errors.name.message ?
                                <p className="text-danger">{errors.name && errors.name.message}</p>
                                : <p>Brand name</p>}

                            <input
                                type="text"
                                className="form-control shadow-none"
                                placeholder="Enter brand name"
                                defaultValue={data.name}
                                {...register("name", { required: "Brand name is required" })}
                            />
                        </div>


                        {/* File uploader */}
                        <FileUploader
                            width={100}
                            height={100}
                            limit={100}
                            title="Brand logo (100X100)"
                            default={data && data.image ? data.image : null}
                            dataHandeller={(data) => setImage({ ...image, value: data.image || null, error: data.error || null })}
                        />


                        <div className="text-end">
                            <PrimaryButton
                                type="submit"
                                disabled={isUpdate}
                                className="px-4"
                            >
                                {isUpdate ? "Updating ..." : "Update"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Main>
        </div>
    );
}

export default Edit;