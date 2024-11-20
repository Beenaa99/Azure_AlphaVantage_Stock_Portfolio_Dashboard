class PortfolioChart {
    constructor(containerId) {
        this.chartOptions = {
            series: [{
                name: 'Portfolio Value',
                data: []
            }],
            chart: {
                type: 'area',
                height: 400,
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        selection: false,
                        zoom: false,
                        zoomin: true,
                        zoomout: true,
                        pan: false,
                    }
                },
                
   
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                }
            },
            dataLabels:
            {
                enabled:false
            },
            colors: ['#3b82f6'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.3,
                    stops: [0, 90, 100]
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            grid: {
                borderColor: '#e5e7eb',
                strokeDashArray: 4,
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                }
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
                    formatter: function(value) {
                        return utils.formatCurrency(value);
                    }
                }
            },
            tooltip: {
                x: {
                    format: 'MMM dd, yyyy'
                },
                y: {
                    formatter: function(value) {
                        return utils.formatCurrency(value);
                    }
                }
            }
        };

        this.chart = new ApexCharts(document.querySelector(containerId), this.chartOptions);
    }

    render() {
        this.chart.render();
    }

    updateData(data) {
        this.chart.updateSeries([{
            data: data
        }]);
    }

    resize() {
        this.chart.updateOptions({
            chart: {
                width: '100%'
            }
        });
    }
}