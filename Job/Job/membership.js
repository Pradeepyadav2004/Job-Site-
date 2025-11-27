// Membership Modal Functionality

// Membership Functions
function getUserMembership() {
    const memberships = JSON.parse(localStorage.getItem('memberships')) || {};
    const userMembership = memberships[currentUser?.id] || {
        plan: 'bronze',
        applicationsUsed: 0,
        applicationsLimit: 3,
        expiresAt: null,
        lastReset: new Date().getTime()
    };
    
    // Reset applications if it's a new month
    const now = new Date().getTime();
    const lastReset = userMembership.lastReset || new Date().getTime();
    const monthInMs = 30 * 24 * 60 * 60 * 1000;
    
    if (now - lastReset > monthInMs) {
        userMembership.applicationsUsed = 0;
        userMembership.lastReset = now;
        memberships[currentUser.id] = userMembership;
        localStorage.setItem('memberships', JSON.stringify(memberships));
    }
    
    return userMembership;
}

function subscribeToPlan(planType) {
    if (!currentUser) {
        showNotification('Please login to subscribe to a plan', 'error');
        return;
    }
    
    const plans = {
        silver: { applicationsLimit: 999, duration: 1 },
        gold: { applicationsLimit: 999, duration: 2 },
        diamond: { applicationsLimit: 999, duration: 3 }
    };
    
    const plan = plans[planType];
    if (!plan) return;
    
    const memberships = JSON.parse(localStorage.getItem('memberships')) || {};
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + plan.duration);
    
    memberships[currentUser.id] = {
        plan: planType,
        applicationsUsed: 0,
        applicationsLimit: plan.applicationsLimit,
        expiresAt: expiresAt.toISOString(),
        lastReset: new Date().getTime(),
        subscribedAt: new Date().toISOString(),
        paymentAmount: selectedPlanPrice
    };
    
    localStorage.setItem('memberships', JSON.stringify(memberships));
    
    // Update membership modal to show current plan
    updateMembershipModal();
}

function canApplyForJob() {
    if (!currentUser) return false;
    
    const membership = getUserMembership();
    return membership.applicationsUsed < membership.applicationsLimit;
}

function getRemainingApplications() {
    if (!currentUser) return 0;
    
    const membership = getUserMembership();
    return Math.max(0, membership.applicationsLimit - membership.applicationsUsed);
}

function updateMembershipUI() {
    if (!currentUser) return;
    
    const membership = getUserMembership();
    const membershipBtn = document.getElementById('membershipBtn');
    
    if (membershipBtn) {
        membershipBtn.innerHTML = `
            <i class="fas fa-crown"></i>
            ${membership.plan.charAt(0).toUpperCase() + membership.plan.slice(1)}
            <span class="membership-badge ${membership.plan}">${getRemainingApplications()}</span>
        `;
    }
    
    // Update membership modal if it's open
    updateMembershipModal();
}

function updateMembershipModal() {
    if (!currentUser) return;
    
    const membership = getUserMembership();
    const planCards = document.querySelectorAll('.plan-card');
    
    // Update current plan status section
    const currentPlanStatus = document.getElementById('currentPlanStatus');
    if (currentPlanStatus) {
        const planNames = {
            'bronze': 'Bronze Plan',
            'silver': 'Silver Plan',
            'gold': 'Gold Plan',
            'diamond': 'Diamond Plan'
        };
        
        const planPrices = {
            'bronze': 'Free',
            'silver': '₹49',
            'gold': '₹99',
            'diamond': '₹149'
        };
        
        const planDurations = {
            'bronze': 'Forever',
            'silver': '1 Month',
            'gold': '2 Months',
            'diamond': '3 Months'
        };
        
        // Update current plan details
        document.getElementById('currentPlanName').textContent = planNames[membership.plan];
        document.getElementById('currentPlanPrice').textContent = planPrices[membership.plan];
        document.getElementById('currentPlanDuration').textContent = planDurations[membership.plan];
        document.getElementById('currentPlanApplicationsUsed').textContent = `${membership.applicationsUsed}/${membership.applicationsLimit}`;
        
        // Update expiry date
        const expiresText = membership.expiresAt ? 
            new Date(membership.expiresAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : 'Never';
        document.getElementById('currentPlanExpires').textContent = expiresText;
        
        // Show the current plan status section
        currentPlanStatus.style.display = 'block';
    }
    
    planCards.forEach(card => {
        const planType = card.classList.contains('bronze') ? 'bronze' : 
                        card.classList.contains('silver') ? 'silver' :
                        card.classList.contains('gold') ? 'gold' : 'diamond';
        
        const button = card.querySelector('button');
        
        if (planType === membership.plan) {
            button.textContent = 'Current Plan';
            button.className = 'btn btn-secondary';
            button.disabled = true;
        } else if (planType === 'bronze') {
            button.textContent = 'Current Plan';
            button.className = 'btn btn-secondary';
            button.disabled = true;
        } else {
            button.textContent = 'Subscribe Now';
            button.className = 'btn btn-primary';
            button.disabled = false;
            button.onclick = () => {
                const prices = { silver: 49, gold: 99, diamond: 149 };
                openPaymentModal(planType, prices[planType]);
            };
        }
    });
}

function openMembershipModal() {
    document.getElementById('membershipModal').style.display = 'block';
    updateMembershipModal(); // Update current plan status when modal opens
}

function viewMembershipDetails() {
    openMembershipModal();
}

function showApplicationLimitWarning() {
    const warning = document.createElement('div');
    warning.className = 'application-limit-warning';
    warning.innerHTML = `
        <h4>Application Limit Reached</h4>
        <p>You've reached your monthly application limit. Upgrade your membership for unlimited applications!</p>
        <button onclick="openMembershipModal(); this.parentElement.remove();">Upgrade Now</button>
        <button onclick="this.parentElement.remove();">Close</button>
    `;
    
    document.body.appendChild(warning);
    
    setTimeout(() => {
        if (warning.parentElement) {
            warning.remove();
        }
    }, 10000);
}

// Payment Functions
let selectedPlanType = null;
let selectedPlanPrice = null;

function openPaymentModal(planType, price) {
    if (!currentUser) {
        showNotification('Please login to subscribe to a plan', 'error');
        return;
    }
    
    selectedPlanType = planType;
    selectedPlanPrice = price;
    
    // Update payment details
    const planNames = {
        'silver': 'Silver Plan',
        'gold': 'Gold Plan', 
        'diamond': 'Diamond Plan'
    };
    
    const planDurations = {
        'silver': '1 Month',
        'gold': '2 Months',
        'diamond': '3 Months'
    };
    
    document.getElementById('selectedPlanName').textContent = planNames[planType];
    document.getElementById('selectedPlanPrice').textContent = `₹${price}`;
    document.getElementById('selectedPlanDuration').textContent = planDurations[planType];
    
    // Close membership modal and open payment modal
    document.getElementById('membershipModal').style.display = 'none';
    document.getElementById('paymentModal').style.display = 'block';
    
    // Setup payment form validation
    setupPaymentFormValidation();
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
    document.getElementById('paymentForm').reset();
    selectedPlanType = null;
    selectedPlanPrice = null;
}

function setupPaymentFormValidation() {
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCvv = document.getElementById('cardCvv');
    
    // Card number formatting
    cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = formattedValue;
    });
    
    // Expiry date formatting
    cardExpiry.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
    
    // CVV validation
    cardCvv.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}

