// Chart configuration options
const historicalOptions = {
    series: [{
        name: 'NVDA',
        data: []  // Will be populated later
    }],
    chart: {
        type: 'candlestick',
        height: 350,
        animations: {
            enabled: false
        },
        toolbar: {
            show: true,
            tools: {
                download: true
            }
        },
        background: 'transparent'
    },
    

    grid: {
        borderColor: '#e5e7eb',
    },
    xaxis: {
        type: 'datetime',
        labels: {
            style: {
                colors: '#6b7280',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500
            }
        },
        axisBorder: {
            color: '#e5e7eb'
        }
    },
    yaxis: {
        tooltip: {
            enabled: true
        },
        labels: {
            style: {
                colors: '#6b7280',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500
            },
            formatter: function(val) {
                return '$' + val.toFixed(2);
            }
        }
    },
    plotOptions: {
        candlestick: {
            colors: {
                upward: '#10b981',
                downward: '#ef4444'
            },
            wick: {
                useFillColor: true
            }
        }
    }
};

const realtimeOptions = {
    series: [{
        name: 'Price',
        data: []
    }],
    chart: {
        type: 'area',
        height: 180,
        animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
                speed: 1000
            }
        },
        toolbar: {
            show: false
        },
        background: 'transparent'
    },
    dataLabels:
    {
        enabled:false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.3,
            opacityTo: 0.1,
            stops: [0, 100]
        }
    },
    colors: ['#3b82f6'],
    grid: {
        borderColor: '#e5e7eb',
    },
    xaxis: {
        type: 'datetime',
        labels: {
            style: {
                colors: '#6b7280',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500
            }
        },
        axisBorder: {
            color: '#e5e7eb'
        }
    },
    yaxis: {
        labels: {
            style: {
                colors: '#6b7280',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500
            },
            formatter: function(val) {
                return '$' + val.toFixed(2);
            }
        }
    }
};