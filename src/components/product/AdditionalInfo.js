import React, { useState } from 'react'
import { Plus, X } from 'react-feather'
import { DangerButton, SuccessButton } from '../button/Index'

export const AdditionalInfo = (props) => {
    const [field, setField] = useState([{ title: null, value: null }])

    // Remove field
    const removeField = (index) => {
        const fields = [...field]
        fields.splice(index, 1)
        setField(fields)
    }

    // Handle input
    const handleInput = (index, event) => {
        const fields = [...field]
        if (event.target && event.target.name === "title") {
            fields[index].title = event.target.value
        } else {
            fields[index].value = event.target.value
        }

        setField(fields)
        props.data(field)
    }

    return (
        <div style={{ background: "#2962ff0e" }}>
            <div className="container-fluid mb-4">
                <div className="row">
                    <div className="col-12 py-3 mb-3 border-bottom">
                        <div className="d-flex">
                            <div><h6 className="mb-0 mt-2">Additional info</h6></div>
                            <div className="ml-auto">
                                <SuccessButton
                                    type="button"
                                    style={{ borderRadius: "50%", padding: "7px 8px", marginRight: 5 }}
                                    onClick={() => setField([...field, { title: null, value: null }])}
                                >
                                    <Plus size={20} />
                                </SuccessButton>
                            </div>
                        </div>
                    </div>

                    {field && field.map((item, i) =>
                        <div className="col-12" key={i}>
                            <div className="d-flex">

                                {/* Title */}
                                <div className="flex-fill">
                                    <div className="form-group mb-4">
                                        <p>Title</p>

                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control shadow-none"
                                            placeholder="Enter title"
                                            defaultValue={item.title}
                                            onChange={event => handleInput(i, event)}
                                        />
                                    </div>
                                </div>

                                {/* Value */}
                                <div className={i > 0 ? "flex-fill px-2 px-md-3" : "flex-fill pl-2 pl-md-3"}>
                                    <div className="form-group mb-4">
                                        <p>Value</p>

                                        <input
                                            type="text"
                                            name="value"
                                            className="form-control shadow-none"
                                            placeholder="Enter value"
                                            defaultValue={item.value}
                                            onChange={event => handleInput(i, event)}
                                        />
                                    </div>
                                </div>

                                {i !== 0 ?
                                    <div style={{ paddingTop: 28 }}>
                                        <DangerButton
                                            type="button"
                                            style={{ borderRadius: "50%", padding: "7px 8px", marginRight: 5 }}
                                            onClick={() => removeField(i)}
                                        >
                                            <X size={20} />
                                        </DangerButton>
                                    </div>
                                    : null}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
