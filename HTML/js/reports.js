// Reports JavaScript

// Initialize date pickers when page loads
document.addEventListener('DOMContentLoaded', function() {
    initReportDatePickers();
    loadLedgersForSelector();
});

function initReportDatePickers() {
    flatpickr(".date-picker", {
        dateFormat: "Y-m-d",
        defaultDate: "today",
        allowInput: true,
        altInput: true,
        altFormat: "F j, Y"
    });
}

function loadLedgersForSelector() {
    const ledgerSelect = document.getElementById('ledger-select');
    if (!ledgerSelect) return;
    
    let options = '<option value="">-- Select Ledger --</option>';
    
    // Get all unique ledgers from transactions
    const uniqueLedgers = [...new Set(transactions.map(t => t.ledger))];
    
    uniqueLedgers.sort().forEach(ledger => {
        options += `<option value="${ledger}">${ledger}</option>`;
    });
    
    ledgerSelect.innerHTML = options;
}

function loadLedgerReport() {
    const fromDate = document.getElementById('from-date')?.value;
    const toDate = document.getElementById('to-date')?.value;
    const selectedLedger = document.getElementById('ledger-select')?.value;
    
    if (!selectedLedger) {
        alert('Please select a ledger');
        return;
    }
    
    // Filter transactions for selected ledger and date range
    let filteredTransactions = transactions.filter(t => t.ledger === selectedLedger);
    
    if (fromDate) {
        filteredTransactions = filteredTransactions.filter(t => t.date >= fromDate);
    }
    if (toDate) {
        filteredTransactions = filteredTransactions.filter(t => t.date <= toDate);
    }
    
    if (filteredTransactions.length === 0) {
        document.getElementById('report-content').innerHTML = '<div class="loading">No transactions found for this period</div>';
        return;
    }
    
    // Sort by date
    filteredTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Calculate opening balance (all transactions before fromDate)
    let openingBalance = 0;
    if (fromDate) {
        const previousTransactions = transactions.filter(t => 
            t.ledger === selectedLedger && t.date < fromDate
        );
        previousTransactions.forEach(t => {
            openingBalance += (t.debit - t.credit);
        });
    }
    
    // Generate report HTML
    let reportHTML = `
        <div class="report-header">
            <h2>${selectedLedger} Ledger</h2>
            <p>Period: ${fromDate || 'Start'} to ${toDate || 'Today'}</p>
        </div>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Voucher</th>
                    <th>Description</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    let runningBalance = openingBalance;
    let totalDebit = 0;
    let totalCredit = 0;
    
    // Show opening balance row
    if (fromDate) {
        reportHTML += `
            <tr>
                <td colspan="3"><strong>Opening Balance</strong></td>
                <td></td>
                <td></td>
                <td><strong>${openingBalance.toFixed(2)}</strong></td>
            </tr>
        `;
    }
    
    filteredTransactions.forEach(t => {
        runningBalance += (t.debit - t.credit);
        totalDebit += t.debit;
        totalCredit += t.credit;
        
        reportHTML += `
            <tr>
                <td>${t.date}</td>
                <td>${t.voucher}</td>
                <td>${t.narration || '-'}</td>
                <td>${t.debit > 0 ? t.debit.toFixed(2) : '-'}</td>
                <td>${t.credit > 0 ? t.credit.toFixed(2) : '-'}</td>
                <td>${runningBalance.toFixed(2)}</td>
            </tr>
        `;
    });
    
    reportHTML += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td colspan="3"><strong>Total</strong></td>
                    <td><strong>${totalDebit.toFixed(2)}</strong></td>
                    <td><strong>${totalCredit.toFixed(2)}</strong></td>
                    <td><strong>${runningBalance.toFixed(2)}</strong></td>
                </tr>
            </tfoot>
        </table>
        
        <div class="report-summary">
            <div class="summary-item">
                <div class="label">Opening Balance</div>
                <div class="value">${openingBalance.toFixed(2)}</div>
            </div>
            <div class="summary-item">
                <div class="label">Total Debit</div>
                <div class="value">${totalDebit.toFixed(2)}</div>
            </div>
            <div class="summary-item">
                <div class="label">Total Credit</div>
                <div class="value">${totalCredit.toFixed(2)}</div>
            </div>
            <div class="summary-item">
                <div class="label">Closing Balance</div>
                <div class="value ${runningBalance >= 0 ? 'positive' : 'negative'}">${runningBalance.toFixed(2)}</div>
            </div>
        </div>
    `;
    
    document.getElementById('report-content').innerHTML = reportHTML;
}

