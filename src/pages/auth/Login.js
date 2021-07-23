import React, { useEffect, useState } from 'react'
import './style.scss'
import Jwt from 'jsonwebtoken'
import { useForm } from 'react-hook-form'
import { Images } from '../../utils/Images'
import { Link, useHistory } from 'react-router-dom'
import { PrimaryButton } from '../../components/button/Index'
// import Requests from '../../utils/Requests/Index'

const Login = () => {
    const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isLogging, setLogging] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) history.push('/dashboard')
    }, [history])

    // Submit Form
    const onSubmit = async (data) => {
        console.log(data)
        setLogging(true)

        setTimeout(() => {
            const token = Jwt.sign(
                { email: data.email, role: "admin" }, "MYSECRET", { expiresIn: '10d' }
            )

            localStorage.setItem('token', token)
            setLogging(false)
            history.push('/dashboard')
        }, 1500);

        // setLogging(true)
        // const response = await Requests.Auth.Login(data)
        // if (response) {
        //     setLogging(false)
        //     localStorage.setItem('token', response.token)
        //     return history.push('/dashboard')
        // }
        // setLogging(false)
    }


    return (
        <div className="auth">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-6 d-none d-lg-block p-0">
                        <div className="image-container">
                            <div className="overlay">
                                <div className="flex-center flex-column">
                                    <img src={Images.Logo} className="img-fluid" alt="..." />
                                    <h2>admin panel</h2>
                                    <p>Login as admin, manage users & products.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 py-3 credential-container">
                        <div className="flex-center flex-column">
                            <div className="card border-0">
                                <div className="text-center text-lg-left">
                                    <div className="d-lg-none">
                                        <img src={Images.Logo} className="img-fluid" alt="..." />
                                    </div>
                                    <h3 className="mb-0 mb-lg-4">Get Started!</h3>
                                    <p className="d-lg-none mb-4">Login as admin, manage users & products.</p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)}>

                                    {/* E-mail */}
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

                                    {/* Password */}
                                    <div className="form-group mb-4">
                                        {errors.password && errors.password.message ?
                                            <p className="text-danger">{errors.password && errors.password.message}</p>
                                            : <p>Password</p>}

                                        <input
                                            type="password"
                                            className="form-control shadow-none"
                                            placeholder="Enter password"
                                            {...register("password", {
                                                required: "Please enter password",
                                                minLength: {
                                                    value: 8,
                                                    message: "Minimun length 8 character"
                                                }
                                            })}
                                        />
                                    </div>


                                    <div className="d-flex">
                                        <div>
                                            <Link to="/reset">Forgot password ?</Link>
                                        </div>
                                        <div className="ml-auto">
                                            <PrimaryButton
                                                type="submit"
                                                className="px-4"
                                                disabled={isLogging}
                                            >{isLogging ? <span>Logging in...</span> : <span>Login</span>}</PrimaryButton>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;