// Accounting System JavaScript

// ==================== DATA STORAGE ====================
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let ledgers = JSON.parse(localStorage.getItem('ledgers')) || [
    // Cash and Bank Accounts (Asset)
    { id: 1, name: 'cash', type: 'asset', category: 'cash', group: '' },
    { id: 2, name: 'bank - sbl', type: 'asset', category: 'bank', group: '' },
    { id: 3, name: 'bank - jbl', type: 'asset', category: 'bank', group: '' },
    { id: 4, name: 'bank - agrani', type: 'asset', category: 'bank', group: '' },
    { id: 5, name: 'bank - rupali', type: 'asset', category: 'bank', group: '' },
    { id: 6, name: 'bank - bdbl', type: 'asset', category: 'bank', group: '' },
    { id: 7, name: 'bank - bkash', type: 'asset', category: 'bank', group: '' },
    { id: 8, name: 'bank - nagad', type: 'asset', category: 'bank', group: '' },
    { id: 9, name: 'bank - rocket', type: 'asset', category: 'bank', group: '' },
    { id: 10, name: 'bank - dbbl', type: 'asset', category: 'bank', group: '' },
    { id: 11, name: 'bank - ebbl', type: 'asset', category: 'bank', group: '' },
    { id: 12, name: 'bank - ibbl', type: 'asset', category: 'bank', group: '' },
    { id: 13, name: 'bank - pubali', type: 'asset', category: 'bank', group: '' },
    { id: 14, name: 'bank - ucb', type: 'asset', category: 'bank', group: '' },
    { id: 15, name: 'bank - city', type: 'asset', category: 'bank', group: '' },
    { id: 16, name: 'bank - ncc', type: 'asset', category: 'bank', group: '' },
    { id: 17, name: 'bank - prime', type: 'asset', category: 'bank', group: '' },
    { id: 18, name: 'bank - mercantile', type: 'asset', category: 'bank', group: '' },
    { id: 19, name: 'bank - mutual', type: 'asset', category: 'bank', group: '' },
    { id: 20, name: 'bank - standard', type: 'asset', category: 'bank', group: '' },
    { id: 21, name: 'bank - one', type: 'asset', category: 'bank', group: '' },
    { id: 22, name: 'bank - exim', type: 'asset', category: 'bank', group: '' },
    { id: 23, name: 'bank - fsibl', type: 'asset', category: 'bank', group: '' },
    { id: 24, name: 'bank - sjibl', type: 'asset', category: 'bank', group: '' },
    { id: 25, name: 'bank - al-arafah', type: 'asset', category: 'bank', group: '' },
    { id: 26, name: 'bank - sibl', type: 'asset', category: 'bank', group: '' },
    { id: 27, name: 'bank - midland', type: 'asset', category: 'bank', group: '' },
    { id: 28, name: 'bank - modhumoti', type: 'asset', category: 'bank', group: '' },
    { id: 29, name: 'bank - nrbc', type: 'asset', category: 'bank', group: '' },
    { id: 30, name: 'bank - trust', type: 'asset', category: 'bank', group: '' },
    { id: 31, name: 'bank - ab', type: 'asset', category: 'bank', group: '' },
    { id: 32, name: 'bank - krishi', type: 'asset', category: 'bank', group: '' },
    { id: 33, name: 'bank - rajuk', type: 'asset', category: 'bank', group: '' },
    { id: 34, name: 'bank - probashi', type: 'asset', category: 'bank', group: '' },
    { id: 35, name: 'bank - ansar', type: 'asset', category: 'bank', group: '' },
    { id: 36, name: 'bank - grameen', type: 'asset', category: 'bank', group: '' },
    
    // Income Accounts
    { id: 37, name: 'sales', type: 'income', category: 'income', group: '' },
    { id: 38, name: 'service revenue', type: 'income', category: 'income', group: '' },
    { id: 39, name: 'interest income', type: 'income', category: 'income', group: '' },
    { id: 40, name: 'commission income', type: 'income', category: 'income', group: '' },
    { id: 41, name: 'other income', type: 'income', category: 'income', group: '' },
    
    // Expense Accounts
    { id: 42, name: 'purchases', type: 'expense', category: 'expense', group: '' },
    { id: 43, name: 'salary', type: 'expense', category: 'expense', group: '' },
    { id: 44, name: 'rent', type: 'expense', category: 'expense', group: '' },
    { id: 45, name: 'utilities', type: 'expense', category: 'expense', group: '' },
    { id: 46, name: 'office supplies', type: 'expense', category: 'expense', group: '' },
    { id: 47, name: 'transportation', type: 'expense', category: 'expense', group: '' },
    { id: 48, name: 'advertising', type: 'expense', category: 'expense', group: '' },
    { id: 49, name: 'telephone & internet', type: 'expense', category: 'expense', group: '' },
    { id: 50, name: 'repairs & maintenance', type: 'expense', category: 'expense', group: '' },
    { id: 51, name: 'insurance', type: 'expense', category: 'expense', group: '' },
    { id: 52, name: 'taxes & fees', type: 'expense', category: 'expense', group: '' },
    { id: 53, name: 'bank charges', type: 'expense', category: 'expense', group: '' },
    { id: 54, name: 'miscellaneous', type: 'expense', category: 'expense', group: '' },
    
    // Equity Accounts
    { id: 55, name: 'capital', type: 'equity', category: 'equity', group: '' },
    { id: 56, name: 'drawings', type: 'equity', category: 'equity', group: '' },
    { id: 57, name: 'retained earnings', type: 'equity', category: 'equity', group: '' },
    
    // Asset Accounts (Other than Cash/Bank)
    { id: 58, name: 'accounts receivable', type: 'asset', category: 'receivable', group: '' },
    { id: 59, name: 'inventory', type: 'asset', category: 'inventory', group: '' },
    { id: 60, name: 'prepaid expenses', type: 'asset', category: 'prepaid', group: '' },
    { id: 61, name: 'fixed assets', type: 'asset', category: 'fixed', group: '' },
    { id: 62, name: 'accumulated depreciation', type: 'asset', category: 'contra-asset', group: '' },
    
    // Liability Accounts
    { id: 63, name: 'accounts payable', type: 'liability', category: 'payable', group: '' },
    { id: 64, name: 'accrued expenses', type: 'liability', category: 'accrued', group: '' },
    { id: 65, name: 'unearned revenue', type: 'liability', category: 'unearned', group: '' },
    { id: 66, name: 'loans payable', type: 'liability', category: 'loan', group: '' },
    { id: 67, name: 'tax payable', type: 'liability', category: 'tax', group: '' }
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
    
    if (!amountGroup) return;
    
    // Remove existing balance display
    const existingDisplay = document.getElementById(`${formType}-balance-above`);
    if (existingDisplay) existingDisplay.remove();
    
    // Create new balance display
    const balanceDiv = document.createElement('div');
    balanceDiv.id = `${formType}-balance-above`;
    balanceDiv.style.cssText = `
        background: #e8f4fd;
        border: 1px solid var(--main-color);
        border-radius: 0.5rem;
        padding: 1rem;
        margin-bottom: 1rem;
        font-size: 1.4rem;
        display: flex;
        align-items: center;
        gap: 1rem;
    `;
    
    if (paymentType === 'cash') {
        balanceDiv.innerHTML = `
            <i class="fas fa-wallet" style="color: var(--main-color); font-size: 2rem;"></i>
            <div>
                <strong>Current Cash Balance:</strong> 
                <span style="font-size: 1.8rem; font-weight: bold; color: ${balances.cash >= 0 ? '#28a745' : '#dc3545'}; margin-left: 1rem;">
                    ${balances.cash.toFixed(2)}
                </span>
            </div>
        `;
    } else if (paymentType === 'bank' && bankName) {
        const bankBalance = balances.banks[bankName] || 0;
        const bankDisplay = banks.find(b => b.name === bankName)?.displayName || bankName;
        balanceDiv.innerHTML = `
            <i class="fas fa-university" style="color: var(--main-color); font-size: 2rem;"></i>
            <div>
                <strong>${bankDisplay} Balance:</strong> 
                <span style="font-size: 1.8rem; font-weight: bold; color: ${bankBalance >= 0 ? '#28a745' : '#dc3545'}; margin-left: 1rem;">
                    ${bankBalance.toFixed(2)}
                </span>
            </div>
        `;
    }
    
    // Insert before amount group
    amountGroup.parentNode.insertBefore(balanceDiv, amountGroup);
}

