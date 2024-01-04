import { useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';

import ReactApexChart from 'react-apexcharts';
import { blue, green, grey, red, yellow } from '@mui/material/colors';


const areaChartOptions = {
    chart: {
        height: 340,
        type: 'line',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 1.5
    },
    grid: {
        strokeDashArray: 4
    },
    xaxis: {
        type: 'datetime',
        categories: [
            '2022-05-19T00:00:00.000Z',
            '2022-06-19T00:00:00.000Z',
            '2022-07-19T01:30:00.000Z',
            '2022-08-19T02:30:00.000Z',
            '2022-09-19T03:30:00.000Z',
            '2022-10-19T04:30:00.000Z',
            '2022-11-19T05:30:00.000Z',
            '2022-12-19T06:30:00.000Z'
        ],
        labels: {
            format: 'MMM'
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        show: false
    },
    tooltip: {
        x: {
            format: 'MM'
        }
    }
};

const ReportAreaChart = () => {
    const theme = useTheme();

    const { primary, secondary, success, info, warning,  } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(areaChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [green[600], yellow[800], grey[800], blue[800], red[900], yellow[200]],
            xaxis: {
                labels: {
                    style: {
                        colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary]
                    }
                }
            },
            grid: {
                borderColor: line
            },
            tooltip: {
                theme: 'dark'
            },
            legend: {
                labels: {
                    colors: 'grey.500'
                }
            }
        }));
    }, [primary, secondary, line, theme]);

    const [series] = useState([
        {
            name: 'Happy',
            data: [90, 87, 35, 45, 63, 92, 81, 88]
        },
        {
            name: 'Positive',
            data: [58, 15, 21, 83, 63, 75, 35, 5]
        },
        {
            name: 'Motivated',
            data: [58, 15, 28, 83, 6, 5, 35, 5]
        },
        {
            name: 'Excited',
            data: [32, 11, 21, 90, 7, 1, 35, 8]
        },
        {
            name: 'Sad',
            data: [3, 1, 1, 9, 7, 1, 5, 1],
        },
        {
            name: 'Depressed',
            data: [5, 7, 2, 10, 23, 4, 9, 2]
        }
    ]);

    return <ReactApexChart options={options} series={series} type="line" height={345} />;
};

export default ReportAreaChart;