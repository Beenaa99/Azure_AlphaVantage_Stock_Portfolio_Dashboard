document.addEventListener('DOMContentLoaded', () => {
    // Get the stock symbol from the URL
    const pathSegments = window.location.pathname.split('/');
    const stockSymbol = pathSegments[pathSegments.length - 1].toUpperCase();
    
    // Initialize chart updater
    const chartUpdater = new ChartUpdater();
    chartUpdater.initializeCharts();

    // Connect to WebSocket
    const socket = io("http://127.0.0.1:5000");

    socket.on("connect", () => {
        console.log("Connected to WebSocket server");
        // Join the room for this specific stock
        socket.emit('join', { symbol: stockSymbol });
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
        // Leave the room when disconnecting
        socket.emit('leave', { symbol: stockSymbol });
    });

    socket.on("stock_update", (data) => {
        console.log("Received stock update:", data);
        // Update stock name and company name
        updateStockInfo(stockSymbol);
        // Update charts and other data
        chartUpdater.handleIncomingData(data);
    });

    // Handle time filter clicks
    document.querySelectorAll('.time-filter').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.time-filter').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            const period = button.textContent;
            let days;
            switch (period) {
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
        if (chartUpdater && typeof chartUpdater.handleResize === 'function') {
            chartUpdater.handleResize();
        } else {
            console.error("chartUpdater.handleResize is not defined!");
        }
    });
});

// Helper function to update stock info
function updateStockInfo(symbol) {
    const companyNames = {
        'AAPL': 'Apple Inc.',
        'NVDA': 'NVIDIA Corporation',
        'AMD': 'Advanced Micro Devices, Inc.',
        'TSLA': 'Tesla, Inc.'
    };

    document.querySelector('.stock-name').textContent = symbol;
    document.querySelector('.stock-company').textContent = companyNames[symbol];
}