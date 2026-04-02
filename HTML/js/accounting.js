// Accounting System JavaScript

// ==================== DATA STORAGE ====================
let transactions = safeJSONParse('transactions', []);
let ledgers = JSON.parse(localStorage.getItem('ledgers')) || [
    // ==================== ASSET ACCOUNTS ====================
    { id: 1, name: 'cash', type: 'asset', category: 'cash', group: 'current_asset' },
    
    // Accounts Receivable
    { id: 2, name: 'accounts receivable', type: 'asset', category: 'receivable', group: 'receivable' },
    
    // Inventory
    { id: 3, name: 'inventory', type: 'asset', category: 'inventory', group: 'inventory' },
    
    // Prepaid Expenses
    { id: 4, name: 'prepaid expenses', type: 'asset', category: 'prepaid', group: 'prepaid' },
    
    // Fixed Assets
    { id: 5, name: 'fixed assets', type: 'asset', category: 'fixed', group: 'fixed_asset' },
    { id: 6, name: 'accumulated depreciation', type: 'asset', category: 'contra-asset', group: 'fixed_asset' },
    
    // Other Assets
    { id: 7, name: 'security deposits', type: 'asset', category: 'other_asset', group: 'other_asset' },
    { id: 8, name: 'advances', type: 'asset', category: 'advance', group: 'current_asset' },
    
    
    // ==================== LIABILITY ACCOUNTS ====================
    // Current Liabilities
    { id: 9, name: 'accounts payable', type: 'liability', category: 'payable', group: 'payable' },
    { id: 10, name: 'accrued expenses', type: 'liability', category: 'accrued', group: 'accrued' },
    { id: 11, name: 'unearned revenue', type: 'liability', category: 'unearned', group: 'unearned' },
    { id: 12, name: 'tax payable', type: 'liability', category: 'tax', group: 'tax_payable' },
    { id: 13, name: 'vat payable', type: 'liability', category: 'tax', group: 'tax_payable' },
    
    // Long Term Liabilities
    { id: 14, name: 'loans payable', type: 'liability', category: 'loan', group: 'loan' },
    { id: 15, name: 'bank loans', type: 'liability', category: 'loan', group: 'loan' },
    { id: 16, name: 'notes payable', type: 'liability', category: 'loan', group: 'loan' },
    
    
    // ==================== INCOME ACCOUNTS ====================
    // Operating Revenue
    { id: 17, name: 'sales', type: 'income', category: 'income', group: 'operating_revenue' },
    { id: 18, name: 'sales returns', type: 'income', category: 'income', group: 'operating_revenue' },
    { id: 19, name: 'service revenue', type: 'income', category: 'income', group: 'operating_revenue' },
    { id: 20, name: 'consulting revenue', type: 'income', category: 'income', group: 'operating_revenue' },
    
    // Other Income
    { id: 21, name: 'interest income', type: 'income', category: 'income', group: 'interest_income' },
    { id: 22, name: 'commission income', type: 'income', category: 'income', group: 'commission' },
    { id: 23, name: 'dividend income', type: 'income', category: 'income', group: 'other_income' },
    { id: 24, name: 'gain on sale of assets', type: 'income', category: 'income', group: 'gain' },
    { id: 25, name: 'other income', type: 'income', category: 'income', group: 'other_income' },
    
    
    // ==================== EXPENSE ACCOUNTS ====================
    // Cost of Goods Sold
    { id: 26, name: 'purchases', type: 'expense', category: 'expense', group: 'cost_of_goods_sold' },
    { id: 27, name: 'freight in', type: 'expense', category: 'expense', group: 'cost_of_goods_sold' },
    
    // Operating Expenses
    { id: 28, name: 'salary', type: 'expense', category: 'expense', group: 'staff_cost' },
    { id: 29, name: 'wages', type: 'expense', category: 'expense', group: 'staff_cost' },
    { id: 30, name: 'bonus', type: 'expense', category: 'expense', group: 'staff_cost' },
    { id: 31, name: 'rent', type: 'expense', category: 'expense', group: 'rent_utilities' },
    { id: 32, name: 'utilities', type: 'expense', category: 'expense', group: 'rent_utilities' },
    { id: 33, name: 'office supplies', type: 'expense', category: 'expense', group: 'office_expenses' },
    { id: 34, name: 'transportation', type: 'expense', category: 'expense', group: 'travel_conveyance' },
    { id: 35, name: 'travel', type: 'expense', category: 'expense', group: 'travel_conveyance' },
    { id: 36, name: 'advertising', type: 'expense', category: 'expense', group: 'marketing' },
    { id: 37, name: 'marketing', type: 'expense', category: 'expense', group: 'marketing' },
    { id: 38, name: 'telephone & internet', type: 'expense', category: 'expense', group: 'office_expenses' },
    { id: 39, name: 'repairs & maintenance', type: 'expense', category: 'expense', group: 'repairs_maintenance' },
    { id: 40, name: 'insurance', type: 'expense', category: 'expense', group: 'insurance' },
    { id: 41, name: 'taxes & fees', type: 'expense', category: 'expense', group: 'taxes' },
    { id: 42, name: 'bank charges', type: 'expense', category: 'expense', group: 'financial_charges' },
    { id: 43, name: 'depreciation', type: 'expense', category: 'expense', group: 'depreciation' },
    { id: 44, name: 'amortization', type: 'expense', category: 'expense', group: 'depreciation' },
    { id: 45, name: 'professional fees', type: 'expense', category: 'expense', group: 'professional_fees' },
    { id: 46, name: 'legal fees', type: 'expense', category: 'expense', group: 'professional_fees' },
    { id: 47, name: 'accounting fees', type: 'expense', category: 'expense', group: 'professional_fees' },
    { id: 48, name: 'interest expense', type: 'expense', category: 'expense', group: 'financial_charges' },
    { id: 49, name: 'miscellaneous', type: 'expense', category: 'expense', group: 'miscellaneous' },
    { id: 50, name: 'loss on sale of assets', type: 'expense', category: 'expense', group: 'other_expense' },
    
    
    // ==================== EQUITY ACCOUNTS ====================
    { id: 51, name: 'capital', type: 'equity', category: 'equity', group: 'capital' },
    { id: 52, name: 'drawings', type: 'equity', category: 'equity', group: 'drawings' },
    { id: 53, name: 'retained earnings', type: 'equity', category: 'equity', group: 'retained_earnings' },
    { id: 54, name: 'common stock', type: 'equity', category: 'equity', group: 'capital' },
    { id: 55, name: 'share premium', type: 'equity', category: 'equity', group: 'reserves' },
    { id: 56, name: 'general reserve', type: 'equity', category: 'equity', group: 'reserves' },
    { id: 57, name: 'revaluation reserve', type: 'equity', category: 'equity', group: 'reserves' }
];

// ==================== PROFIT & LOSS GROUPS ====================
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

// ==================== LEDGER SUB-GROUPS ====================
const ledgerSubGroups = {
    // Asset sub-groups
    asset: [
        { value: 'current_asset', label: 'Current Asset' },
        { value: 'fixed_asset', label: 'Fixed Asset' },
        { value: 'investment', label: 'Investment' },
        { value: 'receivable', label: 'Accounts Receivable' },
        { value: 'inventory', label: 'Inventory' },
        { value: 'prepaid', label: 'Prepaid Expenses' },
        { value: 'cash_equivalent', label: 'Cash & Cash Equivalent' }
    ],
    // Liability sub-groups
    liability: [
        { value: 'current_liability', label: 'Current Liability' },
        { value: 'long_term_liability', label: 'Long Term Liability' },
        { value: 'payable', label: 'Accounts Payable' },
        { value: 'accrued', label: 'Accrued Expenses' },
        { value: 'tax_payable', label: 'Tax Payable' },
        { value: 'loan', label: 'Loans Payable' }
    ],
    // Income sub-groups (for receipt form)
    income: [
        { value: 'operating_revenue', label: 'Operating Revenue' },
        { value: 'other_income', label: 'Other Income' },
        { value: 'interest_income', label: 'Interest Income' },
        { value: 'commission', label: 'Commission' },
        { value: 'gain', label: 'Gain on Sale' }
    ],
    // Expense sub-groups (for payment form)
    expense: [
        { value: 'operating_expense', label: 'Operating Expense' },
        { value: 'administrative', label: 'Administrative Expense' },
        { value: 'selling_distribution', label: 'Selling & Distribution' },
        { value: 'office_expense', label: 'Office Expense' },
        { value: 'rent', label: 'Rent Expense' },
        { value: 'utilities', label: 'Utilities Expense' },
        { value: 'travel', label: 'Travel Expense' },
        { value: 'staff_cost', label: 'Staff Cost' },
        { value: 'marketing', label: 'Marketing Expense' },
        { value: 'professional_fees', label: 'Professional Fees' },
        { value: 'repairs', label: 'Repairs & Maintenance' },
        { value: 'insurance', label: 'Insurance Expense' },
        { value: 'taxes', label: 'Tax Expense' },
        { value: 'depreciation', label: 'Depreciation' },
        { value: 'financial_charges', label: 'Financial Charges' },
        { value: 'miscellaneous', label: 'Miscellaneous Expense' }
    ],
    // Equity sub-groups
    equity: [
        { value: 'capital', label: 'Capital' },
        { value: 'drawings', label: 'Drawings' },
        { value: 'retained_earnings', label: 'Retained Earnings' },
        { value: 'reserves', label: 'Reserves & Surplus' }
    ]
};
// ==================== BANK MANAGEMENT ====================
let banks = JSON.parse(localStorage.getItem('banks')) || [];


// ==================== MULTI-CURRENCY SYSTEM ====================

// Currency settings
let currencySettings = JSON.parse(localStorage.getItem('currencySettings')) || {
    baseCurrency: 'BDT',           // Default base currency
    displayCurrency: 'BDT',        // Currency to display in UI
    autoConvert: true,              // Auto-convert amounts on display
    decimalPlaces: 2,              // Number of decimal places
    thousandSeparator: ',',        // Thousand separator
    decimalSeparator: '.'          // Decimal separator
};

// Available currencies with exchange rates (relative to base currency)
let currencies = JSON.parse(localStorage.getItem('currencies')) || {
    'BDT': { 
        symbol: '৳', 
        name: 'Bangladeshi Taka', 
        rate: 1.00,
        code: 'BDT',
        flag: '🇧🇩'
    },
    'USD': { 
        symbol: '$', 
        name: 'US Dollar', 
        rate: 0.0091,
        code: 'USD',
        flag: '🇺🇸'
    },
    'EUR': { 
        symbol: '€', 
        name: 'Euro', 
        rate: 0.0084,
        code: 'EUR',
        flag: '🇪🇺'
    },
    'GBP': { 
        symbol: '£', 
        name: 'British Pound', 
        rate: 0.0072,
        code: 'GBP',
        flag: '🇬🇧'
    },
    'INR': { 
        symbol: '₹', 
        name: 'Indian Rupee', 
        rate: 0.76,
        code: 'INR',
        flag: '🇮🇳'
    },
    'AED': { 
        symbol: 'د.إ', 
        name: 'UAE Dirham', 
        rate: 0.033,
        code: 'AED',
        flag: '🇦🇪'
    },
    'SAR': { 
        symbol: '﷼', 
        name: 'Saudi Riyal', 
        rate: 0.034,
        code: 'SAR',
        flag: '🇸🇦'
    },
    'SGD': { 
        symbol: 'S$', 
        name: 'Singapore Dollar', 
        rate: 0.012,
        code: 'SGD',
        flag: '🇸🇬'
    },
    'MYR': { 
        symbol: 'RM', 
        name: 'Malaysian Ringgit', 
        rate: 0.043,
        code: 'MYR',
        flag: '🇲🇾'
    },
    'JPY': { 
        symbol: '¥', 
        name: 'Japanese Yen', 
        rate: 1.37,
        code: 'JPY',
        flag: '🇯🇵'
    },
    'CNY': { 
        symbol: '¥', 
        name: 'Chinese Yuan', 
        rate: 0.066,
        code: 'CNY',
        flag: '🇨🇳'
    },
    'CAD': { 
        symbol: 'C$', 
        name: 'Canadian Dollar', 
        rate: 0.012,
        code: 'CAD',
        flag: '🇨🇦'
    },
    'AUD': { 
        symbol: 'A$', 
        name: 'Australian Dollar', 
        rate: 0.014,
        code: 'AUD',
        flag: '🇦🇺'
    }
};

// Exchange rate history for tracking rate changes
let exchangeRateHistory = JSON.parse(localStorage.getItem('exchangeRateHistory')) || [];

function safeJSONParse(key, defaultValue) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error(`Error parsing ${key}:`, e);
        return defaultValue;
    }
}

let escHandler = null;
let existingOnclick = window.onclick;
let lastRateUpdate = null;

// ==================== CURRENCY FUNCTIONS ====================

/**
 * Format amount with currency symbol and proper formatting
 * @param {number} amount - The amount to format
 * @param {string} currencyCode - Currency code (optional, uses display currency)
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currencyCode = null) {

    if (!currencySettings.autoConvert) {
        return amount.toFixed(currencySettings.decimalPlaces);
    }

    if (amount === undefined || amount === null || isNaN(amount)) {
        return '0.00';
    }
    
    const currency = currencyCode ? currencies[currencyCode] : currencies[currencySettings.displayCurrency];
    if (!currency) return amount.toFixed(2);
    
    // Apply decimal places
    let formattedAmount = amount.toFixed(currencySettings.decimalPlaces);
    
    // Add thousand separators
    if (currencySettings.thousandSeparator !== '') {
        const parts = formattedAmount.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, currencySettings.thousandSeparator);
        formattedAmount = parts.join(currencySettings.decimalSeparator);
    }
    
    // Return with symbol
    return `${currency.symbol} ${formattedAmount}`;
}

/**
 * Convert amount from one currency to another
 * @param {number} amount - Amount to convert
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @returns {number} Converted amount
 */
function convertCurrency(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount;

    const fromRate = currencies[fromCurrency]?.rate || 1;
    const toRate = currencies[toCurrency]?.rate || 1;

    // Convert FROM currency → base → TO currency
    const inBase = amount / fromRate;
    const converted = inBase * toRate;

    return Number(converted.toFixed(currencySettings.decimalPlaces));
}
/**
 * Update exchange rates for a currency
 * @param {string} currencyCode - Currency to update
 * @param {number} newRate - New exchange rate
 */
function updateExchangeRate(currencyCode, newRate) {
    if (!currencies[currencyCode]) {
        showNotification(`Currency ${currencyCode} not found`, 'error');
        return;
    }
    
    const oldRate = currencies[currencyCode].rate;
    currencies[currencyCode].rate = newRate;
    
    // Save to history
    exchangeRateHistory.push({
        currency: currencyCode,
        oldRate: oldRate,
        newRate: newRate,
        date: new Date().toISOString()
    });
    
    // Keep only last 100 rate changes
    if (exchangeRateHistory.length > 100) {
        exchangeRateHistory = exchangeRateHistory.slice(-100);
    }
    
    localStorage.setItem('currencies', JSON.stringify(currencies));
    localStorage.setItem('exchangeRateHistory', JSON.stringify(exchangeRateHistory));
    localStorage.setItem('lastRateUpdate', new Date().toISOString());
    
    showNotification(`${currencyCode} rate updated to ${newRate}`, 'success');
    
    // Refresh displayed amounts
    refreshCurrencyDisplay();
}

/**
 * Refresh all currency displays on the page
 */
function refreshCurrencyDisplay() {
    // Update all amount displays
    document.querySelectorAll('.currency-amount, .debit, .credit, .amount, .value').forEach(el => {
        const originalAmount = parseFloat(el.getAttribute('data-original-amount'));
        if (!isNaN(originalAmount)) {
            el.textContent = formatCurrency(originalAmount);
        }
    });
    
    // Update summary cards
    updateCurrencySummaries();
}

/**
 * Update summary cards with converted amounts
 */
function updateCurrencySummaries() {
    const summaryElements = {
        'total-income': null,
        'total-expense': null,
        'cash-balance': null,
        'bank-balance': null
    };
    
    Object.keys(summaryElements).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const original = parseFloat(el.getAttribute('data-original'));
            if (!isNaN(original)) {
                el.textContent = formatCurrency(original);
            }
        }
    });
}

/**
 * Show currency selection modal - FIXED POSITION
 */
function showCurrencyModal() {
    console.log('Opening currency modal');
    
    // Remove existing modal if any
    const existingModal = document.getElementById('currency-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal HTML with proper structure
    const modalHTML = `
        <div id="currency-modal" class="modal" style="display: flex;">
            <div class="modal-content" style="max-width: 550px; margin: auto;">
                <span class="close-modal" onclick="closeCurrencyModal()">&times;</span>
                <h3><i class="fas fa-money-bill-wave"></i> Currency Settings</h3>
                
                <div class="currency-settings" style="max-height: 60vh; overflow-y: auto; padding-right: 0.5rem;">
                    <div class="setting-group" style="margin-bottom: 1.5rem;">
                        <label for="base-currency" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Base Currency:</label>
                        <select id="base-currency" onchange="updateBaseCurrency()" style="width: 100%; padding: 0.8rem;">
                            ${Object.keys(currencies).map(code => `
                                <option value="${code}" ${currencySettings.baseCurrency === code ? 'selected' : ''}>
                                    ${currencies[code].flag} ${code} - ${currencies[code].name}
                                </option>
                            `).join('')}
                        </select>
                        <p class="setting-hint" style="font-size: 1.1rem; color: var(--light-color); margin-top: 0.3rem;">All transactions are stored in this currency</p>
                    </div>
                    
                    <div class="setting-group" style="margin-bottom: 1.5rem;">
                        <label for="display-currency" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Display Currency:</label>
                        <select id="display-currency" onchange="updateDisplayCurrency()" style="width: 100%; padding: 0.8rem;">
                            ${Object.keys(currencies).map(code => `
                                <option value="${code}" ${currencySettings.displayCurrency === code ? 'selected' : ''}>
                                    ${currencies[code].flag} ${code} - ${currencies[code].name}
                                </option>
                            `).join('')}
                        </select>
                        <p class="setting-hint" style="font-size: 1.1rem; color: var(--light-color); margin-top: 0.3rem;">Amounts will be shown in this currency</p>
                    </div>
                    
                    <div class="setting-group" style="margin-bottom: 1.5rem;">
                        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                            <input type="checkbox" id="auto-convert" ${currencySettings.autoConvert ? 'checked' : ''} 
                                   onchange="toggleAutoConvert()">
                            Auto-convert amounts on display
                        </label>
                    </div>
                    
                    <div class="setting-group" style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Format Settings:</label>
                        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            <select id="decimal-places" onchange="updateFormatSettings()" style="padding: 0.6rem;">
                                <option value="0" ${currencySettings.decimalPlaces === 0 ? 'selected' : ''}>0 decimals</option>
                                <option value="2" ${currencySettings.decimalPlaces === 2 ? 'selected' : ''}>2 decimals</option>
                                <option value="3" ${currencySettings.decimalPlaces === 3 ? 'selected' : ''}>3 decimals</option>
                                <option value="4" ${currencySettings.decimalPlaces === 4 ? 'selected' : ''}>4 decimals</option>
                            </select>
                            <input type="text" id="thousand-separator" value="${currencySettings.thousandSeparator}" 
                                   placeholder="Thousand" style="width: 80px; padding: 0.6rem;">
                            <input type="text" id="decimal-separator" value="${currencySettings.decimalSeparator}" 
                                   placeholder="Decimal" style="width: 80px; padding: 0.6rem;">
                        </div>
                    </div>
                    
                    <div class="exchange-rates" style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(0,0,0,0.1);">
                        <h4 style="margin-bottom: 1rem;"><i class="fas fa-chart-line"></i> Exchange Rates</h4>
                        <div style="max-height: 250px; overflow-y: auto;">
                            <table style="width: 100%; font-size: 1.3rem;">
                                <thead>
                                    <tr style="background: var(--main-color); color: white;">
                                        <th style="padding: 0.6rem;">Currency</th>
                                        <th style="padding: 0.6rem;">Rate (1 ${currencySettings.baseCurrency})</th>
                                        <th style="padding: 0.6rem;">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${Object.keys(currencies).map(code => `
                                        <tr>
                                            <td style="padding: 0.5rem;">${currencies[code].flag} ${code}</td>
                                            <td style="padding: 0.5rem;">
                                                <input type="number" id="rate-${code}" value="${currencies[code].rate}" 
                                                       step="0.0001" style="width: 90px; padding: 0.4rem;">
                                            </td>
                                            <td style="padding: 0.5rem;">
                                                <button class="btn small-btn" onclick="updateExchangeRate('${code}', 
                                                    parseFloat(document.getElementById('rate-${code}').value))" 
                                                    style="padding: 0.3rem 0.8rem; font-size: 1.1rem;">
                                                    Update
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                        <p class="setting-hint" style="font-size: 1rem; margin-top: 0.5rem;">
                            Last updated: ${lastRateUpdate ? new Date(lastRateUpdate).toLocaleString() : 'Never'}
                        </p>
                        <button class="btn" onclick="fetchLiveExchangeRates()" style="margin-top: 0.5rem; width: 100%;">
                            <i class="fas fa-cloud-download-alt"></i> Fetch Live Rates
                        </button>
                    </div>
                </div>
                
                <div class="modal-btns" style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: flex-end;">
                    <button class="btn cancel-btn" onclick="closeCurrencyModal()" style="background: #6c757d;">Close</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add click outside to close
    const modal = document.getElementById('currency-modal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCurrencyModal();
        }
    });
    
    escHandler = function(e) {
    if (e.key === 'Escape') {
        closeCurrencyModal();
    }
};

document.addEventListener('keydown', escHandler);
}

/**
 * Close currency modal
 */
function closeCurrencyModal() {
    const modal = document.getElementById('currency-modal');

    // 🔴 REMOVE event listener FIRST
    if (escHandler) {
        document.removeEventListener('keydown', escHandler);
        escHandler = null;
    }

    // Then handle modal UI
    if (modal) {
        modal.style.display = 'none';
        setTimeout(() => modal.remove(), 300);
    }
}

/**
 * Update base currency
 */
function updateBaseCurrency() {
    const el = document.getElementById('base-currency');
    if (!el) return;
    const newBase = el.value;
    const oldBase = currencySettings.baseCurrency;
    
    if (newBase === oldBase) return;
    
    // Recalculate all exchange rates relative to new base
    const oldBaseRate = currencies[oldBase].rate;
    
    Object.keys(currencies).forEach(code => {
        // Convert from old base to new base
        currencies[code].rate = currencies[code].rate / oldBaseRate;
    });
    
    currencySettings.baseCurrency = newBase;
    
    localStorage.setItem('currencies', JSON.stringify(currencies));
    localStorage.setItem('currencySettings', JSON.stringify(currencySettings));
    
    showNotification(`Base currency changed to ${newBase}`, 'success');
    refreshCurrencyDisplay();
}

/**
 * Update display currency
 */
function updateDisplayCurrency() {
    const newDisplay = document.getElementById('display-currency').value;
    currencySettings.displayCurrency = newDisplay;
    localStorage.setItem('currencySettings', JSON.stringify(currencySettings));
    
    showNotification(`Display currency changed to ${newDisplay}`, 'success');
    refreshCurrencyDisplay();
}

/**
 * Toggle auto-convert setting
 */
function toggleAutoConvert() {
    const autoConvert = document.getElementById('auto-convert').checked;
    currencySettings.autoConvert = autoConvert;
    localStorage.setItem('currencySettings', JSON.stringify(currencySettings));
    
    showNotification(`Auto-convert ${autoConvert ? 'enabled' : 'disabled'}`, 'info');
    refreshCurrencyDisplay();
}

/**
 * Update format settings
 */
function updateFormatSettings() {
    const decimalPlaces = parseInt(document.getElementById('decimal-places').value);
    const thousandSeparator = document.getElementById('thousand-separator').value;
    const decimalSeparator = document.getElementById('decimal-separator').value;
    
    currencySettings.decimalPlaces = decimalPlaces;
    currencySettings.thousandSeparator = thousandSeparator;
    currencySettings.decimalSeparator = decimalSeparator;
    
    localStorage.setItem('currencySettings', JSON.stringify(currencySettings));
    
    showNotification('Format settings updated', 'success');
    refreshCurrencyDisplay();
}

/**
 * Fetch live exchange rates from API (optional)
 */
