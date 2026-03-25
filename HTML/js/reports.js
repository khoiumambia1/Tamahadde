// Reports JavaScript

// Initialize date pickers when page loads
document.addEventListener('DOMContentLoaded', function() {
    initReportDatePickers();
    loadLedgersForSelector();
    loadSubGroupsForSelector(); // New: Load subgroups for filtering
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

// Load ledgers for selector
function loadLedgersForSelector() {
    const ledgerSelect = document.getElementById('ledger-select');
    if (!ledgerSelect) return;
    
    let options = '<option value="">-- Select Ledger --</option>';
    
    // Get all unique ledgers from transactions
    if (typeof transactions !== 'undefined' && transactions.length > 0) {
        const uniqueLedgers = [...new Set(transactions.map(t => t.ledger))];
        uniqueLedgers.sort().forEach(ledger => {
            options += `<option value="${ledger}">${ledger}</option>`;
        });
    }
    
    ledgerSelect.innerHTML = options;
}

// ==================== NEW SUBGROUP FUNCTIONS ====================

/**
 * Load subgroups into selector dropdown
 */
function loadSubGroupsForSelector() {
    const subgroupSelect = document.getElementById('subgroup-select');
    if (!subgroupSelect) return;
    
    let options = '<option value="">-- Select Subgroup --</option>';
    
    // Get all unique subgroups from transactions
    const uniqueSubGroups = [...new Set(transactions.map(t => t.subgroup).filter(Boolean))];
    
    uniqueSubGroups.sort().forEach(subgroup => {
        options += `<option value="${subgroup}">${subgroup}</option>`;
    });
    
    subgroupSelect.innerHTML = options;
}

/**
 * Get subgroup summary from transactions
 * @param {Array} transactionsList - Array of transactions
 * @returns {Object} Subgroup summary
 */
function getSubgroupSummary(transactionsList) {
    const summary = {};
    
    transactionsList.forEach(t => {
        if (t.subgroup) {
            if (!summary[t.subgroup]) {
                summary[t.subgroup] = {
                    count: 0,
                    total_debit: 0,
                    total_credit: 0,
                    net_amount: 0,
                    ledgers: new Set(),
                    transactions: []
                };
            }
            summary[t.subgroup].count++;
            summary[t.subgroup].total_debit += t.debit || 0;
            summary[t.subgroup].total_credit += t.credit || 0;
            summary[t.subgroup].net_amount += (t.debit || 0) - (t.credit || 0);
            if (t.ledger) summary[t.subgroup].ledgers.add(t.ledger);
            summary[t.subgroup].transactions.push(t);
        }
    });
    
    // Convert Sets to Arrays for JSON serialization
    Object.keys(summary).forEach(key => {
        summary[key].ledgers = Array.from(summary[key].ledgers);
    });
    
    return summary;
}

/**
 * Filter transactions by subgroup
 * @param {string} subgroup - Subgroup to filter by
 * @returns {Array} Filtered transactions
 */
function filterBySubgroup(subgroup) {
    if (!subgroup) return transactions;
    return transactions.filter(t => t.subgroup === subgroup);
}

/**
 * Generate subgroup report HTML
 * @param {Array} filteredTransactions - Transactions to display
 * @param {string} subgroupName - Subgroup name
 * @param {string} fromDate - From date
 * @param {string} toDate - To date
 * @returns {string} HTML report
 */
function generateSubgroupReport(filteredTransactions, subgroupName, fromDate, toDate) {
    if (filteredTransactions.length === 0) {
        return '<div class="loading">No transactions found for this subgroup</div>';
    }
    
    // Sort by date
    filteredTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let runningBalance = 0;
    let totalDebit = 0;
    let totalCredit = 0;
    
    let reportHTML = `
        <div class="report-header">
            <h2>Subgroup Report: ${subgroupName}</h2>
            <p>As of: ${formatDate(asOfDate)}</p>
        </div>
        
        <div class="subgroup-stats" style="background: var(--bg-color); padding: 1.5rem; border-radius: .5rem; margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem; color: var(--main-color);">Summary</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <div>
                    <strong>Total Transactions:</strong> ${filteredTransactions.length}
                </div>
                <div>
                    <strong>Unique Ledgers:</strong> ${new Set(filteredTransactions.map(t => t.ledger)).size}
                </div>
                <div>
                    <strong>Date Range:</strong> ${filteredTransactions[0]?.date || '-'} to ${filteredTransactions[filteredTransactions.length-1]?.date || '-'}
                </div>
            </div>
        </div>
        
        <table class="report-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Voucher</th>
                    <th>Ledger</th>
                    <th>Description</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    filteredTransactions.forEach(t => {
        runningBalance += (t.debit - t.credit);
        totalDebit += t.debit || 0;
        totalCredit += t.credit || 0;
        
        reportHTML += `
            <tr>
                <td>${t.date}</td>
                <td>${t.voucher || '-'}</td>
                <td>${t.ledger || '-'}</td>
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
                    <td colspan="4"><strong>Total</strong></td>
                    <td><strong>${totalDebit.toFixed(2)}</strong></td>
                    <td><strong>${totalCredit.toFixed(2)}</strong></td>
                    <td><strong>${runningBalance.toFixed(2)}</strong></td>
                </tr>
            </tfoot>
        </table>
    `;
    
    return reportHTML;
}

// ==================== NEW SUBGROUP REPORT FUNCTION ====================

/**
 * Load subgroup report
 */
function loadSubgroupReport() {
    const fromDate = document.getElementById('from-date')?.value;
    const toDate = document.getElementById('to-date')?.value;
    const selectedSubgroup = document.getElementById('subgroup-select')?.value;
    
    if (!selectedSubgroup) {
        alert('Please select a subgroup');
        return;
    }
    
    // Filter transactions for selected subgroup and date range
    let filteredTransactions = transactions.filter(t => t.subgroup === selectedSubgroup);
    
    if (fromDate) {
        filteredTransactions = filteredTransactions.filter(t => t.date >= fromDate);
    }
    if (toDate) {
        filteredTransactions = filteredTransactions.filter(t => t.date <= toDate);
    }
    
    const reportHTML = generateSubgroupReport(filteredTransactions, selectedSubgroup, fromDate, toDate);
    document.getElementById('report-content').innerHTML = reportHTML;
}

/**
 * Load all subgroups summary
 */
function loadAllSubgroupsSummary() {
    const fromDate = document.getElementById('from-date')?.value;
    const toDate = document.getElementById('to-date')?.value;
    
    // Filter transactions by date range
    let filteredTransactions = transactions;
    if (fromDate) {
        filteredTransactions = filteredTransactions.filter(t => t.date >= fromDate);
    }
    if (toDate) {
        filteredTransactions = filteredTransactions.filter(t => t.date <= toDate);
    }
    
    const subgroupSummary = getSubgroupSummary(filteredTransactions);
    
    if (Object.keys(subgroupSummary).length === 0) {
        document.getElementById('report-content').innerHTML = '<div class="loading">No subgroup transactions found</div>';
        return;
    }
    
    let reportHTML = `
        <div class="report-header">
            <h2>All Subgroups Summary</h2>
            <p>As of: ${formatDate(asOfDate)}</p>
        </div>
        
        <table class="report-table">
            <thead>
                <tr>
                    <th>Subgroup</th>
                    <th>Transactions</th>
                    <th>Ledgers</th>
                    <th>Total Debit</th>
                    <th>Total Credit</th>
                    <th>Net Balance</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    let grandTotalDebit = 0;
    let grandTotalCredit = 0;
    let grandTotalNet = 0;
    
    Object.keys(subgroupSummary).sort().forEach(subgroup => {
        const data = subgroupSummary[subgroup];
        grandTotalDebit += data.total_debit;
        grandTotalCredit += data.total_credit;
        grandTotalNet += data.net_amount;
        
        reportHTML += `
            <tr>
                <td><strong>${subgroup}</strong></td>
                <td>${data.count}</td>
                <td>${data.ledgers.length}</td>
                <td>${formatNumber(data.total_debit)}</td>
                <td>${formatNumber(data.total_credit)}</td>
                <td class="${data.net_amount >= 0 ? 'positive' : 'negative'}">${formatNumber(data.net_amount)}</td>
            </tr>
        `;
        
        // Show individual ledgers in this subgroup (optional - can be commented out if too detailed)
        if (data.ledgers.length > 0) {
            data.ledgers.sort().forEach(ledger => {
                const ledgerTransactions = data.transactions.filter(t => t.ledger === ledger);
                const ledgerDebit = ledgerTransactions.reduce((sum, t) => sum + (t.debit || 0), 0);
                const ledgerCredit = ledgerTransactions.reduce((sum, t) => sum + (t.credit || 0), 0);
                const ledgerNet = ledgerDebit - ledgerCredit;
                
                reportHTML += `
                    <tr style="background-color: #f8f9fa;">
                        <td style="padding-left: 3rem;">&nbsp;&nbsp;&nbsp;↳ ${ledger}</td>
                        <td>${ledgerTransactions.length}</td>
                        <td></td>
                        <td>${formatNumber(ledgerDebit)}</td>
                        <td>${formatNumber(ledgerCredit)}</td>
                        <td class="${ledgerNet >= 0 ? 'positive' : 'negative'}">${formatNumber(ledgerNet)}</td>
                    </tr>
                `;
            });
        }
    });
    
    reportHTML += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td><strong>Grand Total</strong></td>
                    <td><strong>${transactions.length}</strong></td>
                    <td><strong>${new Set(transactions.map(t => t.ledger)).size}</strong></td>
                    <td><strong>${formatNumber(grandTotalDebit)}</strong></td>
                    <td><strong>${formatNumber(grandTotalCredit)}</strong></td>
                    <td><strong class="${grandTotalNet >= 0 ? 'positive' : 'negative'}">${formatNumber(grandTotalNet)}</strong></td>
                </tr>
            </tfoot>
        </table>
    `;
    
    document.getElementById('report-content').innerHTML = reportHTML;
}

// ==================== EXISTING FUNCTIONS (UNCHANGED) ====================

// ==================== LEDGER REPORT WITHOUT OPENING BALANCE ====================
function loadLedgerReport() {
    const asOfDate = document.getElementById('as-of-date')?.value;
    const selectedLedger = document.getElementById('ledger-select')?.value;
    
    if (!selectedLedger) {
        alert('Please select a ledger');
        return;
    }
    
    if (!asOfDate) {
        alert('Please select a date');
        return;
    }
    
    // Ensure transactions exists
    if (typeof transactions === 'undefined' || transactions.length === 0) {
        document.getElementById('report-content').innerHTML = '<div class="loading">No transactions found</div>';
        return;
    }
    
    // Get all transactions for this ledger up to asOfDate
    const allLedgerTransactions = transactions.filter(t => t.ledger === selectedLedger && t.date <= asOfDate);
    
    if (allLedgerTransactions.length === 0) {
        document.getElementById('report-content').innerHTML = '<div class="loading">No transactions found for this ledger up to this date</div>';
        return;
    }
    
    // Sort by date
    allLedgerTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Get custom subgroups
    const customSubGroups = window.customSubGroups || [];
    
    // Create subgroup label map
    const subgroupLabelMap = {};
    
    // Add predefined subgroups
    Object.keys(ledgerSubGroups).forEach(type => {
        ledgerSubGroups[type].forEach(group => {
            subgroupLabelMap[group.value] = group.label;
        });
    });
    
    // Add custom subgroups
    customSubGroups.forEach(group => {
        subgroupLabelMap[group.value] = group.label;
    });
    
    // Calculate running balance
    let runningBalance = 0;
    let totalDebit = 0;
    let totalCredit = 0;
    
    // Generate report HTML
    let reportHTML = `
        <div class="report-header">
            <h2>${selectedLedger} Ledger</h2>
            <p>As of: ${formatDate(asOfDate)}</p>
        </div>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Voucher</th>
                    <th>Description</th>
                    <th>Sub Group</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Balance</th>
                 </tr>
            </thead>
            <tbody>
    `;
    
    allLedgerTransactions.forEach(t => {
        // Calculate running balance for this transaction
        runningBalance += (t.debit || 0) - (t.credit || 0);
        
        // Add to totals
        totalDebit += t.debit || 0;
        totalCredit += t.credit || 0;
        
        // Get subgroup display
        let subgroupDisplay = '-';
        if (t.subgroup && t.subgroup !== '') {
            subgroupDisplay = subgroupLabelMap[t.subgroup] || t.subgroup.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
        
        // Get narration or description
        let description = t.narration || '-';
        if (t.bank_name) {
            description = `${t.bank_name}${t.account_number ? ` (${t.account_number})` : ''} - ${description}`;
        }
        
        reportHTML += `
            <tr>
                <td>${t.date}</td>
                <td>${t.voucher || '-'}</td>
                <td>${description}</td>
                <td>${subgroupDisplay !== '-' ? `<span class="subgroup-badge">${subgroupDisplay}</span>` : '-'}</td>
                <td style="color: #28a745; font-weight: ${t.debit > 0 ? 'bold' : 'normal'};">${t.debit > 0 ? t.debit.toFixed(2) : '-'}</td>
                <td style="color: #dc3545; font-weight: ${t.credit > 0 ? 'bold' : 'normal'};">${t.credit > 0 ? t.credit.toFixed(2) : '-'}</td>
                <td style="font-weight: bold;">${runningBalance.toFixed(2)}</td>
            </tr>
        `;
    });
    
    reportHTML += `
            </tbody>
            <tfoot>
                <tr class="total-row" style="background: #e8e8e8; font-weight: bold;">
                    <td colspan="4"><strong>Total</strong></td>
                    <td><strong>${totalDebit.toFixed(2)}</strong></td>
                    <td><strong>${totalCredit.toFixed(2)}</strong></td>
                    <td><strong>${runningBalance.toFixed(2)}</strong></td>
                </tr>
            </tfoot>
        </table>
        
        <div class="report-summary" style="margin-top: 2rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
            <div class="summary-item" style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: .5rem;">
                <div class="label" style="font-size: 1.2rem; color: #666;">Total Debit</div>
                <div class="value" style="font-size: 2rem; font-weight: bold; color: #28a745;">${totalDebit.toFixed(2)}</div>
            </div>
            <div class="summary-item" style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: .5rem;">
                <div class="label" style="font-size: 1.2rem; color: #666;">Total Credit</div>
                <div class="value" style="font-size: 2rem; font-weight: bold; color: #dc3545;">${totalCredit.toFixed(2)}</div>
            </div>
            <div class="summary-item" style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: .5rem;">
                <div class="label" style="font-size: 1.2rem; color: #666;">Closing Balance</div>
                <div class="value" style="font-size: 2rem; font-weight: bold; color: ${runningBalance >= 0 ? '#28a745' : '#dc3545'};">${runningBalance.toFixed(2)}</div>
            </div>
        </div>
        
        <div style="margin-top: 1.5rem; padding: 1rem; background: #e3f2fd; border-radius: .5rem; font-size: 1.2rem; text-align: center;">
            <i class="fas fa-info-circle"></i> 
            Showing ${allLedgerTransactions.length} transaction(s) up to ${formatDate(asOfDate)}
        </div>
    `;
    
    document.getElementById('report-content').innerHTML = reportHTML;
}

// ==================== TRIAL BALANCE USING CLOSING BALANCES ====================
function loadTrialBalance() {
    const asOfDate = document.getElementById('as-of-date')?.value;
    
    if (!asOfDate) {
        alert('Please select a date');
        return;
    }
    
    if (typeof transactions === 'undefined' || transactions.length === 0) {
        document.getElementById('report-content').innerHTML = '<div class="loading">No transactions found</div>';
        return;
    }
    
    // Get all transactions up to asOfDate
    const filteredTransactions = transactions.filter(t => t.date <= asOfDate);
    
    if (filteredTransactions.length === 0) {
        document.getElementById('report-content').innerHTML = '<div class="loading">No transactions found up to this date</div>';
        return;
    }
    
    // Calculate closing balance for each ledger
    const ledgerBalances = {};
    
    filteredTransactions.forEach(t => {
        const ledgerName = t.ledger;
        const amount = (t.debit || 0) - (t.credit || 0);
        
        if (!ledgerBalances[ledgerName]) {
            ledgerBalances[ledgerName] = {
                debit: 0,
                credit: 0,
                balance: 0
            };
        }
        
        // Update running balance
        ledgerBalances[ledgerName].balance += amount;
    });
    
    // Separate ledgers into debit and credit balances
    const debitBalances = [];
    const creditBalances = [];
    
    Object.keys(ledgerBalances).sort().forEach(ledger => {
        const balance = ledgerBalances[ledger].balance;
        
        if (balance > 0) {
            debitBalances.push({
                ledger: ledger,
                amount: balance
            });
        } else if (balance < 0) {
            creditBalances.push({
                ledger: ledger,
                amount: Math.abs(balance)
            });
        }
    });
    
    // Calculate totals
    let totalDebit = 0;
    let totalCredit = 0;
    
    debitBalances.forEach(item => {
        totalDebit += item.amount;
    });
    
    creditBalances.forEach(item => {
        totalCredit += item.amount;
    });
    
    // Get custom subgroups for display
    const customSubGroups = window.customSubGroups || [];
    const subgroupLabelMap = {};
    
    // Add predefined subgroups
    Object.keys(ledgerSubGroups).forEach(type => {
        ledgerSubGroups[type].forEach(group => {
            subgroupLabelMap[group.value] = group.label;
        });
    });
    
    // Add custom subgroups
    customSubGroups.forEach(group => {
        subgroupLabelMap[group.value] = group.label;
    });
    
    // Generate report HTML
    let reportHTML = `
        <div class="report-header">
            <h2>Trial Balance</h2>
            <p>As of: ${formatDate(asOfDate)}</p>
            <p style="font-size: 1.2rem; color: #666; margin-top: 0.5rem;">
                <i class="fas fa-info-circle"></i> 
                Based on closing balances from ${filteredTransactions.length} transaction(s)
            </p>
        </div>
        
        <table class="report-table">
            <thead>
                <tr>
                    <th style="width: 50%;">Ledger Account</th>
                    <th style="width: 25%; text-align: right;">Debit Balance</th>
                    <th style="width: 25%; text-align: right;">Credit Balance</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // Show all ledgers with debit balances
    debitBalances.forEach(item => {
        reportHTML += `
            <tr>
                <td style="padding: 0.8rem;">${item.ledger}</td>
                <td style="padding: 0.8rem; text-align: right; color: #28a745; font-weight: bold;">${item.amount.toFixed(2)}</td>
                <td style="padding: 0.8rem; text-align: right;">-</td>
            </tr>
        `;
    });
    
    // Show all ledgers with credit balances
    creditBalances.forEach(item => {
        reportHTML += `
            <tr>
                <td style="padding: 0.8rem;">${item.ledger}</td>
                <td style="padding: 0.8rem; text-align: right;">-</td>
                <td style="padding: 0.8rem; text-align: right; color: #dc3545; font-weight: bold;">${item.amount.toFixed(2)}</td>
            </tr>
        `;
    });
    
    // If no transactions
    if (debitBalances.length === 0 && creditBalances.length === 0) {
        reportHTML += `
            <tr>
                <td colspan="3" style="text-align: center; padding: 2rem; color: var(--light-color);">
                    No balances found
                </td>
            </tr>
        `;
    }
    
    reportHTML += `
            </tbody>
            <tfoot>
                <tr class="total-row" style="background: #e8e8e8; font-weight: bold;">
                    <td style="padding: 1rem;"><strong>Total</strong></td>
                    <td style="padding: 1rem; text-align: right;"><strong>${totalDebit.toFixed(2)}</strong></td>
                    <td style="padding: 1rem; text-align: right;"><strong>${totalCredit.toFixed(2)}</strong></td>
                </tr>
            </tfoot>
        </table>
    `;
    
    // Check if trial balance is balanced
    const difference = Math.abs(totalDebit - totalCredit);
    
    if (difference > 0.01) {
        reportHTML += `
            <div class="alert-warning" style="margin-top: 2rem; padding: 1.5rem; background: #fff3cd; color: #856404; border: 1px solid #ffeeba; border-radius: .5rem; display: flex; align-items: center; gap: 1rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem;"></i>
                <div>
                    <strong>Warning:</strong> Trial balance does not balance! 
                    Difference: ${difference.toFixed(2)} 
                    (Debit: ${totalDebit.toFixed(2)} vs Credit: ${totalCredit.toFixed(2)})
                </div>
            </div>
        `;
    } else {
        reportHTML += `
            <div class="alert-success" style="margin-top: 2rem; padding: 1.5rem; background: #d4edda; color: #155724; border: 1px solid #c3e6cb; border-radius: .5rem; display: flex; align-items: center; gap: 1rem;">
                <i class="fas fa-check-circle" style="font-size: 2rem;"></i>
                <div>
                    <strong>Balanced:</strong> Debits (${totalDebit.toFixed(2)}) = Credits (${totalCredit.toFixed(2)})
                </div>
            </div>
        `;
    }
    
    // Add summary cards
    reportHTML += `
        <div class="report-summary" style="margin-top: 2rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
            <div class="summary-item" style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: .5rem;">
                <div class="label" style="font-size: 1.2rem; color: #666;">Total Ledgers</div>
                <div class="value" style="font-size: 2rem; font-weight: bold;">${debitBalances.length + creditBalances.length}</div>
            </div>
            <div class="summary-item" style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: .5rem;">
                <div class="label" style="font-size: 1.2rem; color: #666;">Debit Balances</div>
                <div class="value" style="font-size: 2rem; font-weight: bold; color: #28a745;">${debitBalances.length}</div>
            </div>
            <div class="summary-item" style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: .5rem;">
                <div class="label" style="font-size: 1.2rem; color: #666;">Credit Balances</div>
                <div class="value" style="font-size: 2rem; font-weight: bold; color: #dc3545;">${creditBalances.length}</div>
            </div>
        </div>
    `;
    
    document.getElementById('report-content').innerHTML = reportHTML;
}

// ==================== PROFIT & LOSS REPORT (SUBGROUP BASED) ====================
function loadProfitLoss() {
    const asOfDate = document.getElementById('as-of-date')?.value;

    if (!asOfDate) {
        alert('Please select a date');
        return;
    }

    if (typeof transactions === 'undefined' || transactions.length === 0) {
        document.getElementById('report-content').innerHTML = '<div class="loading">No transactions found</div>';
        return;
    }

    // Filter transactions up to asOfDate
    const filteredTransactions = transactions.filter(t => t.date <= asOfDate);

    if (filteredTransactions.length === 0) {
        document.getElementById('report-content').innerHTML = '<div class="loading">No transactions for selected date</div>';
        return;
    }

    // Get custom subgroups
    const customSubGroups = window.customSubGroups || [];

    // Create maps for subgroup labels
    const subgroupLabelMap = {};
    
    // Add predefined subgroups
    Object.keys(ledgerSubGroups).forEach(type => {
        ledgerSubGroups[type].forEach(group => {
            subgroupLabelMap[group.value] = group.label;
        });
    });
    
    // Add custom subgroups
    customSubGroups.forEach(group => {
        subgroupLabelMap[group.value] = group.label;
    });

    // Organize income by subgroup
    const incomeBySubgroup = {};
    // Organize expenses by subgroup
    const expenseBySubgroup = {};

    let totalIncome = 0;
    let totalExpense = 0;

    // Process each transaction
    filteredTransactions.forEach(t => {
        // Find ledger info to determine if income/expense
        const ledgerInfo = ledgers ? ledgers.find(l => l.name === t.ledger) : null;
        if (!ledgerInfo) return;

        // Process income transactions (credit entries in income accounts)
        if (ledgerInfo.type === 'income' && t.credit > 0) {
            const amount = t.credit || 0;
            const subgroup = t.subgroup || 'other_income';
            
            if (!incomeBySubgroup[subgroup]) {
                incomeBySubgroup[subgroup] = {
                    label: subgroupLabelMap[subgroup] || subgroup.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    ledgers: {},
                    total: 0
                };
            }
            
            // Track by ledger within subgroup
            if (!incomeBySubgroup[subgroup].ledgers[t.ledger]) {
                incomeBySubgroup[subgroup].ledgers[t.ledger] = 0;
            }
            incomeBySubgroup[subgroup].ledgers[t.ledger] += amount;
            incomeBySubgroup[subgroup].total += amount;
            totalIncome += amount;
        }
        
        // Process expense transactions (debit entries in expense accounts)
        else if (ledgerInfo.type === 'expense' && t.debit > 0) {
            const amount = t.debit || 0;
            const subgroup = t.subgroup || 'other_expense';
            
            if (!expenseBySubgroup[subgroup]) {
                expenseBySubgroup[subgroup] = {
                    label: subgroupLabelMap[subgroup] || subgroup.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    ledgers: {},
                    total: 0
                };
            }
            
            // Track by ledger within subgroup
            if (!expenseBySubgroup[subgroup].ledgers[t.ledger]) {
                expenseBySubgroup[subgroup].ledgers[t.ledger] = 0;
            }
            expenseBySubgroup[subgroup].ledgers[t.ledger] += amount;
            expenseBySubgroup[subgroup].total += amount;
            totalExpense += amount;
        }
    });

    const netProfit = totalIncome - totalExpense;

    // Generate report HTML
    let html = `
        <div class="report-header">
            <h2 style="font-size: 2.4rem; color: var(--black); margin-bottom: 0.5rem;">Profit & Loss Statement</h2>
            <p style="font-size: 1.4rem; color: var(--light-color); margin-bottom: 2rem;">As of: ${formatDate(asOfDate)}</p>
        </div>
    `;

    // ========== INCOME SECTION ==========
    html += `
        <h3 class="section-title">INCOME</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th style="width: 70%;">Particulars</th>
                    <th style="width: 30%; text-align: right;">Amount (${formatNumber(totalIncome)})</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Sort income subgroups alphabetically
    const sortedIncomeSubgroups = Object.keys(incomeBySubgroup).sort();

    sortedIncomeSubgroups.forEach(subgroupKey => {
        const subgroup = incomeBySubgroup[subgroupKey];
        html += `
            <tr class="group-header">
                <td style="padding: 0.8rem; border-bottom: 1px solid #ddd;"><strong>${subgroup.label}</strong></td>
                <td style="padding: 0.8rem; text-align: right; border-bottom: 1px solid #ddd;"><strong>${formatNumber(subgroup.total)}</strong></td>
            </tr>
        `;

        // Show individual ledgers in this subgroup
        Object.keys(subgroup.ledgers).sort().forEach(ledger => {
            if (Math.abs(subgroup.ledgers[ledger]) > 0.01) {
                html += `
                    <tr class="ledger-row">
                        <td style="padding: 0.5rem 0.5rem 0.5rem 4rem; border-bottom: 1px dotted #eee;">${ledger}</td>
                        <td style="padding: 0.5rem; text-align: right; border-bottom: 1px dotted #eee;">${formatNumber(subgroup.ledgers[ledger])}</td>
                    </tr>
                `;
            }
        });
    });

    // If no income, show message
    if (sortedIncomeSubgroups.length === 0) {
        html += `
            <tr>
                <td colspan="2" style="text-align: center; padding: 2rem; color: var(--light-color);">No income transactions found</td>
            </tr>
        `;
    }

    html += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td style="padding: 1rem; text-align: left;"><strong>Total Income</strong></td>
                    <td style="padding: 1rem; text-align: right;"><strong>${formatNumber(totalIncome)}</strong></td>
                </tr>
            </tfoot>
        </table>
    `;

    // ========== EXPENSE SECTION ==========
    html += `
        <h3 class="section-title" style="margin-top: 3rem;">EXPENSES</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th style="width: 70%;">Particulars</th>
                    <th style="width: 30%; text-align: right;">Amount (${formatNumber(totalExpense)})</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Sort expense subgroups alphabetically
    const sortedExpenseSubgroups = Object.keys(expenseBySubgroup).sort();

    sortedExpenseSubgroups.forEach(subgroupKey => {
        const subgroup = expenseBySubgroup[subgroupKey];
        html += `
            <tr class="group-header">
                <td style="padding: 0.8rem; border-bottom: 1px solid #ddd;"><strong>${subgroup.label}</strong></td>
                <td style="padding: 0.8rem; text-align: right; border-bottom: 1px solid #ddd;"><strong>${formatNumber(subgroup.total)}</strong></td>
            </tr>
        `;

        // Show individual ledgers in this subgroup
        Object.keys(subgroup.ledgers).sort().forEach(ledger => {
            if (Math.abs(subgroup.ledgers[ledger]) > 0.01) {
                html += `
                    <tr class="ledger-row">
                        <td style="padding: 0.5rem 0.5rem 0.5rem 4rem; border-bottom: 1px dotted #eee;">${ledger}</td>
                        <td style="padding: 0.5rem; text-align: right; border-bottom: 1px dotted #eee;">${formatNumber(subgroup.ledgers[ledger])}</td>
                    </tr>
                `;
            }
        });
    });

    // If no expenses, show message
    if (sortedExpenseSubgroups.length === 0) {
        html += `
            <tr>
                <td colspan="2" style="text-align: center; padding: 2rem; color: var(--light-color);">No expense transactions found</td>
            </tr>
        `;
    }

    html += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td style="padding: 1rem; text-align: left;"><strong>Total Expenses</strong></td>
                    <td style="padding: 1rem; text-align: right;"><strong>${formatNumber(totalExpense)}</strong></td>
                </tr>
            </tfoot>
        </table>
    `;

    // ========== NET PROFIT/LOSS SECTION ==========
    html += `
        <h3 class="section-title" style="margin-top: 3rem;">NET ${netProfit >= 0 ? 'PROFIT' : 'LOSS'}</h3>
        <table class="report-table">
            <tbody>
                <tr class="grand-total-row">
                    <td style="padding: 1.5rem; text-align: left; width: 70%;"><strong>Net ${netProfit >= 0 ? 'Profit' : 'Loss'}</strong></td>
                    <td style="padding: 1.5rem; text-align: right; width: 30%;"><strong>${formatNumber(Math.abs(netProfit))}</strong></td>
                </tr>
            </tbody>
        </table>
    `;

    // ========== SUMMARY SECTION ==========
    html += `
        <div class="report-summary">
            <div class="summary-item">
                <div class="label">Total Income</div>
                <div class="value positive">${formatNumber(totalIncome)}</div>
            </div>
            <div class="summary-item">
                <div class="label">Total Expenses</div>
                <div class="value negative">${formatNumber(totalExpense)}</div>
            </div>
            <div class="summary-item">
                <div class="label">Gross Margin</div>
                <div class="value ${totalIncome - totalExpense >= 0 ? 'positive' : 'negative'}">${formatNumber(totalIncome - totalExpense)}</div>
            </div>
            <div class="summary-item">
                <div class="label">Net ${netProfit >= 0 ? 'Profit' : 'Loss'}</div>
                <div class="value ${netProfit >= 0 ? 'positive' : 'negative'}">${formatNumber(Math.abs(netProfit))}</div>
            </div>
        </div>
    `;

    // Add status message
    if (netProfit > 0) {
        html += `
            <div class="alert-success">
                <i class="fas fa-chart-line" style="font-size: 2rem;"></i>
                <div>
                    <strong>Profitable:</strong> Your business has generated a profit of ${formatNumber(netProfit)}
                </div>
            </div>
        `;
    } else if (netProfit < 0) {
        html += `
            <div class="alert-warning">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem;"></i>
                <div>
                    <strong>Loss:</strong> Your business has incurred a loss of ${formatNumber(Math.abs(netProfit))}
                </div>
            </div>
        `;
    } else {
        html += `
            <div class="alert-success">
                <i class="fas fa-balance-scale" style="font-size: 2rem;"></i>
                <div>
                    <strong>Break-even:</strong> Income equals expenses
                </div>
            </div>
        `;
    }

    document.getElementById('report-content').innerHTML = html;
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
// Helper function to format numbers
function formatNumber(num) {
    if (num === undefined || num === null || isNaN(num)) return '0.00';
    return Number(num).toFixed(2);
}

// ==================== BALANCE SHEET REPORT (SUBGROUP BASED) ====================
function loadBalanceSheet() {
    const asOfDate = document.getElementById('as-of-date')?.value;
    
    if (!asOfDate) {
        alert('Please select a date');
        return;
    }
    
    if (typeof transactions === 'undefined' || transactions.length === 0) {
        document.getElementById('report-content').innerHTML = '<div class="loading">No transactions found</div>';
        return;
    }
    
    // Filter transactions up to asOfDate
    const filteredTransactions = transactions.filter(t => t.date <= asOfDate);
    
    if (filteredTransactions.length === 0) {
        document.getElementById('report-content').innerHTML = '<div class="loading">No transactions found up to this date</div>';
        return;
    }

    // Get custom subgroups
    const customSubGroups = window.customSubGroups || [];

    // Create maps for subgroup labels
    const subgroupLabelMap = {};
    
    // Add predefined subgroups
    Object.keys(ledgerSubGroups).forEach(type => {
        ledgerSubGroups[type].forEach(group => {
            subgroupLabelMap[group.value] = group.label;
        });
    });
    
    // Add custom subgroups
    customSubGroups.forEach(group => {
        subgroupLabelMap[group.value] = group.label;
    });

    // Organize assets by subgroup
    const assetsBySubgroup = {};
    // Organize liabilities by subgroup
    const liabilitiesBySubgroup = {};
    // Organize equity by subgroup
    const equityBySubgroup = {};

    let totalAssets = 0;
    let totalLiabilities = 0;
    let totalEquity = 0;
    let retainedEarnings = 0;

    // Process each transaction
    filteredTransactions.forEach(t => {
        // Find ledger info
        const ledgerInfo = ledgers ? ledgers.find(l => l.name === t.ledger) : null;
        if (!ledgerInfo) return;
        
        // Calculate net effect
        const balance = (t.debit || 0) - (t.credit || 0);
        
        // Process based on ledger type
        if (ledgerInfo.type === 'asset') {
            const assetBalance = balance;
            const subgroup = t.subgroup || 'other_asset';
            
            if (!assetsBySubgroup[subgroup]) {
                assetsBySubgroup[subgroup] = {
                    label: subgroupLabelMap[subgroup] || subgroup.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    ledgers: {},
                    total: 0
                };
            }
            
            if (!assetsBySubgroup[subgroup].ledgers[ledgerInfo.name]) {
                assetsBySubgroup[subgroup].ledgers[ledgerInfo.name] = 0;
            }
            assetsBySubgroup[subgroup].ledgers[ledgerInfo.name] += assetBalance;
            assetsBySubgroup[subgroup].total += assetBalance;
            totalAssets += assetBalance;
        } 
        else if (ledgerInfo.type === 'liability') {
            const liabilityBalance = -(balance);
            const subgroup = t.subgroup || 'other_liability';
            
            if (!liabilitiesBySubgroup[subgroup]) {
                liabilitiesBySubgroup[subgroup] = {
                    label: subgroupLabelMap[subgroup] || subgroup.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    ledgers: {},
                    total: 0
                };
            }
            
            if (!liabilitiesBySubgroup[subgroup].ledgers[ledgerInfo.name]) {
                liabilitiesBySubgroup[subgroup].ledgers[ledgerInfo.name] = 0;
            }
            liabilitiesBySubgroup[subgroup].ledgers[ledgerInfo.name] += liabilityBalance;
            liabilitiesBySubgroup[subgroup].total += liabilityBalance;
            totalLiabilities += liabilityBalance;
        } 
        else if (ledgerInfo.type === 'equity') {
            const equityBalance = -(balance);
            const subgroup = t.subgroup || 'other_equity';
            
            if (!equityBySubgroup[subgroup]) {
                equityBySubgroup[subgroup] = {
                    label: subgroupLabelMap[subgroup] || subgroup.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    ledgers: {},
                    total: 0
                };
            }
            
            if (!equityBySubgroup[subgroup].ledgers[ledgerInfo.name]) {
                equityBySubgroup[subgroup].ledgers[ledgerInfo.name] = 0;
            }
            equityBySubgroup[subgroup].ledgers[ledgerInfo.name] += equityBalance;
            equityBySubgroup[subgroup].total += equityBalance;
            totalEquity += equityBalance;
        }
        else if (ledgerInfo.type === 'income') {
            // Income increases retained earnings
            const incomeAmount = t.credit || 0;
            retainedEarnings += incomeAmount;
        }
        else if (ledgerInfo.type === 'expense') {
            // Expenses decrease retained earnings
            const expenseAmount = t.debit || 0;
            retainedEarnings -= expenseAmount;
        }
    });

    // Add retained earnings to equity (as a separate subgroup or under existing)
    if (Math.abs(retainedEarnings) > 0.01) {
        const subgroup = 'retained_earnings';
        if (!equityBySubgroup[subgroup]) {
            equityBySubgroup[subgroup] = {
                label: 'Retained Earnings',
                ledgers: {},
                total: 0
            };
        }
        equityBySubgroup[subgroup].ledgers['Retained Earnings'] = retainedEarnings;
        equityBySubgroup[subgroup].total += retainedEarnings;
        totalEquity += retainedEarnings;
    }

    // Generate report HTML
    let reportHTML = `
        <div class="report-header">
            <h2>Balance Sheet</h2>
            <p>As of: ${formatDate(asOfDate)}</p>
        </div>
    `;

    // ========== ASSETS SECTION ==========
    reportHTML += `
        <h3 class="section-title">ASSETS</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th style="width: 70%;">Particulars</th>
                    <th style="width: 30%; text-align: right;">Amount (${formatNumber(totalAssets)})</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Sort asset subgroups alphabetically
    const sortedAssetSubgroups = Object.keys(assetsBySubgroup).sort();

    sortedAssetSubgroups.forEach(subgroupKey => {
        const subgroup = assetsBySubgroup[subgroupKey];
        reportHTML += `
            <tr class="group-header">
                <td style="padding: 0.8rem; border-bottom: 1px solid #ddd;"><strong>${subgroup.label}</strong></td>
                <td style="padding: 0.8rem; text-align: right; border-bottom: 1px solid #ddd;"><strong>${formatNumber(subgroup.total)}</strong></td>
            </tr>
        `;

        // Show individual ledgers in this subgroup
        Object.keys(subgroup.ledgers).sort().forEach(ledger => {
            if (Math.abs(subgroup.ledgers[ledger]) > 0.01) {
                reportHTML += `
                    <tr class="ledger-row">
                        <td style="padding: 0.5rem 0.5rem 0.5rem 4rem; border-bottom: 1px dotted #eee;">${ledger}</td>
                        <td style="padding: 0.5rem; text-align: right; border-bottom: 1px dotted #eee;">${formatNumber(subgroup.ledgers[ledger])}</td>
                    </tr>
                `;
            }
        });
    });

    // If no assets, show message
    if (sortedAssetSubgroups.length === 0) {
        reportHTML += `
            <tr>
                <td colspan="2" style="text-align: center; padding: 2rem; color: var(--light-color);">No assets found</td>
            </tr>
        `;
    }

    reportHTML += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td style="padding: 1rem; text-align: left;"><strong>Total Assets</strong></td>
                    <td style="padding: 1rem; text-align: right;"><strong>${formatNumber(totalAssets)}</strong></td>
                </tr>
            </tfoot>
        </table>
    `;

    // ========== LIABILITIES SECTION ==========
    reportHTML += `
        <h3 class="section-title" style="margin-top: 3rem;">LIABILITIES</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th style="width: 70%;">Particulars</th>
                    <th style="width: 30%; text-align: right;">Amount (${formatNumber(totalLiabilities)})</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Sort liability subgroups alphabetically
    const sortedLiabilitySubgroups = Object.keys(liabilitiesBySubgroup).sort();

    sortedLiabilitySubgroups.forEach(subgroupKey => {
        const subgroup = liabilitiesBySubgroup[subgroupKey];
        reportHTML += `
            <tr class="group-header">
                <td style="padding: 0.8rem; border-bottom: 1px solid #ddd;"><strong>${subgroup.label}</strong></td>
                <td style="padding: 0.8rem; text-align: right; border-bottom: 1px solid #ddd;"><strong>${formatNumber(subgroup.total)}</strong></td>
            </tr>
        `;

        // Show individual ledgers in this subgroup
        Object.keys(subgroup.ledgers).sort().forEach(ledger => {
            if (Math.abs(subgroup.ledgers[ledger]) > 0.01) {
                reportHTML += `
                    <tr class="ledger-row">
                        <td style="padding: 0.5rem 0.5rem 0.5rem 4rem; border-bottom: 1px dotted #eee;">${ledger}</td>
                        <td style="padding: 0.5rem; text-align: right; border-bottom: 1px dotted #eee;">${formatNumber(subgroup.ledgers[ledger])}</td>
                    </tr>
                `;
            }
        });
    });

    // If no liabilities, show message
    if (sortedLiabilitySubgroups.length === 0) {
        reportHTML += `
            <tr>
                <td colspan="2" style="text-align: center; padding: 2rem; color: var(--light-color);">No liabilities found</td>
            </tr>
        `;
    }

    reportHTML += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td style="padding: 1rem; text-align: left;"><strong>Total Liabilities</strong></td>
                    <td style="padding: 1rem; text-align: right;"><strong>${formatNumber(totalLiabilities)}</strong></td>
                </tr>
            </tfoot>
        </table>
    `;

    // ========== EQUITY SECTION ==========
    reportHTML += `
        <h3 class="section-title" style="margin-top: 3rem;">EQUITY</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th style="width: 70%;">Particulars</th>
                    <th style="width: 30%; text-align: right;">Amount (${formatNumber(totalEquity)})</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Sort equity subgroups alphabetically
    const sortedEquitySubgroups = Object.keys(equityBySubgroup).sort();

    sortedEquitySubgroups.forEach(subgroupKey => {
        const subgroup = equityBySubgroup[subgroupKey];
        reportHTML += `
            <tr class="group-header">
                <td style="padding: 0.8rem; border-bottom: 1px solid #ddd;"><strong>${subgroup.label}</strong></td>
                <td style="padding: 0.8rem; text-align: right; border-bottom: 1px solid #ddd;"><strong>${formatNumber(subgroup.total)}</strong></td>
            </tr>
        `;

        // Show individual ledgers in this subgroup
        Object.keys(subgroup.ledgers).sort().forEach(ledger => {
            if (Math.abs(subgroup.ledgers[ledger]) > 0.01) {
                reportHTML += `
                    <tr class="ledger-row">
                        <td style="padding: 0.5rem 0.5rem 0.5rem 4rem; border-bottom: 1px dotted #eee;">${ledger}</td>
                        <td style="padding: 0.5rem; text-align: right; border-bottom: 1px dotted #eee;">${formatNumber(subgroup.ledgers[ledger])}</td>
                    </tr>
                `;
            }
        });
    });

    // If no equity, show message
    if (sortedEquitySubgroups.length === 0) {
        reportHTML += `
            <tr>
                <td colspan="2" style="text-align: center; padding: 2rem; color: var(--light-color);">No equity found</td>
            </tr>
        `;
    }

    reportHTML += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td style="padding: 1rem; text-align: left;"><strong>Total Equity</strong></td>
                    <td style="padding: 1rem; text-align: right;"><strong>${formatNumber(totalEquity)}</strong></td>
                </tr>
            </tfoot>
        </table>
    `;

    // ========== SUMMARY ==========
    const totalLiabilitiesEquity = totalLiabilities + totalEquity;
    const difference = Math.abs(totalAssets - totalLiabilitiesEquity);

    reportHTML += `
        <div class="report-summary">
            <div class="summary-item">
                <div class="label">Total Assets</div>
                <div class="value ${totalAssets >= 0 ? 'positive' : 'negative'}">${formatNumber(totalAssets)}</div>
            </div>
            <div class="summary-item">
                <div class="label">Total Liabilities</div>
                <div class="value ${totalLiabilities >= 0 ? 'positive' : 'negative'}">${formatNumber(totalLiabilities)}</div>
            </div>
            <div class="summary-item">
                <div class="label">Total Equity</div>
                <div class="value ${totalEquity >= 0 ? 'positive' : 'negative'}">${formatNumber(totalEquity)}</div>
            </div>
            <div class="summary-item">
                <div class="label">Liabilities + Equity</div>
                <div class="value ${totalLiabilitiesEquity >= 0 ? 'positive' : 'negative'}">${formatNumber(totalLiabilitiesEquity)}</div>
            </div>
        </div>
    `;

    // Check if balance sheet balances
    if (difference > 0.01) {
        reportHTML += `
            <div class="alert-warning">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem;"></i>
                <div>
                    <strong>Warning:</strong> Balance sheet does not balance! Difference: ${formatNumber(difference)}
                </div>
            </div>
        `;
    } else {
        reportHTML += `
            <div class="alert-success">
                <i class="fas fa-check-circle" style="font-size: 2rem;"></i>
                <div>
                    <strong>Balanced:</strong> Assets = Liabilities + Equity
                </div>
            </div>
        `;
    }

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

// ==================== NEW EXPORT FUNCTIONS FOR SUBGROUP ====================

window.loadSubgroupReport = loadSubgroupReport;
window.loadAllSubgroupsSummary = loadAllSubgroupsSummary;
window.getSubgroupSummary = getSubgroupSummary;
window.filterBySubgroup = filterBySubgroup;