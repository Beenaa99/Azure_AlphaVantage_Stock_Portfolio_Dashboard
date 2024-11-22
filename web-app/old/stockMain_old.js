// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    // Initialize chart updater
    const chartUpdater = new ChartUpdater();
    chartUpdater.initializeCharts();
    
    chartUpdater.startRealtimeUpdates();

    // Handle time filter clicks
    document.querySelectorAll('.time-filter').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.time-filter').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            const period = button.textContent;
            let days;
            switch(period) {
                case '1D': days = 1; break;
                case '1W': days = 7; break;
                case '1M': days = 30; break;
                case '3M': days = 90; break;
                case '1Y': days = 365; break;
            }
            
            chartUpdater.updateHistoricalData(days);
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        chartUpdater.handleResize();
    });

    // Initialize tooltips
    const tooltips = {
        'Market Cap': 'Total value of all outstanding shares',
        'P/E Ratio': 'Price to Earnings Ratio - Stock price relative to earnings per share',
        'Beta': 'Measure of stock volatility compared to the market',
        'Volume': 'Number of shares traded today',
        'EPS': 'Earnings Per Share in the last 12 months'
    };

    document.querySelectorAll('.metric-row-label').forEach(label => {
        const text = label.textContent;
        if (tooltips[text]) {
            label.style.cursor = 'help';
            label.title = tooltips[text];
        }
    });

    // Format numbers in metrics
    document.querySelectorAll('.metric-value').forEach(metric => {
        const value = metric.textContent;
        if (value.startsWith('$')) {
            const number = parseFloat(value.slice(1));
            if (number >= 1e12) {
                metric.textContent = `$${(number / 1e12).toFixed(2)}T`;
            } else if (number >= 1e9) {
                metric.textContent = `$${(number / 1e9).toFixed(2)}B`;
            } else if (number >= 1e6) {
                metric.textContent = `$${(number / 1e6).toFixed(2)}M`;
            }
        }
    });
});