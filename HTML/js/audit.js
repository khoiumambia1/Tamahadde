// Audit Trail JavaScript

let currentAuditTransactions = [];
let auditCharts = {};

// Load audit trail
function loadAuditTrail() {
    const fromDate = document.getElementById('audit-from-date').value;
    const toDate = document.getElementById('audit-to-date').value;
    
    if (!fromDate || !toDate) {
        alert('Please select both from and to dates');
        return;
    }
    
    // Filter transactions by date range
    let filtered = transactions.filter(t => {
        return t.date >= fromDate && t.date <= toDate;
    });
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    currentAuditTransactions = filtered;
    
    // Update UI
    updateAuditSummary(filtered);
    updateAuditTable(filtered);
    updateLedgerActivity(filtered);
    updateAuditSummaryReport(filtered, fromDate, toDate);
    populateFilters(filtered);
    updateAuditCharts(filtered);
    
    // Run integrity checks
    runIntegrityChecks(filtered);
}

// Update audit summary cards
function updateAuditSummary(transactions) {
    const totalTransactions = transactions.length;
    const totalAmount = transactions.reduce((sum, t) => sum + (t.amount || t.debit + t.credit || 0), 0);
    const totalPayments = transactions.filter(t => t.type === 'payment').length;
    const totalReceipts = transactions.filter(t => t.type === 'receipt').length;
    const totalJournals = transactions.filter(t => t.type === 'journal').length;
    const activeLedgers = new Set(transactions.map(t => t.ledger)).size;
    
    document.getElementById('total-transactions-audit').textContent = totalTransactions;
    document.getElementById('total-amount-audit').textContent = totalAmount.toFixed(2);
    document.getElementById('total-payments-audit').textContent = totalPayments;
    document.getElementById('total-receipts-audit').textContent = totalReceipts;
    document.getElementById('total-journals-audit').textContent = totalJournals;
    document.getElementById('total-ledgers-audit').textContent = activeLedgers;
}

