// Chart configuration options
const historicalOptions = {
    series: [{
        name: 'Price',
        type: 'candlestick',
        data: []
    }, {
        name: 'SMA',
        type: 'line',
        data: []
    }, {
        name: 'CMA',
        type: 'line',
        data: []
    }],
    chart: {
        type: 'line',
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
    stroke: {
        curve: 'smooth',
        width: [1, 2, 2]  // Width for candlestick, SMA, CMA
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
    },
    colors: ['#000', '#2563eb', '#7c3aed'],  // Colors for candlestick, SMA, CMA
    legend: {
        show: true,
        position: 'top'
    }
};

const realtimeOptions = {
    series: [{
        name: 'Volume',
        type: 'area',
        data: []
    }, {
        name: 'VMA',
        type: 'line',
        data: []
    }],
    chart: {
        type: 'line',
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
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: [2, 2]  // Width for volume and VMA
    },
    fill: {
        type: ['gradient', 'none'],  // Gradient for volume, none for VMA
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.3,
            opacityTo: 0.1,
            stops: [0, 100]
        }
    },
    colors: ['#3b82f6', '#ef4444'],  // Colors for volume and VMA
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
                if (val >= 1000000) {
                    return (val / 1000000).toFixed(1) + 'M';
                } else if (val >= 1000) {
                    return (val / 1000).toFixed(1) + 'K';
                }
                return val.toString();
            }
        }
    },
    legend: {
        show: true,
        position: 'top'
    }
};


// New configuration for dedicated moving averages chart
const movingAveragesOptions = {
    series: [{
        name: 'SMA',
        type: 'line',
        data: []
    }, {
        name: 'CMA',
        type: 'line',
        data: []
    }],
    chart: {
        type: 'line',
        height: 250,
        animations: {
            enabled: false
        },
        toolbar: {
            show: true,
            tools: {
                download: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true
            }
        },
        background: 'transparent'
    },
    stroke: {
        curve: 'smooth',
        width: [2, 2]
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
    colors: ['#2563eb', '#7c3aed'],
    legend: {
        show: true,
        position: 'top'
    },
    tooltip: {
        shared: true,
        intersect: false
    }
};

// Enhanced volume analysis chart configuration
const volumeAnalysisOptions = {
    series: [{
        name: 'Volume',
        type: 'bar',
        data: []
    }, {
        name: 'VMA',
        type: 'line',
        data: []
    }],
    chart: {
        type: 'bar',
        height: 250,
        stacked: false,
        toolbar: {
            show: true,
            tools: {
                download: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true
            }
        },
        background: 'transparent'
    },
    plotOptions: {
        bar: {
            columnWidth: '70%'
        }
    },
    stroke: {
        width: [0, 2]
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
    yaxis: [{
        seriesName: 'Volume',
        labels: {
            style: {
                colors: '#6b7280',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500
            },
            formatter: function(val) {
                if (val >= 1000000) {
                    return (val / 1000000).toFixed(1) + 'M';
                } else if (val >= 1000) {
                    return (val / 1000).toFixed(1) + 'K';
                }
                return val.toString();
            }
        }
    }, {
        opposite: true,
        seriesName: 'VMA',
        labels: {
            style: {
                colors: '#6b7280',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500
            },
            formatter: function(val) {
                if (val >= 1000000) {
                    return (val / 1000000).toFixed(1) + 'M';
                } else if (val >= 1000) {
                    return (val / 1000).toFixed(1) + 'K';
                }
                return val.toString();
            }
        }
    }],
    colors: ['#3b82f6', '#ef4444'],
    legend: {
        show: true,
        position: 'top'
    },
    tooltip: {
        shared: true,
        intersect: false
    }
};