function loadTrialBalance() {
    const asOfDate = document.getElementById('as-of-date')?.value;
    
    if (!asOfDate) {
        alert('Please select a date');
        return;
    }
    
    // Filter transactions up to asOfDate
    const filteredTransactions = transactions.filter(t => t.date <= asOfDate);
    
    if (filteredTransactions.length === 0) {
        document.getElementById('report-content').innerHTML = '<div class="loading">No transactions found</div>';
        return;
    }
    
    // Calculate balances for each ledger
    const balances = {};
    filteredTransactions.forEach(t => {
        if (!balances[t.ledger]) {
            balances[t.ledger] = { debit: 0, credit: 0 };
        }
        balances[t.ledger].debit += t.debit;
        balances[t.ledger].credit += t.credit;
    });
    
    let totalDebit = 0;
    let totalCredit = 0;
    let reportHTML = `
        <div class="report-header">
            <h2>Trial Balance</h2>
            <p>As of: ${asOfDate}</p>
        </div>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Ledger</th>
                    <th>Debit</th>
                    <th>Credit</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    Object.keys(balances).sort().forEach(ledger => {
        const balance = balances[ledger].debit - balances[ledger].credit;
        totalDebit += balances[ledger].debit;
        totalCredit += balances[ledger].credit;
        
        reportHTML += `
            <tr>
                <td>${ledger}</td>
                <td>${balances[ledger].debit > 0 ? balances[ledger].debit.toFixed(2) : '-'}</td>
                <td>${balances[ledger].credit > 0 ? balances[ledger].credit.toFixed(2) : '-'}</td>
            </tr>
        `;
    });
    
    reportHTML += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td><strong>Total</strong></td>
                    <td><strong>${totalDebit.toFixed(2)}</strong></td>
                    <td><strong>${totalCredit.toFixed(2)}</strong></td>
                </tr>
            </tfoot>
        </table>
    `;
    
    if (Math.abs(totalDebit - totalCredit) > 0.01) {
        reportHTML += `
            <div class="report-summary">
                <div class="summary-item">
                    <div class="label">Difference</div>
                    <div class="value negative">${(totalDebit - totalCredit).toFixed(2)}</div>
                </div>
            </div>
        `;
    }
    
    document.getElementById('report-content').innerHTML = reportHTML;
}

function loadProfitLoss() {
    const fromDate = document.getElementById('from-date')?.value;
    const toDate = document.getElementById('to-date')?.value;
    
    if (!fromDate || !toDate) {
        alert('Please select from and to dates');
        return;
    }
    
    // Filter transactions for date range
    const filteredTransactions = transactions.filter(t => 
        t.date >= fromDate && t.date <= toDate
    );
    
    if (filteredTransactions.length === 0) {
        document.getElementById('report-content').innerHTML = '<div class="loading">No transactions found for this period</div>';
        return;
    }
    
    // Calculate income and expenses
    let totalIncome = 0;
    let totalExpenses = 0;
    const incomeDetails = {};
    const expenseDetails = {};
    
    filteredTransactions.forEach(t => {
        const ledgerInfo = ledgers.find(l => l.name === t.ledger);
        
        if (ledgerInfo?.type === 'income' || t.type === 'receipt') {
            totalIncome += t.credit;
            incomeDetails[t.ledger] = (incomeDetails[t.ledger] || 0) + t.credit;
        } else if (ledgerInfo?.type === 'expense' || t.type === 'payment') {
            totalExpenses += t.debit;
            expenseDetails[t.ledger] = (expenseDetails[t.ledger] || 0) + t.debit;
        }
    });
    
    const netProfit = totalIncome - totalExpenses;
    
    let reportHTML = `
        <div class="report-header">
            <h2>Profit & Loss Statement</h2>
            <p>Period: ${fromDate} to ${toDate}</p>
        </div>
        
        <h3>Income</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Particulars</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    Object.keys(incomeDetails).sort().forEach(ledger => {
        reportHTML += `
            <tr>
                <td>${ledger}</td>
                <td>${incomeDetails[ledger].toFixed(2)}</td>
            </tr>
        `;
    });
    
    reportHTML += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td><strong>Total Income</strong></td>
                    <td><strong>${totalIncome.toFixed(2)}</strong></td>
                </tr>
            </tfoot>
        </table>
        
        <h3 style="margin-top: 2rem;">Expenses</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Particulars</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    Object.keys(expenseDetails).sort().forEach(ledger => {
        reportHTML += `
            <tr>
                <td>${ledger}</td>
                <td>${expenseDetails[ledger].toFixed(2)}</td>
            </tr>
        `;
    });
    
    reportHTML += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td><strong>Total Expenses</strong></td>
                    <td><strong>${totalExpenses.toFixed(2)}</strong></td>
                </tr>
            </tfoot>
        </table>
        
        <div class="report-summary">
            <div class="summary-item">
                <div class="label">Net Profit/Loss</div>
                <div class="value ${netProfit >= 0 ? 'positive' : 'negative'}">${netProfit.toFixed(2)}</div>
            </div>
        </div>
    `;
    
    document.getElementById('report-content').innerHTML = reportHTML;
}