async function fetchLiveExchangeRates() {
    showNotification('Fetching live exchange rates...', 'info');
    
    try {
        // Using free API - you can replace with your preferred API
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencySettings.baseCurrency}`);
        const data = await response.json();
        
        if (data && data.rates) {
            Object.keys(currencies).forEach(code => {
                if (data.rates[code]) {
                    currencies[code].rate = data.rates[code];
                }
            });
            
            localStorage.setItem('currencies', JSON.stringify(currencies));
            lastRateUpdate = new Date().toISOString();
            localStorage.setItem('lastRateUpdate', lastRateUpdate);
            
            showNotification('Exchange rates updated successfully!', 'success');
            refreshCurrencyDisplay();
        }
    } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        showNotification('Failed to fetch live rates. Using stored rates.', 'error');
    }
}

/**
 * Add currency selector to forms
 */
function addCurrencySelector() {
    console.log('Adding currency selectors to forms...');
    
    // Check if currencies object exists and has data
    if (!currencies || Object.keys(currencies).length === 0) {
        console.error('Currencies not loaded, retrying...');
        setTimeout(addCurrencySelector, 500);
        return;
    }
    
    // Build currency options HTML
    const currencyOptions = Object.keys(currencies).map(code => `
        <option value="${code}" ${currencySettings.displayCurrency === code ? 'selected' : ''}>
            ${currencies[code].flag} ${code} - ${currencies[code].name}
        </option>
    `).join('');
    
    // Add currency selector to payment form
    const paymentEntrySection = document.getElementById('payment-entry-section');
    if (paymentEntrySection && !document.getElementById('payment-currency-selector')) {
        const currencySelector = document.createElement('div');
        currencySelector.id = 'payment-currency-selector';
        currencySelector.className = 'currency-selector';
        currencySelector.style.cssText = 'margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;';
        currencySelector.innerHTML = `
            <label for="payment-currency" style="font-size: 1.4rem; color: var(--black); display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-globe"></i> Currency:
            </label>
            <select id="payment-currency" class="currency-select" style="padding: 0.8rem; font-size: 1.4rem; border: var(--border); border-radius: 0.5rem; background: var(--bg-color); min-width: 180px;">
                ${currencyOptions}
            </select>
        `;
        
        // Insert at the beginning of entry section
        paymentEntrySection.insertBefore(currencySelector, paymentEntrySection.firstChild);
    }
    
    // Add currency selector to receipt form
    const receiptEntrySection = document.getElementById('receipt-entry-section');
    if (receiptEntrySection && !document.getElementById('receipt-currency-selector')) {
        const currencySelector = document.createElement('div');
        currencySelector.id = 'receipt-currency-selector';
        currencySelector.className = 'currency-selector';
        currencySelector.style.cssText = 'margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;';
        currencySelector.innerHTML = `
            <label for="receipt-currency" style="font-size: 1.4rem; color: var(--black); display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-globe"></i> Currency:
            </label>
            <select id="receipt-currency" class="currency-select" style="padding: 0.8rem; font-size: 1.4rem; border: var(--border); border-radius: 0.5rem; background: var(--bg-color); min-width: 180px;">
                ${currencyOptions}
            </select>
        `;
        
        receiptEntrySection.insertBefore(currencySelector, receiptEntrySection.firstChild);
    }
    
    console.log('Currency selectors added with', Object.keys(currencies).length, 'currencies');
}
/**
 * Handle currency change in forms
 */
function handleCurrencyChange(type) {
    const currencySelect = document.getElementById(`${type}-currency`);
    const amountInput = document.getElementById(`${type}-amount`);
    const conversionInfo = document.getElementById(`${type}-conversion-info`);
    
    if (!currencySelect || !amountInput) return;
    
    const amount = parseFloat(amountInput.value);
    const currency = currencySelect.value;
    
    if (isNaN(amount) || amount <= 0) {
        if (conversionInfo) conversionInfo.innerHTML = '';
        return;
    }
    
    // Convert to display currency
    const converted = convertCurrency(amount, currency, currencySettings.displayCurrency);
    
    // Show conversion info
    if (conversionInfo && converted !== amount) {
        conversionInfo.innerHTML = `
            <i class="fas fa-exchange-alt"></i> 
            ≈ ${formatCurrency(converted, currencySettings.displayCurrency)}
            <small style="color: var(--light-color);"> (1 ${currency} = ${currencies[currency].rate} ${currencySettings.baseCurrency})</small>
        `;
    } else if (conversionInfo) {
        conversionInfo.innerHTML = '';
    }
}

/**
 * Initialize currency system
 */
function initCurrencySystem() {
    console.log('Initializing multi-currency system...');
    
    // Make sure currencies object exists
    if (typeof currencies === 'undefined') {
        console.error('Currencies object not defined');
        return;
    }
    
    // Add currency selector to forms
    addCurrencySelector();
    
    // Add event listeners to amount inputs
    const paymentAmount = document.getElementById('payment-amount');
    const receiptAmount = document.getElementById('receipt-amount');
    const paymentCurrency = document.getElementById('payment-currency');
    const receiptCurrency = document.getElementById('receipt-currency');
    
    if (paymentAmount) {
        paymentAmount.addEventListener('input', () => handleCurrencyChange('payment'));
    }
    if (receiptAmount) {
        receiptAmount.addEventListener('input', () => handleCurrencyChange('receipt'));
    }
    if (paymentCurrency) {
        paymentCurrency.addEventListener('change', () => handleCurrencyChange('payment'));
    }
    if (receiptCurrency) {
        receiptCurrency.addEventListener('change', () => handleCurrencyChange('receipt'));
    }
    
    // Update all currency displays
    refreshCurrencyDisplay();
    
    // Add currency button to header
    addCurrencyButton();
    
    console.log('Multi-currency system initialized');
}

/**
 * Add currency button to header
 */
function addCurrencyButton() {
    // Find where to add the button
    const darkModeControls = document.querySelector('.dark-mode-controls');
    if (!darkModeControls) {
        console.log('Dark mode controls not found, will retry');
        // Retry after a short delay
        setTimeout(addCurrencyButton, 500);
        return;
    }
    
    // Check if button already exists
    if (document.getElementById('currency-btn')) {
        console.log('Currency button already exists');
        return;
    }
    
    const currencyBtn = document.createElement('div');
    currencyBtn.id = 'currency-btn';
    currencyBtn.className = 'currency-btn';
    currencyBtn.innerHTML = `<i class="fas fa-money-bill-wave"></i> <span id="current-currency-code">${currencySettings.displayCurrency}</span>`;
    currencyBtn.title = 'Currency Settings';
    currencyBtn.onclick = () => showCurrencyModal();
    currencyBtn.style.cssText = `
        width: auto;
        min-width: 6rem;
        padding: 0 1.2rem;
        height: 3.5rem;
        border-radius: 2rem;
        background: var(--bg-color);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        cursor: pointer;
        font-size: 1.4rem;
        font-weight: 600;
        color: var(--main-color);
        transition: all 0.3s ease;
        box-shadow: var(--box-shadow);
        margin-right: 0.5rem;
    `;
    
    // Add to beginning of dark mode controls
    darkModeControls.insertBefore(currencyBtn, darkModeControls.firstChild);
    console.log('Currency button added to header');
}

// ==================== BALANCE TRACKING FUNCTIONS ====================

function getCurrentBalances() {
    let cashBalance = 0;
    let bankBalances = {};
    
    transactions.forEach(t => {
        // Calculate cash balance
        if (t.ledger && t.ledger.toLowerCase().includes('cash')) {
            cashBalance += (parseFloat(t.debit) || 0) - (parseFloat(t.credit) || 0);
        }
        
        // Calculate bank balances
        if (t.ledger && t.ledger.toLowerCase().includes('bank')) {
            const bankName = t.bank_name || t.ledger;
            if (!bankBalances[bankName]) {
                bankBalances[bankName] = 0;
            }
            bankBalances[bankName] += (parseFloat(t.debit) || 0) - (parseFloat(t.credit) || 0);
        }
    });
    
    return {
        cash: cashBalance,
        banks: bankBalances
    };
}

function showBalanceAboveAmount(formType, paymentType, bankName = null) {
    const balances = getCurrentBalances();
    const amountGroup = document.querySelector(`#${formType} .amount-group`);
    
    // Find the container where balance should be shown
    let targetContainer = amountGroup;
    if (!targetContainer) {
        const amountInput = document.getElementById(`${formType}-amount`);
        if (amountInput) {
            targetContainer = amountInput.closest('.form-group');
        }
    }
    
    if (!targetContainer) return;
    
    // Remove existing balance display
    const existingDisplay = document.getElementById(`${formType}-balance-above`);
    if (existingDisplay) existingDisplay.remove();
    
    // Create new balance display - ONE LINE VERSION
    const balanceDiv = document.createElement('div');
    balanceDiv.id = `${formType}-balance-above`;
    balanceDiv.className = 'balance-display';
    balanceDiv.style.cssText = `
        background: var(--bg-color);
        border: 1px solid var(--main-color);
        border-radius: 0.5rem;
        padding: 0.8rem 1.2rem;
        margin-bottom: 1rem;
        font-size: 1.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;
    `;
    
    if (paymentType === 'cash') {
        const isPositive = balances.cash >= 0;
        balanceDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.8rem;">
                <i class="fas fa-wallet" style="color: var(--main-color); font-size: 1.4rem;"></i>
                <span style="font-weight: 500;">Cash Balance:</span>
            </div>
            <div>
                <span style="font-size: 1.6rem; font-weight: bold; color: ${isPositive ? '#28a745' : '#dc3545'};">
                    ${formatCurrency(balances.cash)}
                </span>
            </div>
        `;
    } else if (paymentType === 'bank' && bankName) {
        const bankBalance = balances.banks[bankName] || 0;
        const isPositive = bankBalance >= 0;
        const bankDisplay = banks.find(b => b.name === bankName)?.displayName || bankName;
        balanceDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.8rem;">
                <i class="fas fa-university" style="color: var(--main-color); font-size: 1.4rem;"></i>
                <span style="font-weight: 500;">${bankDisplay} Balance:</span>
            </div>
            <div>
                <span style="font-size: 1.6rem; font-weight: bold; color: ${isPositive ? '#28a745' : '#dc3545'};">
                    ${formatCurrency(bankBalance)}
                </span>
            </div>
        `;
    }
    
    // Insert before the target container
    targetContainer.parentNode.insertBefore(balanceDiv, targetContainer);
}

function removeBalanceAbove(formType) {
    const existingDisplay = document.getElementById(`${formType}-balance-above`);
    if (existingDisplay) existingDisplay.remove();
}

function updateGroupDropdown() {
    const ledgerType = document.getElementById('modal-ledger-type').value;
    const groupSelect = document.getElementById('modal-ledger-group');
    
    if (!groupSelect) {
        console.error('Group select element not found');
        return;
    }
    
    console.log('Updating group dropdown for type:', ledgerType);
    
    let groupOptions = '<option value="">-- Select Group --</option>';
    
    // Get groups based on ledger type
    let groups = [];
    if (ledgerType === 'asset') {
        groups = ledgerSubGroups.asset;
    } else if (ledgerType === 'liability') {
        groups = ledgerSubGroups.liability;
    } else if (ledgerType === 'income') {
        groups = ledgerSubGroups.income;
    } else if (ledgerType === 'expense') {
        groups = ledgerSubGroups.expense;
    } else if (ledgerType === 'equity') {
        groups = ledgerSubGroups.equity;
    }
    
    console.log('Groups found:', groups.length);
    
    // Add options to dropdown
    if (groups && groups.length > 0) {
        groups.forEach(group => {
            groupOptions += `<option value="${group.value}">${group.label}</option>`;
        });
    } else {
        groupOptions += '<option value="" disabled>No groups available for this type</option>';
    }
    
    groupSelect.innerHTML = groupOptions;
    
    // Set default group based on ledger type
    if (groups && groups.length > 0) {
        let defaultGroupValue = '';
        if (ledgerType === 'asset') defaultGroupValue = 'current_asset';
        else if (ledgerType === 'liability') defaultGroupValue = 'current_liability';
        else if (ledgerType === 'income') defaultGroupValue = 'operating_revenue';
        else if (ledgerType === 'expense') defaultGroupValue = 'operating_expense';
        else if (ledgerType === 'equity') defaultGroupValue = 'capital';
        
        const defaultOption = groups.find(g => g.value === defaultGroupValue);
        if (defaultOption) {
            groupSelect.value = defaultGroupValue;
            console.log('Default group set to:', defaultGroupValue);
        }
    }
}
// ==================== AMOUNT VALIDATION FUNCTION ====================
function validateAmount(amount, fieldName = 'Amount') {
    // Check if amount exists and is a number
    if (amount === undefined || amount === null || isNaN(amount)) {
        return { valid: false, message: `${fieldName} is invalid` };
    }
    
    // Check if amount is negative
    if (amount < 0) {
        return { valid: false, message: `${fieldName} cannot be negative` };
    }
    
    // Check if amount is zero
    if (amount === 0) {
        return { valid: false, message: `${fieldName} must be greater than zero` };
    }
    
    // Amount is valid
    return { valid: true };
}


// ==================== SUB GROUP MANAGEMENT ====================

// Store custom sub groups in localStorage
let customSubGroups = JSON.parse(localStorage.getItem('customSubGroups')) || [];

function updateSubGroupDatalist(formType) {
    const subgroupInput = document.getElementById(`${formType}-subgroup-input`);
    const subgroupHidden = document.getElementById(`${formType}-subgroup`);
    const subgroupList = document.getElementById(`${formType}-subgroup-list`);
    
    if (!subgroupList) return;
    
    const ledgerType = getLedgerTypeForForm(formType);
    
    // Determine which groups to show based on ledger type
    let groups = [];
    
    if (ledgerType === 'expense') {
        groups = [...ledgerSubGroups.expense];
    } else if (ledgerType === 'asset') {
        groups = [...ledgerSubGroups.asset];
    } else if (ledgerType === 'liability') {
        groups = [...ledgerSubGroups.liability];
    } else if (ledgerType === 'income') {
        groups = [...ledgerSubGroups.income];
    } else if (ledgerType === 'equity') {
        groups = [...ledgerSubGroups.equity];
    }
    
    // Add custom sub groups
    const customGroups = customSubGroups.filter(g => g.type === ledgerType);
    groups = [...groups, ...customGroups];
    
    // Build datalist options
    let options = '';
    groups.sort((a, b) => a.label.localeCompare(b.label)).forEach(group => {
        options += `<option value="${group.label}">`;
    });
    
    subgroupList.innerHTML = options;
    
    // Initialize searchable functionality
    initSubGroupSearchable(formType);
}

function initSubGroupSearchable(formType) {
    const subgroupInput = document.getElementById(`${formType}-subgroup-input`);
    const subgroupHidden = document.getElementById(`${formType}-subgroup`);
    const subgroupList = document.getElementById(`${formType}-subgroup-list`);
    
    if (!subgroupInput || !subgroupHidden || !subgroupList) return;
    
    // Remove existing listeners to avoid duplicates
    const newInput = subgroupInput.cloneNode(true);
    subgroupInput.parentNode.replaceChild(newInput, subgroupInput);
    
    // Re-get references
    const newSubgroupInput = document.getElementById(`${formType}-subgroup-input`);
    const newSubgroupHidden = document.getElementById(`${formType}-subgroup`);
    const newSubgroupList = document.getElementById(`${formType}-subgroup-list`);
    
    // Handle input
    newSubgroupInput.addEventListener('input', function() {
        const value = this.value;
        const ledgerType = getLedgerTypeForForm(formType);
        
        // Get all groups for this type
        let groups = [];
        if (ledgerType === 'expense') groups = [...ledgerSubGroups.expense, ...customSubGroups.filter(g => g.type === 'expense')];
        else if (ledgerType === 'asset') groups = [...ledgerSubGroups.asset, ...customSubGroups.filter(g => g.type === 'asset')];
        else if (ledgerType === 'liability') groups = [...ledgerSubGroups.liability, ...customSubGroups.filter(g => g.type === 'liability')];
        else if (ledgerType === 'income') groups = [...ledgerSubGroups.income, ...customSubGroups.filter(g => g.type === 'income')];
        else if (ledgerType === 'equity') groups = [...ledgerSubGroups.equity, ...customSubGroups.filter(g => g.type === 'equity')];
        
        // Find match
        const matchedGroup = groups.find(g => 
            g.label.toLowerCase().includes(value.toLowerCase())
        );
        
        if (matchedGroup) {
            newSubgroupHidden.value = matchedGroup.value;
        }
    });
    
    // Handle selection from datalist
    newSubgroupInput.addEventListener('change', function() {
        const value = this.value;
        const ledgerType = getLedgerTypeForForm(formType);
        
        // Get all groups for this type
        let groups = [];
        if (ledgerType === 'expense') groups = [...ledgerSubGroups.expense, ...customSubGroups.filter(g => g.type === 'expense')];
        else if (ledgerType === 'asset') groups = [...ledgerSubGroups.asset, ...customSubGroups.filter(g => g.type === 'asset')];
        else if (ledgerType === 'liability') groups = [...ledgerSubGroups.liability, ...customSubGroups.filter(g => g.type === 'liability')];
        else if (ledgerType === 'income') groups = [...ledgerSubGroups.income, ...customSubGroups.filter(g => g.type === 'income')];
        else if (ledgerType === 'equity') groups = [...ledgerSubGroups.equity, ...customSubGroups.filter(g => g.type === 'equity')];
        
        // Find exact match
        const matchedGroup = groups.find(g => 
            g.label === value || g.label.toLowerCase() === value.toLowerCase()
        );
        
        if (matchedGroup) {
            newSubgroupHidden.value = matchedGroup.value;
            this.value = matchedGroup.label;
        }
    });
    
    // Handle blur
    newSubgroupInput.addEventListener('blur', function() {
        if (!newSubgroupHidden.value && this.value) {
            const ledgerType = getLedgerTypeForForm(formType);
            
            // Get all groups for this type
            let groups = [];
            if (ledgerType === 'expense') groups = [...ledgerSubGroups.expense, ...customSubGroups.filter(g => g.type === 'expense')];
            else if (ledgerType === 'asset') groups = [...ledgerSubGroups.asset, ...customSubGroups.filter(g => g.type === 'asset')];
            else if (ledgerType === 'liability') groups = [...ledgerSubGroups.liability, ...customSubGroups.filter(g => g.type === 'liability')];
            else if (ledgerType === 'income') groups = [...ledgerSubGroups.income, ...customSubGroups.filter(g => g.type === 'income')];
            else if (ledgerType === 'equity') groups = [...ledgerSubGroups.equity, ...customSubGroups.filter(g => g.type === 'equity')];
            
            // Try to find partial match
            const matchedGroup = groups.find(g => 
                g.label.toLowerCase().includes(this.value.toLowerCase())
            );
            
            if (matchedGroup) {
                newSubgroupHidden.value = matchedGroup.value;
                this.value = matchedGroup.label;
            }
        }
    });
    
    // Handle Enter key - go to amount field
    newSubgroupInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            
            // Move to amount field
            const amountInput = document.getElementById(`${formType}-amount`);
            if (amountInput && isElementVisible(amountInput)) {
                amountInput.focus();
                highlightElement(amountInput);
            }
        }
    });
}

function getLedgerTypeForForm(formType) {
    // For now, return based on form type
    // You can enhance this later to detect based on selected ledger
    if (formType === 'payment') return 'expense';
    if (formType === 'receipt') return 'income';
    return 'asset';
}

function showNewSubGroupModal(formType) {
    console.log('Opening new subgroup modal for:', formType); // Debug
    
    // Create modal if it doesn't exist
    if (!document.getElementById('new-subgroup-modal')) {
        createSubGroupModal();
    }
    
    // Clear previous values
    document.getElementById('subgroup-modal-form-type').value = formType;
    document.getElementById('journal-subgroup-row-id').value = '';
    document.getElementById('modal-subgroup-name').value = '';
    
    // Set default group type based on form
    let defaultType = 'expense';
    if (formType === 'receipt') {
        defaultType = 'income';
    } else if (formType === 'journal') {
        // For journal, try to get from current row
        defaultType = 'asset';
    }
    
    document.getElementById('modal-subgroup-type').value = defaultType;
    
    // Show modal
    document.getElementById('new-subgroup-modal').style.display = 'block';
    
    // Focus on input
    setTimeout(() => {
        const nameInput = document.getElementById('modal-subgroup-name');
        if (nameInput) nameInput.focus();
    }, 100);
}

function closeSubGroupModal() {
    document.getElementById('new-subgroup-modal').style.display = 'none';
}

function createNewSubGroup() {
    console.log('Creating new sub group'); // Debug
    
    const name = document.getElementById('modal-subgroup-name').value.trim();
    const type = document.getElementById('modal-subgroup-type').value;
    const formType = document.getElementById('subgroup-modal-form-type')?.value || 'payment';
    const rowId = document.getElementById('journal-subgroup-row-id')?.value;
    
    if (!name) {
        alert('Please enter a sub group name');
        document.getElementById('modal-subgroup-name').focus();
        return;
    }
    
    // Create group value (lowercase, underscores)
    const value = name.toLowerCase().replace(/\s+/g, '_');
    
    // Check if already exists in predefined groups
    const predefinedExists = ledgerSubGroups[type]?.some(g => g.value === value);
    if (predefinedExists) {
        alert('This sub group already exists in predefined groups');
        return;
    }
    
    // Check if already exists in custom groups
    const customExists = customSubGroups.some(g => g.value === value && g.type === type);
    if (customExists) {
        alert('This sub group already exists');
        return;
    }
    
    // Create new sub group
    const newGroup = {
        value: value,
        label: name,
        type: type,
        isCustom: true
    };
    
    customSubGroups.push(newGroup);
    localStorage.setItem('customSubGroups', JSON.stringify(customSubGroups));
    
    console.log('New group created:', newGroup); // Debug
    console.log('Form type:', formType, 'Row ID:', rowId); // Debug
    
    // Handle based on form type
    if (formType === 'journal' && rowId !== undefined && rowId !== '') {
        // Update journal row
        const rows = document.querySelectorAll('.journal-entry-row');
        const targetRow = rows[parseInt(rowId)];
        
        if (targetRow) {
            console.log('Updating journal row:', rowId); // Debug
            
            const subgroupInput = targetRow.querySelector('.journal-subgroup-input');
            const subgroupHidden = targetRow.querySelector('.journal-subgroup-select');
            
            if (subgroupInput) {
                subgroupInput.value = name;
                console.log('Set subgroup input to:', name); // Debug
            }
            if (subgroupHidden) {
                subgroupHidden.value = value;
                console.log('Set subgroup hidden to:', value); // Debug
            }
            
            // Update datalist for this row
            updateJournalSubgroupDatalist(targetRow);
        }
    } else {
        // Handle regular form (payment/receipt)
        console.log('Updating regular form:', formType); // Debug
        
        // Update datalist
        updateSubGroupDatalist(formType);
        
        // Set the input value to the new group
        const subgroupInput = document.getElementById(`${formType}-subgroup-input`);
        const subgroupHidden = document.getElementById(`${formType}-subgroup`);
        
        if (subgroupInput) {
            subgroupInput.value = name;
            console.log('Set form subgroup input to:', name); // Debug
        }
        if (subgroupHidden) {
            subgroupHidden.value = value;
            console.log('Set form subgroup hidden to:', value); // Debug
        }
    }
    
    closeSubGroupModal();
}

