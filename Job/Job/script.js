// // Global variables
// let currentUser = null;
// let users = JSON.parse(localStorage.getItem('users')) || [];
// let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
// let companies = JSON.parse(localStorage.getItem('companies')) || [];
// let applications = JSON.parse(localStorage.getItem('applications')) || [];
// let admissionApplications = JSON.parse(localStorage.getItem('admissionApplications')) || [];

// // Sample data for colleges
// const collegesData = [
//     {
//         id: 1,
//         name: "Stanford University",
//         location: "California",
//         logo: "🎓",
//         description: "A prestigious research university known for innovation and entrepreneurship.",
//         courses: ["Computer Science", "Engineering", "Business", "Medical"],
//         degreeLevels: ["Undergraduate", "Graduate"],
//         rating: 4.8,
//         acceptanceRate: "4%",
//         tuition: "$56,169/year",
//         enrollment: "17,000+",
//         established: "1885"
//     },
//     {
//         id: 2,
//         name: "MIT",
//         location: "New York",
//         logo: "⚡",
//         description: "World-renowned institute for technology and engineering excellence.",
//         courses: ["Engineering", "Computer Science", "Physics", "Mathematics"],
//         degreeLevels: ["Undergraduate", "Graduate"],
//         rating: 4.9,
//         acceptanceRate: "7%",
//         tuition: "$55,450/year",
//         enrollment: "11,000+",
//         established: "1861"
//     },
//     {
//         id: 3,
//         name: "Harvard University",
//         location: "New York",
//         logo: "🏛️",
//         description: "America's oldest institution of higher learning with global reputation.",
//         courses: ["Business", "Law", "Medical", "Arts"],
//         degreeLevels: ["Undergraduate", "Graduate"],
//         rating: 4.9,
//         acceptanceRate: "5%",
//         tuition: "$54,768/year",
//         enrollment: "31,000+",
//         established: "1636"
//     },
//     {
//         id: 4,
//         name: "University of Texas",
//         location: "Texas",
//         logo: "🤠",
//         description: "Flagship university with diverse programs and strong research focus.",
//         courses: ["Engineering", "Business", "Arts", "Medical"],
//         degreeLevels: ["Undergraduate", "Graduate", "Diploma"],
//         rating: 4.5,
//         acceptanceRate: "32%",
//         tuition: "$38,228/year",
//         enrollment: "51,000+",
//         established: "1883"
//     },
//     {
//         id: 5,
//         name: "University of Florida",
//         location: "Florida",
//         logo: "🐊",
//         description: "Comprehensive university with strong academic programs and research.",
//         courses: ["Medical", "Engineering", "Business", "Arts"],
//         degreeLevels: ["Undergraduate", "Graduate", "Certificate"],
//         rating: 4.4,
//         acceptanceRate: "30%",
//         tuition: "$28,658/year",
//         enrollment: "52,000+",
//         established: "1853"
//     },
//     {
//         id: 6,
//         name: "Online Learning Institute",
//         location: "Online",
//         logo: "💻",
//         description: "Flexible online education with industry-focused curriculum.",
//         courses: ["Computer Science", "Business", "Arts"],
//         degreeLevels: ["Undergraduate", "Graduate", "Certificate"],
//         rating: 4.2,
//         acceptanceRate: "85%",
//         tuition: "$15,000/year",
//         enrollment: "25,000+",
//         established: "2010"
//     }
// ];

// // Initialize everything when DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     // Initialize data
//     loadSampleData();
    
//     // Setup event listeners
//     setupEventListeners();
    
//     // Display initial data
//     displayJobs();
//     displayCompanies();
//     initializeColleges();
    
//     // Initialize Firebase Auth
//     setTimeout(() => {
//         setupFirebaseAuth();
//         updateMembershipUI();
//     }, 1000);
// });

// // Initialize the application
// function initializeApp() {
//     // Check if sample data exists, if not create it
//     if (jobs.length === 0) {
//         createSampleJobs();
//     }
//     if (companies.length === 0) {
//         createSampleCompanies();
//     }
// }

// // Setup Firebase Authentication
// function setupFirebaseAuth() {
//     if (!window.firebaseAuth || !window.firebaseAuthFunctions) {
//         console.log('Firebase not loaded yet, retrying...');
//         setTimeout(setupFirebaseAuth, 500);
//         return;
//     }

//     const auth = window.firebaseAuth;
//     const { onAuthStateChanged } = window.firebaseAuthFunctions;

//     // Auth state listener
//     onAuthStateChanged(auth, user => {
//         if (user) {
//             // Check if user exists in our local users array
//             let localUser = users.find(u => u.email === user.email);
//             if (!localUser) {
//                 // Create local user profile if doesn't exist
//                 localUser = {
//                     id: user.uid,
//                     name: user.displayName || user.email.split('@')[0],
//                     email: user.email,
//                     userType: 'jobseeker', // Default type
//                     profile: {
//                         phone: '',
//                         location: '',
//                         experience: '',
//                         skills: '',
//                         bio: ''
//                     },
//                     createdAt: new Date().toISOString()
//                 };
//                 users.push(localUser);
//                 localStorage.setItem('users', JSON.stringify(users));
//             }
//             currentUser = localUser;
//             updateUIAfterLogin();
//         } else {
//             currentUser = null;
//             updateUIAfterLogout();
//         }
//     });
// }

// // Setup all event listeners
// function setupEventListeners() {
//     // Login and Register buttons
//     document.getElementById('loginBtn').addEventListener('click', () => {
//         document.getElementById('loginModal').style.display = 'block';
//     });
    
//     document.getElementById('registerBtn').addEventListener('click', () => {
//         document.getElementById('registerModal').style.display = 'block';
//     });
    
//     // Membership button
//     const membershipBtn = document.getElementById('membershipBtn');
//     if (membershipBtn) {
//         membershipBtn.addEventListener('click', openMembershipModal);
//     }
    
//     // Profile link
//     const profileLink = document.querySelector('a[href="#profile"]');
//     if (profileLink) {
//         profileLink.addEventListener('click', (e) => {
//             e.preventDefault();
//             displayProfile();
//         });
//     }
    
//     // Modal switches
//     document.getElementById('showRegister').addEventListener('click', (e) => {
//         e.preventDefault();
//         document.getElementById('loginModal').style.display = 'none';
//         document.getElementById('registerModal').style.display = 'block';
//     });
    
//     document.getElementById('showLogin').addEventListener('click', (e) => {
//         e.preventDefault();
//         document.getElementById('registerModal').style.display = 'none';
//         document.getElementById('loginModal').style.display = 'block';
//     });
    
