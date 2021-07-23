import React from 'react'
import './style.scss'
import { useForm } from 'react-hook-form'
import { Search } from 'react-feather'

const Index = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onClearSearch = event => {
        const value = event.target.value
        if (!value) props.clear()
    }

    // Submit Form
    const onSubmit = data => props.search(data)

    return (
        <div className="search-component">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-container">
                    <input
                        type="text"
                        name="query"
                        onChange={onClearSearch}
                        {...register("query", { required: true })}
                        placeholder={`${'Search'} ${props.placeholder}`}
                        className={errors.query ? "form-control form-control-sm shadow-none error" : "form-control form-control-sm shadow-none"}
                    />

                    <button type="submit" className="btn btn-sm shadow-none" disabled={props.loading}>
                        {props.loading ? <div className="btn-loader"></div> : <Search size={18} />}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Index;