function createSubGroupModal() {
    const modalHTML = `
        <div id="new-subgroup-modal" class="modal">
            <div class="modal-content">
                <span class="close-modal" onclick="closeSubGroupModal()">&times;</span>
                <h3><i class="fas fa-layer-group"></i> create new sub group</h3>
                <input type="hidden" id="subgroup-modal-form-type">
                <input type="hidden" id="journal-subgroup-row-id">
                <div class="form-group">
                    <label for="modal-subgroup-name">sub group name *</label>
                    <input type="text" id="modal-subgroup-name" placeholder="enter sub group name">
                </div>
                <div class="form-group">
                    <label for="modal-subgroup-type">group type *</label>
                    <select id="modal-subgroup-type">
                        <option value="expense">Expense Group</option>
                        <option value="asset">Asset Group</option>
                        <option value="liability">Liability Group</option>
                        <option value="income">Income Group</option>
                        <option value="equity">Equity Group</option>
                    </select>
                </div>
                <div class="modal-btns">
                    <button type="button" class="save-btn" onclick="createNewSubGroup()"><i class="fas fa-check"></i> create</button>
                    <button type="button" class="cancel-btn" onclick="closeSubGroupModal()"><i class="fas fa-times"></i> cancel</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initDatePickers();
    updateAllLedgerDropdowns();
    updateBankDropdowns();
    initSearchableSelects();
    
    // Only reset journal if the container exists
    const journalContainer = document.querySelector('.journal-entries');
    if (journalContainer) {
        resetJournal();
    } else {
        console.log('Journal container not found, skipping reset');
    }
    
    displayRecentTransactions();
    setupEventListeners();
    setupFullKeyboardNavigation();
    setupGlobalKeyboardShortcuts();
    updateVoucherNumbers();
    addDeleteAllButton();
    
    
    // Add click outside to close modals
    window.onclick = function(event) {
        const manageModal = document.getElementById('manage-ledgers-modal');
        const deleteModal = document.getElementById('delete-ledger-modal');
        const ledgerModal = document.getElementById('new-ledger-modal');
        const bankModal = document.getElementById('new-bank-modal');
        const subgroupModal = document.getElementById('new-subgroup-modal');
        
        if (event.target === manageModal) closeManageLedgersModal();
        if (event.target === deleteModal) closeDeleteLedgerModal();
        if (event.target === ledgerModal) closeModal();
        if (event.target === bankModal) closeBankModal();
        if (event.target === subgroupModal) closeSubGroupModal();
    };
    initBackupSystem();

    const restoreInput = document.getElementById('restore-file-input');
    if (restoreInput) {
        // Remove any existing listeners to avoid duplicates
        const newRestoreInput = restoreInput.cloneNode(true);
        restoreInput.parentNode.replaceChild(newRestoreInput, restoreInput);
        
        newRestoreInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                console.log('Restore file selected:', file.name);
                
                // Check if it's a JSON file
                if (!file.name.endsWith('.json')) {
                    showNotification('Please select a JSON backup file', 'error');
                    this.value = '';
                    return;
                }
                
                // Call restore function
                restoreData(file);
                this.value = ''; // Reset input so same file can be selected again
            }
        });
    } else {
        console.warn('Restore file input not found in DOM');
    }
    // Setup global keyboard shortcuts
    setupGlobalKeyboardShortcuts();
    
    // Add floating help button
    addFloatingHelpButton();
    
    // Setup click outside to close shortcuts modal
    const shortcutsModal = document.getElementById('shortcuts-modal');
    if (shortcutsModal) {
        // If window.onclick is already defined, we need to preserve it
        const existingOnClick = window.onclick;
        window.onclick = function(event) {

            if (existingOnclick) {
            existingOnclick(event);
        }
            // Handle shortcuts modal close
            if (event.target === shortcutsModal) {
                closeShortcutsModal();
            }
        };
    }
    
    console.log('Keyboard shortcuts system initialized');

    // Initialize currency system with a slight delay to ensure DOM is ready
    setTimeout(() => {
        if (typeof initCurrencySystem === 'function') {
            initCurrencySystem();
        }
        
        // Force refresh of currency selector if needed
        const paymentCurrency = document.getElementById('payment-currency');
        const receiptCurrency = document.getElementById('receipt-currency');
        
        if (paymentCurrency && paymentCurrency.options.length === 0) {
            console.log('Refreshing currency selector...');
            addCurrencySelector();
        }
        if (receiptCurrency && receiptCurrency.options.length === 0) {
            addCurrencySelector();
        }
    }, 500);
});

function addDeleteAllButton() {
    const recentEntriesDiv = document.querySelector('.recent-entries');
    if (recentEntriesDiv) {
        const headerDiv = recentEntriesDiv.querySelector('h3');
        const deleteAllBtn = document.createElement('button');
        deleteAllBtn.className = 'delete-all-btn';
        deleteAllBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Delete All Transactions';
        deleteAllBtn.onclick = deleteAllTransactions;
        deleteAllBtn.style.cssText = `
            background: #dc3545;
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: .5rem;
            font-size: 1.4rem;
            cursor: pointer;
            margin-left: 2rem;
            transition: all .3s ease;
        `;
        deleteAllBtn.onmouseover = () => {
            deleteAllBtn.style.background = '#bb2d3b';
            deleteAllBtn.style.transform = 'translateY(-2px)';
        };
        deleteAllBtn.onmouseout = () => {
            deleteAllBtn.style.background = '#dc3545';
            deleteAllBtn.style.transform = 'translateY(0)';
        };
        headerDiv.appendChild(deleteAllBtn);
    }
}

function deleteAllTransactions() {
    if (confirm('⚠️ Are you sure you want to delete ALL transactions?\n\nThis action cannot be undone!')) {
        transactions = [];
        localStorage.setItem('transactions', JSON.stringify(transactions));
        displayRecentTransactions();
        updateVoucherNumbers();
        resetForm('payment');
        resetForm('receipt');
        resetJournal();
        alert('All transactions deleted successfully!');
    }
}

function deleteTransaction(transactionId) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        transactions = transactions.filter(t => t.id !== transactionId);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        displayRecentTransactions();
        updateVoucherNumbers();
        alert('Transaction deleted successfully!');
    }
}

// ==================== DATE PICKER INITIALIZATION ====================
function initDatePickers() {
    // Destroy any existing flatpickr instances first
    document.querySelectorAll(".date-picker").forEach(el => {
        if (el._flatpickr) {
            el._flatpickr.destroy();
        }
    });
    
    // Initialize new instances
    flatpickr(".date-picker", {
        dateFormat: "Y-m-d",
        defaultDate: "today",
        allowInput: true,
        altInput: true,
        altFormat: "F j, Y",
        onChange: function(selectedDates, dateStr, instance) {
            validateForm(instance.element.id.replace('-date', ''));
        }
    });
}

function setupEventListeners() {
    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });

    // Payment type radios
    document.querySelectorAll('.payment-type').forEach(radio => {
        radio.addEventListener('change', function() {
            handleTypeChange('payment');
        });
    });

    // Receipt type radios
    document.querySelectorAll('.receipt-type').forEach(radio => {
        radio.addEventListener('change', function() {
            handleTypeChange('receipt');
        });
    });

    // Payment ledger select
    const paymentLedger = document.getElementById('payment-ledger');
    if (paymentLedger) {
        paymentLedger.addEventListener('change', function() {
            handleLedgerSelect('payment');
        });
    }

    // Receipt ledger select
    const receiptLedger = document.getElementById('receipt-ledger');
    if (receiptLedger) {
        receiptLedger.addEventListener('change', function() {
            handleLedgerSelect('receipt');
        });
    }

    // Payment amount input
    const paymentAmount = document.getElementById('payment-amount');
    if (paymentAmount) {
        paymentAmount.addEventListener('input', function() {
            handleAmountInput('payment');
        });
    }

    // Receipt amount input
    const receiptAmount = document.getElementById('receipt-amount');
    if (receiptAmount) {
        receiptAmount.addEventListener('input', function() {
            handleAmountInput('receipt');
        });
    }

    // Payment new ledger input
    const paymentNewLedger = document.getElementById('payment-new-ledger');
    if (paymentNewLedger) {
        paymentNewLedger.addEventListener('input', function() {
            validateNewLedger('payment');
        });
    }

    // Receipt new ledger input
    const receiptNewLedger = document.getElementById('receipt-new-ledger');
    if (receiptNewLedger) {
        receiptNewLedger.addEventListener('input', function() {
            validateNewLedger('receipt');
        });
    }

    // Payment bank select
    const paymentBank = document.getElementById('payment-bank');
    if (paymentBank) {
        paymentBank.addEventListener('change', function() {
            handleBankSelect('payment');
        });
    }
    
    // Receipt bank select
    const receiptBank = document.getElementById('receipt-bank');
    if (receiptBank) {
        receiptBank.addEventListener('change', function() {
            handleBankSelect('receipt');
        });
    }

    // ===== NARRATION ENTER HANDLING =====
    // Payment narration - Enter goes to Save button
const paymentNarration = document.getElementById('payment-narration');
if (paymentNarration) {
    paymentNarration.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent new line
            // Find and focus the Save button
            const saveBtn = document.querySelector('#payment .save-btn:not([disabled])');
            if (saveBtn) {
                saveBtn.focus();
                // Highlight the button for visual feedback
                highlightElement(saveBtn);
            }
        }
    });
}

    // Receipt narration - Enter goes to Save button
const receiptNarration = document.getElementById('receipt-narration');
if (receiptNarration) {
    receiptNarration.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent new line
            // Find and focus the Save button
            const saveBtn = document.querySelector('#receipt .save-btn:not([disabled])');
            if (saveBtn) {
                saveBtn.focus();
                // Highlight the button for visual feedback
                highlightElement(saveBtn);
            }
        }
    });
}

    // Journal narration - Enter goes to Save button
const journalNarration = document.getElementById('journal-narration');
if (journalNarration) {
    journalNarration.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent new line
            // Find and focus the Save button
            const saveBtn = document.querySelector('#journal .save-btn:not([disabled])');
            if (saveBtn) {
                saveBtn.focus();
                // Highlight the button for visual feedback
                highlightElement(saveBtn);
            }
        }
    });
}

    // Navigation menu clicks
    document.querySelector('.nav-payment')?.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab('payment');
    });
    
    document.querySelector('.nav-receipt')?.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab('receipt');
    });
    
    document.querySelector('.nav-journal')?.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab('journal');
    });

    // Save buttons
    const paymentSaveBtn = document.querySelector('#payment .save-btn');
    if (paymentSaveBtn) {
        paymentSaveBtn.addEventListener('click', function() {
            saveEntry('payment');
        });
    }

    const receiptSaveBtn = document.querySelector('#receipt .save-btn');
    if (receiptSaveBtn) {
        receiptSaveBtn.addEventListener('click', function() {
            saveEntry('receipt');
        });
    }

    // Cancel buttons
    const paymentCancelBtn = document.querySelector('#payment .cancel-btn');
    if (paymentCancelBtn) {
        paymentCancelBtn.addEventListener('click', function() {
            cancelEntry('payment');
        });
    }

    const receiptCancelBtn = document.querySelector('#receipt .cancel-btn');
    if (receiptCancelBtn) {
        receiptCancelBtn.addEventListener('click', function() {
            cancelEntry('receipt');
        });
    }

    // Journal save button
    const journalSaveBtn = document.querySelector('#journal .save-btn');
    if (journalSaveBtn) {
        journalSaveBtn.addEventListener('click', function() {
            saveJournal();
        });
    }

    // Journal cancel button
    const journalCancelBtn = document.querySelector('#journal .cancel-btn');
    if (journalCancelBtn) {
        journalCancelBtn.addEventListener('click', function() {
            resetJournal();
        });
    }
}

// ==================== BANK FUNCTIONS ====================

// Update bank dropdowns
function updateBankDropdowns() {
    ['payment', 'receipt'].forEach(type => {
        const bankSelect = document.getElementById(`${type}-bank`);
        if (bankSelect) {
            let options = '<option value="">-- select bank --</option>';
            
            // NEW: Only show banks that have account numbers
            const banksWithAccounts = banks.filter(bank => bank.accountNo && bank.accountNo.trim() !== '');
            
            banksWithAccounts.forEach(bank => {
                // Show bank name with account number in brackets
                const displayText = bank.displayNameWithAccount || `${bank.displayName || bank.name} (${bank.accountNo})`;
                options += `<option value="${bank.name}">${displayText}</option>`;
            });
            
            // If no banks with accounts, show a message
            if (banksWithAccounts.length === 0) {
                options = '<option value="">-- No banks available. Create one first --</option>';
            }
            
            bankSelect.innerHTML = options;
        }
    });
}

// Show new bank modal
function showNewBankModal(type) {
    console.log('Opening new bank modal for:', type);
    
    // Clear previous values
    document.getElementById('bank-modal-entry-type').value = type;
    document.getElementById('modal-bank-name').value = '';
    document.getElementById('modal-bank-account').value = '';
    
    // Populate bank name datalist with common bank names
    populateBankNameDatalist();
    
    // Show modal
    document.getElementById('new-bank-modal').style.display = 'block';
    
    // Focus on bank name input
    setTimeout(() => {
        const bankNameInput = document.getElementById('modal-bank-name');
        if (bankNameInput) bankNameInput.focus();
    }, 100);
}

function populateBankNameDatalist() {
    const datalist = document.getElementById('bank-name-list');
    if (!datalist) return;
    
    // Get all existing bank names (from banks array)
    const existingBankNames = banks.map(bank => bank.displayName || bank.name);
    
    // Common bank names in Bangladesh
    const commonBankNames = [
        'Sonali Bank Limited',
        'Janata Bank Limited',
        'Agrani Bank Limited',
        'Rupali Bank Limited',
        'Dutch-Bangla Bank Limited',
        'Eastern Bank Limited (EBL)',
        'Islami Bank Bangladesh Limited',
        'Pubali Bank Limited',
        'United Commercial Bank (UCB)',
        'City Bank Limited',
        'NCC Bank Limited',
        'Prime Bank Limited',
        'Mercantile Bank Limited',
        'Mutual Trust Bank Limited (MTB)',
        'Standard Bank Limited',
        'One Bank Limited',
        'EXIM Bank Limited',
        'First Security Islami Bank Limited',
        'Shahjalal Islami Bank Limited',
        'Al-Arafah Islami Bank Limited',
        'Social Islami Bank Limited (SIBL)',
        'Midland Bank Limited',
        'Modhumoti Bank Limited',
        'NRB Bank Limited',
        'Trust Bank Limited',
        'AB Bank Limited',
        'Bangladesh Krishi Bank (BKB)',
        'Grameen Bank',
        'bKash (Mobile Banking)',
        'Nagad (Mobile Banking)',
        'Rocket (DBBL Mobile Banking)'
    ];
    
    // Combine existing and common, remove duplicates
    const allBankNames = [...new Set([...existingBankNames, ...commonBankNames])];
    
    // Sort alphabetically
    allBankNames.sort();
    
    // Build datalist options
    let options = '';
    allBankNames.forEach(name => {
        options += `<option value="${name}">`;
    });
    
    datalist.innerHTML = options;
}

function closeBankModal() {
    const modal = document.getElementById('new-bank-modal');
    if (modal) {
        modal.style.display = 'none';
        // Clear input values
        document.getElementById('modal-bank-name').value = '';
        document.getElementById('modal-bank-account').value = '';
        
        // Return focus to the bank input in the form
        const entryType = document.getElementById('bank-modal-entry-type').value;
        if (entryType) {
            const bankInput = document.getElementById(`${entryType}-bank-input`);
            if (bankInput) bankInput.focus();
        }
    }
}

function createNewBank() {
    const nameInput = document.getElementById('modal-bank-name');
    const name = nameInput.value.trim();
    const accountNo = document.getElementById('modal-bank-account').value.trim();
    const entryType = document.getElementById('bank-modal-entry-type').value;
    
    // Validate bank name
    if (!name) {
        alert('Please enter or select a bank name');
        nameInput.focus();
        return;
    }
    
    // Validate account number is required
    if (!accountNo) {
        alert('Please enter an account number for this bank');
        document.getElementById('modal-bank-account').focus();
        return;
    }
    
    // Format bank name for storage (lowercase with prefix)
    let bankNameForStorage = name.toLowerCase();
    // Remove any existing "bank - " prefix to avoid duplication
    bankNameForStorage = bankNameForStorage.replace(/^bank\s*-\s*/, '');
    bankNameForStorage = 'bank - ' + bankNameForStorage;
    
    // Check if bank already exists (case insensitive)
    const existingBank = banks.find(b => 
        b.name.toLowerCase() === bankNameForStorage.toLowerCase() ||
        b.displayName?.toLowerCase() === name.toLowerCase()
    );
    
    if (existingBank) {
        // If bank exists but has no account number, update it
        if (!existingBank.accountNo) {
            existingBank.accountNo = accountNo;
            existingBank.displayNameWithAccount = `${existingBank.displayName || existingBank.name} (${accountNo})`;
            localStorage.setItem('banks', JSON.stringify(banks));
            showNotification(`Account number added to existing bank: ${existingBank.displayName}`, 'success');
        } else {
            alert(`Bank "${name}" already exists with account number: ${existingBank.accountNo}`);
            nameInput.focus();
            return;
        }
    } else {
        // Create new bank
        // Create display name (proper case)
        let displayName = name;
        
        const newBank = {
            id: banks.length + 1,
            name: bankNameForStorage,
            displayName: displayName,
            displayNameWithAccount: `${displayName} (${accountNo})`,
            accountNo: accountNo
        };
        
        banks.push(newBank);
        localStorage.setItem('banks', JSON.stringify(banks));
        
        // Also add as ledger if not exists
        if (!ledgers.some(l => l.name === bankNameForStorage)) {
            const newLedger = {
                id: ledgers.length + 1,
                name: bankNameForStorage,
                type: 'asset',
                category: 'bank',
                group: 'current_asset',
                accountNo: accountNo
            };
            ledgers.push(newLedger);
            localStorage.setItem('ledgers', JSON.stringify(ledgers));
        }
        
        showNotification(`Bank "${displayName}" created with account number: ${accountNo}`, 'success');
    }
    
    // Update all dropdowns and datalists
    updateBankDropdowns();
    updateBankDatalist('payment');
    updateBankDatalist('receipt');
    updateAllLedgerDropdowns();
    
    // Select the new bank
    const bankSelect = document.getElementById(`${entryType}-bank`);
    const bankInput = document.getElementById(`${entryType}-bank-input`);
    const bankHidden = document.getElementById(`${entryType}-bank`);
    
    if (bankSelect) {
        bankSelect.value = bankNameForStorage;
    }
    if (bankInput) {
        const selectedBank = banks.find(b => b.name === bankNameForStorage);
        if (selectedBank) {
            bankInput.value = selectedBank.displayNameWithAccount || `${selectedBank.displayName} (${selectedBank.accountNo})`;
        }
    }
    if (bankHidden) {
        bankHidden.value = bankNameForStorage;
    }
    
    // Also set the account number field
    const accountField = document.getElementById(`${entryType}-account`);
    if (accountField) {
        accountField.value = accountNo;
    }
    
    handleBankSelect(entryType);
    closeBankModal();
}

function isValidBank(bank) {
    return bank && bank.accountNo && bank.accountNo.trim() !== '';
}

function handleBankSelect(type) {
    const bankHidden = document.getElementById(`${type}-bank`);
    const bankInput = document.getElementById(`${type}-bank-input`);
    const entrySection = document.getElementById(`${type}-entry-section`);
    
    if (!bankHidden) return;
    
    let selectedBank = null;
    
    if (bankHidden.value) {
        selectedBank = banks.find(b => b.name === bankHidden.value);
    } else if (bankInput && bankInput.value) {
        selectedBank = banks.find(b => 
            b.displayNameWithAccount === bankInput.value ||
            `${b.displayName} (${b.accountNo})` === bankInput.value ||
            b.displayName === bankInput.value
        );
        if (selectedBank) {
            bankHidden.value = selectedBank.name;
        }
    }
    
    if (selectedBank) {
        // Update the bank input display
        if (bankInput) {
            const displayText = selectedBank.displayNameWithAccount || 
                               `${selectedBank.displayName || selectedBank.name} (${selectedBank.accountNo})`;
            bankInput.value = displayText;
        }
        
        // Show entry section
        if (entrySection) entrySection.style.display = 'block';
        
        // Show bank balance
        showBalanceAboveAmount(type, 'bank', selectedBank.name);
        
        // Focus on ledger input
        setTimeout(() => {
            document.getElementById(`${type}-ledger-input`).focus();
        }, 100);
    } else {
        if (entrySection) entrySection.style.display = 'none';
    }
}


// ==================== SEARCHABLE SELECT FUNCTIONS ====================

// Initialize searchable selects
function initSearchableSelects() {
    // Bank selects
    initBankSearchable('payment');
    initBankSearchable('receipt');
    
    // Ledger selects
    initLedgerSearchable('payment');
    initLedgerSearchable('receipt');
}

// Initialize bank searchable select
function initBankSearchable(type) {
    // Check if banks exists
    if (typeof banks === 'undefined') {
        console.log('Banks not loaded yet, skipping initialization');
        return;
    }
    const bankInput = document.getElementById(`${type}-bank-input`);
    const bankHidden = document.getElementById(`${type}-bank`);
    const bankList = document.getElementById(`${type}-bank-list`);
    
    if (!bankInput || !bankHidden || !bankList) return;
    
    // Populate datalist
    updateBankDatalist(type);
    
    // Handle input
    bankInput.addEventListener('input', function() {
        const value = this.value;
        const matchedBank = banks.find(b => 
            b.displayName.toLowerCase().includes(value.toLowerCase()) ||
            b.name.toLowerCase().includes(value.toLowerCase())
        );
        
        if (matchedBank) {
            bankHidden.value = matchedBank.name;
        }
    });
    
    // Handle selection from datalist
    bankInput.addEventListener('change', function() {
        const value = this.value;
        const matchedBank = banks.find(b => 
            b.displayName === value || 
            b.name === value ||
            b.displayName.toLowerCase() === value.toLowerCase() ||
            b.name.toLowerCase() === value.toLowerCase()
        );
        
        if (matchedBank) {
            bankHidden.value = matchedBank.name;
            bankInput.value = matchedBank.displayName || matchedBank.name;
            handleBankSelect(type);
        }
    });
    
    // Handle blur
    bankInput.addEventListener('blur', function() {
        if (!bankHidden.value) {
            // Try to find match
            const value = this.value;
            const matchedBank = banks.find(b => 
                b.displayName.toLowerCase().includes(value.toLowerCase()) ||
                b.name.toLowerCase().includes(value.toLowerCase())
            );
            
            if (matchedBank) {
                bankHidden.value = matchedBank.name;
                bankInput.value = matchedBank.displayName || matchedBank.name;
                handleBankSelect(type);
            }
        }
    });
    
    // Handle keyboard navigation
    bankInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && bankHidden.value) {
            e.preventDefault();
            const accountInput = document.getElementById(`${type}-account`);
            if (accountInput) accountInput.focus();
        }
    });
}

// Initialize ledger searchable select
function initLedgerSearchable(type) {
    const ledgerInput = document.getElementById(`${type}-ledger-input`);
    const ledgerHidden = document.getElementById(`${type}-ledger`);
    const ledgerList = document.getElementById(`${type}-ledger-list`);
    
    if (!ledgerInput || !ledgerHidden || !ledgerList) return;
    
    // Populate datalist
    updateLedgerDatalist(type);
    
    // Handle input
    ledgerInput.addEventListener('input', function() {
        const value = this.value;
        const matchedLedger = ledgers.find(l => 
            l.name.toLowerCase().includes(value.toLowerCase())
        );
        
        if (matchedLedger) {
            ledgerHidden.value = matchedLedger.id;
        }
    });
    
    // Handle selection from datalist
    ledgerInput.addEventListener('change', function() {
        const value = this.value;
        const matchedLedger = ledgers.find(l => 
            l.name === value || 
            l.name.toLowerCase() === value.toLowerCase()
        );
        
        if (matchedLedger) {
            ledgerHidden.value = matchedLedger.id;
            ledgerInput.value = matchedLedger.name;
            handleLedgerSelect(type);
        }
    });
    
    // Handle blur
    ledgerInput.addEventListener('blur', function() {
        if (!ledgerHidden.value) {
            const value = this.value;
            const matchedLedger = ledgers.find(l => 
                l.name.toLowerCase().includes(value.toLowerCase())
            );
            
            if (matchedLedger) {
                ledgerHidden.value = matchedLedger.id;
                ledgerInput.value = matchedLedger.name;
                handleLedgerSelect(type);
            }
        }
    });
    
    // Handle keyboard navigation - Enter goes to SUBGROUP
    ledgerInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && ledgerHidden.value) {
            e.preventDefault();
            e.stopPropagation();
            
            // First try to focus on subgroup input
            const subgroupInput = document.getElementById(`${type}-subgroup-input`);
            if (subgroupInput && isElementVisible(subgroupInput)) {
                subgroupInput.focus();
                highlightElement(subgroupInput);
            } else {
                // If no subgroup, go directly to amount
                const amountInput = document.getElementById(`${type}-amount`);
                if (amountInput && isElementVisible(amountInput)) {
                    amountInput.focus();
                    highlightElement(amountInput);
                }
            }
        }
    });
}

// Update bank datalist
function updateBankDatalist(type) {
    const bankList = document.getElementById(`${type}-bank-list`);
    if (!bankList) return;
    
    let options = '';
    // NEW: Only show banks that have account numbers
    const banksWithAccounts = banks.filter(bank => bank.accountNo && bank.accountNo.trim() !== '');
    
    banksWithAccounts.forEach(bank => {
        const displayText = bank.displayNameWithAccount || `${bank.displayName || bank.name} (${bank.accountNo})`;
        options += `<option value="${displayText}">`;
    });
    
    bankList.innerHTML = options;
}

// Update ledger datalist
function updateLedgerDatalist(type) {
    const ledgerList = document.getElementById(`${type}-ledger-list`);
    if (!ledgerList) return;
    
    // Remove the filter to show ALL ledgers
    let filteredLedgers = ledgers;  // Show all ledgers
    
    let options = '';
    filteredLedgers.forEach(ledger => {
        options += `<option value="${ledger.name}">`;
    });
    
    ledgerList.innerHTML = options;
}

// ==================== COMPLETE KEYBOARD NAVIGATION ====================

function setupFullKeyboardNavigation() {
    setupFormKeyboard('payment');
    setupFormKeyboard('receipt');
    setupJournalKeyboard();
    setupModalKeyboard();
}

function setupFormKeyboard(formType) {
    const form = document.getElementById(formType);
    if (!form) return;
    
    form.addEventListener('keydown', function(e) {
        const target = e.target;
        
        // === ENTER KEY HANDLING ===
        if (e.key === 'Enter') {
            
            // Let narration handle its own Enter
            if (target.id === `${formType}-narration`) {
                return; // Handled separately
            }
            
            // Let ledger input handle its own Enter
            if (target.id === `${formType}-ledger-input`) {
                return; // Handled in initLedgerSearchable
            }
            
            // Let subgroup input handle its own Enter
            if (target.id === `${formType}-subgroup-input`) {
                return; // Handled in initSubGroupSearchable
            }
            
            e.preventDefault();
            
            // Radio buttons
            if (target.type === 'radio') {
                handleRadioEnter(formType, target);
                return;
            }
            
            // Select dropdowns
            if (target.tagName === 'SELECT') {
                handleSelectEnter(target);
                return;
            }
            
            // Account input - move to ledger
            if (target.id === `${formType}-account`) {
                const ledgerInput = document.getElementById(`${formType}-ledger-input`);
                if (ledgerInput && isElementVisible(ledgerInput)) {
                    ledgerInput.focus();
                }
                return;
            }
            
            // Amount input - move to narration
            if (target.id === `${formType}-amount`) {
                const narration = document.getElementById(`${formType}-narration`);
                if (narration && isElementVisible(narration)) {
                    narration.focus();
                    highlightElement(narration);
                }
                return;
            }
            
            // Save button - Enter saves
            if (target.classList.contains('save-btn') && !target.disabled) {
                saveEntry(formType);
                return;
            }
            
            // Cancel button
            if (target.classList.contains('cancel-btn')) {
                if (confirm('Are you sure you want to cancel?')) {
                    resetForm(formType);
                }
                return;
            }
        }
        
        // Handle Ctrl+Enter on Save button (alternative method)
        if (e.key === 'Enter' && e.ctrlKey) {
            const saveBtn = document.querySelector(`#${formType} .save-btn:not([disabled])`);
            if (saveBtn) {
                e.preventDefault();
                saveEntry(formType);
            }
        }
        
        // Arrow keys for dropdowns
        if (target.tagName === 'SELECT') {
            handleSelectArrowKeys(e, target);
        }
        
        // Escape key
        if (e.key === 'Escape') {
            handleEscapeKey();
        }
    });
}

function handleRadioEnter(formType, currentRadio) {
    const radios = document.querySelectorAll(`input[name="${formType}-type"]`);
    const currentIndex = Array.from(radios).indexOf(currentRadio);
    
    if (currentIndex < radios.length - 1) {
        radios[currentIndex + 1].focus();
    } else {
        const paymentType = document.querySelector(`input[name="${formType}-type"]:checked`).value;
        
        if (paymentType === 'bank') {
            const bankSelect = document.getElementById(`${formType}-bank`);
            if (bankSelect && isElementVisible(bankSelect)) {
                bankSelect.focus();
                announceToScreenReader('Bank selection dropdown focused');
            }
        } else {
            const ledgerSelect = document.getElementById(`${formType}-ledger`);
            if (ledgerSelect && isElementVisible(ledgerSelect)) {
                ledgerSelect.focus();
                announceToScreenReader('Ledger selection dropdown focused');
            }
        }
    }
}