//     // Forgot password links
//     document.getElementById('showForgotPassword').addEventListener('click', (e) => {
//         e.preventDefault();
//         document.getElementById('loginModal').style.display = 'none';
//         document.getElementById('forgotPasswordModal').style.display = 'block';
//     });
    
//     document.getElementById('showLoginFromForgot').addEventListener('click', (e) => {
//         e.preventDefault();
//         document.getElementById('forgotPasswordModal').style.display = 'none';
//         document.getElementById('loginModal').style.display = 'block';
//     });
    
//     // Form submissions
//     document.getElementById('loginForm').addEventListener('submit', handleFirebaseLogin);
//     document.getElementById('registerForm').addEventListener('submit', handleFirebaseRegister);
//     document.getElementById('forgotPasswordForm').addEventListener('submit', handleForgotPassword);
//     document.getElementById('resetPasswordForm').addEventListener('submit', handleResetPassword);
    
//     // Close modals
//     document.querySelectorAll('.close').forEach(closeBtn => {
//         closeBtn.addEventListener('click', function() {
//             this.closest('.modal').style.display = 'none';
//         });
//     });
    
//     // Close modals when clicking outside
//     document.querySelectorAll('.modal').forEach(modal => {
//         modal.addEventListener('click', function(e) {
//             if (e.target === this) {
//                 this.style.display = 'none';
//             }
//         });
//     });
    
//     // Payment modal specific close
//     const paymentModal = document.getElementById('paymentModal');
//     if (paymentModal) {
//         paymentModal.addEventListener('click', function(e) {
//             if (e.target === this) {
//                 closePaymentModal();
//             }
//         });
//     }
    
//     // Payment success modal specific close
//     const paymentSuccessModal = document.getElementById('paymentSuccessModal');
//     if (paymentSuccessModal) {
//         paymentSuccessModal.addEventListener('click', function(e) {
//             if (e.target === this) {
//                 closePaymentSuccessModal();
//             }
//         });
//     }
    
//     // Job search
//     const jobSearch = document.getElementById('jobSearch');
//     if (jobSearch) {
//         jobSearch.addEventListener('input', handleJobSearch);
//     }
    
//     // Job filters
//     const jobFilters = ['jobCategory', 'jobType', 'jobLocation'];
//     jobFilters.forEach(filterId => {
//         const filter = document.getElementById(filterId);
//         if (filter) {
//             filter.addEventListener('change', filterJobs);
//         }
//     });
    
//     // College filters
//     const collegeFilters = ['collegeLocation', 'courseType', 'degreeLevel'];
//     collegeFilters.forEach(filterId => {
//         const filter = document.getElementById(filterId);
//         if (filter) {
//             filter.addEventListener('change', filterColleges);
//         }
//     });
    
//     // Mobile menu
//     const hamburger = document.querySelector('.hamburger');
//     if (hamburger) {
//         hamburger.addEventListener('click', toggleMobileMenu);
//     }
    
//     // Edit profile button
//     const editProfileBtn = document.getElementById('editProfileBtn');
//     if (editProfileBtn) {
//         editProfileBtn.addEventListener('click', showEditProfileModal);
//     }
    
//     // Admission form
//     const admissionForm = document.getElementById('admissionForm');
//     if (admissionForm) {
//         admissionForm.addEventListener('submit', handleAdmissionSubmit);
//     }
// }

// // Modal functions
// function showModal(modalId) {
//     document.getElementById(modalId).style.display = 'block';
// }

// function closeAllModals() {
//     document.querySelectorAll('.modal').forEach(modal => {
//         modal.style.display = 'none';
//     });
// }

// // Firebase Authentication Functions
// function handleFirebaseLogin(e) {
//     e.preventDefault();
    
//     const email = document.getElementById('loginEmail').value;
//     const password = document.getElementById('loginPassword').value;
    
//     if (!window.firebaseAuth || !window.firebaseAuthFunctions) {
//         showNotification('Firebase not loaded. Please refresh the page.', 'error');
//         return;
//     }
    
//     const auth = window.firebaseAuth;
//     const { signInWithEmailAndPassword } = window.firebaseAuthFunctions;
    
//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             showNotification('Login successful!', 'success');
//             document.getElementById('loginModal').style.display = 'none';
//             document.getElementById('loginForm').reset();
//         })
//         .catch((error) => {
//             let errorMessage = 'Login failed. Please try again.';
//             if (error.code === 'auth/user-not-found') {
//                 errorMessage = 'No account found with this email.';
//             } else if (error.code === 'auth/wrong-password') {
//                 errorMessage = 'Incorrect password.';
//             } else if (error.code === 'auth/invalid-email') {
//                 errorMessage = 'Invalid email address.';
//             }
//             showNotification(errorMessage, 'error');
//         });
// }

// function handleFirebaseRegister(e) {
//     e.preventDefault();
    
//     const name = document.getElementById('registerName').value;
//     const email = document.getElementById('registerEmail').value;
//     const password = document.getElementById('registerPassword').value;
//     const userType = document.getElementById('userType').value;
    
//     if (!window.firebaseAuth || !window.firebaseAuthFunctions) {
//         showNotification('Firebase not loaded. Please refresh the page.', 'error');
//         return;
//     }
    
//     const auth = window.firebaseAuth;
//     const { createUserWithEmailAndPassword } = window.firebaseAuthFunctions;
    
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Create local user profile
//             const newUser = {
//                 id: userCredential.user.uid,
//                 name: name,
//                 email: email,
//                 userType: userType,
//                 profile: {
//                     phone: '',
//                     location: '',
//                     experience: '',
//                     skills: '',
//                     bio: ''
//                 },
//                 createdAt: new Date().toISOString()
//             };
            
//             users.push(newUser);
//             localStorage.setItem('users', JSON.stringify(users));
            
//             showNotification('Registration successful!', 'success');
//             document.getElementById('registerModal').style.display = 'none';
//             document.getElementById('registerForm').reset();
//         })
//         .catch((error) => {
//             let errorMessage = 'Registration failed. Please try again.';
//             if (error.code === 'auth/email-already-in-use') {
//                 errorMessage = 'An account with this email already exists.';
//             } else if (error.code === 'auth/weak-password') {
//                 errorMessage = 'Password should be at least 6 characters.';
//             } else if (error.code === 'auth/invalid-email') {
//                 errorMessage = 'Invalid email address.';
//             }
//             showNotification(errorMessage, 'error');
//         });
// }