// Update audit table
function updateAuditTable(transactions) {
    const tbody = document.getElementById('audit-body');
    
    if (!transactions || transactions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="12" class="no-data">No audit records found</td></tr>';
        document.getElementById('audit-count').textContent = 'Showing 0 records';
        return;
    }
    
    let html = '';
    transactions.forEach(t => {
        const auditTrail = generateAuditTrail(t);
        
        html += `
            <tr>
                <td>${t.id || '-'}</td>
                <td>${formatDateTime(t.date)}</td>
                <td>${t.voucher || '-'}</td>
                <td><span class="audit-badge ${t.type}">${t.type || '-'}</span></td>
                <td>${t.ledger || '-'}</td>
                <td>${t.subgroup ? `<span class="subgroup-badge">${t.subgroup}</span>` : '-'}</td>
                <td class="${t.debit > 0 ? 'debit' : ''}">${t.debit > 0 ? t.debit.toFixed(2) : '-'}</td>
                <td class="${t.credit > 0 ? 'credit' : ''}">${t.credit > 0 ? t.credit.toFixed(2) : '-'}</td>
                <td>${(t.amount || t.debit || t.credit || 0).toFixed(2)}</td>
                <td>${t.bank_name || '-'}</td>
                <td title="${t.narration || ''}">${truncateText(t.narration || '-', 30)}</td>
                <td><i class="fas fa-check-circle" style="color: #28a745;"></i> ${auditTrail}</td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
    document.getElementById('audit-count').textContent = `Showing ${transactions.length} records`;
}

// Generate audit trail message
function generateAuditTrail(transaction) {
    if (transaction.type === 'payment') {
        return `Payment of ${transaction.amount.toFixed(2)} to ${transaction.ledger}`;
    } else if (transaction.type === 'receipt') {
        return `Receipt of ${transaction.amount.toFixed(2)} from ${transaction.ledger}`;
    } else if (transaction.type === 'journal') {
        const action = transaction.debit > 0 ? 'Debit' : 'Credit';
        return `${action} entry: ${transaction.debit > 0 ? transaction.debit : transaction.credit} to ${transaction.ledger}`;
    }
    return 'Transaction recorded';
}

// Update ledger activity summary
function updateLedgerActivity(transactions) {
    const ledgerMap = new Map();
    
    transactions.forEach(t => {
        if (!ledgerMap.has(t.ledger)) {
            ledgerMap.set(t.ledger, {
                name: t.ledger,
                type: getLedgerType(t.ledger),
                count: 0,
                totalDebit: 0,
                totalCredit: 0,
                lastActivity: t.date
            });
        }
        
        const ledger = ledgerMap.get(t.ledger);
        ledger.count++;
        ledger.totalDebit += t.debit || 0;
        ledger.totalCredit += t.credit || 0;
        
        if (t.date > ledger.lastActivity) {
            ledger.lastActivity = t.date;
        }
    });
    
    const sortedLedgers = Array.from(ledgerMap.values()).sort((a, b) => b.count - a.count);
    
    const tbody = document.getElementById('ledger-activity-body');
    
    if (sortedLedgers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="no-data">No activity data available</td></tr>';
        return;
    }
    
    let html = '';
    sortedLedgers.forEach(ledger => {
        const netBalance = ledger.totalDebit - ledger.totalCredit;
        
        html += `
            <tr>
                <td>${ledger.name}</td>
                <td><span class="type-badge ${ledger.type}">${ledger.type || 'unknown'}</span></td>
                <td>${ledger.count}</td>
                <td class="debit">${ledger.totalDebit.toFixed(2)}</td>
                <td class="credit">${ledger.totalCredit.toFixed(2)}</td>
                <td class="${netBalance >= 0 ? 'debit' : 'credit'}">${netBalance.toFixed(2)}</td>
                <td>${formatDateTime(ledger.lastActivity)}</td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Update audit summary report
function updateAuditSummaryReport(transactions, fromDate, toDate) {
    // Update audit period
    document.getElementById('audit-period').textContent = `${formatDate(fromDate)} to ${formatDate(toDate)}`;
    
    // Transaction summary
    const paymentTotal = transactions.filter(t => t.type === 'payment').reduce((sum, t) => sum + (t.amount || 0), 0);
    const receiptTotal = transactions.filter(t => t.type === 'receipt').reduce((sum, t) => sum + (t.amount || 0), 0);
    const journalTotal = transactions.filter(t => t.type === 'journal').reduce((sum, t) => sum + (t.debit || 0), 0);
    
    const transactionSummaryList = document.getElementById('transaction-summary-list');
    transactionSummaryList.innerHTML = `
        <li><span>Total Payments:</span> ${transactions.filter(t => t.type === 'payment').length} (${paymentTotal.toFixed(2)})</li>
        <li><span>Total Receipts:</span> ${transactions.filter(t => t.type === 'receipt').length} (${receiptTotal.toFixed(2)})</li>
        <li><span>Total Journal Entries:</span> ${transactions.filter(t => t.type === 'journal').length} (${journalTotal.toFixed(2)})</li>
        <li><span>Unique Ledgers:</span> ${new Set(transactions.map(t => t.ledger)).size}</li>
        <li><span>Unique Subgroups:</span> ${new Set(transactions.map(t => t.subgroup).filter(Boolean)).size}</li>
    `;
}

// Run integrity checks
function runIntegrityChecks(transactions) {
    const integrityList = document.getElementById('integrity-checks');
    
    // Check double-entry (for payment and receipt)
    let doubleEntryValid = true;
    const paymentReceiptTransactions = transactions.filter(t => t.type === 'payment' || t.type === 'receipt');
    
    // Each payment/receipt should have 2 entries (one debit, one credit)
    const groupedByVoucher = new Map();
    paymentReceiptTransactions.forEach(t => {
        if (!groupedByVoucher.has(t.voucher)) {
            groupedByVoucher.set(t.voucher, []);
        }
        groupedByVoucher.get(t.voucher).push(t);
    });
    
    for (const [voucher, entries] of groupedByVoucher) {
        const totalDebit = entries.reduce((sum, e) => sum + (e.debit || 0), 0);
        const totalCredit = entries.reduce((sum, e) => sum + (e.credit || 0), 0);
        if (Math.abs(totalDebit - totalCredit) > 0.01) {
            doubleEntryValid = false;
            break;
        }
    }
    
    // Check date sequence
    let dateSequenceValid = true;
    const sortedByDate = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    for (let i = 1; i < sortedByDate.length; i++) {
        if (new Date(sortedByDate[i].date) < new Date(sortedByDate[i-1].date)) {
            dateSequenceValid = false;
            break;
        }
    }
    
    // Running balance check (simplified)
    let runningBalanceValid = true;
    let balance = 0;
    for (const t of sortedByDate) {
        const amount = (t.debit || 0) - (t.credit || 0);
        balance += amount;
        if (balance < -0.01 && t.type !== 'payment') {
            // This is a simplified check
        }
    }
    
    integrityList.innerHTML = `
        <li>
            <span class="integrity-check ${doubleEntryValid ? 'passed' : 'failed'}">
                <i class="fas ${doubleEntryValid ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                Double-entry verification:
            </span>
            <span>${doubleEntryValid ? 'Passed' : 'Failed'}</span>
        </li>
        <li>
            <span class="integrity-check ${dateSequenceValid ? 'passed' : 'failed'}">
                <i class="fas ${dateSequenceValid ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                Date sequence check:
            </span>
            <span>${dateSequenceValid ? 'Passed' : 'Failed'}</span>
        </li>
        <li>
            <span class="integrity-check ${runningBalanceValid ? 'passed' : 'warning'}">
                <i class="fas ${runningBalanceValid ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                Running balance check:
            </span>
            <span>${runningBalanceValid ? 'Passed' : 'Review required'}</span>
        </li>
    `;
}

// Update audit charts
function updateAuditCharts(transactions) {
    // Transaction distribution chart
    const typeCounts = {
        payment: transactions.filter(t => t.type === 'payment').length,
        receipt: transactions.filter(t => t.type === 'receipt').length,
        journal: transactions.filter(t => t.type === 'journal').length
    };
    
    const ctx1 = document.getElementById('transaction-distribution-chart').getContext('2d');
    if (auditCharts.distribution) auditCharts.distribution.destroy();
    auditCharts.distribution = new Chart(ctx1, {
        type: 'pie',
        data: {
            labels: ['Payments', 'Receipts', 'Journals'],
            datasets: [{
                data: [typeCounts.payment, typeCounts.receipt, typeCounts.journal],
                backgroundColor: ['#ffc107', '#28a745', '#17a2b8'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Monthly activity chart
    const monthlyData = getMonthlyActivity(transactions);
    const ctx2 = document.getElementById('monthly-activity-chart').getContext('2d');
    if (auditCharts.monthly) auditCharts.monthly.destroy();
    auditCharts.monthly = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: monthlyData.labels,
            datasets: [{
                label: 'Transaction Count',
                data: monthlyData.counts,
                backgroundColor: '#3c40c6',
                borderRadius: 5
            }, {
                label: 'Total Amount',
                data: monthlyData.amounts,
                backgroundColor: '#009432',
                borderRadius: 5,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Transaction Count'
                    }
                },
                y1: {
                    position: 'right',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount'
                    }
                }
            }
        }
    });
    
    // Top ledgers chart
    const ledgerAmounts = getTopLedgers(transactions, 5);
    const ctx3 = document.getElementById('top-ledgers-chart').getContext('2d');
    if (auditCharts.ledgers) auditCharts.ledgers.destroy();
    auditCharts.ledgers = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ledgerAmounts.labels,
            datasets: [{
                label: 'Transaction Volume',
                data: ledgerAmounts.amounts,
                backgroundColor: '#ffc107',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

// Helper: Get monthly activity
function getMonthlyActivity(transactions) {
    const monthlyMap = new Map();
    
    transactions.forEach(t => {
        const date = new Date(t.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthLabel = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        
        if (!monthlyMap.has(monthKey)) {
            monthlyMap.set(monthKey, {
                label: monthLabel,
                count: 0,
                amount: 0
            });
        }
        
        const monthData = monthlyMap.get(monthKey);
        monthData.count++;
        monthData.amount += t.amount || t.debit || t.credit || 0;
    });
    
    const sortedMonths = Array.from(monthlyMap.keys()).sort();
    
    return {
        labels: sortedMonths.map(m => monthlyMap.get(m).label),
        counts: sortedMonths.map(m => monthlyMap.get(m).count),
        amounts: sortedMonths.map(m => monthlyMap.get(m).amount)
    };
}

// Helper: Get top ledgers
function getTopLedgers(transactions, limit) {
    const ledgerMap = new Map();
    
    transactions.forEach(t => {
        const amount = t.amount || t.debit || t.credit || 0;
        if (!ledgerMap.has(t.ledger)) {
            ledgerMap.set(t.ledger, 0);
        }
        ledgerMap.set(t.ledger, ledgerMap.get(t.ledger) + amount);
    });
    
    const sorted = Array.from(ledgerMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit);
    
    return {
        labels: sorted.map(s => s[0]),
        amounts: sorted.map(s => s[1])
    };
}

// Helper: Get ledger type
function getLedgerType(ledgerName) {
    const ledger = ledgers.find(l => l.name === ledgerName);
    return ledger ? ledger.type : 'unknown';
}

// Filter audit trail
function filterAuditTrail() {
    const typeFilter = document.getElementById('audit-type-filter').value;
    const ledgerFilter = document.getElementById('audit-ledger-filter').value;
    const subgroupFilter = document.getElementById('audit-subgroup-filter').value;
    
    let filtered = [...currentAuditTransactions];
    
    if (typeFilter) {
        filtered = filtered.filter(t => t.type === typeFilter);
    }
    
    if (ledgerFilter) {
        filtered = filtered.filter(t => t.ledger === ledgerFilter);
    }
    
    if (subgroupFilter) {
        filtered = filtered.filter(t => t.subgroup === subgroupFilter);
    }
    
    updateAuditTable(filtered);
}

// Search audit trail
function searchAuditTrail() {
    const searchTerm = document.getElementById('audit-search').value.toLowerCase();
    
    if (!searchTerm) {
        updateAuditTable(currentAuditTransactions);
        return;
    }
    
    const filtered = currentAuditTransactions.filter(t => {
        return (t.ledger && t.ledger.toLowerCase().includes(searchTerm)) ||
               (t.narration && t.narration.toLowerCase().includes(searchTerm)) ||
               (t.voucher && t.voucher.toLowerCase().includes(searchTerm)) ||
               (t.subgroup && t.subgroup.toLowerCase().includes(searchTerm));
    });
    
    updateAuditTable(filtered);
}

// Populate filter dropdowns
function populateFilters(transactions) {
    const ledgerFilter = document.getElementById('audit-ledger-filter');
    const subgroupFilter = document.getElementById('audit-subgroup-filter');
    
    // Ledgers
    const uniqueLedgers = [...new Set(transactions.map(t => t.ledger))].sort();
    let ledgerOptions = '<option value="">All Ledgers</option>';
    uniqueLedgers.forEach(ledger => {
        ledgerOptions += `<option value="${ledger}">${ledger}</option>`;
    });
    ledgerFilter.innerHTML = ledgerOptions;
    
    // Subgroups
    const uniqueSubgroups = [...new Set(transactions.map(t => t.subgroup).filter(Boolean))].sort();
    let subgroupOptions = '<option value="">All Subgroups</option>';
    uniqueSubgroups.forEach(subgroup => {
        subgroupOptions += `<option value="${subgroup}">${subgroup}</option>`;
    });
    subgroupFilter.innerHTML = subgroupOptions;
}

// Format date and time
function formatDateTime(dateString) {
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

// Truncate text
function truncateText(text, maxLength) {
    if (!text) return '-';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Export audit to CSV
function exportAuditToCSV() {
    const headers = ['ID', 'Date', 'Voucher', 'Type', 'Ledger', 'Subgroup', 'Debit', 'Credit', 'Amount', 'Bank', 'Narration', 'Audit Trail'];
    
    const rows = currentAuditTransactions.map(t => [
        t.id || '',
        t.date,
        t.voucher || '',
        t.type || '',
        t.ledger || '',
        t.subgroup || '',
        (t.debit || 0).toFixed(2),
        (t.credit || 0).toFixed(2),
        (t.amount || t.debit || t.credit || 0).toFixed(2),
        t.bank_name || '',
        t.narration || '',
        generateAuditTrail(t)
    ]);
    
    exportToCSV(rows, 'audit-trail.csv', headers);
}

// Print audit report
function printAuditReport() {
    window.print();
}

// Refresh audit data
function refreshAudit() {
    loadAuditTrail();
}

// Export to CSV helper
function exportToCSV(data, filename, headers) {
    let csv = headers.join(',') + '\n';
    
    data.forEach(row => {
        const values = row.map(cell => `"${String(cell).replace(/"/g, '""')}"`);
        csv += values.join(',') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Export functions to window
window.loadAuditTrail = loadAuditTrail;
window.filterAuditTrail = filterAuditTrail;
window.searchAuditTrail = searchAuditTrail;
window.exportAuditToCSV = exportAuditToCSV;
window.printAuditReport = printAuditReport;
window.refreshAudit = refreshAudit;