function handleSelectEnter(select) {
    const event = new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    select.dispatchEvent(event);
    window.activeSelect = select;
}

function handleSelectArrowKeys(e, select) {
    const key = e.key;
    const options = Array.from(select.options);
    const currentIndex = select.selectedIndex;
    
    if (key === 'ArrowDown') {
        e.preventDefault();
        if (currentIndex < options.length - 1) {
            select.selectedIndex = currentIndex + 1;
            select.dispatchEvent(new Event('change', { bubbles: true }));
        }
    } else if (key === 'ArrowUp') {
        e.preventDefault();
        if (currentIndex > 0) {
            select.selectedIndex = currentIndex - 1;
            select.dispatchEvent(new Event('change', { bubbles: true }));
        }
    } else if (key === 'PageDown') {
        e.preventDefault();
        select.selectedIndex = Math.min(currentIndex + 10, options.length - 1);
        select.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (key === 'PageUp') {
        e.preventDefault();
        select.selectedIndex = Math.max(currentIndex - 10, 0);
        select.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (key === 'Home') {
        e.preventDefault();
        select.selectedIndex = 0;
        select.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (key === 'End') {
        e.preventDefault();
        select.selectedIndex = options.length - 1;
        select.dispatchEvent(new Event('change', { bubbles: true }));
    }
}

function moveToNextInput(formType, currentElement) {
    const inputs = getFormInputs(formType);
    const currentIndex = inputs.indexOf(currentElement);
    
    if (currentIndex > -1 && currentIndex < inputs.length - 1) {
        const nextInput = inputs[currentIndex + 1];
        if (nextInput && isElementVisible(nextInput) && !nextInput.disabled) {
            nextInput.focus();
            highlightElement(nextInput);
        }
    }
}

function moveToPreviousInput(formType, currentElement) {
    const inputs = getFormInputs(formType);
    const currentIndex = inputs.indexOf(currentElement);
    
    if (currentIndex > 0) {
        const prevInput = inputs[currentIndex - 1];
        if (prevInput && isElementVisible(prevInput) && !prevInput.disabled) {
            prevInput.focus();
            highlightElement(prevInput);
        }
    }
}

function moveToNarration(formType) {
    const narration = document.getElementById(`${formType}-narration`);
    if (narration && isElementVisible(narration)) {
        narration.focus();
        highlightElement(narration);
    } else {
        focusSaveButton(formType);
    }
}

function focusSaveButton(formType) {
    const saveBtn = document.querySelector(`#${formType} .save-btn`);
    
    // Check if save button exists and is not disabled
    if (saveBtn && isElementVisible(saveBtn) && !saveBtn.disabled) {
        saveBtn.focus();
        highlightElement(saveBtn);
    } else {
        // If save button is disabled, maybe go to amount or another field
        const amountInput = document.getElementById(`${formType}-amount`);
        if (amountInput) {
            amountInput.focus();
            highlightElement(amountInput);
        }
    }
}

function highlightElement(element) {
    document.querySelectorAll('.keyboard-focus').forEach(el => {
        el.classList.remove('keyboard-focus');
        el.style.outline = '';
    });
    
    element.classList.add('keyboard-focus');
    element.style.outline = '3px solid var(--main-color)';
    element.style.outlineOffset = '2px';
    
    setTimeout(() => {
        if (document.activeElement !== element) {
            element.classList.remove('keyboard-focus');
            element.style.outline = '';
        }
    }, 1000);
}

// ==================== JOURNAL KEYBOARD NAVIGATION ====================

function setupJournalKeyboard() {
    const journalForm = document.getElementById('journal');
    if (!journalForm) return;
    
    journalForm.addEventListener('keydown', function(e) {
        const target = e.target;
        
        if (e.key === 'Enter') {
            e.preventDefault();
            
            if (target.classList.contains('add-row-btn')) {
                addJournalRow();
                return;
            }
            
            if (target.tagName === 'SELECT' && target.classList.contains('journal-ledger-select')) {
                handleSelectEnter(target);
                return;
            }
            
            if (target.classList.contains('journal-debit')) {
                handleJournalDebitEnter(target);
                return;
            }
            
            if (target.classList.contains('journal-credit')) {
                handleJournalCreditEnter(target);
                return;
            }
            
            if (target.classList.contains('journal-new-ledger')) {
                const modalSaveBtn = document.querySelector('#new-ledger-modal .save-btn');
                if (modalSaveBtn && isElementVisible(modalSaveBtn)) {
                    modalSaveBtn.focus();
                }
                return;
            }
            
            if (target.classList.contains('journal-new-subgroup-btn')) {
                showJournalNewSubGroupModal(target);
                return;
            }
            
            if (target.id === 'journal-narration') {
                const saveBtn = document.querySelector('#journal .save-btn:not([disabled])');
                if (saveBtn && isElementVisible(saveBtn)) {
                    saveBtn.focus();
                }
                return;
            }
            
            if (target.classList.contains('save-btn') && !target.disabled) {
                saveJournal();
                return;
            }
            
            if (target.classList.contains('cancel-btn')) {
                if (confirm('Reset journal? All entries will be cleared.')) {
                    resetJournal();
                }
                return;
            }
        }
        
        if (e.key === 'Delete' && e.ctrlKey) {
            const row = target.closest('.journal-entry-row');
            if (row && !row.classList.contains('first-row')) {
                e.preventDefault();
                removeJournalRow(row.querySelector('.remove-row-btn'));
            }
        }
        
        if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
            e.preventDefault();
            navigateJournalRows(e.key === 'ArrowUp' ? 'up' : 'down');
        }
    });
    
    document.querySelectorAll('.journal-ledger-select').forEach(select => {
        select.addEventListener('change', function() {
            const row = this.closest('.journal-entry-row');
            const isFirstRow = row === document.querySelector('.journal-entry-row');
            
            if (this.value && this.value !== 'new') {
                setTimeout(() => {
                    if (isFirstRow) {
                        const debitInput = row.querySelector('.journal-debit');
                        if (debitInput) debitInput.focus();
                    } else {
                        const debitInput = row.querySelector('.journal-debit');
                        const creditInput = row.querySelector('.journal-credit');
                        
                        if (debitInput && !debitInput.readOnly) {
                            debitInput.focus();
                        } else if (creditInput && !creditInput.readOnly) {
                            creditInput.focus();
                        }
                    }
                }, 100);
            }
        });
    });
}

function handleJournalDebitEnter(debitInput) {
    const row = debitInput.closest('.journal-entry-row');
    const creditInput = row.querySelector('.journal-credit');
    
    if (creditInput && !creditInput.readOnly && isElementVisible(creditInput)) {
        creditInput.focus();
    } else {
        moveToNextJournalRow(debitInput);
    }
}

function handleJournalCreditEnter(creditInput) {
    moveToNextJournalRow(creditInput);
}

function moveToNextJournalRow(currentElement) {
    const rows = Array.from(document.querySelectorAll('.journal-entry-row'));
    const currentRow = currentElement.closest('.journal-entry-row');
    const currentIndex = rows.indexOf(currentRow);
    
    if (currentIndex < rows.length - 1) {
        const nextRow = rows[currentIndex + 1];
        const nextLedgerSelect = nextRow.querySelector('.journal-ledger-select');
        if (nextLedgerSelect && isElementVisible(nextLedgerSelect)) {
            nextLedgerSelect.focus();
        }
    } else {
        const addRowBtn = document.querySelector('.add-row-btn');
        if (addRowBtn && isElementVisible(addRowBtn)) {
            addRowBtn.focus();
        }
    }
}

function navigateJournalRows(direction) {
    const rows = Array.from(document.querySelectorAll('.journal-entry-row'));
    const currentRow = document.activeElement?.closest('.journal-entry-row');
    
    if (!currentRow) return;
    
    const currentIndex = rows.indexOf(currentRow);
    let targetIndex;
    
    if (direction === 'up' && currentIndex > 0) {
        targetIndex = currentIndex - 1;
    } else if (direction === 'down' && currentIndex < rows.length - 1) {
        targetIndex = currentIndex + 1;
    } else {
        return;
    }
    
    const targetRow = rows[targetIndex];
    const fieldType = document.activeElement?.classList.contains('journal-debit') ? 'debit' : 'credit';
    
    setTimeout(() => {
        if (fieldType === 'debit') {
            targetRow.querySelector('.journal-debit')?.focus();
        } else {
            targetRow.querySelector('.journal-credit')?.focus();
        }
    }, 50);
}

// ==================== MODAL KEYBOARD NAVIGATION ====================

function setupModalKeyboard() {
    const modals = ['new-ledger-modal', 'new-bank-modal', 'manage-ledgers-modal', 'delete-ledger-modal', 'new-subgroup-modal'];
    
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const target = e.target;
                
                if (target.tagName === 'INPUT') {
                    const inputs = modal.querySelectorAll('input, select, button');
                    const currentIndex = Array.from(inputs).indexOf(target);
                    
                    if (currentIndex < inputs.length - 1) {
                        inputs[currentIndex + 1].focus();
                    } else {
                        if (modalId === 'new-ledger-modal') createNewLedger();
                        else if (modalId === 'new-bank-modal') createNewBank();
                        else if (modalId === 'delete-ledger-modal') confirmDeleteLedger();
                        else if (modalId === 'new-subgroup-modal') createNewSubGroup();
                    }
                }
                
                if (target.tagName === 'SELECT') {
                    handleSelectEnter(target);
                }
                
                if (target.classList.contains('save-btn')) {
                    if (modalId === 'new-ledger-modal') createNewLedger();
                    else if (modalId === 'new-bank-modal') createNewBank();
                    else if (modalId === 'new-subgroup-modal') createNewSubGroup();
                }
                
                if (target.classList.contains('delete-btn') && modalId === 'delete-ledger-modal') {
                    confirmDeleteLedger();
                }
                
                if (target.classList.contains('cancel-btn')) {
                    if (modalId === 'new-ledger-modal') closeModal();
                    else if (modalId === 'new-bank-modal') closeBankModal();
                    else if (modalId === 'manage-ledgers-modal') closeManageLedgersModal();
                    else if (modalId === 'delete-ledger-modal') closeDeleteLedgerModal();
                    else if (modalId === 'new-subgroup-modal') closeSubGroupModal();
                }
            }
            
            if (e.key === 'Escape') {
                if (modalId === 'new-ledger-modal') closeModal();
                else if (modalId === 'new-bank-modal') closeBankModal();
                else if (modalId === 'manage-ledgers-modal') closeManageLedgersModal();
                else if (modalId === 'delete-ledger-modal') closeDeleteLedgerModal();
                else if (modalId === 'new-subgroup-modal') closeSubGroupModal();
            }
            
            if (e.key === 'Tab') {
                e.preventDefault();
                const focusable = modal.querySelectorAll('input, select, button');
                const currentIndex = Array.from(focusable).indexOf(e.target);
                
                if (e.shiftKey) {
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusable.length - 1;
                    focusable[prevIndex].focus();
                } else {
                    const nextIndex = currentIndex < focusable.length - 1 ? currentIndex + 1 : 0;
                    focusable[nextIndex].focus();
                }
            }
        });
    });
}

// ==================== GLOBAL KEYBOARD SHORTCUTS ====================

function setupGlobalKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        if (e.altKey && e.key === 'p') {
            e.preventDefault();
            switchTab('payment');
        }
        
        if (e.altKey && e.key === 'r') {
            e.preventDefault();
            switchTab('receipt');
        }
        
        if (e.altKey && e.key === 'j') {
            e.preventDefault();
            switchTab('journal');
        }
        
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab;
            if (activeTab === 'journal') {
                if (!document.querySelector('#journal .save-btn').disabled) {
                    saveJournal();
                }
            } else if (activeTab) {
                if (!document.querySelector(`#${activeTab} .save-btn`).disabled) {
                    saveEntry(activeTab);
                }
            }
        }
        
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab;
            if (activeTab && activeTab !== 'journal') {
                showNewLedgerModal(activeTab);
            }
        }
        
        if (e.key === 'F5') {
            e.preventDefault();
            displayRecentTransactions();
            announceToScreenReader('Transactions refreshed');
        }
        
        if (e.ctrlKey && e.key === 'Delete') {
            e.preventDefault();
            deleteAllTransactions();
        }
    });
}

// ==================== SCREEN READER SUPPORT ====================

function announceToScreenReader(message) {
    let announcer = document.getElementById('screen-reader-announcer');
    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'screen-reader-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.position = 'absolute';
        announcer.style.width = '1px';
        announcer.style.height = '1px';
        announcer.style.padding = '0';
        announcer.style.margin = '-1px';
        announcer.style.overflow = 'hidden';
        announcer.style.clip = 'rect(0, 0, 0, 0)';
        announcer.style.border = '0';
        document.body.appendChild(announcer);
    }
    
    announcer.textContent = message;
}

// ==================== ENHANCED INPUT COLLECTION ====================

function getFormInputs(formType) {
    const form = document.getElementById(formType);
    if (!form) return [];
    
    const inputs = [];
    
    const dateInput = form.querySelector('.date-picker');
    if (dateInput) inputs.push(dateInput);
    
    const radioButtons = form.querySelectorAll('.type-options input[type="radio"]');
    radioButtons.forEach(radio => inputs.push(radio));
    
    const paymentType = document.querySelector(`input[name="${formType}-type"]:checked`)?.value;
    
    if (paymentType === 'bank') {
        const bankSelect = form.querySelector('.bank-select');
        if (bankSelect && isElementVisible(bankSelect)) {
            inputs.push(bankSelect);
        }
        
        const accountInput = form.querySelector('.account-group input');
        if (accountInput && isElementVisible(accountInput.closest('.account-group'))) {
            inputs.push(accountInput);
        }
    }
    
    const ledgerGroup = form.querySelector('.ledger-group');
    if (ledgerGroup && isElementVisible(ledgerGroup)) {
        const ledgerSelect = ledgerGroup.querySelector('.ledger-select');
        if (ledgerSelect) inputs.push(ledgerSelect);
        
        const newLedgerGroup = form.querySelector('.new-ledger-group');
        if (newLedgerGroup && isElementVisible(newLedgerGroup)) {
            const newLedgerInput = newLedgerGroup.querySelector('input');
            if (newLedgerInput) inputs.push(newLedgerInput);
        }
    }
    
    const amountGroup = form.querySelector('.amount-group');
    if (amountGroup && isElementVisible(amountGroup)) {
        const amountInput = amountGroup.querySelector('input[type="number"]');
        if (amountInput) inputs.push(amountInput);
    }
    
    const narration = form.querySelector('textarea');
    if (narration) inputs.push(narration);
    
    const actionBtns = form.querySelector('.action-btns');
    if (actionBtns && isElementVisible(actionBtns)) {
        const saveBtn = actionBtns.querySelector('.save-btn');
        const cancelBtn = actionBtns.querySelector('.cancel-btn');
        if (saveBtn) inputs.push(saveBtn);
        if (cancelBtn) inputs.push(cancelBtn);
    }
    
    return inputs;
}

// ==================== VISIBILITY CHECK ====================

function isElementVisible(element) {
    if (!element) return false;
    
    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    
    return style.display !== 'none' && 
           style.visibility !== 'hidden' && 
           style.opacity !== '0' &&
           rect.width > 0 && 
           rect.height > 0;
}

function announceCurrentPosition() {
    const active = document.activeElement;
    if (!active) return;
    
    let message = '';
    
    if (active.id.includes('date')) {
        message = 'Date field. Use arrow keys to select date.';
    } else if (active.type === 'radio') {
        message = `${active.value} option selected. Press Enter to confirm.`;
    } else if (active.tagName === 'SELECT') {
        const selected = active.options[active.selectedIndex]?.text || 'nothing selected';
        message = `Dropdown menu. Current selection: ${selected}. Use arrow keys to navigate, Enter to select.`;
    } else if (active.type === 'number') {
        message = 'Amount field. Enter numeric value.';
    } else if (active.classList.contains('save-btn')) {
        message = 'Save button. Press Enter to save.';
    }
    
    if (message) {
        announceToScreenReader(message);
    }
}

document.addEventListener('focusin', function(e) {
    announceCurrentPosition();
});

function handleEscapeKey() {
    const ledgerModal = document.getElementById('new-ledger-modal');
    const bankModal = document.getElementById('new-bank-modal');
    const manageModal = document.getElementById('manage-ledgers-modal');
    const deleteModal = document.getElementById('delete-ledger-modal');
    const subgroupModal = document.getElementById('new-subgroup-modal');
    
    if (ledgerModal.style.display === 'block') closeModal();
    if (bankModal.style.display === 'block') closeBankModal();
    if (manageModal.style.display === 'block') closeManageLedgersModal();
    if (deleteModal.style.display === 'block') closeDeleteLedgerModal();
    if (subgroupModal.style.display === 'block') closeSubGroupModal();
}

// ==================== TAB SWITCHING ====================
function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.dataset.tab === tabId) btn.classList.add('active');
    });

    document.querySelectorAll('.entry-form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');

    if(tabId === 'payment') resetForm('payment');
    if(tabId === 'receipt') resetForm('receipt');
    if(tabId === 'journal') resetJournal();
    
    setTimeout(() => {
        const firstInput = document.querySelector(`#${tabId} .date-picker`);
        if (firstInput) firstInput.focus();
    }, 100);
}

// ==================== PAYMENT/RECEIPT HANDLING ====================

function handleTypeChange(type) {
    console.log('handleTypeChange called for:', type);
    
    const paymentType = document.querySelector(`input[name="${type}-type"]:checked`).value;
    const bankSection = document.getElementById(`${type}-bank-section`);
    const entrySection = document.getElementById(`${type}-entry-section`);
    const actionBtns = document.querySelector(`#${type} .action-btns`);
    
    // Remove existing balance display
    removeBalanceAbove(type);
    
    // Reset fields
    const amountField = document.getElementById(`${type}-amount`);
    if (amountField) amountField.value = '';
    
    const ledgerInput = document.getElementById(`${type}-ledger-input`);
    if (ledgerInput) ledgerInput.value = '';
    
    const ledgerHidden = document.getElementById(`${type}-ledger`);
    if (ledgerHidden) ledgerHidden.value = '';
    
    if (paymentType === 'cash') {
        // Hide bank section, show entry section
        if (bankSection) bankSection.style.display = 'none';
        if (entrySection) entrySection.style.display = 'block';
        if (actionBtns) actionBtns.style.display = 'none';
        
        // Show cash balance
        showBalanceAboveAmount(type, 'cash');
        
        setTimeout(() => {
            const ledgerInputEl = document.getElementById(`${type}-ledger-input`);
            if (ledgerInputEl) ledgerInputEl.focus();
        }, 100);
        
    } else {
        // Show bank section, hide entry section until bank is selected
        if (bankSection) bankSection.style.display = 'block';
        if (entrySection) entrySection.style.display = 'none';
        if (actionBtns) actionBtns.style.display = 'none';
        
        setTimeout(() => {
            const bankInput = document.getElementById(`${type}-bank-input`);
            if (bankInput) bankInput.focus();
        }, 100);
    }
}

function filterLedgersByType(type) {
    const select = document.getElementById(`${type}-ledger`);
    if (!select) return;
    
    let options = '<option value="">-- select ledger --</option>';
    
    const groupedLedgers = {};
    
    const filteredLedgers = ledgers.filter(ledger => {
        if (type === 'payment') {
            return ledger.type === 'expense' || 
                   (ledger.type === 'asset' && ledger.category === 'payable') ||
                   ledger.category === 'payable';
        } else {
            return ledger.type === 'income' || 
                   (ledger.type === 'asset' && ledger.category === 'receivable') ||
                   ledger.category === 'receivable';
        }
    });
    
    filteredLedgers.forEach(ledger => {
        if(!groupedLedgers[ledger.type]) groupedLedgers[ledger.type] = [];
        groupedLedgers[ledger.type].push(ledger);
    });
    
    for(let type in groupedLedgers) {
        options += `<optgroup label="${type.toUpperCase()}">`;
        groupedLedgers[type].forEach(ledger => {
            options += `<option value="${ledger.id}">${ledger.name}</option>`;
        });
        options += '</optgroup>';
    }
    
    select.innerHTML = options;
}

function handleLedgerSelect(type) {
    const ledgerHidden = document.getElementById(`${type}-ledger`);
    const amountGroup = document.querySelector(`#${type} .amount-group`);
    const newLedgerGroup = document.querySelector(`#${type} .new-ledger-group`);
    const actionBtns = document.querySelector(`#${type} .action-btns`);
    
    // SAFETY CHECK
    if (!amountGroup) {
        console.log('amountGroup not found for', type);
        return;
    }
    
    if(ledgerHidden && ledgerHidden.value) {
        if (newLedgerGroup) newLedgerGroup.style.display = 'none';
        amountGroup.style.display = 'block';
        if (actionBtns) actionBtns.style.display = 'none';
        
        // Make sure subgroup section is visible
        updateSubGroupDatalist(type);
        
    } else {
        if (newLedgerGroup) newLedgerGroup.style.display = 'none';
        if (amountGroup) amountGroup.style.display = 'none';
        if (actionBtns) actionBtns.style.display = 'none';
    }
}

function handleAmountInput(type) {
    const amount = document.getElementById(`${type}-amount`).value;
    const actionBtns = document.querySelector(`#${type} .action-btns`);
    
    if(amount && parseFloat(amount) > 0) {
        actionBtns.style.display = 'flex';
    } else {
        actionBtns.style.display = 'none';
    }
}

function validateNewLedger(type) {
    const newLedger = document.getElementById(`${type}-new-ledger`).value;
    const actionBtns = document.querySelector(`#${type} .action-btns`);
    actionBtns.style.display = newLedger.trim() ? 'flex' : 'none';
}

// ==================== LEDGER MANAGEMENT ====================

function updateAllLedgerDropdowns() {
    updateLedgerDropdown('payment');
    updateLedgerDropdown('receipt');
    updateJournalLedgerDropdowns();
    
    // Also update datalists
    if (typeof updateLedgerDatalist === 'function') {
        updateLedgerDatalist('payment');
        updateLedgerDatalist('receipt');
    }
    if (typeof updateAllJournalLedgerDatalists === 'function') {
        updateAllJournalLedgerDatalists();
    }
}

function updateLedgerDropdown(type) {
    const select = document.getElementById(`${type}-ledger`);
    if(!select) return;
    
    let options = '<option value="">-- select ledger --</option>';
    
    const groupedLedgers = {};
    ledgers.forEach(ledger => {
        if(!groupedLedgers[ledger.type]) groupedLedgers[ledger.type] = [];
        groupedLedgers[ledger.type].push(ledger);
    });
    
    for(let type in groupedLedgers) {
        options += `<optgroup label="${type.toUpperCase()}">`;
        groupedLedgers[type].forEach(ledger => {
            options += `<option value="${ledger.id}">${ledger.name}</option>`;
        });
        options += '</optgroup>';
    }
    
    select.innerHTML = options;
}

function updateJournalLedgerDropdowns() {
    document.querySelectorAll('.journal-ledger-select').forEach(select => {
        let options = '<option value="">select ledger</option>';
        
        const groupedLedgers = {};
        ledgers.forEach(ledger => {
            if(!groupedLedgers[ledger.type]) groupedLedgers[ledger.type] = [];
            groupedLedgers[ledger.type].push(ledger);
        });
        
        for(let type in groupedLedgers) {
            options += `<optgroup label="${type.toUpperCase()}">`;
            groupedLedgers[type].forEach(ledger => {
                options += `<option value="${ledger.id}">${ledger.name}</option>`;
            });
            options += '</optgroup>';
        }
        
        select.innerHTML = options;
    });
}

// ==================== LEDGER MANAGEMENT FUNCTIONS ====================

function showManageLedgersModal() {
    loadLedgersList();
    document.getElementById('manage-ledgers-modal').style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('ledger-search').focus();
    }, 100);
}

function closeManageLedgersModal() {
    document.getElementById('manage-ledgers-modal').style.display = 'none';
}

