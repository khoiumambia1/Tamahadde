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
    
    // Get all unique ledgers from transactions (global transactions variable)
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
    
    // Access ledgers from global scope
    const ledgers = window.ledgers || [];
    
    // Define P&L groups directly in the function to ensure they're available
    const pnlGroups = {
        income: [
            { value: 'operating_revenue', label: 'Operating Revenue' },
            { value: 'other_income', label: 'Other Income' },
            { value: 'interest_income', label: 'Interest Income' },
            { value: 'commission', label: 'Commission' }
        ],
        expense: [
            { value: 'operating_expenses', label: 'Operating Expenses' },
            { value: 'administrative', label: 'Administrative Expenses' },
            { value: 'selling_distribution', label: 'Selling & Distribution' },
            { value: 'financial_charges', label: 'Financial Charges' },
            { value: 'depreciation', label: 'Depreciation' },
            { value: 'staff_cost', label: 'Staff Cost' },
            { value: 'rent_utilities', label: 'Rent & Utilities' },
            { value: 'marketing', label: 'Marketing & Advertising' },
            { value: 'travel_conveyance', label: 'Travel & Conveyance' },
            { value: 'office_expenses', label: 'Office Expenses' },
            { value: 'professional_fees', label: 'Professional Fees' },
            { value: 'repairs_maintenance', label: 'Repairs & Maintenance' },
            { value: 'insurance', label: 'Insurance' },
            { value: 'taxes', label: 'Taxes' },
            { value: 'miscellaneous', label: 'Miscellaneous' }
        ]
    };
    
    // Group income by P&L groups
    const incomeByGroup = {};
    const expenseByGroup = {};
    let ungroupedIncome = 0;
    let ungroupedExpenses = 0;
    
    filteredTransactions.forEach(t => {
        // Find ledger info
        const ledgerInfo = ledgers.find(l => l.name.toLowerCase() === t.ledger.toLowerCase());
        
        // Determine if this is income or expense based on transaction type and ledger type
        const isIncome = (t.type === 'receipt' && t.credit > 0) || 
                        (ledgerInfo?.type === 'income') ||
                        (t.entry_type === 'receipt') ||
                        (t.debit === 0 && t.credit > 0 && t.type === 'receipt');
        
        const isExpense = (t.type === 'payment' && t.debit > 0) || 
                         (ledgerInfo?.type === 'expense') ||
                         (t.entry_type === 'payment') ||
                         (t.debit > 0 && t.credit === 0 && t.type === 'payment');
        
        if (isIncome) {
            const amount = t.credit || t.debit || 0;
            
            if (ledgerInfo?.group) {
                if (!incomeByGroup[ledgerInfo.group]) {
                    const groupLabel = pnlGroups.income.find(g => g.value === ledgerInfo.group)?.label || ledgerInfo.group;
                    incomeByGroup[ledgerInfo.group] = {
                        label: groupLabel,
                        total: 0,
                        ledgers: []
                    };
                }
                incomeByGroup[ledgerInfo.group].total += amount;
                incomeByGroup[ledgerInfo.group].ledgers.push({
                    name: t.ledger,
                    amount: amount
                });
            } else {
                ungroupedIncome += amount;
            }
        } else if (isExpense) {
            const amount = t.debit || t.credit || 0;
            
            if (ledgerInfo?.group) {
                if (!expenseByGroup[ledgerInfo.group]) {
                    const groupLabel = pnlGroups.expense.find(g => g.value === ledgerInfo.group)?.label || ledgerInfo.group;
                    expenseByGroup[ledgerInfo.group] = {
                        label: groupLabel,
                        total: 0,
                        ledgers: []
                    };
                }
                expenseByGroup[ledgerInfo.group].total += amount;
                expenseByGroup[ledgerInfo.group].ledgers.push({
                    name: t.ledger,
                    amount: amount
                });
            } else {
                ungroupedExpenses += amount;
            }
        }
    });
    
    let totalIncome = ungroupedIncome;
    let totalExpenses = ungroupedExpenses;
    
    let reportHTML = `
        <div class="report-header">
            <h2>Profit & Loss Statement</h2>
            <p>Period: ${formatDate(fromDate)} to ${formatDate(toDate)}</p>
        </div>
    `;
    
    // INCOME SECTION WITH GROUPS
    reportHTML += `
        <h3 style="margin-top: 2rem;">Income</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Particulars</th>
                    <th style="text-align: right;">Amount</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // Calculate total from groups
    let groupedIncomeTotal = 0;
    
    // Show grouped income
    Object.keys(incomeByGroup).sort().forEach(groupKey => {
        const group = incomeByGroup[groupKey];
        groupedIncomeTotal += group.total;
        
        reportHTML += `
            <tr style="background-color: #f8f9fa; font-weight: bold;">
                <td>${group.label}</td>
                <td style="text-align: right;">${formatNumber(group.total)}</td>
            </tr>
        `;
        
        // Show individual ledgers in this group (indented)
        group.ledgers.sort((a, b) => a.name.localeCompare(b.name)).forEach(ledger => {
            reportHTML += `
                <tr>
                    <td style="padding-left: 3rem;">&nbsp;&nbsp;&nbsp;↳ ${ledger.name}</td>
                    <td style="text-align: right;">${formatNumber(ledger.amount)}</td>
                </tr>
            `;
        });
    });
    
    // Show ungrouped income
    if (ungroupedIncome > 0) {
        reportHTML += `
            <tr style="background-color: #f8f9fa; font-weight: bold;">
                <td>Other Income (Ungrouped)</td>
                <td style="text-align: right;">${formatNumber(ungroupedIncome)}</td>
            </tr>
        `;
    }
    
    totalIncome = groupedIncomeTotal + ungroupedIncome;
    
    reportHTML += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td><strong>Total Income</strong></td>
                    <td style="text-align: right;"><strong>${formatNumber(totalIncome)}</strong></td>
                </tr>
            </tfoot>
        </table>
    `;
    
    // EXPENSE SECTION WITH GROUPS
    reportHTML += `
        <h3 style="margin-top: 3rem;">Expenses</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Particulars</th>
                    <th style="text-align: right;">Amount</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // Calculate total from groups
    let groupedExpenseTotal = 0;
    
    // Show grouped expenses
    Object.keys(expenseByGroup).sort().forEach(groupKey => {
        const group = expenseByGroup[groupKey];
        groupedExpenseTotal += group.total;
        
        reportHTML += `
            <tr style="background-color: #f8f9fa; font-weight: bold;">
                <td>${group.label}</td>
                <td style="text-align: right;">${formatNumber(group.total)}</td>
            </tr>
        `;
        
        // Show individual ledgers in this group (indented)
        group.ledgers.sort((a, b) => a.name.localeCompare(b.name)).forEach(ledger => {
            reportHTML += `
                <tr>
                    <td style="padding-left: 3rem;">&nbsp;&nbsp;&nbsp;↳ ${ledger.name}</td>
                    <td style="text-align: right;">${formatNumber(ledger.amount)}</td>
                </tr>
            `;
        });
    });
    
    // Show ungrouped expenses
    if (ungroupedExpenses > 0) {
        reportHTML += `
            <tr style="background-color: #f8f9fa; font-weight: bold;">
                <td>Other Expenses (Ungrouped)</td>
                <td style="text-align: right;">${formatNumber(ungroupedExpenses)}</td>
            </tr>
        `;
    }
    
    totalExpenses = groupedExpenseTotal + ungroupedExpenses;
    
    reportHTML += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td><strong>Total Expenses</strong></td>
                    <td style="text-align: right;"><strong>${formatNumber(totalExpenses)}</strong></td>
                </tr>
            </tfoot>
        </table>
    `;
    
    const netProfit = totalIncome - totalExpenses;
    
    reportHTML += `
        <div class="report-summary" style="margin-top: 3rem;">
            <div class="summary-item" style="background-color: ${netProfit >= 0 ? '#d4edda' : '#f8d7da'};">
                <div class="label" style="font-size: 1.6rem;">Net Profit/Loss</div>
                <div class="value ${netProfit >= 0 ? 'positive' : 'negative'}" style="font-size: 2.4rem; font-weight: bold;">
                    ${formatNumber(Math.abs(netProfit))}
                    <span style="font-size: 1.4rem; margin-left: 1rem;">${netProfit >= 0 ? 'Profit' : 'Loss'}</span>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('report-content').innerHTML = reportHTML;
}

// Helper function to format numbers
function formatNumber(num) {
    if (num === undefined || num === null || isNaN(num)) return '-';
    return Number(num).toFixed(2);
}

// Helper function to format dates
function formatDate(dateString) {
    if (!dateString) return '-';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } catch (e) {
        return dateString;
    }
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
        // Access ledgers from global scope
        const ledgerInfo = window.ledgers ? window.ledgers.find(l => l.name === t.ledger) : null;
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