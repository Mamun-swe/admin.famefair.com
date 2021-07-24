import React from 'react'
import ReactApexCharts from 'react-apexcharts'

// All order
export const OrderChart = () => {
    const series = [{
        name: 'Order',
        data: [10, 31, 40, 28, 51, 42, 109, 100, 90, 95, 205, 80]
    }]

    const options = {
        chart: {
            height: 400,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'month',
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        yaxis: {
            opposite: true
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
        title: {
            text: 'Order Summary',
            align: 'left'
        },
        subtitle: {
            text: 'Order Summary of the Month',
            align: 'left'
        },
        legend: {
            horizontalAlign: 'left'
        }
    }

    return (
        <div>
            <ReactApexCharts options={options} series={series} type="area" height={350} />
        </div>
    );
};


// Order Status 
export const OrderStatusChart = () => {
    const series = [44, 55, 13, 43, 22]

    const options = {
        chart: {
            width: 550,
            type: 'donut',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        legend: {
            position: 'bottom'
        },
        title: {
            text: 'Order Status',
            align: 'left'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 350
                }
            }
        }]
    }

    return (
        <div>
            <ReactApexCharts options={options} series={series} type="donut" width={350} />
        </div>
    );
};