function loadLedgersList() {
    const tbody = document.getElementById('ledger-list-body');
    if (!tbody) return;
    
    document.getElementById('total-ledgers-count').textContent = ledgers.length;
    
    let html = '';
    
    const sortedLedgers = [...ledgers].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedLedgers.forEach(ledger => {
        const transactionCount = transactions.filter(t => t.ledger === ledger.name).length;
        const canDelete = transactionCount === 0 && !isEssentialLedger(ledger.name);
        
        // Get group display name
        let groupDisplay = '-';
        if (ledger.group) {
            const groupList = ledger.type === 'income' ? pnlGroups.income : pnlGroups.expense;
            const found = groupList.find(g => g.value === ledger.group);
            groupDisplay = found ? found.label : ledger.group;
        }
        
        html += `
            <tr>
                <td>${ledger.id}</td>
                <td>${ledger.name}</td>
                <td><span class="badge" style="background: ${getLedgerTypeColor(ledger.type)}">${ledger.type}</span></td>
                <td>${ledger.category || '-'}</td>
                <td>${groupDisplay}</td>
                <td>
                    <span class="transaction-badge">${transactionCount}</span>
                </td>
                <td>
                    <button class="delete-ledger-btn" 
                            onclick="showDeleteLedgerModal(${ledger.id}, '${ledger.name}')"
                            ${!canDelete ? 'disabled' : ''}
                            title="${!canDelete ? (transactionCount > 0 ? 'Cannot delete: Has transactions' : 'Cannot delete: Essential ledger') : 'Delete ledger'}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

function getLedgerTypeColor(type) {
    const colors = {
        'asset': '#3c40c6',
        'liability': '#dc3545',
        'income': '#28a745',
        'expense': '#ffc107',
        'equity': '#17a2b8'
    };
    return colors[type] || '#6c757d';
}

function isEssentialLedger(ledgerName) {
    const essentialLedgers = ['cash', 'bank', 'sales', 'purchases', 'capital'];
    return essentialLedgers.some(essential => ledgerName.includes(essential));
}

function showDeleteLedgerModal(ledgerId, ledgerName) {
    document.getElementById('delete-ledger-id').value = ledgerId;
    document.getElementById('delete-ledger-name').value = ledgerName;
    document.getElementById('delete-ledger-message').textContent = 
        `Are you sure you want to delete "${ledgerName}"?`;
    document.getElementById('delete-ledger-modal').style.display = 'block';
}

function closeDeleteLedgerModal() {
    document.getElementById('delete-ledger-modal').style.display = 'none';
}

function confirmDeleteLedger() {
    const ledgerId = parseInt(document.getElementById('delete-ledger-id').value);
    const ledgerName = document.getElementById('delete-ledger-name').value;
    
    const transactionCount = transactions.filter(t => t.ledger === ledgerName).length;
    if (transactionCount > 0) {
        alert(`Cannot delete "${ledgerName}" because it has ${transactionCount} transaction(s).`);
        closeDeleteLedgerModal();
        loadLedgersList();
        return;
    }
    
    ledgers = ledgers.filter(l => l.id !== ledgerId);
    localStorage.setItem('ledgers', JSON.stringify(ledgers));
    
    updateAllLedgerDropdowns();
    loadLedgersList();
    closeDeleteLedgerModal();
    
    alert(`Ledger "${ledgerName}" deleted successfully!`);
}

function filterLedgers() {
    const searchTerm = document.getElementById('ledger-search').value.toLowerCase();
    const rows = document.querySelectorAll('#ledger-list-body tr');
    
    rows.forEach(row => {
        const ledgerName = row.cells[1]?.textContent.toLowerCase() || '';
        const ledgerType = row.cells[2]?.textContent.toLowerCase() || '';
        const ledgerCategory = row.cells[3]?.textContent.toLowerCase() || '';
        const ledgerGroup = row.cells[4]?.textContent.toLowerCase() || '';
        
        if (ledgerName.includes(searchTerm) || 
            ledgerType.includes(searchTerm) || 
            ledgerCategory.includes(searchTerm) ||
            ledgerGroup.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// ==================== JOURNAL FUNCTIONS ====================

// Helper function to check if a ledger is a bank
function isBankLedger(ledger) {
    return ledger.category === 'bank' || 
           ledger.name.toLowerCase().includes('bank') ||
           ledger.name.toLowerCase().startsWith('bank -');
}

function createJournalRow(isFirstRow = false, amount = '') {
    const row = document.createElement('div');
    row.className = 'journal-entry-row';
    // Set styles for 4 columns (ledger, debit, credit, remove)
    row.style.display = 'grid';
    row.style.gridTemplateColumns = '2fr 1fr 1fr auto';
    row.style.gap = '1rem';
    row.style.alignItems = 'end';
    row.style.marginBottom = '1rem';
    row.style.padding = '1.5rem';
    row.style.background = 'var(--bg-color)';
    row.style.borderRadius = '.5rem';
    
    // Generate unique ID for this row's datalist
    const ledgerUniqueId = 'journal-ledger-list-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    
    // Create Ledger Selection
    const ledgerContainer = document.createElement('div');
    ledgerContainer.className = 'form-group ledger-select-wrapper';
    ledgerContainer.innerHTML = `
        <label>ledger *</label>
        <div class="searchable-select-wrapper" style="width: 100%;">
            <input type="text" 
                   class="journal-ledger-input searchable-select" 
                   placeholder="Type to search ledger..." 
                   autocomplete="off"
                   list="${ledgerUniqueId}">
            <datalist id="${ledgerUniqueId}" class="journal-ledger-list"></datalist>
            <input type="hidden" class="journal-ledger-select">
            <button type="button" class="journal-new-ledger-btn" onclick="showJournalNewLedgerModal(this)">
                <i class="fas fa-plus"></i> new
            </button>
        </div>
    `;
    
    // Create Debit field
    const debitGroup = document.createElement('div');
    debitGroup.className = 'form-group';
    debitGroup.innerHTML = `
        <label>debit</label>
        <input type="number" class="journal-debit" value="${amount}" placeholder="0.00" min="0" step="any" oninput="updateJournalTotals(); validateJournalForSave();">
    `;
    
    // Create Credit field
    const creditGroup = document.createElement('div');
    creditGroup.className = 'form-group';
    if (isFirstRow) {
        creditGroup.innerHTML = `
            <label>credit</label>
            <input type="number" class="journal-credit" value="" placeholder="0.00" min="0" step="any" readonly disabled>
        `;
    } else {
        creditGroup.innerHTML = `
            <label>credit</label>
            <input type="number" class="journal-credit" value="" placeholder="0.00" min="0" step="any" oninput="updateJournalTotals(); validateJournalForSave();">
        `;
    }
    
    // Create Remove button
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-row-btn';
    removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
    removeBtn.onclick = function() { removeJournalRow(this); };
    removeBtn.style.display = 'none';
    
    // Add all to row
    row.appendChild(ledgerContainer);
    row.appendChild(debitGroup);
    row.appendChild(creditGroup);
    row.appendChild(removeBtn);
    
    // Initialize searchable functionality for this row
    setTimeout(() => {
        initJournalLedgerRow(row);
    }, 100);
    
    return row;
}

// Initialize journal ledger row with searchable functionality
function initJournalLedgerRow(row) {
    const ledgerInput = row.querySelector('.journal-ledger-input');
    const ledgerHidden = row.querySelector('.journal-ledger-select');
    const ledgerList = row.querySelector('.journal-ledger-list');
    
    if (!ledgerInput || !ledgerHidden || !ledgerList) return;
    
    // Populate datalist with ALL ledgers including banks
    let options = '';
    ledgers.forEach(ledger => {
        let displayName = ledger.name;
        if (ledger.category === 'bank' && ledger.accountNo) {
            displayName = `${ledger.name} (${ledger.accountNo})`;
        }
        options += `<option value="${displayName}">`;
    });
    ledgerList.innerHTML = options;
    
    // Handle input - search as you type
    ledgerInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        const matchedLedger = ledgers.find(l => 
            l.name.toLowerCase().includes(value)
        );
        
        if (matchedLedger) {
            ledgerHidden.value = matchedLedger.id;
        }
    });
    
    // Handle selection from datalist
    ledgerInput.addEventListener('change', function() {
        const value = this.value;
        const matchedLedger = ledgers.find(l => 
            l.name === value || 
            l.name.toLowerCase() === value.toLowerCase()
        );
        
        if (matchedLedger) {
            ledgerHidden.value = matchedLedger.id;
            // Display with account number if bank
            if (matchedLedger.category === 'bank' && matchedLedger.accountNo) {
                ledgerInput.value = `${matchedLedger.name} (${matchedLedger.accountNo})`;
            } else {
                ledgerInput.value = matchedLedger.name;
            }
            
            // Focus next field
            const debitInput = row.querySelector('.journal-debit');
            if (debitInput) {
                debitInput.focus();
            }
            
            validateJournalForSave();
        }
    });
    
    // Handle blur - try to match if input has value
    ledgerInput.addEventListener('blur', function() {
        if (!ledgerHidden.value && this.value) {
            const matchedLedger = ledgers.find(l => 
                l.name.toLowerCase() === this.value.toLowerCase()
            );
            
            if (matchedLedger) {
                ledgerHidden.value = matchedLedger.id;
                if (matchedLedger.category === 'bank' && matchedLedger.accountNo) {
                    this.value = `${matchedLedger.name} (${matchedLedger.accountNo})`;
                } else {
                    this.value = matchedLedger.name;
                }
            }
        }
    });
    
    // Handle Enter key - move to debit field
    ledgerInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            if (ledgerHidden.value) {
                const debitInput = row.querySelector('.journal-debit');
                if (debitInput) debitInput.focus();
            } else {
                const matchedLedger = ledgers.find(l => 
                    l.name.toLowerCase().includes(ledgerInput.value.toLowerCase())
                );
                
                if (matchedLedger) {
                    ledgerHidden.value = matchedLedger.id;
                    if (matchedLedger.category === 'bank' && matchedLedger.accountNo) {
                        ledgerInput.value = `${matchedLedger.name} (${matchedLedger.accountNo})`;
                    } else {
                        ledgerInput.value = matchedLedger.name;
                    }
                    
                    setTimeout(() => {
                        const debitInput = row.querySelector('.journal-debit');
                        if (debitInput) debitInput.focus();
                    }, 50);
                }
            }
        }
    });
}

// Initialize journal subgroup row with searchable functionality
function initJournalSubgroupRow(row) {
    const subgroupInput = row.querySelector('.journal-subgroup-input');
    const subgroupHidden = row.querySelector('.journal-subgroup-select');
    const subgroupList = row.querySelector('.journal-subgroup-list');
    const ledgerHidden = row.querySelector('.journal-ledger-select');
    
    if (!subgroupInput || !subgroupHidden || !subgroupList) return;
    
    // Function to update subgroup datalist based on selected ledger type
    function updateSubgroupDatalistForRow() {
        let groups = [];
        
        // If ledger is selected, filter subgroups by ledger type
        if (ledgerHidden && ledgerHidden.value) {
            const ledgerId = ledgerHidden.value;
            const ledger = ledgers.find(l => l.id == ledgerId);
            
            if (ledger) {
                // Get subgroups based on ledger type
                if (ledger.type === 'expense') {
                    groups = [...ledgerSubGroups.expense];
                } else if (ledger.type === 'asset') {
                    groups = [...ledgerSubGroups.asset];
                } else if (ledger.type === 'liability') {
                    groups = [...ledgerSubGroups.liability];
                } else if (ledger.type === 'income') {
                    groups = [...ledgerSubGroups.income];
                } else if (ledger.type === 'equity') {
                    groups = [...ledgerSubGroups.equity];
                }
                
                // Add custom subgroups of the same type
                const customGroups = customSubGroups.filter(g => g.type === ledger.type);
                groups = [...groups, ...customGroups];
            }
        } else {
            // If no ledger selected, show ALL subgroups (grouped by type)
            // This is helpful for users to see available options
            Object.keys(ledgerSubGroups).forEach(type => {
                groups = [...groups, ...ledgerSubGroups[type].map(g => ({
                    ...g,
                    type: type
                }))];
            });
            // Add all custom subgroups
            groups = [...groups, ...customSubGroups];
        }
        
        // Remove duplicates (by value)
        const uniqueGroups = [];
        const seen = new Set();
        groups.forEach(group => {
            if (!seen.has(group.value)) {
                seen.add(group.value);
                uniqueGroups.push(group);
            }
        });
        
        // Build datalist options
        let options = '';
        uniqueGroups.sort((a, b) => a.label.localeCompare(b.label)).forEach(group => {
            options += `<option value="${group.label}">`;
        });
        
        subgroupList.innerHTML = options;
    }
    
    // Initial update
    updateSubgroupDatalistForRow();
    
    // Watch for ledger changes
    const ledgerInput = row.querySelector('.journal-ledger-input');
    if (ledgerInput) {
        ledgerInput.addEventListener('change', updateSubgroupDatalistForRow);
        ledgerInput.addEventListener('blur', updateSubgroupDatalistForRow);
    }
    
    // Handle input - search as you type
    subgroupInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        
        // Get all possible groups
        let allGroups = [];
        Object.keys(ledgerSubGroups).forEach(type => {
            allGroups = [...allGroups, ...ledgerSubGroups[type]];
        });
        allGroups = [...allGroups, ...customSubGroups];
        
        const matchedGroup = allGroups.find(g => 
            g.label.toLowerCase().includes(value)
        );
        
        if (matchedGroup) {
            subgroupHidden.value = matchedGroup.value;
        }
    });
    
    // Handle selection from datalist
    subgroupInput.addEventListener('change', function() {
        const value = this.value;
        
        // Get all possible groups
        let allGroups = [];
        Object.keys(ledgerSubGroups).forEach(type => {
            allGroups = [...allGroups, ...ledgerSubGroups[type]];
        });
        allGroups = [...allGroups, ...customSubGroups];
        
        const matchedGroup = allGroups.find(g => 
            g.label === value || g.label.toLowerCase() === value.toLowerCase()
        );
        
        if (matchedGroup) {
            subgroupHidden.value = matchedGroup.value;
            this.value = matchedGroup.label;
            validateJournalForSave();
        }
    });
    
    // Handle blur
    subgroupInput.addEventListener('blur', function() {
        if (!subgroupHidden.value && this.value) {
            // Get all possible groups
            let allGroups = [];
            Object.keys(ledgerSubGroups).forEach(type => {
                allGroups = [...allGroups, ...ledgerSubGroups[type]];
            });
            allGroups = [...allGroups, ...customSubGroups];
            
            const matchedGroup = allGroups.find(g => 
                g.label.toLowerCase().includes(this.value.toLowerCase())
            );
            
            if (matchedGroup) {
                subgroupHidden.value = matchedGroup.value;
                this.value = matchedGroup.label;
            }
        }
    });
    
    // Handle Enter key - move to debit or credit
    subgroupInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            const isFirstRow = row === document.querySelector('.journal-entry-row:first-child');
            if (isFirstRow) {
                // First row - only debit is enabled
                const debitInput = row.querySelector('.journal-debit');
                if (debitInput) {
                    debitInput.focus();
                }
            } else {
                // Other rows - move to debit (user can tab to credit if needed)
                const debitInput = row.querySelector('.journal-debit');
                if (debitInput && !debitInput.readOnly) {
                    debitInput.focus();
                }
            }
        }
    });
}

// Update journal ledger datalist
function updateJournalLedgerDatalist(row) {
    const ledgerList = row.querySelector('.journal-ledger-list');
    if (!ledgerList) return;
    
    let options = '';
    
    // Show ALL ledgers including banks - NO FILTERING
    ledgers.forEach(ledger => {
        let displayName = ledger.name;
        if (ledger.category === 'bank' && ledger.accountNo) {
            displayName = `${ledger.name} (${ledger.accountNo})`;
        }
        options += `<option value="${displayName}">`;
    });
    
    ledgerList.innerHTML = options;
}

// Update journal subgroup datalist
function updateJournalSubgroupDatalist(row) {
    const subgroupList = row.querySelector('.journal-subgroup-list');
    const ledgerHidden = row.querySelector('.journal-ledger-select');
    
    if (!subgroupList || !ledgerHidden || !ledgerHidden.value) return;
    
    // Find the selected ledger
    const ledgerId = ledgerHidden.value;
    const ledger = ledgers.find(l => l.id == ledgerId);
    
    if (!ledger) return;
    
    // Determine subgroup type based on ledger type
    let groups = [];
    if (ledger.type === 'expense') {
        groups = [...ledgerSubGroups.expense];
    } else if (ledger.type === 'asset') {
        groups = [...ledgerSubGroups.asset];
    } else if (ledger.type === 'liability') {
        groups = [...ledgerSubGroups.liability];
    } else if (ledger.type === 'income') {
        groups = [...ledgerSubGroups.income];
    } else if (ledger.type === 'equity') {
        groups = [...ledgerSubGroups.equity];
    }
    
    // Add custom sub groups
    const customGroups = customSubGroups.filter(g => g.type === ledger.type);
    groups = [...groups, ...customGroups];
    
    // Build datalist options
    let options = '';
    groups.sort((a, b) => a.label.localeCompare(b.label)).forEach(group => {
        options += `<option value="${group.label}">`;
    });
    
    subgroupList.innerHTML = options;
}

// Update all journal ledger dropdowns when ledgers change
function updateAllJournalLedgerDatalists() {
    document.querySelectorAll('.journal-entry-row').forEach(row => {
        updateJournalLedgerDatalist(row);
        updateJournalSubgroupDatalist(row);
    });
}

// Update journal ledger dropdowns
function updateJournalLedgerDropdowns() {
    document.querySelectorAll('.journal-ledger-select').forEach(select => {
        let options = '<option value="">select ledger</option>';
        
        const groupedLedgers = {};
        
        // Show ALL ledgers including banks - NO FILTERING
        ledgers.forEach(ledger => {
            if(!groupedLedgers[ledger.type]) groupedLedgers[ledger.type] = [];
            groupedLedgers[ledger.type].push(ledger);
        });
        
        for(let type in groupedLedgers) {
            options += `<optgroup label="${type.toUpperCase()}">`;
            groupedLedgers[type].forEach(ledger => {
                // Check if bank has account number to display
                let displayName = ledger.name;
                if (ledger.category === 'bank' && ledger.accountNo) {
                    displayName = `${ledger.name} (${ledger.accountNo})`;
                }
                options += `<option value="${ledger.id}">${displayName}</option>`;
            });
            options += '</optgroup>';
        }
        
        select.innerHTML = options;
    });
}

function handleJournalLedgerSelect(select) {
    const row = select.closest('.journal-entry-row');
    const newLedgerBtn = row.querySelector('.journal-new-ledger-btn');
    const ledgerInput = row.querySelector('.journal-ledger-input');
    
    if(select.value === 'new') {
        if (ledgerInput) ledgerInput.style.display = 'none';
        select.style.display = 'none';
        newLedgerBtn.style.display = 'none';
        
        if(!row.querySelector('.journal-new-ledger-input-group')) {
            const newLedgerDiv = document.createElement('div');
            newLedgerDiv.className = 'form-group journal-new-ledger-input-group';
            newLedgerDiv.innerHTML = `
                <label>new ledger name *</label>
                <div class="new-ledger-input-wrapper">
                    <input type="text" class="journal-new-ledger" placeholder="enter ledger name" oninput="validateJournalForSave()">
                    <button type="button" class="new-ledger-cancel-btn" onclick="cancelJournalNewLedger(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            const ledgerContainer = row.querySelector('.ledger-select-wrapper');
            ledgerContainer.parentNode.insertBefore(newLedgerDiv, ledgerContainer.nextSibling);
            
            setTimeout(() => {
                const newLedgerInput = row.querySelector('.journal-new-ledger');
                if (newLedgerInput) newLedgerInput.focus();
            }, 100);
        }
    } else if(select.value) {
        const selectedLedger = ledgers.find(l => l.id == select.value);
        if (selectedLedger && ledgerInput) {
            ledgerInput.value = selectedLedger.name;
            updateJournalSubgroupDatalist(row);
        }
        
        const isFirstRow = row === document.querySelector('.journal-entry-row');
        
        if (isFirstRow) {
            const debitInput = row.querySelector('.journal-debit');
            if (debitInput) debitInput.focus();
        } else {
            const debitInput = row.querySelector('.journal-debit');
            const creditInput = row.querySelector('.journal-credit');
            
            if (debitInput && !debitInput.readOnly) {
                debitInput.focus();
            } else if (creditInput && !creditInput.readOnly) {
                creditInput.focus();
            }
        }
        
        validateJournalForSave();
    }
}

function showJournalNewSubGroupModal(btn) {
    console.log('Opening journal new subgroup modal'); // Debug
    
    const row = btn.closest('.journal-entry-row');
    if (!row) {
        console.error('No row found for button');
        return;
    }
    
    const rows = document.querySelectorAll('.journal-entry-row');
    const rowIndex = Array.from(rows).indexOf(row);
    
    // Get ledger type from the row to set default group type
    const ledgerHidden = row.querySelector('.journal-ledger-select');
    let ledgerType = 'asset';
    
    if (ledgerHidden && ledgerHidden.value) {
        const ledger = ledgers.find(l => l.id == ledgerHidden.value);
        if (ledger) {
            ledgerType = ledger.type;
        }
    }
    
    // Create modal if it doesn't exist
    if (!document.getElementById('new-subgroup-modal')) {
        createSubGroupModal();
    }
    
    // Set values
    document.getElementById('subgroup-modal-form-type').value = 'journal';
    document.getElementById('journal-subgroup-row-id').value = rowIndex;
    document.getElementById('modal-subgroup-name').value = '';
    document.getElementById('modal-subgroup-type').value = ledgerType;
    
    // Show modal
    document.getElementById('new-subgroup-modal').style.display = 'block';
    
    // Focus on input
    setTimeout(() => {
        const nameInput = document.getElementById('modal-subgroup-name');
        if (nameInput) nameInput.focus();
    }, 100);
}

function cancelJournalNewLedger(btn) {
    const row = btn.closest('.journal-entry-row');
    const newLedgerGroup = row.querySelector('.journal-new-ledger-input-group');
    const ledgerSelect = row.querySelector('.journal-ledger-select');
    const newLedgerBtn = row.querySelector('.journal-new-ledger-btn');
    const ledgerInput = row.querySelector('.journal-ledger-input');
    
    if(newLedgerGroup) newLedgerGroup.remove();
    
    if (ledgerInput) ledgerInput.style.display = 'block';
    ledgerSelect.style.display = 'block';
    newLedgerBtn.style.display = 'block';
    ledgerSelect.value = '';
    
    setTimeout(() => {
        if (ledgerInput) ledgerInput.focus();
    }, 100);
    
    validateJournalForSave();
}

function showJournalNewLedgerModal(btn) {
    const row = btn.closest('.journal-entry-row');
    const rows = document.querySelectorAll('.journal-entry-row');
    const rowIndex = Array.from(rows).indexOf(row);
    
    document.getElementById('modal-entry-type').value = 'journal';
    document.getElementById('modal-row-id').value = rowIndex;
    document.getElementById('modal-ledger-name').value = '';
    document.getElementById('modal-ledger-type').value = 'asset';
    document.getElementById('new-ledger-modal').style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('modal-ledger-name').focus();
    }, 100);
}

function addJournalRow() {
    const container = document.querySelector('.journal-entries');
    const newRow = createJournalRow(false);
    container.appendChild(newRow);
    
    updateJournalLedgerDropdowns();
    
    if(document.querySelectorAll('.journal-entry-row').length > 1) {
        document.querySelectorAll('.remove-row-btn').forEach(btn => {
            btn.style.display = 'block';
        });
    }
    
    setTimeout(() => {
        const ledgerSelect = newRow.querySelector('.journal-ledger-select');
        if (ledgerSelect) ledgerSelect.focus();
    }, 100);
    
    validateJournalForSave();
}

function removeJournalRow(btn) {
    const row = btn.closest('.journal-entry-row');
    const rows = document.querySelectorAll('.journal-entry-row');
    const isFirstRow = rows[0] === row;
    
    if(isFirstRow) {
        alert('Cannot remove the first row');
        return;
    }
    
    const prevRow = row.previousElementSibling;
    row.remove();
    
    if(document.querySelectorAll('.journal-entry-row').length === 1) {
        const remainingBtn = document.querySelector('.remove-row-btn');
        if(remainingBtn) remainingBtn.style.display = 'none';
    }
    
    if (prevRow) {
        setTimeout(() => {
            const ledgerSelect = prevRow.querySelector('.journal-ledger-select');
            if (ledgerSelect) ledgerSelect.focus();
        }, 100);
    }
    
    updateJournalTotals();
    validateJournalForSave();
}

function updateJournalTotals() {
    let totalDebit = 0;
    let totalCredit = 0;
    
    document.querySelectorAll('.journal-entry-row').forEach(row => {
        const debit = parseFloat(row.querySelector('.journal-debit')?.value) || 0;
        const credit = parseFloat(row.querySelector('.journal-credit')?.value) || 0;
        
        totalDebit += debit;
        totalCredit += credit;
    });
    
    document.getElementById('total-debit').textContent = totalDebit.toFixed(2);
    document.getElementById('total-credit').textContent = totalCredit.toFixed(2);
    
    const debitSpan = document.getElementById('total-debit');
    const creditSpan = document.getElementById('total-credit');
    
    if(Math.abs(totalDebit - totalCredit) > 0.01) {
        debitSpan.style.color = '#dc3545';
        creditSpan.style.color = '#dc3545';
    } else {
        debitSpan.style.color = 'var(--main-color)';
        creditSpan.style.color = 'var(--main-color)';
    }
}

function validateJournalForSave() {
    let allValid = true;
    let hasAtLeastOneEntry = false;
    let totalDebit = 0;
    let totalCredit = 0;
    
    document.querySelectorAll('.journal-entry-row').forEach((row, index) => {
        const ledgerSelect = row.querySelector('.journal-ledger-select');
        const newLedgerInput = row.querySelector('.journal-new-ledger');
        const debit = parseFloat(row.querySelector('.journal-debit')?.value) || 0;
        const credit = parseFloat(row.querySelector('.journal-credit')?.value) || 0;
        
        totalDebit += debit;
        totalCredit += credit;
        
        const hasLedger = (ledgerSelect && ledgerSelect.value && ledgerSelect.value !== 'new') || 
                         (newLedgerInput && newLedgerInput.value.trim());
        const hasAmount = debit > 0 || credit > 0;
        
        if (index === 0 && credit > 0) {
            allValid = false;
        }
        
        if(hasAmount) hasAtLeastOneEntry = true;
        if(hasAmount && !hasLedger) allValid = false;
    });
    
    const rows = document.querySelectorAll('.journal-entry-row');
    const hasDebitRow = Array.from(rows).some(row => parseFloat(row.querySelector('.journal-debit')?.value) > 0);
    
    const canSaveSingleRow = rows.length === 1 && hasDebitRow && totalDebit > 0 && totalCredit === 0;
    const canSaveMultiRow = rows.length > 1 && hasDebitRow && totalDebit > 0 && totalCredit > 0 && 
                           Math.abs(totalDebit - totalCredit) < 0.01;
    
    const saveBtn = document.querySelector('#journal .save-btn');
    if(saveBtn) {
        const canSave = allValid && hasAtLeastOneEntry && (canSaveSingleRow || canSaveMultiRow);
        saveBtn.disabled = !canSave;
    }
}

