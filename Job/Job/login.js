// Login Modal Functionality
let currentUser = null;

// Firebase Authentication Functions
function setupFirebaseAuth() {
    const auth = window.firebaseAuth;
    const { onAuthStateChanged } = window.firebaseAuthFunctions;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = {
                id: user.uid,
                email: user.email,
                name: user.displayName || 'User'
            };
            updateUIAfterLogin();
        } else {
            currentUser = null;
            updateUIAfterLogout();
        }
    });
}

function handleFirebaseLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const auth = window.firebaseAuth;
    const { signInWithEmailAndPassword } = window.firebaseAuthFunctions;
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showNotification('Login successful!', 'success');
            closeAllModals();
            
            // Automatically navigate to profile section after successful login
            setTimeout(() => {
                const profileSection = document.getElementById('profile');
                if (profileSection) {
                    profileSection.scrollIntoView({ behavior: 'smooth' });
                    highlightActiveNavItem('profile');
                    
                    // Add active class to profile section for visual feedback
                    profileSection.classList.add('active');
                    setTimeout(() => {
                        profileSection.classList.remove('active');
                    }, 1000);
                }
            }, 500); // Small delay to ensure UI updates first
        })
        .catch((error) => {
            let errorMessage = 'Login failed. Please try again.';
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email address.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password. Please try again.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Please enter a valid email address.';
            }
            showNotification(errorMessage, 'error');
        });
}

function handleFirebaseRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const userType = document.getElementById('userType').value;
    
    const auth = window.firebaseAuth;
    const { createUserWithEmailAndPassword } = window.firebaseAuthFunctions;
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Save additional user data to localStorage
            const userData = {
                id: userCredential.user.uid,
                name: name,
                email: email,
                userType: userType,
                phone: '',
                location: '',
                experience: '',
                skills: ''
            };
            
            const users = JSON.parse(localStorage.getItem('users')) || {};
            users[userCredential.user.uid] = userData;
            localStorage.setItem('users', JSON.stringify(userData));
            
            showNotification('Registration successful!', 'success');
            closeAllModals();
            
            // Automatically navigate to profile section after successful registration
            setTimeout(() => {
                const profileSection = document.getElementById('profile');
                if (profileSection) {
                    profileSection.scrollIntoView({ behavior: 'smooth' });
                    highlightActiveNavItem('profile');
                    
                    // Add active class to profile section for visual feedback
                    profileSection.classList.add('active');
                    setTimeout(() => {
                        profileSection.classList.remove('active');
                    }, 1000);
                }
            }, 500); // Small delay to ensure UI updates first
        })
        .catch((error) => {
            let errorMessage = 'Registration failed. Please try again.';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'An account with this email already exists.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password should be at least 6 characters long.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Please enter a valid email address.';
            }
            showNotification(errorMessage, 'error');
        });
}

function handleFirebaseLogout() {
    const auth = window.firebaseAuth;
    const { signOut } = window.firebaseAuthFunctions;
    
    signOut(auth).then(() => {
        showNotification('Logged out successfully!', 'success');
        currentUser = null;
    }).catch((error) => {
        showNotification('Logout failed. Please try again.', 'error');
    });
}

function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('forgotEmail').value;
    
    // Simulate sending reset email
    showNotification('Reset link sent to your email! (Demo: Use code 123456)', 'success');
    
    // Close forgot password modal and show reset password modal
    document.getElementById('forgotPasswordModal').style.display = 'none';
    document.getElementById('resetPasswordModal').style.display = 'block';
}

function handleResetPassword(e) {
    e.preventDefault();
    
    const resetCode = document.getElementById('resetCode').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (resetCode !== '123456') {
        showNotification('Invalid reset code. Please try again.', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showNotification('Password should be at least 6 characters long.', 'error');
        return;
    }
    
    showNotification('Password reset successful! You can now login with your new password.', 'success');
    closeAllModals();
}

// UI Update Functions
function updateUIAfterLogin() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const membershipBtn = document.getElementById('membershipBtn');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (registerBtn) registerBtn.style.display = 'none';
    
    if (membershipBtn) {
        membershipBtn.style.display = 'inline-block';
        updateMembershipUI();
    }
    
    // Show user menu
    const navMenu = document.querySelector('.nav-menu');
    const userMenuHTML = `
        <li class="nav-item">
            <div class="user-menu">
                <button onclick="showUserMenu()" class="btn btn-outline">
                    <i class="fas fa-user"></i>
                    ${currentUser.name}
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="user-dropdown" id="userDropdown">
                    <a href="#" onclick="showProfileOnPage(); return false;">
                        <i class="fas fa-user-circle"></i> Profile
                    </a>
                    <a href="#" onclick="viewMembershipDetails(); return false;">
                        <i class="fas fa-crown"></i> Membership
                    </a>
                    <a href="#" onclick="handleFirebaseLogout(); return false;">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </div>
            </div>
        </li>
    `;
    
    // Remove existing user menu if any
    const existingUserMenu = navMenu.querySelector('.user-menu');
    if (existingUserMenu) {
        existingUserMenu.parentElement.remove();
    }
    
    // Add user menu
    navMenu.insertAdjacentHTML('beforeend', userMenuHTML);
    
    // Update profile display
    updateProfileDisplay();
    
    // Initialize profile display if function exists
    if (typeof initializeProfile === 'function') {
        initializeProfile();
    }
    
    // Highlight profile section in navigation
    highlightActiveNavItem('profile');
}