function removeBalanceAbove(formType) {
    const existingDisplay = document.getElementById(`${formType}-balance-above`);
    if (existingDisplay) existingDisplay.remove();
}

function updateGroupDropdown() {
    const ledgerType = document.getElementById('modal-ledger-type').value;
    const groupSelect = document.getElementById('modal-ledger-group');
    
    if (!groupSelect) return;
    
    let groupOptions = '<option value="">-- No Group --</option>';
    
    if (ledgerType === 'income') {
        pnlGroups.income.forEach(g => {
            groupOptions += `<option value="${g.value}">${g.label}</option>`;
        });
    } else if (ledgerType === 'expense') {
        pnlGroups.expense.forEach(g => {
            groupOptions += `<option value="${g.value}">${g.label}</option>`;
        });
    }
    
    groupSelect.innerHTML = groupOptions;
}

// ==================== BANK MANAGEMENT ====================
let banks = JSON.parse(localStorage.getItem('banks')) || [
    { id: 1, name: 'bank - sbl', displayName: 'Sonali Bank Limited (SBL)', accountNo: '' },
    { id: 2, name: 'bank - jbl', displayName: 'Janata Bank Limited (JBL)', accountNo: '' },
    { id: 3, name: 'bank - agrani', displayName: 'Agrani Bank Limited', accountNo: '' },
    { id: 4, name: 'bank - rupali', displayName: 'Rupali Bank Limited', accountNo: '' },
    { id: 5, name: 'bank - bdbl', displayName: 'Bangladesh Development Bank Limited (BDBL)', accountNo: '' },
    { id: 6, name: 'bank - bkash', displayName: 'bKash (Mobile Banking)', accountNo: '' },
    { id: 7, name: 'bank - nagad', displayName: 'Nagad (Mobile Banking)', accountNo: '' },
    { id: 8, name: 'bank - rocket', displayName: 'Rocket (Dutch-Bangla Bank)', accountNo: '' },
    { id: 9, name: 'bank - dbbl', displayName: 'Dutch-Bangla Bank Limited (DBBL)', accountNo: '' },
    { id: 10, name: 'bank - ebbl', displayName: 'Eastern Bank Limited (EBL)', accountNo: '' },
    { id: 11, name: 'bank - ibbl', displayName: 'Islami Bank Bangladesh Limited (IBBL)', accountNo: '' },
    { id: 12, name: 'bank - pubali', displayName: 'Pubali Bank Limited', accountNo: '' },
    { id: 13, name: 'bank - ucb', displayName: 'United Commercial Bank (UCB)', accountNo: '' },
    { id: 14, name: 'bank - city', displayName: 'City Bank Limited', accountNo: '' },
    { id: 15, name: 'bank - ncc', displayName: 'NCC Bank Limited', accountNo: '' },
    { id: 16, name: 'bank - prime', displayName: 'Prime Bank Limited', accountNo: '' },
    { id: 17, name: 'bank - southbangla', displayName: 'South Bangla Agriculture & Commerce Bank', accountNo: '' },
    { id: 18, name: 'bank - mercantile', displayName: 'Mercantile Bank Limited', accountNo: '' },
    { id: 19, name: 'bank - mutual', displayName: 'Mutual Trust Bank Limited (MTB)', accountNo: '' },
    { id: 20, name: 'bank - standard', displayName: 'Standard Bank Limited', accountNo: '' },
    { id: 21, name: 'bank - one', displayName: 'One Bank Limited', accountNo: '' },
    { id: 22, name: 'bank - exim', displayName: 'EXIM Bank Limited', accountNo: '' },
    { id: 23, name: 'bank - fsibl', displayName: 'First Security Islami Bank Limited', accountNo: '' },
    { id: 24, name: 'bank - sjibl', displayName: 'Shahjalal Islami Bank Limited', accountNo: '' },
    { id: 25, name: 'bank - al-arafah', displayName: 'Al-Arafah Islami Bank Limited', accountNo: '' },
    { id: 26, name: 'bank - sibl', displayName: 'Social Islami Bank Limited (SIBL)', accountNo: '' },
    { id: 27, name: 'bank - midland', displayName: 'Midland Bank Limited', accountNo: '' },
    { id: 28, name: 'bank - modhumoti', displayName: 'Modhumoti Bank Limited', accountNo: '' },
    { id: 29, name: 'bank - nrbc', displayName: 'NRB Bank Limited', accountNo: '' },
    { id: 30, name: 'bank - trust', displayName: 'Trust Bank Limited', accountNo: '' },
    { id: 31, name: 'bank - ab', displayName: 'AB Bank Limited', accountNo: '' },
    { id: 32, name: 'bank - krishi', displayName: 'Bangladesh Krishi Bank (BKB)', accountNo: '' },
    { id: 33, name: 'bank - rajuk', displayName: 'Rajshahi Krishi Unnayan Bank (RAKUB)', accountNo: '' },
    { id: 34, name: 'bank - probashi', displayName: 'Probashi Kallyan Bank', accountNo: '' },
    { id: 35, name: 'bank - ansar', displayName: 'Ansar VDP Unnayan Bank', accountNo: '' },
    { id: 36, name: 'bank - grameen', displayName: 'Grameen Bank', accountNo: '' }
];

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
    
    // Payment account input
    const paymentAccount = document.getElementById('payment-account');
    if (paymentAccount) {
        paymentAccount.addEventListener('input', function() {
            handleAccountInput('payment');
        });
        paymentAccount.addEventListener('blur', function() {
            saveAccountNumber('payment');
        });
        paymentAccount.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const ledgerInput = document.getElementById('payment-ledger-input');
                if (ledgerInput && isElementVisible(ledgerInput)) {
                    ledgerInput.focus();
                }
            }
        });
    }

    // Receipt account input
    const receiptAccount = document.getElementById('receipt-account');
    if (receiptAccount) {
        receiptAccount.addEventListener('input', function() {
            handleAccountInput('receipt');
        });
        receiptAccount.addEventListener('blur', function() {
            saveAccountNumber('receipt');
        });
        receiptAccount.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const ledgerInput = document.getElementById('receipt-ledger-input');
                if (ledgerInput && isElementVisible(ledgerInput)) {
                    ledgerInput.focus();
                }
            }
        });
    }

    // ===== NARRATION ENTER HANDLING =====
    // Payment narration - Enter creates new line, Ctrl+Enter saves
    const paymentNarration = document.getElementById('payment-narration');
    if (paymentNarration) {
        paymentNarration.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                if (e.ctrlKey) {
                    // Ctrl+Enter: Save
                    e.preventDefault();
                    const saveBtn = document.querySelector('#payment .save-btn:not([disabled])');
                    if (saveBtn) {
                        saveEntry('payment');
                    }
                }
                // Plain Enter: Let default behavior create new line
            }
        });
    }

    // Receipt narration - Enter creates new line, Ctrl+Enter saves
    const receiptNarration = document.getElementById('receipt-narration');
    if (receiptNarration) {
        receiptNarration.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                if (e.ctrlKey) {
                    // Ctrl+Enter: Save
                    e.preventDefault();
                    const saveBtn = document.querySelector('#receipt .save-btn:not([disabled])');
                    if (saveBtn) {
                        saveEntry('receipt');
                    }
                }
                // Plain Enter: Let default behavior create new line
            }
        });
    }

    // Journal narration - Enter creates new line, Ctrl+Enter saves
    const journalNarration = document.getElementById('journal-narration');
    if (journalNarration) {
        journalNarration.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                if (e.ctrlKey) {
                    // Ctrl+Enter: Save
                    e.preventDefault();
                    saveJournal();
                }
                // Plain Enter: Let default behavior create new line
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
            
            banks.forEach(bank => {
                options += `<option value="${bank.name}">${bank.displayName || bank.name}</option>`;
            });
            
            bankSelect.innerHTML = options;
        }
    });
}