function resetJournal() {
    const container = document.querySelector('.journal-entries');
    container.innerHTML = '';
    
    const firstRow = createJournalRow(true);
    container.appendChild(firstRow);
    
    updateJournalLedgerDropdowns();
    updateJournalTotals();
    document.getElementById('journal-narration').value = '';
    
    const removeBtn = document.querySelector('.remove-row-btn');
    if(removeBtn) removeBtn.style.display = 'none';
    
    validateJournalForSave();
    
    setTimeout(() => {
        const ledgerSelect = firstRow.querySelector('.journal-ledger-select');
        if (ledgerSelect) ledgerSelect.focus();
    }, 100);
}

// ==================== MODAL FUNCTIONS ====================

function showNewLedgerModal(type) {
    console.log('Opening new ledger modal for type:', type);
    
    document.getElementById('modal-entry-type').value = type;
    document.getElementById('modal-row-id').value = '';
    document.getElementById('modal-ledger-name').value = '';
    document.getElementById('modal-ledger-type').value = 'asset';
    
    // Update group dropdown
    updateGroupDropdown();
    
    // Update help text
    const helpText = document.getElementById('group-help-text');
    if (helpText) {
        if (type === 'journal') {
            helpText.innerHTML = 'Select where this ledger appears in Balance Sheet or P&L';
        } else if (type === 'payment') {
            helpText.innerHTML = 'Select the expense group for this ledger';
        } else if (type === 'receipt') {
            helpText.innerHTML = 'Select the income group for this ledger';
        }
    }
    
    document.getElementById('new-ledger-modal').style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('modal-ledger-name').focus();
    }, 100);
}

function closeModal() {
    document.getElementById('new-ledger-modal').style.display = 'none';
    
    const entryType = document.getElementById('modal-entry-type').value;
    if (entryType === 'journal') {
        const rowId = document.getElementById('modal-row-id').value;
        if (rowId !== '') {
            const rows = document.querySelectorAll('.journal-entry-row');
            const targetRow = rows[parseInt(rowId)];
            if (targetRow) {
                const ledgerSelect = targetRow.querySelector('.journal-ledger-select');
                if (ledgerSelect) ledgerSelect.focus();
            }
        }
    } else if (entryType === 'payment' || entryType === 'receipt') {
        const ledgerSelect = document.getElementById(`${entryType}-ledger`);
        if (ledgerSelect) ledgerSelect.focus();
    }
}

// Replace the createNewLedger function in accounting.js
function createNewLedger() {
    const name = document.getElementById('modal-ledger-name').value.trim();
    const type = document.getElementById('modal-ledger-type').value;
    const group = document.getElementById('modal-ledger-group').value;
    const entryType = document.getElementById('modal-entry-type').value;
    const rowId = document.getElementById('modal-row-id').value;
    
    if(!name) {
        alert('Please enter a ledger name');
        document.getElementById('modal-ledger-name').focus();
        return;
    }
    
    // Validate that a group is selected
    if(!group) {
        alert('Please select a group for this ledger');
        document.getElementById('modal-ledger-group').focus();
        return;
    }
    
    // Check if ledger already exists
    if (ledgers && Array.isArray(ledgers)) {
        const exists = ledgers.some(l => 
            l && l.name && typeof l.name === 'string' && 
            l.name.toLowerCase() === name.toLowerCase()
        );
        
        if (exists) {
            alert('Ledger already exists');
            document.getElementById('modal-ledger-name').focus();
            return;
        }
    }
    
    let category = type;
    let assignedGroup = group;
    
    // Auto-set category based on name patterns
    if (name.toLowerCase().includes('bank')) {
        category = 'bank';
        assignedGroup = 'current_asset';
    } else if (type === 'asset' && name.toLowerCase().includes('cash')) {
        category = 'cash';
        assignedGroup = 'current_asset';
    } else if (type === 'asset' && name.toLowerCase().includes('receivable')) {
        category = 'receivable';
        assignedGroup = 'receivable';
    } else if (type === 'liability' && name.toLowerCase().includes('payable')) {
        category = 'payable';
        assignedGroup = 'payable';
    } else if (type === 'expense') {
        category = 'expense';
    } else if (type === 'income') {
        category = 'income';
    }
    
    // Make sure ledgers is an array
    if (!ledgers) ledgers = [];
    
    const newLedger = {
        id: ledgers.length + 1,
        name: name.toLowerCase(),
        type: type,
        category: category,
        group: assignedGroup || ''
    };
    
    ledgers.push(newLedger);
    localStorage.setItem('ledgers', JSON.stringify(ledgers));
    updateAllLedgerDropdowns();
    
    // Handle based on entry type
    if(entryType === 'payment' || entryType === 'receipt') {
        const ledgerSelect = document.getElementById(`${entryType}-ledger`);
        const ledgerInput = document.getElementById(`${entryType}-ledger-input`);
        
        if (ledgerSelect) {
            ledgerSelect.value = newLedger.id;
        }
        if (ledgerInput) {
            ledgerInput.value = newLedger.name;
            const ledgerHidden = document.getElementById(`${entryType}-ledger`);
            if (ledgerHidden) ledgerHidden.value = newLedger.id;
        }
        handleLedgerSelect(entryType);
    } else if(entryType === 'journal' && rowId !== '') {
        const rows = document.querySelectorAll('.journal-entry-row');
        const targetRow = rows[parseInt(rowId)];
        
        if(targetRow) {
            const select = targetRow.querySelector('.journal-ledger-select');
            const ledgerInput = targetRow.querySelector('.journal-ledger-input');
            const newLedgerBtn = targetRow.querySelector('.journal-new-ledger-btn');
            const newLedgerGroup = targetRow.querySelector('.journal-new-ledger-input-group');
            
            if(select) {
                select.value = newLedger.id;
                select.style.display = 'block';
                select.dispatchEvent(new Event('change', { bubbles: true }));
            }
            
            if(ledgerInput) {
                ledgerInput.value = newLedger.name;
                ledgerInput.style.display = 'block';
            }
            
            if(newLedgerBtn) newLedgerBtn.style.display = 'block';
            if(newLedgerGroup) newLedgerGroup.remove();
            
            validateJournalForSave();
        }
    }
    
    closeModal();
}

// ==================== SAVE FUNCTIONS ====================
function saveEntry(type) {
    console.log('========== SAVE ENTRY DEBUG ==========');
    console.log('Saving entry type:', type);
    
    // Get form values
    const date = document.getElementById(`${type}-date`)?.value || '';
    const voucher = document.getElementById(`${type}-voucher`)?.value || '';
    const paymentType = document.querySelector(`input[name="${type}-type"]:checked`)?.value;
    const amount = parseFloat(document.getElementById(`${type}-amount`)?.value) || 0;
    const narration = document.getElementById(`${type}-narration`)?.value || '';
    
    // Validate amount
    const amountValidation = validateAmount(amount, 'Amount');
    if (!amountValidation.valid) {
        alert(amountValidation.message);
        document.getElementById(`${type}-amount`).focus();
        return;
    }
    
    let ledgerId = document.getElementById(`${type}-ledger`)?.value || '';
    
    // Initialize variables for cash/bank ledger
    let cashBankLedgerId = null;
    let cashBankLedgerName = '';
    let bankName = '';
    
    // Handle BANK selection
    if (paymentType === 'bank') {
        const bankHidden = document.getElementById(`${type}-bank`);
        bankName = bankHidden ? bankHidden.value : '';
        
        if (!bankName) {
            const bankInput = document.getElementById(`${type}-bank-input`);
            if (bankInput && bankInput.value) {
                const matchedBank = banks.find(b => 
                    b.displayName.toLowerCase() === bankInput.value.toLowerCase() ||
                    b.name.toLowerCase() === bankInput.value.toLowerCase()
                );
                if (matchedBank) {
                    bankName = matchedBank.name;
                    if (bankHidden) bankHidden.value = matchedBank.name;
                }
            }
        }
        
        // ACCOUNT NUMBER REMOVED - no longer needed
        
        if (!bankName) {
            alert('Please select a bank');
            const bankInput = document.getElementById(`${type}-bank-input`);
            if (bankInput) bankInput.focus();
            return;
        }
        
        // Find or create bank ledger
        let bankLedger = ledgers.find(l => l.name.toLowerCase() === bankName.toLowerCase());
        
        if (bankLedger) {
            cashBankLedgerId = bankLedger.id;
            cashBankLedgerName = bankLedger.name;
            if (!bankLedger.group || bankLedger.group === '') {
                bankLedger.group = 'current_asset';
                localStorage.setItem('ledgers', JSON.stringify(ledgers));
            }
        } else {
            const newBankLedger = {
                id: ledgers.length + 1,
                name: bankName.toLowerCase(),
                type: 'asset',
                category: 'bank',
                group: 'current_asset'
            };
            ledgers.push(newBankLedger);
            localStorage.setItem('ledgers', JSON.stringify(ledgers));
            cashBankLedgerId = newBankLedger.id;
            cashBankLedgerName = newBankLedger.name;
            updateAllLedgerDropdowns();
        }
    } 
    // Handle CASH selection
    else {
        const cashLedger = ledgers.find(l => l.name.toLowerCase() === 'cash');
        if (cashLedger) {
            cashBankLedgerId = cashLedger.id;
            cashBankLedgerName = cashLedger.name;
            if (!cashLedger.group || cashLedger.group === '') {
                cashLedger.group = 'current_asset';
                localStorage.setItem('ledgers', JSON.stringify(ledgers));
            }
        } else {
            alert('Cash ledger not found! Please create a cash ledger first.');
            return;
        }
    }
    
    // Validate required fields
    if(!date) {
        alert('Please select a date');
        document.getElementById(`${type}-date`).focus();
        return;
    }
    
    // Get ledger ID from input if hidden is empty
    if (!ledgerId) {
        const ledgerInput = document.getElementById(`${type}-ledger-input`);
        if (ledgerInput && ledgerInput.value) {
            const matchedLedger = ledgers.find(l => 
                l.name.toLowerCase() === ledgerInput.value.toLowerCase()
            );
            if (matchedLedger) {
                ledgerId = matchedLedger.id;
                const ledgerHidden = document.getElementById(`${type}-ledger`);
                if (ledgerHidden) ledgerHidden.value = matchedLedger.id;
            }
        }
    }
    
    if (!ledgerId) {
        alert('Please select a ledger');
        const ledgerInput = document.getElementById(`${type}-ledger-input`);
        if (ledgerInput) ledgerInput.focus();
        return;
    }
    
    if (!cashBankLedgerId) {
        alert(`Could not find ${paymentType} ledger`);
        return;
    }
    
    // Handle new ledger creation
    const newLedgerName = document.getElementById(`${type}-new-ledger`)?.value.trim() || '';
    
    if(ledgerId === 'new') {
        if(!newLedgerName) {
            alert('Please enter a ledger name');
            document.getElementById(`${type}-new-ledger`).focus();
            return;
        }
        
        let existingLedger = ledgers.find(l => l.name.toLowerCase() === newLedgerName.toLowerCase());
        if(existingLedger) {
            ledgerId = existingLedger.id;
        } else {
            let ledgerType = type === 'payment' ? 'expense' : 'income';
            let category = type === 'payment' ? 'expense' : 'income';
            
            const newLedger = {
                id: ledgers.length + 1,
                name: newLedgerName.toLowerCase(),
                type: ledgerType,
                category: category,
                group: ''
            };
            ledgers.push(newLedger);
            localStorage.setItem('ledgers', JSON.stringify(ledgers));
            ledgerId = newLedger.id;
            updateAllLedgerDropdowns();
        }
    }
    
    // Get the selected ledger
    const otherLedger = ledgers.find(l => l.id == ledgerId);
    if(!otherLedger) {
        alert('Selected ledger not found');
        return;
    }
    
    // Get subgroup from the selected ledger's group
    let subgroupValue = otherLedger.group || '';
    
    // If still empty, assign a default based on ledger type
    if (!subgroupValue) {
        if (otherLedger.type === 'income') subgroupValue = 'operating_revenue';
        else if (otherLedger.type === 'expense') subgroupValue = 'operating_expense';
        else if (otherLedger.type === 'asset') subgroupValue = 'current_asset';
        else if (otherLedger.type === 'liability') subgroupValue = 'current_liability';
        else if (otherLedger.type === 'equity') subgroupValue = 'capital';
    }
    
    // Create transaction description
    let transactionNarration = narration;
    if (paymentType === 'bank' && bankName) {
        transactionNarration = narration || `${type === 'payment' ? 'Payment' : 'Receipt'} via ${bankName}`;
    }
    
    // Create double-entry transactions
    const transactions_to_add = [];
    const baseId = Date.now();
    
    if (type === 'payment') {
        // PAYMENT: Cash/Bank is CREDIT, Other ledger is DEBIT
        transactions_to_add.push({
            id: baseId,
            date: date,
            voucher: voucher,
            type: type,
            ledger: cashBankLedgerName,
            payment_type: paymentType,
            bank_name: paymentType === 'bank' ? bankName : null,
            amount: amount,
            debit: 0,
            credit: amount,
            subgroup: 'current_asset',
            narration: transactionNarration || `Payment made - ${otherLedger.name}`,
            entry_type: type
        });
        
        transactions_to_add.push({
            id: baseId + 1,
            date: date,
            voucher: voucher,
            type: type,
            ledger: otherLedger.name,
            payment_type: paymentType,
            bank_name: paymentType === 'bank' ? bankName : null,
            amount: amount,
            debit: amount,
            credit: 0,
            subgroup: subgroupValue,
            narration: transactionNarration || `Payment made - ${cashBankLedgerName}`,
            entry_type: type
        });
    } 
    else {
        // RECEIPT: Cash/Bank is DEBIT, Other ledger is CREDIT
        transactions_to_add.push({
            id: baseId,
            date: date,
            voucher: voucher,
            type: type,
            ledger: cashBankLedgerName,
            payment_type: paymentType,
            bank_name: paymentType === 'bank' ? bankName : null,
            amount: amount,
            debit: amount,
            credit: 0,
            subgroup: 'current_asset',
            narration: transactionNarration || `Receipt received - ${otherLedger.name}`,
            entry_type: type
        });
        
        transactions_to_add.push({
            id: baseId + 1,
            date: date,
            voucher: voucher,
            type: type,
            ledger: otherLedger.name,
            payment_type: paymentType,
            bank_name: paymentType === 'bank' ? bankName : null,
            amount: amount,
            debit: 0,
            credit: amount,
            subgroup: subgroupValue,
            narration: transactionNarration || `Receipt received - ${cashBankLedgerName}`,
            entry_type: type
        });
    }
    
    // Save to localStorage
    transactions = [...transactions, ...transactions_to_add];
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    // Update UI
    displayRecentTransactions();
    updateVoucherNumbers();
    resetForm(type);
    
    alert(`${type} entry saved successfully!\n\n` +
          `Transaction Details:\n` +
          `Date: ${date}\n` +
          `Voucher: ${voucher}\n` +
          `Amount: ${amount.toFixed(2)}\n` +
          `Cash/Bank: ${cashBankLedgerName} (${type === 'payment' ? 'CREDIT' : 'DEBIT'})\n` +
          `Other Ledger: ${otherLedger.name} (${type === 'payment' ? 'DEBIT' : 'CREDIT'})`);
}

// ==================== RESET FORM FUNCTION ====================
function resetForm(type) {
    console.log('Resetting form:', type);
    
    // Remove balance display
    removeBalanceAbove(type);
    
    // Clear all input fields
    const amountField = document.getElementById(`${type}-amount`);
    if (amountField) amountField.value = '';
    
    // Clear ledger fields
    const ledgerInput = document.getElementById(`${type}-ledger-input`);
    if (ledgerInput) ledgerInput.value = '';
    
    const ledgerHidden = document.getElementById(`${type}-ledger`);
    if (ledgerHidden) ledgerHidden.value = '';
    
    const newLedgerField = document.getElementById(`${type}-new-ledger`);
    if (newLedgerField) newLedgerField.value = '';
    
    // Clear bank fields
    const bankInput = document.getElementById(`${type}-bank-input`);
    if (bankInput) bankInput.value = '';
    
    const bankHidden = document.getElementById(`${type}-bank`);
    if (bankHidden) bankHidden.value = '';
     
    // Clear narration
    const narrationField = document.getElementById(`${type}-narration`);
    if (narrationField) narrationField.value = '';
    
    // Hide all groups
    const bankGroup = document.querySelector(`#${type} .bank-group`);
    if (bankGroup) bankGroup.style.display = 'none';
    
    const accountGroup = document.querySelector(`#${type} .account-group`);
    if (accountGroup) accountGroup.style.display = 'none';
    
    const ledgerGroup = document.querySelector(`#${type} .ledger-group`);
    if (ledgerGroup) ledgerGroup.style.display = 'none';
    
    const amountGroup = document.querySelector(`#${type} .amount-group`);
    if (amountGroup) amountGroup.style.display = 'none';
    
    const actionBtns = document.querySelector(`#${type} .action-btns`);
    if (actionBtns) actionBtns.style.display = 'none';
    
    const newLedgerGroup = document.querySelector(`#${type} .new-ledger-group`);
    if (newLedgerGroup) newLedgerGroup.style.display = 'none';
    
    // Reset radio to cash
    const cashRadio = document.querySelector(`input[name="${type}-type"][value="cash"]`);
    if (cashRadio) cashRadio.checked = true;
}

// ==================== CANCEL ENTRY FUNCTION ====================
function cancelEntry(type) {
    if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
        resetForm(type);
        
        setTimeout(() => {
            const dateField = document.getElementById(`${type}-date`);
            if (dateField) dateField.focus();
        }, 100);
    }
}

// ==================== SAVE JOURNAL FUNCTION ====================

function saveJournal() {
    console.log('Saving journal entry');
    
    const date = document.getElementById('journal-date').value;
    const voucher = document.getElementById('journal-voucher').value;
    const narration = document.getElementById('journal-narration').value;
    
    if(!date) {
        alert('Please select a date');
        document.getElementById('journal-date').focus();
        return;
    }
    
    const rows = [];
    let totalDebit = 0;
    let totalCredit = 0;
    let hasErrors = false;
    
    const journalRows = document.querySelectorAll('.journal-entry-row');
    
    journalRows.forEach((row, index) => {
        const ledgerHidden = row.querySelector('.journal-ledger-select');
        const ledgerInput = row.querySelector('.journal-ledger-input');
        const newLedgerInput = row.querySelector('.journal-new-ledger');
        const debit = parseFloat(row.querySelector('.journal-debit')?.value) || 0;
        const credit = parseFloat(row.querySelector('.journal-credit')?.value) || 0;
        
        // Validate amounts
        if (debit < 0) {
            alert(`Row ${index + 1}: Debit amount cannot be negative`);
            hasErrors = true;
            return;
        }
        
        if (credit < 0) {
            alert(`Row ${index + 1}: Credit amount cannot be negative`);
            hasErrors = true;
            return;
        }
        
        // First row cannot have credit
        if (index === 0 && credit > 0) {
            alert('First row cannot have credit amount');
            hasErrors = true;
            return;
        }
        
        // Get ledger ID
        let ledgerId = ledgerHidden ? ledgerHidden.value : null;
        
        if (!ledgerId && ledgerInput && ledgerInput.value) {
            const matchedLedger = ledgers.find(l => 
                l.name.toLowerCase() === ledgerInput.value.toLowerCase()
            );
            if (matchedLedger) {
                ledgerId = matchedLedger.id;
                if (ledgerHidden) ledgerHidden.value = matchedLedger.id;
            }
        }
        
        const newLedgerName = newLedgerInput ? newLedgerInput.value.trim() : '';
        
        // Skip empty rows
        if(!ledgerId && !newLedgerName && debit === 0 && credit === 0) return;
        
        // Handle new ledger creation
        if(ledgerId === 'new' || (!ledgerId && newLedgerName)) {
            if(!newLedgerName) {
                alert('Please enter a name for the new ledger');
                hasErrors = true;
                return;
            }
            
            let existingLedger = ledgers.find(l => l.name.toLowerCase() === newLedgerName.toLowerCase());
            if(existingLedger) {
                ledgerId = existingLedger.id;
            } else {
                const newLedger = {
                    id: ledgers.length + 1,
                    name: newLedgerName.toLowerCase(),
                    type: 'asset',
                    category: 'asset',
                    group: ''
                };
                ledgers.push(newLedger);
                localStorage.setItem('ledgers', JSON.stringify(ledgers));
                ledgerId = newLedger.id;
                updateAllLedgerDropdowns();
            }
        }
        
        // Validate row has ledger and amount
        if(ledgerId && (debit > 0 || credit > 0)) {
            const ledger = ledgers.find(l => l.id == ledgerId);
            if(ledger) {
                // Get subgroup from the ledger's group
                let subgroupValue = ledger.group || '';
                
                // If still empty, assign a default based on ledger type
                if (!subgroupValue) {
                    if (ledger.type === 'income') subgroupValue = 'operating_revenue';
                    else if (ledger.type === 'expense') subgroupValue = 'operating_expense';
                    else if (ledger.type === 'asset') subgroupValue = 'current_asset';
                    else if (ledger.type === 'liability') subgroupValue = 'current_liability';
                    else if (ledger.type === 'equity') subgroupValue = 'capital';
                }
                
                rows.push({ 
                    ledger: ledger.name, 
                    debit: debit, 
                    credit: credit,
                    subgroup: subgroupValue
                });
                
                totalDebit += debit;
                totalCredit += credit;
            }
        } else if(ledgerId || debit > 0 || credit > 0) {
            alert(`Please complete all fields in row ${index + 1}`);
            hasErrors = true;
            return;
        }
    });
    
    if(hasErrors) return;
    
    if(rows.length === 0) {
        alert('Please add at least one journal entry');
        return;
    }
    
    // Validate totals
    if(rows.length === 1) {
        if(totalDebit === 0) {
            alert('Please enter a debit amount');
            return;
        }
        if(totalCredit > 0) {
            alert('Single row cannot have credit amount');
            return;
        }
        
        const cashLedger = ledgers.find(l => l.name.toLowerCase() === 'cash');
        if (!cashLedger) {
            alert('Cash ledger not found! Please create a cash ledger.');
            return;
        }
        
        rows.push({
            ledger: cashLedger.name,
            debit: 0,
            credit: totalDebit,
            subgroup: 'current_asset'
        });
        
        totalCredit = totalDebit;
        
    } else {
        if(Math.abs(totalDebit - totalCredit) > 0.01) {
            alert(`Total debit (${totalDebit.toFixed(2)}) must equal total credit (${totalCredit.toFixed(2)})`);
            return;
        }
    }
    
    // Create transaction entries
    const transactions_to_add = [];
    const baseId = Date.now();
    
    rows.forEach((row, index) => {
        transactions_to_add.push({
            id: baseId + index,
            date: date,
            voucher: voucher,
            type: 'journal',
            ledger: row.ledger,
            debit: row.debit,
            credit: row.credit,
            subgroup: row.subgroup || '',
            narration: narration || 'Journal entry',
            entry_type: 'journal'
        });
    });
    
    // Save to localStorage
    transactions = [...transactions, ...transactions_to_add];
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    // Update displays
    updateAllLedgerDropdowns();
    displayRecentTransactions();
    updateVoucherNumbers();
    resetJournal();
    
    alert('Journal entry saved successfully!');
}
// ==================== UTILITY FUNCTIONS ====================

function updateVoucherNumbers() {
    const today = new Date();
    const year = today.getFullYear();
    const todayStr = today.toISOString().split('T')[0];
    
    const todayPayments = transactions.filter(t => t.type === 'payment' && t.date === todayStr).length;
    const todayReceipts = transactions.filter(t => t.type === 'receipt' && t.date === todayStr).length;
    const todayJournals = transactions.filter(t => t.type === 'journal' && t.date === todayStr).length;
    
    // Check if elements exist before setting values
    const paymentVoucher = document.getElementById('payment-voucher');
    if (paymentVoucher) {
        paymentVoucher.value = `PAY-${year}-${String(todayPayments + 1).padStart(3, '0')}`;
    }
    
    const receiptVoucher = document.getElementById('receipt-voucher');
    if (receiptVoucher) {
        receiptVoucher.value = `REC-${year}-${String(todayReceipts + 1).padStart(3, '0')}`;
    }
    
    const journalVoucher = document.getElementById('journal-voucher');
    if (journalVoucher) {
        journalVoucher.value = `JRN-${year}-${String(todayJournals + 1).padStart(3, '0')}`;
    }
}