// function handleFirebaseLogout() {
//     if (!window.firebaseAuth || !window.firebaseAuthFunctions) {
//         showNotification('Firebase not loaded. Please refresh the page.', 'error');
//         return;
//     }
    
//     const auth = window.firebaseAuth;
//     const { signOut } = window.firebaseAuthFunctions;
    
//     signOut(auth)
//         .then(() => {
//             showNotification('Logged out successfully!', 'success');
//         })
//         .catch((error) => {
//             showNotification('Logout failed. Please try again.', 'error');
//         });
// }

// function handleForgotPassword(e) {
//     e.preventDefault();
    
//     const email = document.getElementById('forgotEmail').value;
    
//     // Simulate password reset (in real app, this would send email)
//     showNotification('Password reset link sent to your email!', 'success');
//     document.getElementById('forgotPasswordModal').style.display = 'none';
//     document.getElementById('resetPasswordModal').style.display = 'block';
//     document.getElementById('forgotPasswordForm').reset();
// }

// function handleResetPassword(e) {
//     e.preventDefault();
    
//     const resetCode = document.getElementById('resetCode').value;
//     const newPassword = document.getElementById('newPassword').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;
    
//     if (resetCode !== '123456') {
//         showNotification('Invalid reset code. Please try again.', 'error');
//         return;
//     }
    
//     if (newPassword !== confirmPassword) {
//         showNotification('Passwords do not match.', 'error');
//         return;
//     }
    
//     if (newPassword.length < 6) {
//         showNotification('Password should be at least 6 characters.', 'error');
//         return;
//     }
    
//     showNotification('Password reset successful! You can now login with your new password.', 'success');
//     document.getElementById('resetPasswordModal').style.display = 'none';
//     document.getElementById('loginModal').style.display = 'block';
//     document.getElementById('resetPasswordForm').reset();
// }

// // UI Update Functions
// function updateUIAfterLogin() {
//     const loginBtn = document.getElementById('loginBtn');
//     const registerBtn = document.getElementById('registerBtn');
//     const membershipBtn = document.getElementById('membershipBtn');
    
//     if (loginBtn) loginBtn.style.display = 'none';
//     if (registerBtn) registerBtn.style.display = 'none';
    
//     // Create user menu
//     const userMenu = document.createElement('div');
//     userMenu.className = 'user-menu';
//     userMenu.innerHTML = `
//         <button class="btn btn-secondary" onclick="showUserMenu()">
//             <i class="fas fa-user"></i>
//             ${currentUser.name}
//             <i class="fas fa-chevron-down"></i>
//         </button>
//         <div class="user-dropdown" style="display: none;">
//             <a href="#" onclick="displayProfile(); return false;">
//                 <i class="fas fa-user-circle"></i> Profile
//             </a>
//             <a href="#" onclick="viewMembershipDetails(); return false;">
//                 <i class="fas fa-crown"></i> Membership
//             </a>
//             <a href="#" onclick="handleFirebaseLogout(); return false;">
//                 <i class="fas fa-sign-out-alt"></i> Logout
//             </a>
//         </div>
//     `;
    
//     const navMenu = document.querySelector('.nav-menu');
//     if (navMenu) {
//         navMenu.appendChild(userMenu);
//     }
    
//     updateProfileDisplay();
//     updateMembershipUI();
// }

// function updateUIAfterLogout() {
//     const loginBtn = document.getElementById('loginBtn');
//     const registerBtn = document.getElementById('registerBtn');
    
//     if (loginBtn) loginBtn.style.display = 'inline-block';
//     if (registerBtn) registerBtn.style.display = 'inline-block';
    
//     // Remove user menu
//     const userMenu = document.querySelector('.user-menu');
//     if (userMenu) {
//         userMenu.remove();
//     }
    
//     // Reset profile display
//     document.getElementById('profileName').textContent = 'Your Name';
//     document.getElementById('profileEmail').textContent = 'email@example.com';
//     document.getElementById('profileType').textContent = 'Job Seeker';
//     document.getElementById('profilePhone').textContent = 'Not provided';
//     document.getElementById('profileLocation').textContent = 'Not provided';
//     document.getElementById('profileExperience').textContent = 'Not provided';
//     document.getElementById('profileSkills').textContent = 'Not provided';
// }

// function updateProfileDisplay() {
//     if (!currentUser) return;
    
//     document.getElementById('profileName').textContent = currentUser.name;
//     document.getElementById('profileEmail').textContent = currentUser.email;
//     document.getElementById('profileType').textContent = currentUser.userType === 'jobseeker' ? 'Job Seeker' : 'Company';
    
//     const profiles = JSON.parse(localStorage.getItem('profiles')) || {};
//     const profile = profiles[currentUser.id] || currentUser.profile || {};
    
//     document.getElementById('profilePhone').textContent = profile.phone || 'Not provided';
//     document.getElementById('profileLocation').textContent = profile.location || 'Not provided';
//     document.getElementById('profileExperience').textContent = profile.experience || 'Not provided';
//     document.getElementById('profileSkills').textContent = profile.skills || 'Not provided';
// }

// // Profile Management Functions
// function showEditProfileModal() {
//     if (!currentUser) {
//         showNotification('Please login first', 'error');
//         return;
//     }
    
//     const profiles = JSON.parse(localStorage.getItem('profiles')) || {};
//     const profile = profiles[currentUser.id] || {};
    
//     const modal = document.createElement('div');
//     modal.className = 'modal';
//     modal.style.display = 'block';
    
//     modal.innerHTML = `
//         <div class="modal-content" style="max-width: 500px;">
//             <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
//             <h2>Edit Profile</h2>
//             <form id="editProfileForm">
//                 <div class="form-group">
//                     <label for="editName">Name</label>
//                     <input type="text" id="editName" value="${profile.name || currentUser.name || ''}" required>
//                 </div>
//                 <div class="form-group">
//                     <label for="editPhone">Phone</label>
//                     <input type="tel" id="editPhone" value="${profile.phone || ''}">
//                 </div>
//                 <div class="form-group">
//                     <label for="editLocation">Location</label>
//                     <input type="text" id="editLocation" value="${profile.location || ''}">
//                 </div>
//                 <div class="form-group">
//                     <label for="editExperience">Experience</label>
//                     <input type="text" id="editExperience" value="${profile.experience || ''}">
//                 </div>
//                 <div class="form-group">
//                     <label for="editSkills">Skills</label>
//                     <input type="text" id="editSkills" value="${profile.skills || ''}" placeholder="e.g., JavaScript, React, Node.js">
//                 </div>
//                 <div class="form-group">
//                     <label for="editBio">Bio</label>
//                     <textarea id="editBio" rows="4" placeholder="Tell us about yourself...">${profile.bio || ''}</textarea>
//                 </div>
//                 <button type="submit" class="btn btn-primary">Save Changes</button>
//             </form>
//         </div>
//     `;
    
