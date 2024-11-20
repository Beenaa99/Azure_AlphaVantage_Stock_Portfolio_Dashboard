document.addEventListener('DOMContentLoaded', () => {
    // Initialize portfolio data
    const portfolio = new PortfolioData();
    const portfolioChart = new PortfolioChart('#portfolioChart');
    
    // Render initial chart
    portfolioChart.render();
    portfolioChart.updateData(portfolio.historicalData);

    function createStockCard(stock) {
        const marketValue = stock.currentPrice * stock.shares;
        const totalReturn = marketValue - (stock.avgPrice * stock.shares);
        const totalReturnPercentage = (totalReturn / (stock.avgPrice * stock.shares)) * 100;

        return `
            <div class="stock-card" onclick="window.location.href='/stock.html?symbol=${stock.symbol}'">
                <div class="stock-card-header">
                    <div class="stock-info">
                        <h3>${stock.symbol}</h3>
                        <div class="company-name">${stock.companyName}</div>
                    </div>
                    <div class="stock-price">
                        <div class="current-price">${utils.formatCurrency(stock.currentPrice)}</div>
                        <div class="price-change ${utils.getChangeClass(stock.dayChange)}">
                            ${utils.formatChangeValue(stock.dayChange)}%
                        </div>
                    </div>
                </div>
                <div class="stock-metrics">
                    <div class="metric">
                        <span class="label">Market Value</span>
                        <span class="value">${utils.formatCurrency(marketValue)}</span>
                    </div>
                    <div class="metric">
                        <span class="label">Total Return</span>
                        <span class="value ${utils.getChangeClass(totalReturn)}">
                            ${utils.formatChangeValue(totalReturnPercentage)}%
                        </span>
                    </div>
                    <div class="metric">
                        <span class="label">Shares</span>
                        <span class="value">${stock.shares}</span>
                    </div>
                    <div class="metric">
                        <span class="label">Avg Cost</span>
                        <span class="value">${utils.formatCurrency(stock.avgPrice)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    function updatePortfolioTable() {
        const tableBody = document.getElementById('portfolio-table-body');
        tableBody.innerHTML = portfolio.stocks.map(stock => {
            const marketValue = stock.currentPrice * stock.shares;
            const totalReturn = marketValue - (stock.avgPrice * stock.shares);
            const totalReturnPercentage = (totalReturn / (stock.avgPrice * stock.shares)) * 100;
            const todayChange = marketValue * (stock.dayChange / 100);

            return `
                <tr onclick="window.location.href='/stock.html?symbol=${stock.symbol}'" style="cursor: pointer;">
                    <td>
                        <div style="font-weight: 500;">${stock.symbol}</div>
                        <div style="font-size: 0.875em; color: #6b7280;">${stock.companyName}</div>
                    </td>
                    <td>${stock.shares}</td>
                    <td>${utils.formatCurrency(stock.avgPrice)}</td>
                    <td>${utils.formatCurrency(stock.currentPrice)}</td>
                    <td>${utils.formatCurrency(marketValue)}</td>
                    <td class="${utils.getChangeClass(todayChange)}">
                        ${utils.formatCurrency(todayChange)}
                        (${utils.formatChangeValue(stock.dayChange)}%)
                    </td>
                    <td class="${utils.getChangeClass(totalReturn)}">
                        ${utils.formatCurrency(totalReturn)}
                        (${utils.formatChangeValue(totalReturnPercentage)}%)
                    </td>
                </tr>
            `;
        }).join('');
    }

    function updateSummaryMetrics() {
        const summary = portfolio.getPortfolioSummary();
        
        // Update header metrics
        document.querySelector('.total-value .value').textContent = 
            utils.formatCurrency(summary.totalValue);
        
        const dailyChangeElement = document.querySelector('.daily-change .value');
        dailyChangeElement.textContent = 
            `${utils.formatCurrency(summary.todayChange)} (${utils.formatChangeValue(summary.todayChangePercentage)}%)`;
        dailyChangeElement.className = `value ${utils.getChangeClass(summary.todayChange)}`;

        // Update table header metrics
        document.querySelector('.table-metrics .metric:first-child .value').textContent = 
            utils.formatCurrency(summary.totalCost);
        
        const totalReturnElement = document.querySelector('.table-metrics .metric:last-child .value');
        totalReturnElement.textContent = utils.formatChangeValue(summary.totalReturnPercentage) + '%';
        totalReturnElement.className = `value ${utils.getChangeClass(summary.totalReturnPercentage)}`;
    }

    // Initial render
    document.querySelector('.stock-grid').innerHTML = 
        portfolio.stocks.map(stock => createStockCard(stock)).join('');
    updatePortfolioTable();
    updateSummaryMetrics();

    // Handle real-time updates
    setInterval(() => {
        const updates = portfolio.simulateRealtimeUpdate();
        
        // Update chart
        portfolioChart.updateData(updates.historicalData);
        
        // Update stock cards
        document.querySelector('.stock-grid').innerHTML = 
            updates.stocks.map(stock => createStockCard(stock)).join('');
        
        // Update table
        updatePortfolioTable();
        
        // Update summary metrics
        updateSummaryMetrics();
        
        // Update last updated timestamp
        utils.updateLastUpdated();
    }, 5000);

    // Handle window resize
    window.addEventListener('resize', () => {
        portfolioChart.resize();
    });
});