import React, { useState } from 'react'
import './style.scss'
import arrow from './chevron-right.svg'
import { NavLink } from 'react-router-dom'

// Menu Item
const MenuItem = props => {
    const [open, setOpen] = useState(false)

    return (
        <div className="sub-menu-container">
            {props.path ?
                <NavLink
                    exact
                    to={props.path}
                    type="button"
                    activeClassName="isActive"
                    className="btn shadow-none menu-btn"
                >
                    <span className="menu-icon">{props.icon}</span>
                    <span className="menu-title">{props.title}</span>
                </NavLink>
                :
                <div
                    className="sub-menu d-flex"
                    onClick={() => setOpen(!open)}
                >
                    <div className="menu-icon">{props.icon}</div>
                    <div className="menu-title">{props.title}</div>
                    {props.children &&
                        <div className="menu-arrow ml-auto">
                            <img
                                src={arrow}
                                width={14}
                                height={14}
                                className={open ? "arrow down" : "arrow"}
                                alt="Right arrow"
                            />
                        </div>
                    }
                </div>
            }

            <div className={open ? "sub-menu-body show" : "sub-menu-body"}>
                {props.children && props.children.map((item, i) =>
                    <MenuItem
                        key={i}
                        icon={item.icon}
                        path={item.path}
                        title={item.title}
                        children={item.children} />
                )}
            </div>
        </div>
    )
}

const TreeMenu = (props) => {
    return (
        <div>
            {props.options && props.options.length ?
                props.options.map((item, i) => {
                    return (
                        <MenuItem
                            key={i}
                            icon={item.icon}
                            path={item.path}
                            title={item.title}
                            children={item.children}
                        />
                    )
                })
                : null}
        </div>
    )
}

export { MenuItem, TreeMenu };