//     document.body.appendChild(modal);
    
//     // Handle form submission
//     document.getElementById('editProfileForm').addEventListener('submit', handleProfileUpdate);
    
//     // Close modal when clicking outside
//     modal.addEventListener('click', function(event) {
//         if (event.target === this) {
//             this.remove();
//         }
//     });
// }

// function handleProfileUpdate(e) {
//     e.preventDefault();
    
//     if (!currentUser) return;
    
//     const updatedProfile = {
//         name: document.getElementById('editName').value,
//         phone: document.getElementById('editPhone').value,
//         location: document.getElementById('editLocation').value,
//         experience: document.getElementById('editExperience').value,
//         skills: document.getElementById('editSkills').value,
//         bio: document.getElementById('editBio').value
//     };
    
//     // Save to localStorage
//     const profiles = JSON.parse(localStorage.getItem('profiles') || '{}');
//     profiles[currentUser.id] = updatedProfile;
//     localStorage.setItem('profiles', JSON.stringify(profiles));
    
//     // Update current user
//     currentUser.name = updatedProfile.name;
//     currentUser.profile = updatedProfile;
    
//     // Close modal
//     document.querySelector('.modal').remove();
    
//     // Show success message
//     showNotification('Profile updated successfully!', 'success');
    
//     // Update UI
//     updateProfileDisplay();
//     updateUIAfterLogin(); // Refresh user menu
// }

// // Job Functions
// function displayJobs(jobsToDisplay = jobs) {
//     const jobsList = document.getElementById('jobsList');
//     if (!jobsList) return;
    
//     jobsList.innerHTML = '';
    
//     jobsToDisplay.forEach(job => {
//         const jobCard = document.createElement('div');
//         jobCard.className = 'job-card';
//         jobCard.innerHTML = `
//             <div class="job-header">
//                 <div class="company-logo">
//                     <i class="fas fa-building"></i>
//                 </div>
//                 <div class="job-info">
//                     <h3 class="job-title">${job.title}</h3>
//                     <p class="company-name">${job.company}</p>
//                     <div class="job-tags">
//                         <span class="job-tag">${job.type}</span>
//                         <span class="job-tag">${job.category}</span>
//                     </div>
//                 </div>
//             </div>
//             <div class="job-description">
//                 <p>${job.description}</p>
//             </div>
//             <div class="job-footer">
//                 <div class="job-salary">
//                     <i class="fas fa-money-bill-wave"></i>
//                     <span>${job.salary}</span>
//                 </div>
//                 <button class="btn btn-primary" onclick="applyForJob(${job.id})">Apply Now</button>
//             </div>
//         `;
//         jobsList.appendChild(jobCard);
//     });
// }

// function filterJobs() {
//     const category = document.getElementById('jobCategory').value;
//     const type = document.getElementById('jobType').value;
//     const location = document.getElementById('jobLocation').value;
    
//     let filteredJobs = jobs;
    
//     if (category) {
//         filteredJobs = filteredJobs.filter(job => job.category === category);
//     }
//     if (type) {
//         filteredJobs = filteredJobs.filter(job => job.type === type);
//     }
//     if (location) {
//         filteredJobs = filteredJobs.filter(job => job.location === location);
//     }
    
//     displayJobs(filteredJobs);
// }

// function handleJobSearch(e) {
//     const searchTerm = e.target.value.toLowerCase();
    
//     if (searchTerm === '') {
//         displayJobs();
//         return;
//     }
    
//     const filteredJobs = jobs.filter(job => 
//         job.title.toLowerCase().includes(searchTerm) ||
//         job.company.toLowerCase().includes(searchTerm) ||
//         job.description.toLowerCase().includes(searchTerm)
//     );
    
//     displayJobs(filteredJobs);
// }

// function applyForJob(jobId) {
//     if (!currentUser) {
//         showNotification('Please login to apply for jobs', 'error');
//         return;
//     }
    
//     if (currentUser.userType !== 'jobseeker') {
//         showNotification('Only job seekers can apply for jobs', 'error');
//         return;
//     }
    
//     // Check application limits
//     if (!canApplyForJob()) {
//         showApplicationLimitWarning();
//         return;
//     }
    
//     const job = jobs.find(j => j.id === jobId);
//     if (!job) {
//         showNotification('Job not found', 'error');
//         return;
//     }
    
//     // Check if already applied
//     const existingApplication = applications.find(app => 
//         app.jobId === jobId && app.userId === currentUser.id
//     );
    
//     if (existingApplication) {
//         showNotification('You have already applied for this job', 'info');
//         return;
//     }
    
//     const application = {
//         id: Date.now(),
//         jobId,
//         userId: currentUser.id,
//         jobTitle: job.title,
//         company: job.company,
//         appliedAt: new Date().toISOString(),
//         status: 'pending'
//     };
    
//     applications.push(application);
//     localStorage.setItem('applications', JSON.stringify(applications));
    
//     // Update membership application count
//     const memberships = JSON.parse(localStorage.getItem('memberships')) || {};
//     const userMembership = memberships[currentUser.id] || {
//         plan: 'bronze',
//         applicationsUsed: 0,
//         applicationsLimit: 3,
//         expiresAt: null
//     };
    
//     userMembership.applicationsUsed += 1;
//     memberships[currentUser.id] = userMembership;
//     localStorage.setItem('memberships', JSON.stringify(memberships));
    
//     showNotification('Application submitted successfully!', 'success');
//     updateMembershipUI();
// }

// // Company Functions
// function displayCompanies() {
//     const companiesList = document.getElementById('companiesList');
//     if (!companiesList) return;
    
//     companiesList.innerHTML = '';
    
//     companies.forEach(company => {
//         const companyCard = document.createElement('div');
//         companyCard.className = 'company-card';
//         companyCard.innerHTML = `
//             <div class="company-logo-large">
//                 <i class="fas fa-building"></i>
//             </div>
//             <div class="company-info">
//                 <h3 class="company-name-large">${company.name}</h3>
//                 <p class="company-industry">${company.industry}</p>
//                 <div class="company-stats">
//                     <div class="company-stat">
//                         <h4>${company.size}</h4>
//                         <p>Employees</p>
//                     </div>
//                     <div class="company-stat">
//                         <h4>${company.location}</h4>
//                         <p>Location</p>
//                     </div>
//                 </div>
//                 <button class="btn btn-secondary" onclick="viewCompanyJobs(${company.id})">View Jobs</button>
//             </div>
//         `;
//         companiesList.appendChild(companyCard);
//     });
// }