function loadBalanceSheet() {
    const asOfDate = document.getElementById('as-of-date')?.value;
    
    if (!asOfDate) {
        alert('Please select a date');
        return;
    }
    
    // Filter transactions up to asOfDate
    const filteredTransactions = transactions.filter(t => t.date <= asOfDate);
    
    if (filteredTransactions.length === 0) {
        document.getElementById('report-content').innerHTML = '<div class="loading">No transactions found</div>';
        return;
    }
    
    // Calculate balances by account type
    const balances = {
        assets: {},
        liabilities: {},
        equity: {}
    };
    
    let totalAssets = 0;
    let totalLiabilities = 0;
    let totalEquity = 0;
    
    filteredTransactions.forEach(t => {
        const ledgerInfo = ledgers.find(l => l.name === t.ledger);
        if (!ledgerInfo) return;
        
        const balance = t.debit - t.credit;
        
        if (ledgerInfo.type === 'asset') {
            balances.assets[t.ledger] = (balances.assets[t.ledger] || 0) + balance;
            totalAssets += balance;
        } else if (ledgerInfo.type === 'liability') {
            balances.liabilities[t.ledger] = (balances.liabilities[t.ledger] || 0) - balance;
            totalLiabilities -= balance;
        } else if (ledgerInfo.type === 'equity') {
            balances.equity[t.ledger] = (balances.equity[t.ledger] || 0) - balance;
            totalEquity -= balance;
        }
    });
    
    let reportHTML = `
        <div class="report-header">
            <h2>Balance Sheet</h2>
            <p>As of: ${asOfDate}</p>
        </div>
        
        <h3>Assets</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Particulars</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    Object.keys(balances.assets).sort().forEach(asset => {
        if (balances.assets[asset] !== 0) {
            reportHTML += `
                <tr>
                    <td>${asset}</td>
                    <td>${balances.assets[asset].toFixed(2)}</td>
                </tr>
            `;
        }
    });
    
    reportHTML += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td><strong>Total Assets</strong></td>
                    <td><strong>${totalAssets.toFixed(2)}</strong></td>
                </tr>
            </tfoot>
        </table>
        
        <h3 style="margin-top: 2rem;">Liabilities</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Particulars</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    Object.keys(balances.liabilities).sort().forEach(liability => {
        if (balances.liabilities[liability] !== 0) {
            reportHTML += `
                <tr>
                    <td>${liability}</td>
                    <td>${balances.liabilities[liability].toFixed(2)}</td>
                </tr>
            `;
        }
    });
    
    reportHTML += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td><strong>Total Liabilities</strong></td>
                    <td><strong>${totalLiabilities.toFixed(2)}</strong></td>
                </tr>
            </tfoot>
        </table>
        
        <h3 style="margin-top: 2rem;">Equity</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Particulars</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    Object.keys(balances.equity).sort().forEach(equity => {
        if (balances.equity[equity] !== 0) {
            reportHTML += `
                <tr>
                    <td>${equity}</td>
                    <td>${balances.equity[equity].toFixed(2)}</td>
                </tr>
            `;
        }
    });
    
    reportHTML += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td><strong>Total Equity</strong></td>
                    <td><strong>${totalEquity.toFixed(2)}</strong></td>
                </tr>
            </tfoot>
        </table>
        
        <div class="report-summary">
            <div class="summary-item">
                <div class="label">Total Assets</div>
                <div class="value">${totalAssets.toFixed(2)}</div>
            </div>
            <div class="summary-item">
                <div class="label">Total Liabilities + Equity</div>
                <div class="value">${(totalLiabilities + totalEquity).toFixed(2)}</div>
            </div>
        </div>
    `;
    
    document.getElementById('report-content').innerHTML = reportHTML;
}

// Utility functions
function printReport() {
    window.print();
}

function exportToPDF() {
    // Use browser's print to PDF
    window.print();
}

function exportToExcel() {
    const reportContent = document.getElementById('report-content').innerHTML;
    const blob = new Blob([reportContent], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.xls';
    a.click();
    window.URL.revokeObjectURL(url);
}