function handlePaymentSubmission(e) {
    e.preventDefault();
    
    if (!currentUser || !selectedPlanType || !selectedPlanPrice) {
        showNotification('Payment information is missing', 'error');
        return;
    }
    
    // Get form data
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCvv = document.getElementById('cardCvv').value;
    
    // Basic validation
    if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
        showNotification('Please fill in all payment details', 'error');
        return;
    }
    
    if (cardNumber.replace(/\s/g, '').length < 13) {
        showNotification('Please enter a valid card number', 'error');
        return;
    }
    
    if (cardCvv.length < 3) {
        showNotification('Please enter a valid CVV', 'error');
        return;
    }
    
    // Show loading state
    const payButton = e.target.querySelector('button[type="submit"]');
    const originalText = payButton.innerHTML;
    payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    payButton.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        processPaymentSuccess();
        
        // Reset button
        payButton.innerHTML = originalText;
        payButton.disabled = false;
    }, 2000);
}

function processPaymentSuccess() {
    // Close payment modal
    closePaymentModal();
    
    // Update success modal with plan details
    const planNames = {
        'silver': 'Silver Plan',
        'gold': 'Gold Plan', 
        'diamond': 'Diamond Plan'
    };
    
    const planDurations = {
        'silver': '1 Month',
        'gold': '2 Months',
        'diamond': '3 Months'
    };
    
    document.getElementById('successPlanName').textContent = planNames[selectedPlanType];
    document.getElementById('successPlanPrice').textContent = `₹${selectedPlanPrice}`;
    document.getElementById('successPlanDuration').textContent = planDurations[selectedPlanType];
    
    // Generate random transaction ID
    const transactionId = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
    document.getElementById('transactionId').textContent = transactionId;
    
    // Set current date
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('transactionDate').textContent = currentDate;
    
    // Show payment success modal
    document.getElementById('paymentSuccessModal').style.display = 'block';
    
    // Process the subscription after showing success modal
    setTimeout(() => {
        subscribeToPlan(selectedPlanType);
        updateMembershipUI();
    }, 500);
    
    // Reset variables
    selectedPlanType = null;
    selectedPlanPrice = null;
}

function closePaymentSuccessModal() {
    document.getElementById('paymentSuccessModal').style.display = 'none';
    // Don't reload the page - let users see their updated membership
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Membership button
    const membershipBtn = document.getElementById('membershipBtn');
    if (membershipBtn) {
        membershipBtn.addEventListener('click', openMembershipModal);
    }
    
    // Payment form
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmission);
    }
});

// Export for use in other files
window.getUserMembership = getUserMembership;
window.subscribeToPlan = subscribeToPlan;
window.canApplyForJob = canApplyForJob;
window.getRemainingApplications = getRemainingApplications;
window.updateMembershipUI = updateMembershipUI;
window.updateMembershipModal = updateMembershipModal;
window.openMembershipModal = openMembershipModal;
window.viewMembershipDetails = viewMembershipDetails;
window.showApplicationLimitWarning = showApplicationLimitWarning;
window.openPaymentModal = openPaymentModal;
window.closePaymentModal = closePaymentModal;
window.setupPaymentFormValidation = setupPaymentFormValidation;
window.handlePaymentSubmission = handlePaymentSubmission;
window.processPaymentSuccess = processPaymentSuccess;
window.closePaymentSuccessModal = closePaymentSuccessModal; 