function displayRecentTransactions() {
    const tbody = document.getElementById('transactions-body');
    
    if (!tbody) return;
    
    if (transactions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="no-data">no transactions yet</td></tr>';
        const totalCountEl = document.getElementById('total-count');
        if (totalCountEl) totalCountEl.textContent = '0';
        return;
    }
    
    const sortedTransactions = [...transactions].sort((a, b) => {
        const dateCompare = new Date(b.date) - new Date(a.date);
        if (dateCompare !== 0) return dateCompare;
        return b.id - a.id;
    });
    
    const recentTransactions = sortedTransactions.slice(0, 10);
    
    let html = '';
    recentTransactions.forEach(t => {
        let ledgerDisplay = t.ledger;
        if (t.bank_name) {
            const bank = banks.find(b => b.name === t.bank_name);
            ledgerDisplay = bank ? bank.displayName : t.bank_name;
            if (t.account_number) {
                ledgerDisplay += ` (${t.account_number})`;
            }
        }
        
        const displayDate = formatDate(t.date);
        
        html += `
            <tr>
                <td>${displayDate}</td>
                <td>${t.voucher || '-'}</td>
                <td><span class="badge ${t.entry_type || t.type}">${t.type || '-'}</span></td>
                <td>${ledgerDisplay || '-'}</td>
                <td>${t.debit > 0 ? formatNumber(t.debit) : '-'}</td>
                <td>${t.credit > 0 ? formatNumber(t.credit) : '-'}</td>
                <td>${t.narration ? t.narration.substring(0, 30) + (t.narration.length > 30 ? '...' : '') : '-'}</td>
                <td>
                    <button onclick="deleteTransaction(${t.id})" class="delete-btn" title="Delete transaction">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    if (recentTransactions.length < 10) {
        const emptyRows = 10 - recentTransactions.length;
        for (let i = 0; i < emptyRows; i++) {
            html += `
                <tr class="empty-row">
                    <td colspan="9" style="color: #999; text-align: center; padding: 1rem;">
                        <em>no more transactions</em>
                    </td>
                </tr>
            `;
        }
    }
    
    tbody.innerHTML = html;
    
    const totalCountEl = document.getElementById('total-count');
    if (totalCountEl) {
        totalCountEl.textContent = transactions.length;
    }
}

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

function formatNumber(num) {
    if (num === undefined || num === null || isNaN(num)) return '-';
    return Number(num).toFixed(2);
}

function showReport(type) {
    alert(`${type} report generation will be implemented here`);
}

function validateForm(type) {}

// ==================== DATA BACKUP & RESTORE SYSTEM ====================

// Backup settings - stores user preferences
let backupSettings = JSON.parse(localStorage.getItem('backupSettings')) || {
    enabled: false,      // Auto backup on/off
    frequency: 'weekly', // daily, weekly, monthly
    retention: 30,       // Keep backups for X days
    lastBackup: null     // Date of last backup
};

// Backup history - list of all backups created
let backupHistory = JSON.parse(localStorage.getItem('backupHistory')) || [];

// Initialize backup system when page loads
function initBackupSystem() {
    console.log('Initializing backup system...');
    
    // Load backup settings into the UI
    const autoBackupCheckbox = document.getElementById('auto-backup-enable');
    const frequencySelect = document.getElementById('backup-frequency');
    const retentionSelect = document.getElementById('backup-retention');
    
    if (autoBackupCheckbox) {
        autoBackupCheckbox.checked = backupSettings.enabled;
        console.log('Auto backup checkbox set to:', backupSettings.enabled);
    }
    if (frequencySelect) {
        frequencySelect.value = backupSettings.frequency;
        console.log('Frequency set to:', backupSettings.frequency);
    }
    if (retentionSelect) {
        retentionSelect.value = backupSettings.retention;
        console.log('Retention set to:', backupSettings.retention);
    }
    
    // Update the "Last backup" info display
    updateLastBackupInfo();
    
    // Load and display backup history table
    loadBackupHistory();
    
    // Check if we need to run auto backup
    if (backupSettings.enabled) {
        checkAndRunAutoBackup();
    }
}

// Update the "Last backup" info text
function updateLastBackupInfo() {
    const lastBackupSpan = document.getElementById('last-backup-info');
    if (!lastBackupSpan) return;
    
    if (backupSettings.lastBackup) {
        const lastBackupDate = new Date(backupSettings.lastBackup);
        const formattedDate = formatDateTime(lastBackupDate);
        lastBackupSpan.innerHTML = `<i class="fas fa-check-circle" style="color: #28a745;"></i> Last backup: ${formattedDate}`;
    } else {
        lastBackupSpan.innerHTML = `<i class="fas fa-info-circle"></i> No backup yet`;
    }
}

// Check if it's time for auto backup and run if needed
function checkAndRunAutoBackup() {
    if (!backupSettings.enabled) return;
    
    const now = new Date();
    const lastBackup = backupSettings.lastBackup ? new Date(backupSettings.lastBackup) : null;
    
    let shouldBackup = false;
    
    if (!lastBackup) {
        // Never backed up before - do it now
        shouldBackup = true;
        console.log('No previous backup found, running auto backup...');
    } else {
        // Calculate days since last backup
        const daysSinceBackup = Math.floor((now - lastBackup) / (1000 * 60 * 60 * 24));
        console.log('Days since last backup:', daysSinceBackup);
        
        // Check based on frequency setting
        switch(backupSettings.frequency) {
            case 'daily':
                shouldBackup = daysSinceBackup >= 1;
                break;
            case 'weekly':
                shouldBackup = daysSinceBackup >= 7;
                break;
            case 'monthly':
                shouldBackup = daysSinceBackup >= 30;
                break;
        }
    }
    
    if (shouldBackup) {
        console.log('Running auto backup...');
        performAutoBackup();
    }
}

// Perform automatic backup (runs in background)
function performAutoBackup() {
    // Collect all data for backup
    const backupData = {
        transactions: transactions,
        ledgers: ledgers,
        banks: banks,
        customSubGroups: customSubGroups,
        backupDate: new Date().toISOString(),
        version: '1.0',
        stats: {
            totalTransactions: transactions.length,
            totalLedgers: ledgers.length,
            totalBanks: banks.length
        }
    };
    
    const backupName = `auto-backup-${new Date().toISOString().split('T')[0]}.json`;
    const backupSize = JSON.stringify(backupData).length;
    
    console.log('Auto backup created:', backupName);
    
    // Save to backup history
    const backupRecord = {
        id: Date.now(),
        name: backupName,
        date: new Date().toISOString(),
        size: backupSize,
        type: 'auto',
        stats: backupData.stats
    };
    
    backupHistory.unshift(backupRecord);
    
    // Remove old backups based on retention setting
    const retentionDays = backupSettings.retention;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
    
    const oldCount = backupHistory.length;
    backupHistory = backupHistory.filter(b => new Date(b.date) > cutoffDate);
    console.log(`Removed ${oldCount - backupHistory.length} old backups`);
    
    // Keep only last 10 auto backups
    if (backupHistory.length > 10) {
        backupHistory = backupHistory.slice(0, 10);
    }
    
    // Save to localStorage
    localStorage.setItem('backupHistory', JSON.stringify(backupHistory));
    
    // Update last backup time
    backupSettings.lastBackup = new Date().toISOString();
    localStorage.setItem('backupSettings', JSON.stringify(backupSettings));
    
    // Update UI
    updateLastBackupInfo();
    loadBackupHistory();
}

// Manual backup - downloads a JSON file
function backupData() {
    try {
        console.log('Creating manual backup...');
        
        // Prepare backup data
        const backupData = {
            transactions: transactions,
            ledgers: ledgers,
            banks: banks,
            customSubGroups: customSubGroups,
            backupDate: new Date().toISOString(),
            version: '1.0',
            stats: {
                totalTransactions: transactions.length,
                totalLedgers: ledgers.length,
                totalBanks: banks.length,
                totalSubgroups: customSubGroups.length
            }
        };
        
        // Create filename with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const filename = `accounting-backup-${timestamp}.json`;
        
        // Convert to JSON string with pretty formatting
        const jsonString = JSON.stringify(backupData, null, 2);
        
        // Create blob and download
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('Manual backup created:', filename, 'Size:', blob.size, 'bytes');
        
        // Add to backup history
        const backupRecord = {
            id: Date.now(),
            name: filename,
            date: new Date().toISOString(),
            size: blob.size,
            type: 'manual',
            stats: backupData.stats
        };
        
        backupHistory.unshift(backupRecord);
        
        // Keep only last 20 backups
        if (backupHistory.length > 20) {
            backupHistory = backupHistory.slice(0, 20);
        }
        
        localStorage.setItem('backupHistory', JSON.stringify(backupHistory));
        loadBackupHistory();
        
        // Update last backup time
        backupSettings.lastBackup = new Date().toISOString();
        localStorage.setItem('backupSettings', JSON.stringify(backupSettings));
        updateLastBackupInfo();
        
        // Show success message
        showNotification(`Backup created successfully! (${formatFileSize(blob.size)})`, 'success');
        
    } catch (error) {
        console.error('Backup failed:', error);
        showNotification('Backup failed: ' + error.message, 'error');
    }
}

// ==================== COMPLETE RESTORE FUNCTION ====================

// Trigger the file input dialog
function triggerRestore() {
    console.log('Opening file selector for restore...');
    // Clear the input value first to ensure change event fires even if selecting same file
    const fileInput = document.getElementById('restore-file-input');
    if (fileInput) {
        fileInput.value = '';
        fileInput.click();
    } else {
        console.error('Restore file input not found');
        showNotification('Restore file input not found', 'error');
    }
}

// Restore data from backup file - COMPLETE VERSION
function restoreData(file) {
    console.log('Restoring from file:', file.name);
    console.log('File size:', file.size, 'bytes');
    
    const reader = new FileReader();
    
    reader.onload = function(evt) {
        try {
            // Parse the JSON backup file
            const backupData = JSON.parse(evt.target.result);
            console.log('Backup file parsed successfully');
            console.log('Backup contains:', {
                transactions: backupData.transactions?.length || 0,
                ledgers: backupData.ledgers?.length || 0,
                banks: backupData.banks?.length || 0,
                customSubGroups: backupData.customSubGroups?.length || 0,
                backupDate: backupData.backupDate
            });
            
            // Validate backup data structure
            if (!backupData.transactions || !Array.isArray(backupData.transactions)) {
                throw new Error('Invalid backup file: Missing or invalid transactions data');
            }
            
            if (!backupData.ledgers || !Array.isArray(backupData.ledgers)) {
                throw new Error('Invalid backup file: Missing or invalid ledgers data');
            }
            
            // Create preview of what will be restored
            const currentStats = {
                transactions: window.transactions ? window.transactions.length : 0,
                ledgers: window.ledgers ? window.ledgers.length : 0,
                banks: window.banks ? window.banks.length : 0,
                subgroups: window.customSubGroups ? window.customSubGroups.length : 0
            };
            
            const backupStats = {
                transactions: backupData.transactions.length,
                ledgers: backupData.ledgers.length,
                banks: backupData.banks ? backupData.banks.length : 0,
                subgroups: backupData.customSubGroups ? backupData.customSubGroups.length : 0
            };
            
            const message = `═══════════════════════════════════════
⚠️ RESTORE CONFIRMATION ⚠️
═══════════════════════════════════════

This will REPLACE ALL current data with backup data:

📊 CURRENT DATA:
   • Transactions: ${currentStats.transactions}
   • Ledgers: ${currentStats.ledgers}
   • Banks: ${currentStats.banks}
   • Subgroups: ${currentStats.subgroups}

💾 BACKUP DATA (${formatDateFromBackup(backupData.backupDate)}):
   • Transactions: ${backupStats.transactions}
   • Ledgers: ${backupStats.ledgers}
   • Banks: ${backupStats.banks}
   • Subgroups: ${backupStats.subgroups}

${backupStats.transactions > 0 ? '📝 Sample transactions:\n' + backupData.transactions.slice(0, 3).map(t => `   • ${t.date} - ${t.ledger} - ${t.debit > 0 ? 'Debit: ' + t.debit : 'Credit: ' + t.credit}`).join('\n') : ''}

⚠️ WARNING: This action CANNOT be undone!
═══════════════════════════════════════

Are you sure you want to proceed?`;

            // Show confirmation modal
            showConfirmationModal(
                'Restore Data',
                message,
                () => {
                    // User confirmed - perform restore
                    console.log('User confirmed restore, applying backup...');
                    
                    try {
                        // Replace all global data
                        window.transactions = backupData.transactions;
                        window.ledgers = backupData.ledgers;
                        window.banks = backupData.banks || [];
                        window.customSubGroups = backupData.customSubGroups || [];
                        
                        // Save to localStorage
                        localStorage.setItem('transactions', JSON.stringify(transactions));
                        localStorage.setItem('ledgers', JSON.stringify(ledgers));
                        localStorage.setItem('banks', JSON.stringify(banks));
                        localStorage.setItem('customSubGroups', JSON.stringify(customSubGroups));
                        
                        console.log('Data restored successfully');
                        console.log('New data count:', {
                            transactions: transactions.length,
                            ledgers: ledgers.length,
                            banks: banks.length,
                            subgroups: customSubGroups.length
                        });
                        
                        // Show success message
                        showNotification(`✅ Restore successful! Restored ${backupStats.transactions} transactions. Reloading page...`, 'success');
                        
                        // Reload page after 1.5 seconds to reflect changes
                        setTimeout(() => {
                            location.reload();
                        }, 1500);
                        
                    } catch (error) {
                        console.error('Error during restore:', error);
                        showNotification('Error during restore: ' + error.message, 'error');
                    }
                },
                () => {
                    // User cancelled
                    console.log('Restore cancelled by user');
                    showNotification('Restore cancelled', 'info');
                }
            );
            
        } catch (error) {
            console.error('Restore failed:', error);
            showNotification('Invalid or corrupted backup file: ' + error.message, 'error');
        }
    };
    
    reader.onerror = function() {
        console.error('Error reading file');
        showNotification('Error reading file. Please try again.', 'error');
    };
    
    reader.readAsText(file);
}

// Helper function to format date from backup
function formatDateFromBackup(dateString) {
    if (!dateString) return 'Unknown date';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleString();
    } catch (e) {
        return dateString;
    }
}
// Load backup history table
function loadBackupHistory() {
    const tbody = document.getElementById('backup-history-body');
    const historyContainer = document.querySelector('.backup-history');
    
    if (!tbody) {
        console.log('Backup history table not found on this page');
        return;
    }
    
    // Hide history section if no backups
    if (backupHistory.length === 0) {
        if (historyContainer) {
            historyContainer.style.display = 'none';
        }
        return;
    }
    
    // Show history section
    if (historyContainer) {
        historyContainer.style.display = 'block';
    }
    
    // Build table rows
    let html = '';
    backupHistory.forEach(backup => {
        const backupDate = new Date(backup.date);
        const isRecent = (new Date() - backupDate) < 24 * 60 * 60 * 1000;
        const formattedDate = formatDateTime(backupDate);
        
        html += `
            <tr>
                <td>${formattedDate} ${isRecent ? '<span class="recent-badge" style="background: #28a745; color: white; padding: 2px 6px; border-radius: 10px; font-size: 10px; margin-left: 5px;">Recent</span>' : ''}</td>
                <td style="font-family: monospace; font-size: 11px;">${backup.name}</td>
                <td>${formatFileSize(backup.size)}</td>
                <td>${backup.stats?.totalTransactions || 0}</td>
                <td>
                    <button class="restore-backup-btn" onclick="restoreFromHistory(${backup.id})">
                        <i class="fas fa-undo"></i> Restore
                    </button>
                    <button class="delete-backup-btn" onclick="deleteBackupRecord(${backup.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Restore from backup history (downloads the file first)
function restoreFromHistory(backupId) {
    const backup = backupHistory.find(b => b.id === backupId);
    if (!backup) {
        showNotification('Backup record not found', 'error');
        return;
    }
    
    showNotification('To restore from history, you need the actual backup file. Use "Restore Backup" button to select the file.', 'warning');
}

// Delete backup record from history
function deleteBackupRecord(backupId) {
    showConfirmationModal(
        'Delete Backup Record',
        'Are you sure you want to remove this backup from history?',
        () => {
            backupHistory = backupHistory.filter(b => b.id !== backupId);
            localStorage.setItem('backupHistory', JSON.stringify(backupHistory));
            loadBackupHistory();
            showNotification('Backup record deleted', 'success');
        }
    );
}

// Toggle auto backup on/off
function toggleAutoBackup() {
    const checkbox = document.getElementById('auto-backup-enable');
    backupSettings.enabled = checkbox.checked;
    localStorage.setItem('backupSettings', JSON.stringify(backupSettings));
    console.log('Auto backup set to:', backupSettings.enabled);
    
    if (backupSettings.enabled) {
        checkAndRunAutoBackup();
        showNotification('Auto backup enabled', 'success');
    } else {
        showNotification('Auto backup disabled', 'info');
    }
}

// Save backup frequency and retention settings
function saveBackupSettings() {
    const frequencySelect = document.getElementById('backup-frequency');
    const retentionSelect = document.getElementById('backup-retention');
    
    if (frequencySelect) {
        backupSettings.frequency = frequencySelect.value;
        console.log('Backup frequency saved:', backupSettings.frequency);
    }
    if (retentionSelect) {
        backupSettings.retention = parseInt(retentionSelect.value);
        console.log('Backup retention saved:', backupSettings.retention);
    }
    
    localStorage.setItem('backupSettings', JSON.stringify(backupSettings));
    showNotification('Backup settings saved', 'success');
    
    // Check if auto backup is needed with new settings
    if (backupSettings.enabled) {
        checkAndRunAutoBackup();
    }
}

// Export transactions to CSV file
function exportTransactionsToCSV() {
    console.log('Exporting to CSV...');
    
    const headers = ['ID', 'Date', 'Voucher', 'Type', 'Ledger', 'Subgroup', 'Debit', 'Credit', 'Amount', 'Bank', 'Narration'];
    
    // Convert each transaction to a CSV row
    const rows = transactions.map(t => [
        t.id,
        t.date,
        t.voucher || '',
        t.type,
        t.ledger,
        t.subgroup || '',
        (t.debit || 0).toFixed(2),
        (t.credit || 0).toFixed(2),
        (t.amount || t.debit || t.credit || 0).toFixed(2),
        t.bank_name || '',
        t.narration || ''
    ]);
    
    // Build CSV content
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        csv += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n';
    });
    
    // Download the file
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification(`Exported ${transactions.length} transactions to CSV`, 'success');
}

// Export transactions to Excel (XLS) file
function exportTransactionsToExcel() {
    console.log('Exporting to Excel...');
    
    const headers = ['ID', 'Date', 'Voucher', 'Type', 'Ledger', 'Subgroup', 'Debit', 'Credit', 'Amount', 'Bank', 'Narration'];
    
    // Build HTML table for Excel
    let html = `
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Accounting Transactions</title>
            <style>
                th { background: #3c40c6; color: white; padding: 10px; }
                td { padding: 8px; border: 1px solid #ddd; }
                .debit { color: #28a745; }
                .credit { color: #dc3545; }
            </style>
        </head>
        <body>
            <h2>Accounting Transactions</h2>
            <p>Generated: ${new Date().toLocaleString()}</p>
            <p>Total Transactions: ${transactions.length}</p>
            <table border="1" cellpadding="5" cellspacing="0">
                <thead>
                    <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
                </thead>
                <tbody>
    `;
    
    // Add each transaction as a row
    transactions.forEach(t => {
        html += '<tr>';
        html += `<td>${t.id}</td>`;
        html += `<td>${t.date}</td>`;
        html += `<td>${t.voucher || ''}</td>`;
        html += `<td>${t.type}</td>`;
        html += `<td>${t.ledger}</td>`;
        html += `<td>${t.subgroup || ''}</td>`;
        html += `<td class="debit">${(t.debit || 0).toFixed(2)}</td>`;
        html += `<td class="credit">${(t.credit || 0).toFixed(2)}</td>`;
        html += `<td>${(t.amount || t.debit || t.credit || 0).toFixed(2)}</td>`;
        html += `<td>${t.bank_name || ''}</td>`;
        html += `<td>${t.narration || ''}</td>`;
        html += '</tr>';
    });
    
    html += `
                </tbody>
            </table>
        </body>
        </html>
    `;
    
    // Download the Excel file
    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.xls`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification(`Exported ${transactions.length} transactions to Excel`, 'success');
}

// Show confirmation dialog before clearing all data
function confirmClearAllData() {
    showConfirmationModal(
        '⚠️ DANGER: Clear All Data',
        'This action will PERMANENTLY DELETE all your data:\n\n' +
        `• ${transactions.length} transactions\n` +
        `• ${ledgers.length} ledgers\n` +
        `• ${banks.length} banks\n` +
        `• ${customSubGroups.length} subgroups\n\n` +
        'This cannot be undone!\n\n' +
        'Type "DELETE" in the prompt to confirm.',
        () => {
            const confirmation = prompt('Type "DELETE" to confirm clearing ALL data:');
            if (confirmation === 'DELETE') {
                console.log('User confirmed, clearing all data...');
                
                // Clear localStorage
                localStorage.clear();
                
                // Reset global variables
                window.transactions = [];
                window.ledgers = [];
                window.banks = [];
                window.customSubGroups = [];
                window.backupSettings = null;
                window.backupHistory = [];
                
                showNotification('All data has been cleared. Reloading page...', 'warning');
                
                // Reload after 1.5 seconds
                setTimeout(() => {
                    location.reload();
                }, 1500);
            } else {
                showNotification('Clear data cancelled', 'info');
            }
        }
    );
}

// ==================== NOTIFICATION SYSTEM ====================

// Show toast notification
function showNotification(message, type = 'success') {
    console.log('Notification:', type, '-', message);
    
    // Remove existing notifications to avoid duplicates
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Choose icon based on type
    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    if (type === 'info') icon = 'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== CONFIRMATION MODAL ====================

// Show confirmation dialog modal with optional cancel callback
function showConfirmationModal(title, message, onConfirm, onCancel = null) {
    console.log('Showing confirmation modal:', title);
    
    // Remove existing modal
    const existingModal = document.querySelector('.confirmation-modal');
    if (existingModal) existingModal.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'confirmation-modal show';
    modal.innerHTML = `
        <div class="confirmation-content" style="max-width: 600px; max-height: 80vh; overflow-y: auto;">
            <i class="fas fa-exclamation-triangle warning-icon" style="font-size: 4rem; color: #ffc107;"></i>
            <h3 style="margin: 1rem 0;">${title}</h3>
            <p style="white-space: pre-line; font-size: 1.3rem; line-height: 1.6; text-align: left; max-height: 400px; overflow-y: auto;">${message}</p>
            <div class="confirmation-btns" style="margin-top: 2rem;">
                <button class="confirm-yes" id="confirm-yes-btn" style="background: #dc3545;">Yes, Restore</button>
                <button class="confirm-no" id="confirm-no-btn" style="background: #6c757d;">Cancel</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Get buttons
    const yesBtn = document.getElementById('confirm-yes-btn');
    const noBtn = document.getElementById('confirm-no-btn');
    
    // Close modal function
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };
    
    // Handle yes button
    yesBtn.onclick = () => {
        closeModal();
        if (onConfirm) onConfirm();
    };
    
    // Handle no button
    noBtn.onclick = () => {
        closeModal();
        if (onCancel) onCancel();
    };
    
    // Close when clicking outside
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeModal();
            if (onCancel) onCancel();
        }
    };
    
    // Close on Escape key
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            if (onCancel) onCancel();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

// ==================== HELPER FUNCTIONS ====================

// Format file size for display
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Format date and time
function formatDateTime(date) {
    if (!date) return '-';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// ==================== DARK MODE SYSTEM ====================

// Dark mode settings
let darkModeSettings = JSON.parse(localStorage.getItem('darkModeSettings')) || {
    enabled: false,
    auto: false,  // Auto-detect system preference
    schedule: false, // Schedule dark mode
    scheduleStart: '18:00',
    scheduleEnd: '06:00'
};

// Initialize dark mode
function initDarkMode() {
    console.log('Initializing dark mode...');
    
    // Check for saved preference
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedDarkMode !== null) {
        // Use saved preference
        if (savedDarkMode === 'true') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    } else if (darkModeSettings.auto) {
        // Auto-detect system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    } else if (darkModeSettings.schedule) {
        // Check scheduled time
        checkScheduledDarkMode();
    } else {
        // Default to light mode
        disableDarkMode();
    }
    
    // Listen for system preference changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (darkModeSettings.auto) {
                if (e.matches) {
                    enableDarkMode();
                } else {
                    disableDarkMode();
                }
            }
        });
    }
    
    // Check scheduled dark mode every minute
    if (darkModeSettings.schedule) {
        setInterval(checkScheduledDarkMode, 60000);
    }
}

// Enable dark mode
function enableDarkMode() {
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
    
    // Update toggle button icon
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        toggleBtn.title = 'Switch to Light Mode';
    }
    
    // Update any charts if they exist
    updateChartsForDarkMode();
    
    console.log('Dark mode enabled');
}

// Disable dark mode
function disableDarkMode() {
    document.documentElement.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
    
    // Update toggle button icon
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        toggleBtn.title = 'Switch to Dark Mode';
    }
    
    // Update any charts if they exist
    updateChartsForDarkMode();
    
    console.log('Light mode enabled');
}

