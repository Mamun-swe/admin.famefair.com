
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ChevronLeft } from 'react-feather'
import {
    GrayButton,
    PrimaryButton
} from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import { FileUploader } from '../../components/fileUploader/Single'
import Requests from '../../utils/Requests/Index'

const Create = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState({ value: null, error: null })
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    // Handle form submission
    const onSubmit = async data => {
        if (!image.value) return setImage({ ...image, error: "Brand logo is required." })

        setLoading(true)
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('image', image.value)

        await Requests.Brand.Store(formData, header)
        setLoading(false)
    }

    return (
        <div>
            <Layout
                page="dashboard / brand store"
                message="Store new brand for visible to website."
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
                                {...register("name", { required: "Brand name is required" })}
                            />
                        </div>


                        {/* File uploader */}
                        <FileUploader
                            width={100}
                            height={100}
                            limit={100}
                            title="Brand logo (100X100)"
                            error={image.error}
                            dataHandeller={(data) => setImage({ ...image, value: data.image || null, error: data.error || null })}
                        />


                        <div className="text-end">
                            <PrimaryButton
                                type="submit"
                                disabled={loading}
                                className="px-4"
                            >
                                {loading ? "Loading ..." : "Submit"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Main>
        </div>
    );
}

export default Create;