// function viewCompanyJobs(companyId) {
//     const company = companies.find(c => c.id === companyId);
//     if (!company) return;
    
//     const companyJobs = jobs.filter(job => job.company === company.name);
//     displayJobs(companyJobs);
    
//     // Scroll to jobs section
//     document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' });
// }

// // Sample Data Functions
// function createSampleJobs() {
//     const sampleJobs = [
//         {
//             id: 1,
//             title: "Frontend Developer",
//             company: "TechCorp",
//             location: "San Francisco",
//             type: "Full Time",
//             category: "Technology",
//             salary: "$80,000 - $120,000",
//             description: "We're looking for a talented Frontend Developer to join our team and help build amazing user experiences."
//         },
//         {
//             id: 2,
//             title: "Marketing Manager",
//             company: "Growth Inc",
//             location: "New York",
//             type: "Full Time",
//             category: "Marketing",
//             salary: "$70,000 - $100,000",
//             description: "Lead our marketing efforts and drive growth through innovative campaigns and strategies."
//         },
//         {
//             id: 3,
//             title: "UX Designer",
//             company: "Design Studio",
//             location: "Remote",
//             type: "Contract",
//             category: "Design",
//             salary: "$60,000 - $90,000",
//             description: "Create beautiful and intuitive user experiences for our digital products."
//         },
//         {
//             id: 4,
//             title: "Sales Representative",
//             company: "SalesForce",
//             location: "London",
//             type: "Full Time",
//             category: "Sales",
//             salary: "$50,000 - $80,000",
//             description: "Build relationships with clients and drive sales growth for our innovative solutions."
//         },
//         {
//             id: 5,
//             title: "Data Analyst",
//             company: "DataTech",
//             location: "Remote",
//             type: "Part Time",
//             category: "Technology",
//             salary: "$40,000 - $70,000",
//             description: "Analyze data to provide insights and help drive business decisions."
//         },
//         {
//             id: 6,
//             title: "Financial Advisor",
//             company: "Finance Pro",
//             location: "New York",
//             type: "Full Time",
//             category: "Finance",
//             salary: "$65,000 - $95,000",
//             description: "Provide financial guidance and help clients achieve their financial goals."
//         }
//     ];
    
//     jobs.push(...sampleJobs);
//     localStorage.setItem('jobs', JSON.stringify(jobs));
// }

// function createSampleCompanies() {
//     const sampleCompanies = [
//         {
//             id: 1,
//             name: "TechCorp",
//             industry: "Technology",
//             size: "500-1000",
//             location: "San Francisco",
//             description: "Leading technology company focused on innovation."
//         },
//         {
//             id: 2,
//             name: "Growth Inc",
//             industry: "Marketing",
//             size: "100-500",
//             location: "New York",
//             description: "Digital marketing agency helping businesses grow."
//         },
//         {
//             id: 3,
//             name: "Design Studio",
//             industry: "Design",
//             size: "50-100",
//             location: "Remote",
//             description: "Creative design studio specializing in UX/UI."
//         },
//         {
//             id: 4,
//             name: "SalesForce",
//             industry: "Sales",
//             size: "1000+",
//             location: "London",
//             description: "Global sales and customer relationship platform."
//         },
//         {
//             id: 5,
//             name: "DataTech",
//             industry: "Technology",
//             size: "200-500",
//             location: "Remote",
//             description: "Data analytics and business intelligence solutions."
//         }
//     ];
    
//     companies.push(...sampleCompanies);
//     localStorage.setItem('companies', JSON.stringify(companies));
// }

// function loadSampleData() {
//     initializeApp();
// }

// // Utility Functions
// function showNotification(message, type = 'info') {
//     const notification = document.createElement('div');
//     notification.className = `notification ${type}`;
//     notification.innerHTML = `
//         <div class="notification-content">
//             <span>${message}</span>
//             <button onclick="this.parentElement.parentElement.remove()">&times;</button>
//         </div>
//     `;
    
//     document.body.appendChild(notification);
    
//     // Auto remove after 5 seconds
//     setTimeout(() => {
//         if (notification.parentElement) {
//             notification.remove();
//         }
//     }, 5000);
// }

// function showUserMenu() {
//     const dropdown = document.querySelector('.user-dropdown');
//     if (dropdown) {
//         dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
//     }
// }

// function toggleMobileMenu() {
//     const navMenu = document.querySelector('.nav-menu');
//     const hamburger = document.querySelector('.hamburger');
    
//     navMenu.classList.toggle('active');
//     hamburger.classList.toggle('active');
// }

// // Initialize colleges
// function initializeColleges() {
//     displayColleges(collegesData);
//     setupCollegeFilters();
// }

// // Display colleges
// function displayColleges(colleges) {
//     const collegesList = document.getElementById('collegesList');
//     if (!collegesList) return;
    
//     collegesList.innerHTML = '';
    
//     colleges.forEach(college => {
//         const collegeCard = document.createElement('div');
//         collegeCard.className = 'college-card';
//         collegeCard.innerHTML = `
//             <div class="college-header">
//                 <div class="college-logo">
//                     <span style="font-size: 2rem;">${college.logo}</span>
//                 </div>
//                 <div class="college-info">
//                     <h3>${college.name}</h3>
//                     <p class="college-location">
//                         <i class="fas fa-map-marker-alt"></i>
//                         ${college.location}
//                     </p>
//                 </div>
//             </div>
//             <div class="college-courses">
//                 ${college.courses.map(course => `<span class="course-tag">${course}</span>`).join('')}
//             </div>
//             <div class="college-stats">
//                 <div class="college-stat">
//                     <h4>${college.rating}</h4>
//                     <p>Rating</p>
//                 </div>
//                 <div class="college-stat">
//                     <h4>${college.acceptanceRate}</h4>
//                     <p>Acceptance</p>
//                 </div>
//                 <div class="college-stat">
//                     <h4>${college.enrollment}</h4>
//                     <p>Students</p>
//                 </div>
//             </div>
//             <div class="college-description">
//                 <p>${college.description}</p>
//             </div>
//             <div class="college-footer">
//                 <div class="college-fee">
//                     <strong>${college.tuition}</strong>
//                 </div>
//                 <div class="college-rating">
//                     <span>${college.rating}</span>
//                     <i class="fas fa-star"></i>
//                 </div>
//                 <button class="btn btn-primary" onclick="openAdmissionModal(${college.id})">Apply Now</button>
//             </div>
//         `;
//         collegesList.appendChild(collegeCard);
//     });
// }

