// ==================== UTILS.JS - Shared Utility Functions ====================
// Include this file in all HTML pages after accounting.js

// Format number to 2 decimal places
function formatNumber(num) {
    if (num === undefined || num === null || isNaN(num)) return '0.00';
    return Number(num).toFixed(2);
}

// Format date from YYYY-MM-DD to DD/MM/YYYY
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

// Parse date from DD/MM/YYYY to YYYY-MM-DD
function parseDate(dateString) {
    if (!dateString) return '';
    try {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        return dateString;
    } catch (e) {
        return dateString;
    }
}

// Validate amount is positive number
function validateAmount(amount, fieldName = 'Amount') {
    if (amount === undefined || amount === null || isNaN(amount)) {
        return { valid: false, message: `${fieldName} is invalid` };
    }
    
    if (amount < 0) {
        return { valid: false, message: `${fieldName} cannot be negative` };
    }
    
    if (amount === 0) {
        return { valid: false, message: `${fieldName} must be greater than zero` };
    }
    
    return { valid: true };
}

// Safety check for global variables
function getTransactions() {
    return (typeof transactions !== 'undefined' && transactions) ? transactions : [];
}

function getLedgers() {
    return (typeof ledgers !== 'undefined' && ledgers) ? ledgers : [];
}

function getBanks() {
    return (typeof banks !== 'undefined' && banks) ? banks : [];
}

// Show loading indicator
function showLoading(elementId, message = 'Loading...') {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="loading">${message}</div>`;
    }
}

// Export to CSV
function exportToCSV(data, filename, headers) {
    if (!data || data.length === 0) {
        alert('No data to export');
        return;
    }
    
    let csv = headers.join(',') + '\n';
    
    data.forEach(row => {
        const values = headers.map(header => {
            const value = row[header] || '';
            return `"${value}"`;
        });
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

// Print report
function printReport() {
    window.print();
}

// Export to PDF (uses print)
function exportToPDF() {
    window.print();
}