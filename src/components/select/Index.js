import React from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        minHeight: 42,
        fontSize: 14,
        color: '#000',
        background: '#e9e8e8',
        boxShadow: 'none', '&:hover': { borderColor: '1px solid #ced4da' },
        border: state.isFocused ? '1px solid #dfdfdf' : '1px solid #ced4da',
        borderRadius: 4
    })
}

const errorStyle = {
    control: (provided) => ({
        ...provided,
        minHeight: 42,
        fontSize: 14,
        color: '#000',
        boxShadow: 'none', '&:hover': { borderColor: '1px solid #ced4da' },
        border: '1px solid red',
        borderRadius: 4
    })
}

// Single select
export const SingleSelect = (props) => {
    const handleSelect = event => props.value(event)

    return (
        <div>
            <Select
                styles={props.error ? errorStyle : customStyles}
                options={props.options}
                onChange={handleSelect}
                classNamePrefix="custom-select"
                placeholder={`Select ${props.placeholder}`}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                defaultValue={props.deafult ? { ...props.deafult } : null}
            />
        </div>
    );
};

// Createable select
export const Creatable = (props) => {
    const handleSelect = event => {
        let values = []
        if (event && event.length) {
            for (let i = 0; i < event.length; i++) {
                const element = event[i]
                values.push(element.value)
            }
        }
        props.value(values)
    }

    return (
        <div>
            <CreatableSelect
                styles={props.error ? errorStyle : customStyles}
                isMulti
                options={props.options}
                onChange={handleSelect}
                classNamePrefix="custom-select"
                placeholder={props.placeholder}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                defaultValue={props.deafult ? { ...props.deafult } : null}
            />
        </div>
    );
};