function updateUIAfterLogout() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const membershipBtn = document.getElementById('membershipBtn');
    
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (registerBtn) registerBtn.style.display = 'inline-block';
    
    if (membershipBtn) {
        membershipBtn.style.display = 'inline-block';
        membershipBtn.innerHTML = `
            <i class="fas fa-crown"></i>
            Membership
        `;
    }
    
    // Remove user menu
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.parentElement.remove();
    }
    
    // Clear profile section
    const profileContent = document.getElementById('profileContent');
    if (profileContent) {
        profileContent.innerHTML = `
            <div class="profile-card">
                <div class="profile-header">
                    <div class="profile-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="profile-info">
                        <h3>Please login to view your profile</h3>
                        <p>Create an account or login to access your profile</p>
                    </div>
                    <button class="btn btn-primary" onclick="showModal('loginModal')">Login</button>
                </div>
            </div>
        `;
    }
}

function updateProfileDisplay() {
    if (!currentUser) return;
    
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userData = users[currentUser.id] || {};
    
    // Update individual profile elements if they exist
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileType = document.getElementById('profileType');
    const profilePhone = document.getElementById('profilePhone');
    const profileLocation = document.getElementById('profileLocation');
    const profileExperience = document.getElementById('profileExperience');
    const profileSkills = document.getElementById('profileSkills');
    
    if (profileName) profileName.textContent = userData.name || currentUser.name;
    if (profileEmail) profileEmail.textContent = currentUser.email;
    if (profileType) profileType.textContent = userData.userType || 'Job Seeker';
    if (profilePhone) profilePhone.textContent = userData.phone || 'Not provided';
    if (profileLocation) profileLocation.textContent = userData.location || 'Not provided';
    if (profileExperience) profileExperience.textContent = userData.experience || 'Not provided';
    if (profileSkills) profileSkills.textContent = userData.skills || 'Not provided';
    
    // Also call the full profile display function to ensure complete update
    if (typeof displayProfile === 'function') {
        displayProfile();
    }
}

// Modal Functions
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

function showUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Navigation Functions
function navigateToProfile() {
    const profileSection = document.getElementById('profile');
    if (profileSection) {
        profileSection.scrollIntoView({ behavior: 'smooth' });
        highlightActiveNavItem('profile');
        
        // Add active class to profile section for visual feedback
        profileSection.classList.add('active');
        setTimeout(() => {
            profileSection.classList.remove('active');
        }, 1000);
    }
}

function showProfileOnPage() {
    // Close the user dropdown
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
    }
    
    // Hide all sections first
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show only the profile section
    const profileSection = document.getElementById('profile');
    if (profileSection) {
        profileSection.style.display = 'block';
        profileSection.classList.add('full-page');
        profileSection.scrollIntoView({ behavior: 'smooth' });
        
        // Update profile display
        if (typeof displayProfile === 'function') {
            displayProfile();
        }
        
        // Highlight profile in navigation
        highlightActiveNavItem('profile');
    }
}

function showAllSections() {
    // Show all sections except profile (which should remain hidden)
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id === 'profile') {
            section.style.display = 'none'; // Keep profile hidden
            section.classList.remove('full-page');
        } else {
            section.style.display = 'block'; // Show other sections
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function highlightActiveNavItem(sectionId) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to the current section's nav link
    const activeLink = document.querySelector(`[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleFirebaseLogin);
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleFirebaseRegister);
    }
    
    // Forgot password form
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }
    
    // Reset password form
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', handleResetPassword);
    }
    
    // Modal close buttons
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });
    
    // Modal links
    const showRegister = document.getElementById('showRegister');
    if (showRegister) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            showModal('registerModal');
        });
    }
    
    const showLogin = document.getElementById('showLogin');
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            showModal('loginModal');
        });
    }
    
    const showForgotPassword = document.getElementById('showForgotPassword');
    if (showForgotPassword) {
        showForgotPassword.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            showModal('forgotPasswordModal');
        });
    }
    
    const showLoginFromForgot = document.getElementById('showLoginFromForgot');
    if (showLoginFromForgot) {
        showLoginFromForgot.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            showModal('loginModal');
        });
    }
    
    // Login and Register buttons
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => showModal('loginModal'));
    }
    
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', () => showModal('registerModal'));
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close user dropdown when clicking outside
    window.addEventListener('click', (e) => {
        const userMenu = document.querySelector('.user-menu');
        const dropdown = document.getElementById('userDropdown');
        if (userMenu && !userMenu.contains(e.target) && dropdown) {
            dropdown.style.display = 'none';
        }
    });
    
    // Setup Firebase auth
    setupFirebaseAuth();
    
    // Add navigation link event listeners
    setupNavigationLinks();
});

// Navigation setup
function setupNavigationLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                highlightActiveNavItem(sectionId);
            }
        });
    });
}

// Export for use in other files
window.currentUser = currentUser;
window.updateProfileDisplay = updateProfileDisplay;
window.updateUIAfterLogin = updateUIAfterLogin;
window.updateUIAfterLogout = updateUIAfterLogout;
window.showProfileOnPage = showProfileOnPage;
window.showAllSections = showAllSections; 