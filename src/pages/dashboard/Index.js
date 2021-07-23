import React from 'react'
import { Layout, Main } from '../../components/layout/Index'

const Index = () => {
    return (
        <div>
            <Layout
                page="Dashboard"
                message="Welcome to dashboard"
                container="container-fluid"
            />

            <Main>
                <p>Dashboard Index</p>
                <b>HELLO_WORLD</b>
            </Main>
        </div>
    );
}

export default Index;