// Toggle dark mode
function toggleDarkMode() {
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    
    if (isDarkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
    
    // Update settings
    darkModeSettings.enabled = !isDarkMode;
    localStorage.setItem('darkModeSettings', JSON.stringify(darkModeSettings));
}

// Check and apply scheduled dark mode
function checkScheduledDarkMode() {
    if (!darkModeSettings.schedule) return;
    
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const isWithinSchedule = isTimeBetween(currentTime, darkModeSettings.scheduleStart, darkModeSettings.scheduleEnd);
    
    if (isWithinSchedule && !document.documentElement.classList.contains('dark-mode')) {
        enableDarkMode();
    } else if (!isWithinSchedule && document.documentElement.classList.contains('dark-mode')) {
        disableDarkMode();
    }
}

// Helper: Check if current time is between start and end times
function isTimeBetween(current, start, end) {
    if (start <= end) {
        return current >= start && current <= end;
    } else {
        // Overnight schedule (e.g., 18:00 to 06:00)
        return current >= start || current <= end;
    }
}

// Update charts for dark mode
function updateChartsForDarkMode() {
    // Update Chart.js charts if they exist
    if (typeof Chart !== 'undefined') {
        // Get all chart canvases
        const charts = document.querySelectorAll('canvas');
        charts.forEach(canvas => {
            const chart = Chart.getChart(canvas);
            if (chart) {
                // Update grid colors
                const isDark = document.documentElement.classList.contains('dark-mode');
                const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                const textColor = isDark ? '#e0e0e0' : '#666';
                
                chart.options.scales = chart.options.scales || {};
                
                if (chart.options.scales.x) {
                    chart.options.scales.x.grid = chart.options.scales.x.grid || {};
                    chart.options.scales.x.grid.color = gridColor;
                    chart.options.scales.x.ticks = chart.options.scales.x.ticks || {};
                    chart.options.scales.x.ticks.color = textColor;
                }
                
                if (chart.options.scales.y) {
                    chart.options.scales.y.grid = chart.options.scales.y.grid || {};
                    chart.options.scales.y.grid.color = gridColor;
                    chart.options.scales.y.ticks = chart.options.scales.y.ticks || {};
                    chart.options.scales.y.ticks.color = textColor;
                }
                
                chart.update();
            }
        });
    }
}

// Show dark mode settings modal
function showDarkModeSettings() {
    const modalHTML = `
        <div id="darkmode-settings-modal" class="modal">
            <div class="modal-content" style="max-width: 450px;">
                <span class="close-modal" onclick="closeDarkModeSettings()">&times;</span>
                <h3><i class="fas fa-moon"></i> Dark Mode Settings</h3>
                
                <div class="darkmode-settings">
                    <div class="setting-group">
                        <label>
                            <input type="checkbox" id="darkmode-auto" ${darkModeSettings.auto ? 'checked' : ''}>
                            Auto-detect system preference
                        </label>
                        <p class="setting-hint">Automatically match your system's dark/light mode</p>
                    </div>
                    
                    <div class="setting-group">
                        <label>
                            <input type="checkbox" id="darkmode-schedule" ${darkModeSettings.schedule ? 'checked' : ''}>
                            Schedule dark mode
                        </label>
                        <div class="schedule-times" style="margin-top: 1rem; ${!darkModeSettings.schedule ? 'display: none;' : ''}">
                            <div class="time-input">
                                <label>Start time:</label>
                                <input type="time" id="darkmode-start" value="${darkModeSettings.scheduleStart}">
                            </div>
                            <div class="time-input">
                                <label>End time:</label>
                                <input type="time" id="darkmode-end" value="${darkModeSettings.scheduleEnd}">
                            </div>
                            <p class="setting-hint">Dark mode will activate between these hours</p>
                        </div>
                    </div>
                    
                    <div class="setting-group">
                        <button class="btn" onclick="applyDarkModeSettings()" style="width: 100%;">
                            <i class="fas fa-save"></i> Apply Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('darkmode-settings-modal');
    if (existingModal) existingModal.remove();
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = document.getElementById('darkmode-settings-modal');
    modal.style.display = 'block';
    
    // Add event listeners
    const scheduleCheckbox = document.getElementById('darkmode-schedule');
    const scheduleDiv = document.querySelector('.schedule-times');
    
    if (scheduleCheckbox && scheduleDiv) {
        scheduleCheckbox.addEventListener('change', function() {
            scheduleDiv.style.display = this.checked ? 'block' : 'none';
        });
    }
}

// Close dark mode settings modal
function closeDarkModeSettings() {
    const modal = document.getElementById('darkmode-settings-modal');
    if (modal) {
        modal.style.display = 'none';
        setTimeout(() => modal.remove(), 300);
    }
}

// Apply dark mode settings
function applyDarkModeSettings() {
    const auto = document.getElementById('darkmode-auto')?.checked || false;
    const schedule = document.getElementById('darkmode-schedule')?.checked || false;
    const startTime = document.getElementById('darkmode-start')?.value || '18:00';
    const endTime = document.getElementById('darkmode-end')?.value || '06:00';
    
    darkModeSettings = {
        enabled: document.documentElement.classList.contains('dark-mode'),
        auto: auto,
        schedule: schedule,
        scheduleStart: startTime,
        scheduleEnd: endTime
    };
    
    localStorage.setItem('darkModeSettings', JSON.stringify(darkModeSettings));
    
    // Re-initialize based on new settings
    if (auto) {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    } else if (schedule) {
        checkScheduledDarkMode();
    }
    
    closeDarkModeSettings();
    showNotification('Dark mode settings saved', 'success');
}

// Add keyboard shortcut for dark mode (Ctrl + D)
function setupDarkModeKeyboardShortcut() {
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            toggleDarkMode();
        }
    });
}

// ==================== KEYBOARD SHORTCUTS HELP ====================

// Open shortcuts help modal
function showShortcutsModal() {
    console.log('Opening keyboard shortcuts help');
    
    const modal = document.getElementById('shortcuts-modal');
    if (modal) {
        modal.style.display = 'block';
        
        // Focus on the modal for accessibility
        setTimeout(() => {
            const closeBtn = modal.querySelector('.close-modal');
            if (closeBtn) closeBtn.focus();
        }, 100);
    } else {
        console.error('Shortcuts modal not found');
        showNotification('Shortcuts modal not found', 'error');
    }
}

// Close shortcuts help modal
function closeShortcutsModal() {
    const modal = document.getElementById('shortcuts-modal');
    if (modal) {
        modal.style.display = 'none';
        
        // Return focus to the element that opened the modal
        const helpBtn = document.getElementById('floating-help-btn');
        if (helpBtn) helpBtn.focus();
    }
}

// Setup global keyboard shortcuts
function setupGlobalKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Don't trigger shortcuts when typing in input fields (except special cases)
        const isTyping = e.target.tagName === 'INPUT' || 
                         e.target.tagName === 'TEXTAREA' || 
                         e.target.tagName === 'SELECT';
        
        // Ctrl + H - Open help (works anywhere)
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            showShortcutsModal();
            announceToScreenReader('Keyboard shortcuts help opened');
            return;
        }
        
        // Ctrl + B - Backup (works anywhere)
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            if (typeof backupData === 'function') {
                backupData();
                announceToScreenReader('Creating backup');
            }
            return;
        }
        
        // F1 - Alternative help key (works anywhere)
        if (e.key === 'F1') {
            e.preventDefault();
            showShortcutsModal();
            announceToScreenReader('Help menu opened');
            return;
        }
        
        // Escape - Close modals (works anywhere)
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            let anyModalOpen = false;
            
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    anyModalOpen = true;
                    // Try to close the modal based on its ID
                    if (modal.id === 'shortcuts-modal') closeShortcutsModal();
                    else if (modal.id === 'new-ledger-modal') closeModal();
                    else if (modal.id === 'new-bank-modal') closeBankModal();
                    else if (modal.id === 'manage-ledgers-modal') closeManageLedgersModal();
                    else if (modal.id === 'delete-ledger-modal') closeDeleteLedgerModal();
                    else if (modal.id === 'new-subgroup-modal') closeSubGroupModal();
                    else if (modal.id === 'darkmode-settings-modal') closeDarkModeSettings();
                    else {
                        modal.style.display = 'none';
                    }
                }
            });
            
            if (anyModalOpen) {
                e.preventDefault();
                announceToScreenReader('Modal closed');
            }
            return;
        }
        
        // Don't process other shortcuts if typing in fields
        if (isTyping) return;
        
        // Alt + P - Payment tab
        if (e.altKey && e.key === 'p') {
            e.preventDefault();
            const paymentTab = document.querySelector('[data-tab="payment"]');
            if (paymentTab && typeof switchTab === 'function') {
                switchTab('payment');
                announceToScreenReader('Switched to payment tab');
            }
            return;
        }
        
        // Alt + R - Receipt tab
        if (e.altKey && e.key === 'r') {
            e.preventDefault();
            const receiptTab = document.querySelector('[data-tab="receipt"]');
            if (receiptTab && typeof switchTab === 'function') {
                switchTab('receipt');
                announceToScreenReader('Switched to receipt tab');
            }
            return;
        }
        
        // Alt + J - Journal tab
        if (e.altKey && e.key === 'j') {
            e.preventDefault();
            const journalTab = document.querySelector('[data-tab="journal"]');
            if (journalTab && typeof switchTab === 'function') {
                switchTab('journal');
                announceToScreenReader('Switched to journal tab');
            }
            return;
        }
        
        // Ctrl + S - Save (works from any tab)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab;
            
            if (activeTab === 'journal') {
                if (typeof saveJournal === 'function') {
                    saveJournal();
                }
            } else if (activeTab === 'payment' || activeTab === 'receipt') {
                if (typeof saveEntry === 'function') {
                    saveEntry(activeTab);
                }
            }
            return;
        }
        
        // Ctrl + N - New ledger
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab;
            if (activeTab && typeof showNewLedgerModal === 'function') {
                showNewLedgerModal(activeTab);
                announceToScreenReader('New ledger modal opened');
            }
            return;
        }
        
        // F5 - Refresh
        if (e.key === 'F5') {
            e.preventDefault();
            if (typeof displayRecentTransactions === 'function') {
                displayRecentTransactions();
                showNotification('Transactions refreshed', 'success');
                announceToScreenReader('Transactions refreshed');
            }
            return;
        }
        
        // Ctrl + Delete - Delete all transactions
        if (e.ctrlKey && e.key === 'Delete') {
            e.preventDefault();
            if (typeof deleteAllTransactions === 'function') {
                deleteAllTransactions();
            }
            return;
        }
        
        // Ctrl + + (plus) - Add journal row (only in journal tab)
        if (e.ctrlKey && e.key === '+' && document.querySelector('#journal.active')) {
            e.preventDefault();
            if (typeof addJournalRow === 'function') {
                addJournalRow();
                announceToScreenReader('Added new journal row');
            }
            return;
        }
        
        // Ctrl + D - Toggle dark mode
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            if (typeof toggleDarkMode === 'function') {
                toggleDarkMode();
                const isDark = document.documentElement.classList.contains('dark-mode');
                announceToScreenReader(isDark ? 'Dark mode enabled' : 'Light mode enabled');
            }
            return;
        }
    });
}

// Add floating help button (optional - add to your page)
function addFloatingHelpButton() {
    // Check if button already exists
    if (document.getElementById('floating-help-btn')) return;
    
    const helpBtn = document.createElement('div');
    helpBtn.id = 'floating-help-btn';
    helpBtn.className = 'floating-help-btn';
    helpBtn.innerHTML = '<i class="fas fa-question"></i>';
    helpBtn.title = 'Keyboard Shortcuts (Ctrl+H)';
    helpBtn.setAttribute('aria-label', 'Open keyboard shortcuts help');
    helpBtn.onclick = () => showShortcutsModal();
    
    document.body.appendChild(helpBtn);
}

// ==================== KEYBOARD SHORTCUTS HELP ====================

/**
 * Opens the keyboard shortcuts help modal
 * This function displays all available keyboard shortcuts in a modal dialog
 */
function showShortcutsModal() {
    console.log('Opening keyboard shortcuts help');
    
    // Get the modal element by its ID
    const modal = document.getElementById('shortcuts-modal');
    
    // Check if modal exists
    if (modal) {
        // Display the modal
        modal.style.display = 'block';
        
        // For accessibility: focus on the close button after modal opens
        setTimeout(() => {
            const closeBtn = modal.querySelector('.close-modal');
            if (closeBtn) {
                closeBtn.focus();
            }
        }, 100);
    } else {
        // If modal doesn't exist, show error
        console.error('Shortcuts modal not found');
        if (typeof showNotification === 'function') {
            showNotification('Shortcuts modal not found', 'error');
        }
    }
}

/**
 * Closes the keyboard shortcuts help modal
 */
function closeShortcutsModal() {
    // Get the modal element
    const modal = document.getElementById('shortcuts-modal');
    
    // Hide the modal if it exists
    if (modal) {
        modal.style.display = 'none';
        
        // Return focus to the help button if it exists
        const helpBtn = document.getElementById('floating-help-btn');
        if (helpBtn) {
            helpBtn.focus();
        }
    }
}

/**
 * Sets up all global keyboard shortcuts for the application
 * This function listens for key presses and triggers appropriate actions
 */
function setupGlobalKeyboardShortcuts() {
    // Add event listener to the whole document
    document.addEventListener('keydown', function(e) {
        // Check if user is typing in an input field
        const isTyping = e.target.tagName === 'INPUT' || 
                         e.target.tagName === 'TEXTAREA' || 
                         e.target.tagName === 'SELECT';
        
        // ========== SHORTCUT: Ctrl + H ==========
        // Opens help menu (works anywhere, even when typing)
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault(); // Prevent browser's default help behavior
            showShortcutsModal();
            // Announce for screen readers if function exists
            if (typeof announceToScreenReader === 'function') {
                announceToScreenReader('Keyboard shortcuts help opened');
            }
            return; // Stop processing other shortcuts
        }
        
        // ========== SHORTCUT: Ctrl + B ==========
        // Creates a backup (works anywhere)
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            // Check if backup function exists
            if (typeof backupData === 'function') {
                backupData();
                if (typeof announceToScreenReader === 'function') {
                    announceToScreenReader('Creating backup');
                }
            }
            return;
        }
        
        // ========== SHORTCUT: F1 ==========
        // Alternative help key (works anywhere)
        if (e.key === 'F1') {
            e.preventDefault();
            showShortcutsModal();
            if (typeof announceToScreenReader === 'function') {
                announceToScreenReader('Help menu opened');
            }
            return;
        }
        
        // ========== SHORTCUT: Escape ==========
        // Closes any open modal (works anywhere)
        if (e.key === 'Escape') {
            // Find all modals on the page
            const modals = document.querySelectorAll('.modal');
            let anyModalOpen = false;
            
            // Check each modal to see if it's open
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    anyModalOpen = true;
                    
                    // Close the modal based on its ID
                    if (modal.id === 'shortcuts-modal') {
                        closeShortcutsModal();
                    } 
                    else if (modal.id === 'new-ledger-modal') {
                        if (typeof closeModal === 'function') closeModal();
                    }
                    else if (modal.id === 'new-bank-modal') {
                        if (typeof closeBankModal === 'function') closeBankModal();
                    }
                    else if (modal.id === 'manage-ledgers-modal') {
                        if (typeof closeManageLedgersModal === 'function') closeManageLedgersModal();
                    }
                    else if (modal.id === 'delete-ledger-modal') {
                        if (typeof closeDeleteLedgerModal === 'function') closeDeleteLedgerModal();
                    }
                    else if (modal.id === 'new-subgroup-modal') {
                        if (typeof closeSubGroupModal === 'function') closeSubGroupModal();
                    }
                    else if (modal.id === 'darkmode-settings-modal') {
                        if (typeof closeDarkModeSettings === 'function') closeDarkModeSettings();
                    }
                    else {
                        // For any other modals, just hide them
                        modal.style.display = 'none';
                    }
                }
            });
            
            // If a modal was closed, prevent default escape behavior
            if (anyModalOpen) {
                e.preventDefault();
                if (typeof announceToScreenReader === 'function') {
                    announceToScreenReader('Modal closed');
                }
            }
            return;
        }
        
        // ========== SHORTCUT: DON'T PROCESS OTHER SHORTCUTS WHILE TYPING ==========
        // If user is typing in an input field, don't process navigation shortcuts
        if (isTyping) return;
        
        // ========== SHORTCUT: Alt + P ==========
        // Switch to Payment tab
        if (e.altKey && e.key === 'p') {
            e.preventDefault();
            // Find the payment tab button
            const paymentTab = document.querySelector('[data-tab="payment"]');
            // Check if switchTab function exists
            if (paymentTab && typeof switchTab === 'function') {
                switchTab('payment');
                if (typeof announceToScreenReader === 'function') {
                    announceToScreenReader('Switched to payment tab');
                }
            }
            return;
        }
        
        // ========== SHORTCUT: Alt + R ==========
        // Switch to Receipt tab
        if (e.altKey && e.key === 'r') {
            e.preventDefault();
            const receiptTab = document.querySelector('[data-tab="receipt"]');
            if (receiptTab && typeof switchTab === 'function') {
                switchTab('receipt');
                if (typeof announceToScreenReader === 'function') {
                    announceToScreenReader('Switched to receipt tab');
                }
            }
            return;
        }
        
        // ========== SHORTCUT: Alt + J ==========
        // Switch to Journal tab
        if (e.altKey && e.key === 'j') {
            e.preventDefault();
            const journalTab = document.querySelector('[data-tab="journal"]');
            if (journalTab && typeof switchTab === 'function') {
                switchTab('journal');
                if (typeof announceToScreenReader === 'function') {
                    announceToScreenReader('Switched to journal tab');
                }
            }
            return;
        }
        
        // ========== SHORTCUT: Ctrl + S ==========
        // Save current entry (works from any tab)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            
            // Get the currently active tab
            const activeTab = document.querySelector('.tab-btn.active');
            const tabId = activeTab ? activeTab.dataset.tab : null;
            
            // Call the appropriate save function
            if (tabId === 'journal') {
                if (typeof saveJournal === 'function') {
                    saveJournal();
                }
            } 
            else if (tabId === 'payment' || tabId === 'receipt') {
                if (typeof saveEntry === 'function') {
                    saveEntry(tabId);
                }
            }
            return;
        }
        
        // ========== SHORTCUT: Ctrl + N ==========
        // Create new ledger
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            
            // Get the active tab to know which form we're in
            const activeTab = document.querySelector('.tab-btn.active');
            const tabId = activeTab ? activeTab.dataset.tab : null;
            
            // Open new ledger modal for the current tab
            if (tabId && typeof showNewLedgerModal === 'function') {
                showNewLedgerModal(tabId);
                if (typeof announceToScreenReader === 'function') {
                    announceToScreenReader('New ledger modal opened');
                }
            }
            return;
        }
        
        // ========== SHORTCUT: F5 ==========
        // Refresh transactions
        if (e.key === 'F5') {
            e.preventDefault();
            if (typeof displayRecentTransactions === 'function') {
                displayRecentTransactions();
                if (typeof showNotification === 'function') {
                    showNotification('Transactions refreshed', 'success');
                }
                if (typeof announceToScreenReader === 'function') {
                    announceToScreenReader('Transactions refreshed');
                }
            }
            return;
        }
        
        // ========== SHORTCUT: Ctrl + Delete ==========
        // Delete all transactions
        if (e.ctrlKey && e.key === 'Delete') {
            e.preventDefault();
            if (typeof deleteAllTransactions === 'function') {
                deleteAllTransactions();
            }
            return;
        }
        
        // ========== SHORTCUT: Ctrl + + (plus) ==========
        // Add new journal row (only works in journal tab)
        if (e.ctrlKey && e.key === '+') {
            // Check if journal tab is active
            const journalTab = document.querySelector('#journal.active');
            if (journalTab) {
                e.preventDefault();
                if (typeof addJournalRow === 'function') {
                    addJournalRow();
                    if (typeof announceToScreenReader === 'function') {
                        announceToScreenReader('Added new journal row');
                    }
                }
            }
            return;
        }
        
        // ========== SHORTCUT: Ctrl + D ==========
        // Toggle dark mode
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            if (typeof toggleDarkMode === 'function') {
                toggleDarkMode();
                const isDark = document.documentElement.classList.contains('dark-mode');
                if (typeof announceToScreenReader === 'function') {
                    announceToScreenReader(isDark ? 'Dark mode enabled' : 'Light mode enabled');
                }
            }
            return;
        }
    });
}

/**
 * Adds a floating help button to the page
 * This button appears in the bottom-right corner and opens the shortcuts modal
 */
function addFloatingHelpButton() {
    // Check if button already exists to avoid duplicates
    if (document.getElementById('floating-help-btn')) {
        console.log('Floating help button already exists');
        return;
    }
    
    // Create the button element
    const helpBtn = document.createElement('div');
    helpBtn.id = 'floating-help-btn';
    helpBtn.className = 'floating-help-btn';
    helpBtn.innerHTML = '<i class="fas fa-question"></i>';
    helpBtn.title = 'Keyboard Shortcuts (Ctrl+H)';
    helpBtn.setAttribute('aria-label', 'Open keyboard shortcuts help');
    
    // Add click event to open shortcuts modal
    helpBtn.onclick = function() {
        if (typeof showShortcutsModal === 'function') {
            showShortcutsModal();
        }
    };
    
    // Add keyboard focus handling
    helpBtn.onkeydown = function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (typeof showShortcutsModal === 'function') {
                showShortcutsModal();
            }
        }
    };
    
    // Make it focusable for accessibility
    helpBtn.setAttribute('tabindex', '0');
    
    // Add to the page
    document.body.appendChild(helpBtn);
    
    console.log('Floating help button added');
}
function showNotification(message, type = 'info') {
    alert(`${type.toUpperCase()}: ${message}`);
}

// ==================== END OF KEYBOARD SHORTCUTS HELP ====================
// ==================== EXPORT FUNCTIONS ====================
window.switchTab = switchTab;
window.saveEntry = saveEntry;
window.cancelEntry = cancelEntry;
window.saveJournal = saveJournal;
window.resetJournal = resetJournal;
window.addJournalRow = addJournalRow;
window.removeJournalRow = removeJournalRow;
window.showNewLedgerModal = showNewLedgerModal;
window.showJournalNewLedgerModal = showJournalNewLedgerModal;
window.showJournalNewSubGroupModal = showJournalNewSubGroupModal;
window.handleJournalLedgerSelect = handleJournalLedgerSelect;
window.cancelJournalNewLedger = cancelJournalNewLedger;
window.closeModal = closeModal;
window.createNewLedger = createNewLedger;
window.showReport = showReport;
window.updateJournalTotals = updateJournalTotals;
window.validateJournalForSave = validateJournalForSave;
window.deleteTransaction = deleteTransaction;
window.deleteAllTransactions = deleteAllTransactions;
window.showNewBankModal = showNewBankModal;
window.closeBankModal = closeBankModal;
window.createNewBank = createNewBank;
window.handleBankSelect = handleBankSelect;
window.announceToScreenReader = announceToScreenReader;
window.highlightElement = highlightElement;
window.displayRecentTransactions = displayRecentTransactions;
window.formatDate = formatDate;
window.formatNumber = formatNumber;
window.showManageLedgersModal = showManageLedgersModal;
window.closeManageLedgersModal = closeManageLedgersModal;
window.showDeleteLedgerModal = showDeleteLedgerModal;
window.closeDeleteLedgerModal = closeDeleteLedgerModal;
window.confirmDeleteLedger = confirmDeleteLedger;
window.filterLedgers = filterLedgers;
window.getCurrentBalances = getCurrentBalances;
window.showBalanceAboveAmount = showBalanceAboveAmount;
window.removeBalanceAbove = removeBalanceAbove;
window.updateGroupDropdown = updateGroupDropdown;
window.updateSubGroupDatalist = updateSubGroupDatalist;
window.showNewSubGroupModal = showNewSubGroupModal;
window.closeSubGroupModal = closeSubGroupModal;
window.createNewSubGroup = createNewSubGroup;
window.backupData = backupData;
window.triggerRestore = triggerRestore;
window.restoreData = restoreData;
window.confirmClearAllData = confirmClearAllData;
window.exportTransactionsToCSV = exportTransactionsToCSV;
window.exportTransactionsToExcel = exportTransactionsToExcel;
window.toggleAutoBackup = toggleAutoBackup;
window.saveBackupSettings = saveBackupSettings;
window.restoreFromHistory = restoreFromHistory;
window.deleteBackupRecord = deleteBackupRecord;
window.showNotification = showNotification;
window.initBackupSystem = initBackupSystem;
// Dark mode exports
window.initDarkMode = initDarkMode;
window.toggleDarkMode = toggleDarkMode;
window.enableDarkMode = enableDarkMode;
window.disableDarkMode = disableDarkMode;
window.showDarkModeSettings = showDarkModeSettings;
window.closeDarkModeSettings = closeDarkModeSettings;
window.applyDarkModeSettings = applyDarkModeSettings;
window.setupDarkModeKeyboardShortcut = setupDarkModeKeyboardShortcut;
window.showShortcutsModal = showShortcutsModal;
window.closeShortcutsModal = closeShortcutsModal;
window.setupGlobalKeyboardShortcuts = setupGlobalKeyboardShortcuts;
window.addFloatingHelpButton = addFloatingHelpButton;

// ==================== MIGRATION: Update Existing Ledgers ====================
// Run this once to update all existing cash/bank ledgers with Current Asset subgroup

function migrateLedgerSubgroups() {
    console.log('Running migration: Adding Current Asset subgroup to cash/bank ledgers...');
    
    let updated = false;
    
    // Make sure ledgers exists
    if (typeof ledgers === 'undefined' || !ledgers) {
        console.log('No ledgers found');
        return;
    }
    
    ledgers.forEach(ledger => {
        // Check if this is a cash or bank ledger
        const isCash = ledger.name && ledger.name.toLowerCase() === 'cash';
        const isBank = ledger.name && ledger.name.toLowerCase().includes('bank');
        
        // If it's cash or bank and doesn't have a group, set to current_asset
        if ((isCash || isBank) && (!ledger.group || ledger.group === '')) {
            ledger.group = 'current_asset';
            updated = true;
            console.log(`Updated: ${ledger.name} -> current_asset`);
        }
    });
    
    if (updated) {
        localStorage.setItem('ledgers', JSON.stringify(ledgers));
        console.log('Migration complete! Updated ledgers saved to localStorage.');
        
        // Optional: Show a notification to the user
        setTimeout(() => {
            alert('Cash and Bank accounts have been updated to "Current Asset" subgroup.');
        }, 1000);
    } else {
        console.log('No ledgers needed updating.');
    }
}

// Run the migration automatically when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure everything is loaded
    setTimeout(() => {
        // Only run if there are ledgers and the migration hasn't been run before
        if (typeof ledgers !== 'undefined' && ledgers && ledgers.length > 0 && 
            !localStorage.getItem('subgroup_migration_complete')) {
            migrateLedgerSubgroups();
            localStorage.setItem('subgroup_migration_complete', 'true');
        }
    }, 500);
});