// // Setup college filters
// function setupCollegeFilters() {
//     const locationFilter = document.getElementById('collegeLocation');
//     const courseFilter = document.getElementById('courseType');
//     const levelFilter = document.getElementById('degreeLevel');
    
//     if (locationFilter) {
//         locationFilter.addEventListener('change', filterColleges);
//     }
//     if (courseFilter) {
//         courseFilter.addEventListener('change', filterColleges);
//     }
//     if (levelFilter) {
//         levelFilter.addEventListener('change', filterColleges);
//     }
// }

// // Filter colleges
// function filterColleges() {
//     const location = document.getElementById('collegeLocation').value;
//     const courseType = document.getElementById('courseType').value;
//     const degreeLevel = document.getElementById('degreeLevel').value;
    
//     let filteredColleges = collegesData;
    
//     if (location) {
//         filteredColleges = filteredColleges.filter(college => college.location === location);
//     }
//     if (courseType) {
//         filteredColleges = filteredColleges.filter(college => college.courses.includes(courseType));
//     }
//     if (degreeLevel) {
//         filteredColleges = filteredColleges.filter(college => college.degreeLevels.includes(degreeLevel));
//     }
    
//     displayColleges(filteredColleges);
// }

// // Open admission modal
// function openAdmissionModal(collegeId) {
//     if (!currentUser) {
//         showNotification('Please login to apply for admission', 'error');
//         return;
//     }
    
//     const college = collegesData.find(c => c.id === collegeId);
//     if (!college) return;
    
//     // Pre-fill form with user data
//     const profiles = JSON.parse(localStorage.getItem('profiles')) || {};
//     const profile = profiles[currentUser.id] || {};
    
//     document.getElementById('applicantName').value = profile.name || currentUser.name || '';
//     document.getElementById('applicantEmail').value = currentUser.email || '';
//     document.getElementById('applicantPhone').value = profile.phone || '';
    
//     // Store college info for form submission
//     document.getElementById('admissionForm').setAttribute('data-college-id', collegeId);
    
//     document.getElementById('admissionModal').style.display = 'block';
// }

// // Handle admission form submission
// function handleAdmissionSubmit(event) {
//     event.preventDefault();
    
//     if (!currentUser) {
//         showNotification('Please login to submit application', 'error');
//         return;
//     }
    
//     const collegeId = parseInt(document.getElementById('admissionForm').getAttribute('data-college-id'));
//     const college = collegesData.find(c => c.id === collegeId);
    
//     if (!college) {
//         showNotification('College not found', 'error');
//         return;
//     }
    
//     const application = {
//         id: Date.now(),
//         collegeId: collegeId,
//         collegeName: college.name,
//         userId: currentUser.id,
//         applicantName: document.getElementById('applicantName').value,
//         applicantEmail: document.getElementById('applicantEmail').value,
//         applicantPhone: document.getElementById('applicantPhone').value,
//         applicantDOB: document.getElementById('applicantDOB').value,
//         applicantAddress: document.getElementById('applicantAddress').value,
//         applicantEducation: document.getElementById('applicantEducation').value,
//         applicantGPA: document.getElementById('applicantGPA').value,
//         applicantStatement: document.getElementById('applicantStatement').value,
//         appliedAt: new Date().toISOString(),
//         status: 'pending'
//     };
    
//     admissionApplications.push(application);
//     localStorage.setItem('admissionApplications', JSON.stringify(admissionApplications));
    
//     document.getElementById('admissionModal').style.display = 'none';
//     document.getElementById('admissionForm').reset();
    
//     showNotification('Admission application submitted successfully!', 'success');
// }

// // Display user profile
// function displayProfile() {
//     if (!currentUser) {
//         showNotification('Please login to view your profile', 'error');
//         return;
//     }
    
//     const profiles = JSON.parse(localStorage.getItem('profiles')) || {};
//     const profile = profiles[currentUser.id] || {};
    
//     const profileContent = document.getElementById('profileContent');
//     if (!profileContent) return;
    
//     profileContent.innerHTML = `
//         <div class="profile-card">
//             <div class="profile-header">
//                 <div class="profile-avatar">
//                     <i class="fas fa-user"></i>
//                 </div>
//                 <div class="profile-info">
//                     <h3>${profile.name || currentUser.name}</h3>
//                     <p>${currentUser.email}</p>
//                     <p>${currentUser.userType === 'jobseeker' ? 'Job Seeker' : 'Company'}</p>
//                 </div>
//                 <button class="btn btn-secondary" onclick="showEditProfileModal()">Edit Profile</button>
//             </div>
//             <div class="profile-details">
//                 <div class="detail-group">
//                     <label>Phone:</label>
//                     <span>${profile.phone || 'Not provided'}</span>
//                 </div>
//                 <div class="detail-group">
//                     <label>Location:</label>
//                     <span>${profile.location || 'Not provided'}</span>
//                 </div>
//                 <div class="detail-group">
//                     <label>Experience:</label>
//                     <span>${profile.experience || 'Not provided'}</span>
//                 </div>
//                 <div class="detail-group">
//                     <label>Skills:</label>
//                     <span>${profile.skills || 'Not provided'}</span>
//                 </div>
//                 <div class="detail-group">
//                     <label>Bio:</label>
//                     <span>${profile.bio || 'Not provided'}</span>
//                 </div>
//             </div>
//         </div>
        
//         <div class="profile-sections">
//             <div class="profile-section">
//                 <h3>Job Applications</h3>
//                 ${displayUserJobApplications()}
//             </div>
            
//             <div class="profile-section">
//                 <h3>Admission Applications</h3>
//                 ${displayUserAdmissionApplications()}
//             </div>
            
//             <div class="profile-section">
//                 <h3>Membership Status</h3>
//                 ${displayMembershipStatus()}
//             </div>
//         </div>
//     `;
// }

// function displayUserJobApplications() {
//     const userApplications = applications.filter(app => app.userId === currentUser.id);
    
//     if (userApplications.length === 0) {
//         return '<p>No job applications yet.</p>';
//     }
    