// Show new bank modal
function showNewBankModal(type) {
    document.getElementById('bank-modal-entry-type').value = type;
    document.getElementById('modal-bank-name').value = '';
    document.getElementById('modal-bank-account').value = '';
    document.getElementById('new-bank-modal').style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('modal-bank-name').focus();
    }, 100);
}

// Close bank modal
function closeBankModal() {
    document.getElementById('new-bank-modal').style.display = 'none';
    
    const entryType = document.getElementById('bank-modal-entry-type').value;
    const bankSelect = document.getElementById(`${entryType}-bank`);
    if (bankSelect) bankSelect.focus();
}

// Create new bank
function createNewBank() {
    const name = document.getElementById('modal-bank-name').value.trim();
    const accountNo = document.getElementById('modal-bank-account').value.trim();
    const entryType = document.getElementById('bank-modal-entry-type').value;
    
    if (!name) {
        alert('Please enter a bank name');
        document.getElementById('modal-bank-name').focus();
        return;
    }
    
    // Format bank name
    let bankName = name.toLowerCase();
    if (!bankName.startsWith('bank - ')) {
        bankName = 'bank - ' + bankName;
    }
    
    // Check if bank already exists
    if (banks.some(b => b.name === bankName)) {
        alert('Bank already exists');
        document.getElementById('modal-bank-name').focus();
        return;
    }
    
    // Create display name
    let displayName = name;
    if (name.toLowerCase().includes('bank')) {
        displayName = name;
    } else {
        displayName = name + ' Bank';
    }
    
    const newBank = {
        id: banks.length + 1,
        name: bankName,
        displayName: displayName,
        accountNo: accountNo
    };
    
    banks.push(newBank);
    localStorage.setItem('banks', JSON.stringify(banks));
    
    // Also add as ledger if not exists
    if (!ledgers.some(l => l.name === bankName)) {
        const newLedger = {
            id: ledgers.length + 1,
            name: bankName,
            type: 'asset',
            category: 'bank',
            group: ''
        };
        ledgers.push(newLedger);
        localStorage.setItem('ledgers', JSON.stringify(ledgers));
        updateAllLedgerDropdowns();
    }
    
    updateBankDropdowns();
    
    // Select the new bank
    document.getElementById(`${entryType}-bank`).value = bankName;
    handleBankSelect(entryType);
    
    closeBankModal();
}