//     return userApplications.map(app => `
//         <div class="application-item">
//             <h4>${app.jobTitle}</h4>
//             <p>Company: ${app.company}</p>
//             <p>Applied: ${new Date(app.appliedAt).toLocaleDateString()}</p>
//             <p>Status: <span class="status-${app.status}">${app.status}</span></p>
//         </div>
//     `).join('');
// }

// function displayUserAdmissionApplications() {
//     const userAdmissionApps = admissionApplications.filter(app => app.userId === currentUser.id);
    
//     if (userAdmissionApps.length === 0) {
//         return '<p>No admission applications yet.</p>';
//     }
    
//     return userAdmissionApps.map(app => `
//         <div class="application-item">
//             <h4>${app.collegeName}</h4>
//             <p>Applied: ${new Date(app.appliedAt).toLocaleDateString()}</p>
//             <p>Status: <span class="status-${app.status}">${app.status}</span></p>
//         </div>
//     `).join('');
// }

// function displayMembershipStatus() {
//     const membership = getUserMembership();
    
//     return `
//         <div class="membership-status">
//             <h4>Current Plan: ${membership.plan}</h4>
//             <p>Applications this month: ${membership.applicationsUsed}/${membership.applicationsLimit}</p>
//             <p>Expires: ${membership.expiresAt ? new Date(membership.expiresAt).toLocaleDateString() : 'Never'}</p>
//             <button class="btn btn-primary" onclick="openMembershipModal()">Upgrade Plan</button>
//         </div>
//     `;
// }

// // Membership Functions
// function getUserMembership() {
//     const memberships = JSON.parse(localStorage.getItem('memberships')) || {};
//     const userMembership = memberships[currentUser?.id] || {
//         plan: 'bronze',
//         applicationsUsed: 0,
//         applicationsLimit: 3,
//         expiresAt: null
//     };
    
//     // Reset applications count if it's a new month
//     const lastReset = userMembership.lastReset || new Date().getTime();
//     const now = new Date().getTime();
//     const monthInMs = 30 * 24 * 60 * 60 * 1000;
    
//     if (now - lastReset > monthInMs) {
//         userMembership.applicationsUsed = 0;
//         userMembership.lastReset = now;
//         memberships[currentUser.id] = userMembership;
//         localStorage.setItem('memberships', JSON.stringify(memberships));
//     }
    
//     return userMembership;
// }

// function subscribeToPlan(planType) {
//     if (!currentUser) {
//         showNotification('Please login to subscribe to a plan', 'error');
//         return;
//     }
    
//     const plans = {
//         silver: { applicationsLimit: 999, duration: 1 },
//         gold: { applicationsLimit: 999, duration: 2 },
//         diamond: { applicationsLimit: 999, duration: 3 }
//     };
    
//     const plan = plans[planType];
//     if (!plan) return;
    
//     const memberships = JSON.parse(localStorage.getItem('memberships')) || {};
//     const expiresAt = new Date();
//     expiresAt.setMonth(expiresAt.getMonth() + plan.duration);
    
//     memberships[currentUser.id] = {
//         plan: planType,
//         applicationsUsed: 0,
//         applicationsLimit: plan.applicationsLimit,
//         expiresAt: expiresAt.toISOString(),
//         lastReset: new Date().getTime(),
//         subscribedAt: new Date().toISOString(),
//         paymentAmount: selectedPlanPrice
//     };
    
//     localStorage.setItem('memberships', JSON.stringify(memberships));
    
//     // Update membership modal to show current plan
//     updateMembershipModal();
// }

// function canApplyForJob() {
//     if (!currentUser) return false;
    
//     const membership = getUserMembership();
//     return membership.applicationsUsed < membership.applicationsLimit;
// }

// function getRemainingApplications() {
//     if (!currentUser) return 0;
    
//     const membership = getUserMembership();
//     return Math.max(0, membership.applicationsLimit - membership.applicationsUsed);
// }

// function updateMembershipUI() {
//     if (!currentUser) return;
    
//     const membership = getUserMembership();
//     const membershipBtn = document.getElementById('membershipBtn');
    
//     if (membershipBtn) {
//         membershipBtn.innerHTML = `
//             <i class="fas fa-crown"></i>
//             ${membership.plan.charAt(0).toUpperCase() + membership.plan.slice(1)}
//             <span class="membership-badge ${membership.plan}">${getRemainingApplications()}</span>
//         `;
//     }
    
//     // Update membership modal if it's open
//     updateMembershipModal();
// }

// function showApplicationLimitWarning() {
//     const warning = document.createElement('div');
//     warning.className = 'application-limit-warning';
//     warning.innerHTML = `
//         <h4>Application Limit Reached</h4>
//         <p>You've reached your monthly application limit. Upgrade your membership for unlimited applications!</p>
//         <button onclick="openMembershipModal(); this.parentElement.remove();">Upgrade Now</button>
//         <button onclick="this.parentElement.remove();">Close</button>
//     `;
    
//     document.body.appendChild(warning);
    
//     setTimeout(() => {
//         if (warning.parentElement) {
//             warning.remove();
//         }
//     }, 10000);
// }

// function openMembershipModal() {
//     document.getElementById('membershipModal').style.display = 'block';
//     updateMembershipModal(); // Update current plan status when modal opens
// }

// function viewMembershipDetails() {
//     openMembershipModal();
// }

// // Payment Functions
// let selectedPlanType = null;
// let selectedPlanPrice = null;

// function openPaymentModal(planType, price) {
//     if (!currentUser) {
//         showNotification('Please login to subscribe to a plan', 'error');
//         return;
//     }
    
//     selectedPlanType = planType;
//     selectedPlanPrice = price;
    
//     // Update payment details
//     const planNames = {
//         'silver': 'Silver Plan',
//         'gold': 'Gold Plan', 
//         'diamond': 'Diamond Plan'
//     };
    
//     const planDurations = {
//         'silver': '1 Month',
//         'gold': '2 Months',
//         'diamond': '3 Months'
//     };
    
//     document.getElementById('selectedPlanName').textContent = planNames[planType];
//     document.getElementById('selectedPlanPrice').textContent = `₹${price}`;
//     document.getElementById('selectedPlanDuration').textContent = planDurations[planType];
    
//     // Close membership modal and open payment modal
//     document.getElementById('membershipModal').style.display = 'none';
//     document.getElementById('paymentModal').style.display = 'block';
    
//     // Setup payment form validation
//     setupPaymentFormValidation();
// }

// function closePaymentModal() {
//     document.getElementById('paymentModal').style.display = 'none';
//     document.getElementById('paymentForm').reset();
//     selectedPlanType = null;
//     selectedPlanPrice = null;
// }