// Handle bank selection
function handleBankSelect(type) {
    const bankHidden = document.getElementById(`${type}-bank`);
    const bankInput = document.getElementById(`${type}-bank-input`);
    const accountInput = document.getElementById(`${type}-account`);
    const entrySection = document.getElementById(`${type}-entry-section`);
    
    if (!bankHidden) return;
    
    if (bankHidden.value || (bankInput && bankInput.value)) {
        const selectedBank = banks.find(b => 
            b.name.toLowerCase() === (bankHidden.value || '').toLowerCase() ||
            (bankInput && b.displayName && b.displayName.toLowerCase() === bankInput.value.toLowerCase())
        );
        
        if (accountInput && selectedBank && selectedBank.accountNo) {
            accountInput.value = selectedBank.accountNo;
        }
        
        // Show entry section
        if (entrySection) entrySection.style.display = 'block';
        
        // Show bank balance
        if (selectedBank) {
            showBalanceAboveAmount(type, 'bank', selectedBank.name);
        }
        
        // Update subgroup datalist
        updateSubGroupDatalist(type);
        
        setTimeout(() => {
            document.getElementById(`${type}-ledger-input`).focus();
        }, 100);
    }
}

// Handle account input
function handleAccountInput(type) {
    const accountInput = document.getElementById(`${type}-account`);
    const ledgerGroup = document.querySelector(`#${type} .ledger-group`);
    
    // Show ledger group when account has value
    if (accountInput.value.trim()) {
        ledgerGroup.style.display = 'block';
    } else {
        ledgerGroup.style.display = 'none';
    }
}