// function setupPaymentFormValidation() {
//     const cardNumber = document.getElementById('cardNumber');
//     const cardExpiry = document.getElementById('cardExpiry');
//     const cardCvv = document.getElementById('cardCvv');
    
//     // Card number formatting
//     cardNumber.addEventListener('input', function(e) {
//         let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
//         let formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
//         e.target.value = formattedValue;
//     });
    
//     // Expiry date formatting
//     cardExpiry.addEventListener('input', function(e) {
//         let value = e.target.value.replace(/\D/g, '');
//         if (value.length >= 2) {
//             value = value.substring(0, 2) + '/' + value.substring(2, 4);
//         }
//         e.target.value = value;
//     });
    
//     // CVV validation
//     cardCvv.addEventListener('input', function(e) {
//         e.target.value = e.target.value.replace(/\D/g, '');
//     });
// }

// // Handle payment form submission
// document.addEventListener('DOMContentLoaded', function() {
//     const paymentForm = document.getElementById('paymentForm');
//     if (paymentForm) {
//         paymentForm.addEventListener('submit', handlePaymentSubmission);
//     }
// });

// function handlePaymentSubmission(e) {
//     e.preventDefault();
    
//     if (!currentUser || !selectedPlanType || !selectedPlanPrice) {
//         showNotification('Payment information is missing', 'error');
//         return;
//     }
    
//     // Get form data
//     const cardName = document.getElementById('cardName').value;
//     const cardNumber = document.getElementById('cardNumber').value;
//     const cardExpiry = document.getElementById('cardExpiry').value;
//     const cardCvv = document.getElementById('cardCvv').value;
    
//     // Basic validation
//     if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
//         showNotification('Please fill in all payment details', 'error');
//         return;
//     }
    
//     if (cardNumber.replace(/\s/g, '').length < 13) {
//         showNotification('Please enter a valid card number', 'error');
//         return;
//     }
    
//     if (cardCvv.length < 3) {
//         showNotification('Please enter a valid CVV', 'error');
//         return;
//     }
    
//     // Show loading state
//     const payButton = e.target.querySelector('button[type="submit"]');
//     const originalText = payButton.innerHTML;
//     payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
//     payButton.disabled = true;
    
//     // Simulate payment processing
//     setTimeout(() => {
//         processPaymentSuccess();
        
//         // Reset button
//         payButton.innerHTML = originalText;
//         payButton.disabled = false;
//     }, 2000);
// }

// function processPaymentSuccess() {
//     // Close payment modal
//     closePaymentModal();
    
//     // Update success modal with plan details
//     const planNames = {
//         'silver': 'Silver Plan',
//         'gold': 'Gold Plan', 
//         'diamond': 'Diamond Plan'
//     };
    
//     const planDurations = {
//         'silver': '1 Month',
//         'gold': '2 Months',
//         'diamond': '3 Months'
//     };
    
//     document.getElementById('successPlanName').textContent = planNames[selectedPlanType];
//     document.getElementById('successPlanPrice').textContent = `₹${selectedPlanPrice}`;
//     document.getElementById('successPlanDuration').textContent = planDurations[selectedPlanType];
    
//     // Generate random transaction ID
//     const transactionId = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
//     document.getElementById('transactionId').textContent = transactionId;
    
//     // Set current date
//     const currentDate = new Date().toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//     });
//     document.getElementById('transactionDate').textContent = currentDate;
    
//     // Show payment success modal
//     document.getElementById('paymentSuccessModal').style.display = 'block';
    
//     // Process the subscription after showing success modal
//     setTimeout(() => {
//         subscribeToPlan(selectedPlanType);
//         updateMembershipUI();
//     }, 500);
    
//     // Reset variables
//     selectedPlanType = null;
//     selectedPlanPrice = null;
// }

// function closePaymentSuccessModal() {
//     document.getElementById('paymentSuccessModal').style.display = 'none';
//     // Don't reload the page - let users see their updated membership
// }

// function updateMembershipModal() {
//     if (!currentUser) return;
    
//     const membership = getUserMembership();
//     const planCards = document.querySelectorAll('.plan-card');
    
//     // Update current plan status section
//     const currentPlanStatus = document.getElementById('currentPlanStatus');
//     if (currentPlanStatus) {
//         const planNames = {
//             'bronze': 'Bronze Plan',
//             'silver': 'Silver Plan',
//             'gold': 'Gold Plan',
//             'diamond': 'Diamond Plan'
//         };
        
//         const planPrices = {
//             'bronze': 'Free',
//             'silver': '₹49',
//             'gold': '₹99',
//             'diamond': '₹149'
//         };
        
//         const planDurations = {
//             'bronze': 'Forever',
//             'silver': '1 Month',
//             'gold': '2 Months',
//             'diamond': '3 Months'
//         };
        
//         // Update current plan details
//         document.getElementById('currentPlanName').textContent = planNames[membership.plan];
//         document.getElementById('currentPlanPrice').textContent = planPrices[membership.plan];
//         document.getElementById('currentPlanDuration').textContent = planDurations[membership.plan];
//         document.getElementById('currentPlanApplicationsUsed').textContent = `${membership.applicationsUsed}/${membership.applicationsLimit}`;
        
//         // Update expiry date
//         const expiresText = membership.expiresAt ? 
//             new Date(membership.expiresAt).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//             }) : 'Never';
//         document.getElementById('currentPlanExpires').textContent = expiresText;
        
//         // Show the current plan status section
//         currentPlanStatus.style.display = 'block';
//     }
    
//     planCards.forEach(card => {
//         const planType = card.classList.contains('bronze') ? 'bronze' : 
//                         card.classList.contains('silver') ? 'silver' :
//                         card.classList.contains('gold') ? 'gold' : 'diamond';
        
//         const button = card.querySelector('button');
        
//         if (planType === membership.plan) {
//             button.textContent = 'Current Plan';
//             button.className = 'btn btn-secondary';
//             button.disabled = true;
//         } else if (planType === 'bronze') {
//             button.textContent = 'Current Plan';
//             button.className = 'btn btn-secondary';
//             button.disabled = true;
//         } else {
//             button.textContent = 'Subscribe Now';
//             button.className = 'btn btn-primary';
//             button.disabled = false;
//             button.onclick = () => {
//                 const prices = { silver: 49, gold: 99, diamond: 149 };
//                 openPaymentModal(planType, prices[planType]);
//             };
//         }
//     });
// } 