// Save account number to bank
function saveAccountNumber(type) {
    const bankHidden = document.getElementById(`${type}-bank`);
    const bankInput = document.getElementById(`${type}-bank-input`);
    const accountInput = document.getElementById(`${type}-account`);
    
    const bankName = bankHidden.value || (bankInput ? bankInput.value : '');
    if (bankName && accountInput.value.trim()) {
        const bankIndex = banks.findIndex(b => 
            b.name === bankName || 
            b.displayName === bankName
        );
        if (bankIndex !== -1) {
            banks[bankIndex].accountNo = accountInput.value.trim();
            localStorage.setItem('banks', JSON.stringify(banks));
        }
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
    banks.forEach(bank => {
        options += `<option value="${bank.displayName || bank.name}">`;
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
    
    const subgroupInput = document.getElementById(`${type}-subgroup-input`);
    if (subgroupInput) subgroupInput.value = '';
    
    const subgroupHidden = document.getElementById(`${type}-subgroup`);
    if (subgroupHidden) subgroupHidden.value = '';
    
    if (paymentType === 'cash') {
        // Hide bank section, show entry section
        if (bankSection) bankSection.style.display = 'none';
        if (entrySection) entrySection.style.display = 'block';
        if (actionBtns) actionBtns.style.display = 'none';
        
        // Show cash balance
        showBalanceAboveAmount(type, 'cash');
        
        // Update subgroup datalist for cash (expense groups)
        updateSubGroupDatalist(type);
        
        setTimeout(() => {
            document.getElementById(`${type}-ledger-input`).focus();
        }, 100);
    } else {
        // Show bank section, hide entry section until bank is selected
        if (bankSection) bankSection.style.display = 'block';
        if (entrySection) entrySection.style.display = 'none';
        if (actionBtns) actionBtns.style.display = 'none';
        
        setTimeout(() => {
            document.getElementById(`${type}-bank-input`).focus();
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

function createJournalRow(isFirstRow = false, amount = '') {
    const row = document.createElement('div');
    row.className = 'journal-entry-row';
    if (isFirstRow) row.classList.add('first-row');
    
    // Generate unique IDs for this row's datalists
    const ledgerUniqueId = 'journal-ledger-list-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    const subgroupUniqueId = 'journal-subgroup-list-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    
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
    
    // Subgroup field
    const subgroupContainer = document.createElement('div');
    subgroupContainer.className = 'form-group subgroup-select-wrapper';
    subgroupContainer.innerHTML = `
        <label>sub group</label>
        <div class="searchable-select-wrapper" style="width: 100%;">
            <input type="text" 
                   class="journal-subgroup-input searchable-select" 
                   placeholder="Type to search sub group..." 
                   autocomplete="off"
                   list="${subgroupUniqueId}">
            <datalist id="${subgroupUniqueId}" class="journal-subgroup-list"></datalist>
            <input type="hidden" class="journal-subgroup-select">
            <button type="button" class="journal-new-subgroup-btn" onclick="showJournalNewSubGroupModal(this)">
                <i class="fas fa-plus"></i> new
            </button>
        </div>
    `;
    
    const debitGroup = document.createElement('div');
    debitGroup.className = 'form-group';
    debitGroup.innerHTML = `
        <label>debit</label>
        <input type="number" class="journal-debit" value="${amount}" placeholder="0.00" min="0" step="any" oninput="updateJournalTotals(); validateJournalForSave();">
    `;
    
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
    
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-row-btn';
    removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
    removeBtn.onclick = function() { removeJournalRow(this); };
    removeBtn.style.display = 'none';
    
    row.appendChild(ledgerContainer);
    row.appendChild(subgroupContainer);
    row.appendChild(debitGroup);
    row.appendChild(creditGroup);
    row.appendChild(removeBtn);
    
    // Initialize searchable functionality for this row
    setTimeout(() => {
        initJournalLedgerRow(row);
        initJournalSubgroupRow(row);
    }, 100);
    
    return row;
}

// Initialize journal ledger row with searchable functionality
function initJournalLedgerRow(row) {
    const ledgerInput = row.querySelector('.journal-ledger-input');
    const ledgerHidden = row.querySelector('.journal-ledger-select');
    const ledgerList = row.querySelector('.journal-ledger-list');
    
    if (!ledgerInput || !ledgerHidden || !ledgerList) return;
    
    // Populate datalist with all ledgers
    updateJournalLedgerDatalist(row);
    
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
            ledgerInput.value = matchedLedger.name;
            
            // Update subgroup datalist based on selected ledger
            updateJournalSubgroupDatalist(row);
            
            // Focus next field - go to SUBGROUP
            const subgroupInput = row.querySelector('.journal-subgroup-input');
            if (subgroupInput) {
                subgroupInput.focus();
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
                this.value = matchedLedger.name;
                updateJournalSubgroupDatalist(row);
            }
        }
    });
    
    // Handle Enter key - go to SUBGROUP
    ledgerInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            if (ledgerHidden.value) {
                // Move to subgroup field
                const subgroupInput = row.querySelector('.journal-subgroup-input');
                if (subgroupInput) {
                    subgroupInput.focus();
                }
            } else {
                // If no ledger selected, try to find match
                const matchedLedger = ledgers.find(l => 
                    l.name.toLowerCase().includes(ledgerInput.value.toLowerCase())
                );
                
                if (matchedLedger) {
                    ledgerHidden.value = matchedLedger.id;
                    ledgerInput.value = matchedLedger.name;
                    updateJournalSubgroupDatalist(row);
                    
                    // Then move to subgroup
                    setTimeout(() => {
                        const subgroupInput = row.querySelector('.journal-subgroup-input');
                        if (subgroupInput) subgroupInput.focus();
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
    
    // Update subgroup datalist based on selected ledger
    function updateSubgroupDatalistForRow() {
        if (!ledgerHidden || !ledgerHidden.value) {
            subgroupList.innerHTML = '';
            return;
        }
        
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
    
    // Initial update
    updateSubgroupDatalistForRow();
    
    // Watch for ledger changes
    if (ledgerHidden) {
        // Use a simple interval or event listener instead of MutationObserver
        const checkLedgerChange = function() {
            updateSubgroupDatalistForRow();
        };
        
        // Listen for change events on ledger input
        const ledgerInput = row.querySelector('.journal-ledger-input');
        if (ledgerInput) {
            ledgerInput.addEventListener('change', checkLedgerChange);
            ledgerInput.addEventListener('blur', checkLedgerChange);
        }
    }
    
    // Handle input
    subgroupInput.addEventListener('input', function() {
        const value = this.value;
        const ledgerId = ledgerHidden ? ledgerHidden.value : null;
        const ledger = ledgers.find(l => l.id == ledgerId);
        
        if (!ledger) return;
        
        // Get all groups for this ledger type
        let groups = [];
        if (ledger.type === 'expense') groups = [...ledgerSubGroups.expense, ...customSubGroups.filter(g => g.type === 'expense')];
        else if (ledger.type === 'asset') groups = [...ledgerSubGroups.asset, ...customSubGroups.filter(g => g.type === 'asset')];
        else if (ledger.type === 'liability') groups = [...ledgerSubGroups.liability, ...customSubGroups.filter(g => g.type === 'liability')];
        else if (ledger.type === 'income') groups = [...ledgerSubGroups.income, ...customSubGroups.filter(g => g.type === 'income')];
        else if (ledger.type === 'equity') groups = [...ledgerSubGroups.equity, ...customSubGroups.filter(g => g.type === 'equity')];
        
        // Find match
        const matchedGroup = groups.find(g => 
            g.label.toLowerCase().includes(value.toLowerCase())
        );
        
        if (matchedGroup) {
            subgroupHidden.value = matchedGroup.value;
        }
    });
    
    // Handle selection from datalist
    subgroupInput.addEventListener('change', function() {
        const value = this.value;
        const ledgerId = ledgerHidden ? ledgerHidden.value : null;
        const ledger = ledgers.find(l => l.id == ledgerId);
        
        if (!ledger) return;
        
        // Get all groups for this ledger type
        let groups = [];
        if (ledger.type === 'expense') groups = [...ledgerSubGroups.expense, ...customSubGroups.filter(g => g.type === 'expense')];
        else if (ledger.type === 'asset') groups = [...ledgerSubGroups.asset, ...customSubGroups.filter(g => g.type === 'asset')];
        else if (ledger.type === 'liability') groups = [...ledgerSubGroups.liability, ...customSubGroups.filter(g => g.type === 'liability')];
        else if (ledger.type === 'income') groups = [...ledgerSubGroups.income, ...customSubGroups.filter(g => g.type === 'income')];
        else if (ledger.type === 'equity') groups = [...ledgerSubGroups.equity, ...customSubGroups.filter(g => g.type === 'equity')];
        
        // Find exact match
        const matchedGroup = groups.find(g => 
            g.label === value || g.label.toLowerCase() === value.toLowerCase()
        );
        
        if (matchedGroup) {
            subgroupHidden.value = matchedGroup.value;
            this.value = matchedGroup.label;
        }
    });
    
    // Handle blur
    subgroupInput.addEventListener('blur', function() {
        if (!subgroupHidden.value && this.value) {
            const ledgerId = ledgerHidden ? ledgerHidden.value : null;
            const ledger = ledgers.find(l => l.id == ledgerId);
            
            if (!ledger) return;
            
            // Get all groups for this ledger type
            let groups = [];
            if (ledger.type === 'expense') groups = [...ledgerSubGroups.expense, ...customSubGroups.filter(g => g.type === 'expense')];
            else if (ledger.type === 'asset') groups = [...ledgerSubGroups.asset, ...customSubGroups.filter(g => g.type === 'asset')];
            else if (ledger.type === 'liability') groups = [...ledgerSubGroups.liability, ...customSubGroups.filter(g => g.type === 'liability')];
            else if (ledger.type === 'income') groups = [...ledgerSubGroups.income, ...customSubGroups.filter(g => g.type === 'income')];
            else if (ledger.type === 'equity') groups = [...ledgerSubGroups.equity, ...customSubGroups.filter(g => g.type === 'equity')];
            
            // Try to find partial match
            const matchedGroup = groups.find(g => 
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
            
            const isFirstRow = row === document.querySelector('.journal-entry-row');
            if (isFirstRow) {
                // First row - only debit is enabled
                const debitInput = row.querySelector('.journal-debit');
                if (debitInput) {
                    debitInput.focus();
                }
            } else {
                // Other rows - both debit and credit are enabled
                // Default to debit, but let user choose
                const debitInput = row.querySelector('.journal-debit');
                const creditInput = row.querySelector('.journal-credit');
                
                if (debitInput && !debitInput.readOnly) {
                    debitInput.focus();
                } else if (creditInput && !creditInput.readOnly) {
                    creditInput.focus();
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
    ledgers.forEach(ledger => {
        options += `<option value="${ledger.name}">`;
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
        
        options += '<option value="new">-- create new ledger --</option>';
        select.innerHTML = options;
    });
    
    // Also update all journal datalists
    updateAllJournalLedgerDatalists();
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
    document.getElementById('modal-entry-type').value = type;
    document.getElementById('modal-row-id').value = '';
    document.getElementById('modal-ledger-name').value = '';
    document.getElementById('modal-ledger-type').value = 'asset';
    
    // Add group dropdown based on type
    const groupContainer = document.getElementById('modal-group-container');
    if (groupContainer) {
        let groupOptions = '<option value="">-- No Group --</option>';
        
        if (type === 'payment' || type === 'expense') {
            pnlGroups.expense.forEach(g => {
                groupOptions += `<option value="${g.value}">${g.label}</option>`;
            });
        } else if (type === 'receipt' || type === 'income') {
            pnlGroups.income.forEach(g => {
                groupOptions += `<option value="${g.value}">${g.label}</option>`;
            });
        }
        
        document.getElementById('modal-ledger-group').innerHTML = groupOptions;
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
        
        // Make sure ledgers is defined
        if (typeof ledgers === 'undefined') {
            ledgers = window.ledgers || [];
        }
        
        // Check if ledger already exists - with safety check
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
        if (name.toLowerCase().includes('bank')) {
            category = 'bank';
        } else if (type === 'asset' && name.toLowerCase().includes('receivable')) {
            category = 'receivable';
        } else if (type === 'liability' && name.toLowerCase().includes('payable')) {
            category = 'payable';
        } else if (type === 'expense') {
            category = 'expense';
        } else if (type === 'income') {
            category = 'income';
        } else if (type === 'asset' && name.toLowerCase().includes('cash')) {
            category = 'cash';
        }
        
        // Make sure ledgers is an array before pushing
        if (!ledgers) ledgers = [];
        
        const newLedger = {
            id: ledgers.length + 1,
            name: name.toLowerCase(),
            type: type,
            category: category,
            group: group
        };
        
        ledgers.push(newLedger);
        localStorage.setItem('ledgers', JSON.stringify(ledgers));
        updateAllLedgerDropdowns();
        
        if(entryType === 'payment' || entryType === 'receipt') {
            const ledgerSelect = document.getElementById(`${entryType}-ledger`);
            if (ledgerSelect) {
                ledgerSelect.value = newLedger.id;
                handleLedgerSelect(entryType);
            }
        } else if(entryType === 'journal' && rowId !== '') {
            const rows = document.querySelectorAll('.journal-entry-row');
            const targetRow = rows[parseInt(rowId)];
            
            if(targetRow) {
                const select = targetRow.querySelector('.journal-ledger-select');
                const newLedgerBtn = targetRow.querySelector('.journal-new-ledger-btn');
                const newLedgerGroup = targetRow.querySelector('.journal-new-ledger-input-group');
                
                if(select) {
                    select.value = newLedger.id;
                    select.style.display = 'block';
                    select.dispatchEvent(new Event('change', { bubbles: true }));
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
    // Make sure banks is defined
    if (typeof banks === 'undefined') {
        banks = window.banks || [];
    }
    
    // Make sure ledgers is defined
    if (typeof ledgers === 'undefined') {
        ledgers = window.ledgers || [];
    }
    console.log('========== SAVE ENTRY DEBUG ==========');
    console.log('Saving entry type:', type);
    
    // ===== CREATE YOUR VARIABLES HERE =====
    const date = document.getElementById(`${type}-date`)?.value || '';
    const voucher = document.getElementById(`${type}-voucher`)?.value || '';
    const paymentType = document.querySelector(`input[name="${type}-type"]:checked`)?.value;
    const amount = parseFloat(document.getElementById(`${type}-amount`)?.value) || 0;
    const narration = document.getElementById(`${type}-narration`)?.value || '';
    
    // Log them
    console.log('- date:', date);
    console.log('- voucher:', voucher);
    console.log('- paymentType:', paymentType);
    console.log('- amount:', amount);
    console.log('- narration:', narration);
    
    // Check bank elements if paymentType is bank
    if (paymentType === 'bank') {
        const bankHidden = document.getElementById(`${type}-bank`);
        const bankInput = document.getElementById(`${type}-bank-input`);
        const accountInput = document.getElementById(`${type}-account`);
        console.log('- bank hidden:', bankHidden?.value);
        console.log('- bank input:', bankInput?.value);
        console.log('- account input:', accountInput?.value);
    }
    
    const ledgerHidden = document.getElementById(`${type}-ledger`);
    const ledgerInput = document.getElementById(`${type}-ledger-input`);
    console.log('- ledger hidden:', ledgerHidden?.value);
    console.log('- ledger input:', ledgerInput?.value);
    
    const subgroupElement = document.getElementById(`${type}-subgroup`);
    console.log('- subgroup element exists:', !!subgroupElement);
    console.log('- subgroup value:', subgroupElement?.value);
    console.log('======================================');

    console.log('Saving entry:', type);

    let ledgerId = ledgerHidden ? ledgerHidden.value : '';
    
    // Get new ledger name if any
    const newLedgerName = document.getElementById(`${type}-new-ledger`)?.value.trim() || '';
    
    // Initialize variables for cash/bank ledger
    let cashBankLedgerId = null;
    let cashBankLedgerName = '';
    let bankName = '';
    let accountNumber = '';
    
    // ========== HANDLE BANK SELECTION ==========
    if (paymentType === 'bank') {
        // Get bank from hidden field
        const bankHidden = document.getElementById(`${type}-bank`);
        bankName = bankHidden ? bankHidden.value : '';
        
        // If hidden field is empty, try to get from input
        if (!bankName) {
            const bankInput = document.getElementById(`${type}-bank-input`);
            console.log('Bank input value:', bankInput?.value);
            if (bankInput && bankInput.value) {
                // Try to find bank by input value (case insensitive)
                const matchedBank = banks.find(b => 
                    b.displayName.toLowerCase() === bankInput.value.toLowerCase() ||
                    b.name.toLowerCase() === bankInput.value.toLowerCase()
                );
                if (matchedBank) {
                    bankName = matchedBank.name;
                    if (bankHidden) bankHidden.value = matchedBank.name;
                    console.log('Matched bank:', bankName);
                }
            }
        }
        
        // Get account number
        accountNumber = document.getElementById(`${type}-account`).value.trim();
        
        // Validate bank selection
        if (!bankName) {
            alert('Please select a bank');
            const bankInput = document.getElementById(`${type}-bank-input`);
            if (bankInput) bankInput.focus();
            return;
        }
        
        console.log('Selected bank:', bankName);
        
        // Find the bank ledger (case insensitive) - FIXED WITH SAFETY CHECKS
        let bankLedger = null;
        if (ledgers && Array.isArray(ledgers) && ledgers.length > 0) {
            try {
                bankLedger = ledgers.find(l => 
                    l && 
                    l.name && 
                    typeof l.name === 'string' && 
                    l.name.toLowerCase() === bankName.toLowerCase()
                );
            } catch (e) {
                console.warn('Error finding bank ledger:', e);
            }
        }
        console.log('Bank ledger found:', bankLedger);
        
        if (bankLedger) {
            cashBankLedgerId = bankLedger.id;
            cashBankLedgerName = bankLedger.name;
        } else {
            console.log('Bank ledger not found, creating new one');
            // If bank ledger not found, create it
            const newBankLedger = {
                id: ledgers ? ledgers.length + 1 : 1,
                name: bankName.toLowerCase(),
                type: 'asset',
                category: 'bank',
                group: ''
            };
            
            // Make sure ledgers is an array
            if (!ledgers) ledgers = [];
            ledgers.push(newBankLedger);
            localStorage.setItem('ledgers', JSON.stringify(ledgers));
            cashBankLedgerId = newBankLedger.id;
            cashBankLedgerName = newBankLedger.name;
            updateAllLedgerDropdowns();
        }
        
        // Save account number to bank if provided
        if (accountNumber) {
            if (banks && Array.isArray(banks)) {
                const bankIndex = banks.findIndex(b => b.name.toLowerCase() === bankName.toLowerCase());
                if (bankIndex !== -1) {
                    banks[bankIndex].accountNo = accountNumber;
                    localStorage.setItem('banks', JSON.stringify(banks));
                } else {
                    // Add to banks array if not exists
                    const newBank = {
                        id: banks.length + 1,
                        name: bankName.toLowerCase(),
                        displayName: bankName,
                        accountNo: accountNumber
                    };
                    banks.push(newBank);
                    localStorage.setItem('banks', JSON.stringify(banks));
                    updateBankDropdowns();
                }
            }
        }
    }
    // ========== HANDLE CASH SELECTION ==========
    else {
        // Find cash ledger (case insensitive)
        const cashLedger = ledgers.find(l => l.name.toLowerCase() === 'cash');
        if (cashLedger) {
            cashBankLedgerId = cashLedger.id;
            cashBankLedgerName = cashLedger.name;
        } else {
            alert('Cash ledger not found! Please create a cash ledger first.');
            return;
        }
    }
    
    // ========== VALIDATE REQUIRED FIELDS ==========
    if(!date) {
        alert('Please select a date');
        document.getElementById(`${type}-date`).focus();
        return;
    }
    
    // Try to get ledger ID from input if hidden is empty
    if (!ledgerId) {
        const ledgerInput = document.getElementById(`${type}-ledger-input`);
        console.log('Ledger input value:', ledgerInput?.value);

        if (ledgerInput && ledgerInput.value) {
            const matchedLedger = ledgers.find(l => 
                l.name.toLowerCase() === ledgerInput.value.toLowerCase()
            );
            if (matchedLedger) {
                ledgerId = matchedLedger.id;
                if (ledgerHidden) ledgerHidden.value = matchedLedger.id;
                console.log('Matched ledger:', matchedLedger.name);
            }
        }
    }
    
    if (!ledgerId) {
        console.log('No ledger ID found!');
        alert('Please select a ledger');
        const ledgerInput = document.getElementById(`${type}-ledger-input`);
        if (ledgerInput) ledgerInput.focus();
        return;
    }
    
    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        document.getElementById(`${type}-amount`).focus();
        return;
    }
    
    if (!cashBankLedgerId) {
        alert(`Could not find ${paymentType} ledger`);
        return;
    }
    
    // ========== HANDLE NEW LEDGER CREATION ==========
    if(ledgerId === 'new') {
        if(!newLedgerName) {
            alert('Please enter a ledger name');
            document.getElementById(`${type}-new-ledger`).focus();
            return;
        }
        
        // Check if ledger already exists (case insensitive)
        let existingLedger = ledgers.find(l => l.name.toLowerCase() === newLedgerName.toLowerCase());
        if(existingLedger) {
            ledgerId = existingLedger.id;
        } else {
            // Determine ledger type based on transaction type
            let ledgerType = '';
            let category = '';
            
            if (type === 'payment') {
                // Payment: other ledger is usually expense
                ledgerType = 'expense';
                category = 'expense';
            } else {
                // Receipt: other ledger is usually income
                ledgerType = 'income';
                category = 'income';
            }
            
            // Create new ledger
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
    
    // ========== GET THE SELECTED LEDGER ==========
    const otherLedger = ledgers.find(l => l.id == ledgerId);
    if(!otherLedger) {
        alert('Selected ledger not found');
        return;
    }
    
    console.log('Other ledger found:', otherLedger.name, 'ID:', otherLedger.id);
    
    // ========== CREATE TRANSACTION DESCRIPTION ==========
    let transactionNarration = narration;
    if (paymentType === 'bank' && bankName) {
        // SIMPLE FIX: Use bank name directly without lookup
        const accountDisplay = accountNumber ? ` (A/C: ${accountNumber})` : '';
        transactionNarration = narration || `${type === 'payment' ? 'Payment' : 'Receipt'} via ${bankName}${accountDisplay}`;
    }
    
    // ========== CREATE DOUBLE-ENTRY TRANSACTIONS ==========
    const transactions_to_add = [];
    const baseId = Date.now();
    
    if (type === 'payment') {
        // PAYMENT: Cash/Bank is CREDIT, Other ledger is DEBIT
        console.log('Creating PAYMENT entries:');
        console.log(`- Credit: ${cashBankLedgerName} (Cash/Bank) - ${amount}`);
        console.log(`- Debit: ${otherLedger.name} (Other Ledger) - ${amount}`);

        // Entry 1: Credit Cash/Bank (decreases)
        transactions_to_add.push({
            id: baseId,
            date: date,
            voucher: voucher,
            type: type,
            ledger: cashBankLedgerName,
            payment_type: paymentType,
            bank_name: paymentType === 'bank' ? bankName : null,
            account_number: paymentType === 'bank' ? accountNumber : null,
            amount: amount,
            debit: 0,
            credit: amount,
            subgroup: '',
            narration: transactionNarration || `Payment made - ${otherLedger.name}`,
            entry_type: type
        });
        
        // Entry 2: Debit Other ledger
        let subgroupValue = '';
        const subgroupElement = document.getElementById(`${type}-subgroup`);
        if (subgroupElement) {
            subgroupValue = subgroupElement.value || '';
        }
        
        transactions_to_add.push({
            id: baseId + 1,
            date: date,
            voucher: voucher,
            type: type,
            ledger: otherLedger.name,
            payment_type: paymentType,
            bank_name: paymentType === 'bank' ? bankName : null,
            account_number: paymentType === 'bank' ? accountNumber : null,
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
        console.log('Creating RECEIPT entries:');
        console.log(`- Debit: ${cashBankLedgerName} (Cash/Bank) - ${amount}`);
        console.log(`- Credit: ${otherLedger.name} (Other Ledger) - ${amount}`);
        
        // Entry 1: Debit Cash/Bank (increases)
        transactions_to_add.push({
            id: baseId,
            date: date,
            voucher: voucher,
            type: type,
            ledger: cashBankLedgerName,
            payment_type: paymentType,
            bank_name: paymentType === 'bank' ? bankName : null,
            account_number: paymentType === 'bank' ? accountNumber : null,
            amount: amount,
            debit: amount,
            credit: 0,
            subgroup: '',
            narration: transactionNarration || `Receipt received - ${otherLedger.name}`,
            entry_type: type
        });
        
        let subgroupValue = '';
        const subgroupElement = document.getElementById(`${type}-subgroup`);
        if (subgroupElement) {
            subgroupValue = subgroupElement.value || '';
        }
        
        // Entry 2: Credit Other ledger (increases income/liability)
        transactions_to_add.push({
            id: baseId + 1,
            date: date,
            voucher: voucher,
            type: type,
            ledger: otherLedger.name,
            payment_type: paymentType,
            bank_name: paymentType === 'bank' ? bankName : null,
            account_number: paymentType === 'bank' ? accountNumber : null,
            amount: amount,
            debit: 0,
            credit: amount,
            subgroup: subgroupValue,
            narration: transactionNarration || `Receipt received - ${cashBankLedgerName}`,
            entry_type: type
        });
    }
    
    // ========== SAVE TO LOCALSTORAGE ==========
    transactions = [...transactions, ...transactions_to_add];
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    console.log('Transactions saved:', transactions_to_add.length);
    console.log('Total transactions:', transactions.length);
    
    // ========== UPDATE UI ==========
    displayRecentTransactions();
    updateVoucherNumbers();
    resetForm(type);
    
    // Show success message with details
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
    
    // Clear subgroup fields
    const subgroupInput = document.getElementById(`${type}-subgroup-input`);
    if (subgroupInput) subgroupInput.value = '';
    
    const subgroupHidden = document.getElementById(`${type}-subgroup`);
    if (subgroupHidden) subgroupHidden.value = '';
    
    // Clear bank fields
    const bankInput = document.getElementById(`${type}-bank-input`);
    if (bankInput) bankInput.value = '';
    
    const bankHidden = document.getElementById(`${type}-bank`);
    if (bankHidden) bankHidden.value = '';
    
    const accountField = document.getElementById(`${type}-account`);
    if (accountField) accountField.value = '';
    
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
    
    // Get all journal entry rows
    const journalRows = document.querySelectorAll('.journal-entry-row');
    
    journalRows.forEach((row, index) => {
        const ledgerHidden = row.querySelector('.journal-ledger-select');
        const ledgerInput = row.querySelector('.journal-ledger-input');
        const newLedgerInput = row.querySelector('.journal-new-ledger');
        const subgroupHidden = row.querySelector('.journal-subgroup-select');
        const debit = parseFloat(row.querySelector('.journal-debit')?.value) || 0;
        const credit = parseFloat(row.querySelector('.journal-credit')?.value) || 0;
        
        // First row cannot have credit
        if (index === 0 && credit > 0) {
            alert('First row cannot have credit amount');
            hasErrors = true;
            return;
        }
        
        // Get ledger ID from hidden field or find by input value
        let ledgerId = ledgerHidden ? ledgerHidden.value : null;
        
        // If hidden field is empty but input has value, try to find matching ledger
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
            
            // Check if ledger already exists - CASE INSENSITIVE
            let existingLedger = ledgers.find(l => l.name.toLowerCase() === newLedgerName.toLowerCase());
            if(existingLedger) {
                ledgerId = existingLedger.id;
            } else {
                // Create new ledger
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
                
                // Update dropdowns
                updateAllLedgerDropdowns();
            }
        }
        
        // Validate row has ledger and amount
        if(ledgerId && (debit > 0 || credit > 0)) {
            const ledger = ledgers.find(l => l.id == ledgerId);
            if(ledger) {
                // Get subgroup value
                const subgroupValue = subgroupHidden ? subgroupHidden.value : '';
                
                rows.push({ 
                    ledger: ledger.name, 
                    debit: debit, 
                    credit: credit,
                    subgroup: subgroupHidden?.value || '' // ← ADD THIS LINE
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
    
    // Check for errors
    if(hasErrors) return;
    
    // Check if at least one entry
    if(rows.length === 0) {
        alert('Please add at least one journal entry');
        return;
    }
    
    // Validate totals
    if(rows.length === 1) {
        // Single row - must be debit only
        if(totalDebit === 0) {
            alert('Please enter a debit amount');
            return;
        }
        if(totalCredit > 0) {
            alert('Single row cannot have credit amount');
            return;
        }
        
        // Find cash ledger - CASE INSENSITIVE
        const cashLedger = ledgers.find(l => l.name.toLowerCase() === 'cash');
        if (!cashLedger) {
            alert('Cash ledger not found! Please create a cash ledger.');
            return;
        }
        
        // Add the credit entry automatically (cash/bank)
        rows.push({
            ledger: cashLedger.name,
            debit: 0,
            credit: totalDebit,
            subgroup: ''
        });
        
        totalCredit = totalDebit;
        
    } else {
        // Multiple rows - validate totals balance
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
    
    console.log('Journal entries saved:', transactions_to_add.length);
    
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
window.saveAccountNumber = saveAccountNumber;
window.getCurrentBalances = getCurrentBalances;
window.showBalanceAboveAmount = showBalanceAboveAmount;
window.removeBalanceAbove = removeBalanceAbove;
window.updateGroupDropdown = updateGroupDropdown;
window.updateSubGroupDatalist = updateSubGroupDatalist;
window.showNewSubGroupModal = showNewSubGroupModal;
window.closeSubGroupModal = closeSubGroupModal;
window.createNewSubGroup = createNewSubGroup;
