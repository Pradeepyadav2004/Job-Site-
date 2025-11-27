// Profile Modal Functionality

function showEditProfileModal() {
    if (!currentUser) {
        showNotification('Please login to edit your profile', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userData = users[currentUser.id] || {};
    
    // Populate form with current data
    document.getElementById('editName').value = userData.name || currentUser.name;
    document.getElementById('editPhone').value = userData.phone || '';
    document.getElementById('editLocation').value = userData.location || '';
    document.getElementById('editExperience').value = userData.experience || '';
    document.getElementById('editSkills').value = userData.skills || '';
    document.getElementById('editBio').value = userData.bio || '';
    
    // Handle profile image preview
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    if (userData.profileImage) {
        previewImg.src = userData.profileImage;
        imagePreview.style.display = 'block';
    } else {
        imagePreview.style.display = 'none';
    }
    
    // Show the modal
    document.getElementById('editProfileModal').style.display = 'block';
}

function closeEditProfileModal() {
    document.getElementById('editProfileModal').style.display = 'none';
}

function handleProfileUpdate(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showNotification('Please login to update your profile', 'error');
        return;
    }
    
    // Handle profile image
    let profileImage = null;
    const fileInput = document.getElementById('editProfileImage');
    const previewImg = document.getElementById('previewImg');
    
    if (fileInput.files[0]) {
        // New image uploaded
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage = e.target.result;
            saveProfileData(profileImage);
        };
        reader.readAsDataURL(file);
    } else if (previewImg.src && previewImg.src !== '') {
        // Existing image (no new upload)
        profileImage = previewImg.src;
        saveProfileData(profileImage);
    } else {
        // No image
        saveProfileData(null);
    }
}

function saveProfileData(profileImage) {
    const updatedData = {
        id: currentUser.id,
        name: document.getElementById('editName').value,
        email: currentUser.email, // Email cannot be changed
        userType: currentUser.userType || 'jobseeker', // Keep existing user type
        phone: document.getElementById('editPhone').value,
        location: document.getElementById('editLocation').value,
        experience: document.getElementById('editExperience').value,
        skills: document.getElementById('editSkills').value,
        bio: document.getElementById('editBio').value,
        profileImage: profileImage
    };
    
    // Save to localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[currentUser.id] = updatedData;
    localStorage.setItem('users', JSON.stringify(users));
    
    // Update current user name
    currentUser.name = updatedData.name;
    
    // Update profile display
    updateProfileDisplay();
    
    // Update UI if needed
    if (typeof updateUIAfterLogin === 'function') {
        updateUIAfterLogin();
    }
    
    // Close modal
    document.getElementById('editProfileModal').style.display = 'none';
    
    showNotification('Profile updated successfully!', 'success');
}

function displayProfile() {
    if (!currentUser) {
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
        return;
    }
    
    const profileContent = document.getElementById('profileContent');
    if (!profileContent) return;
    
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userData = users[currentUser.id] || {};
    
    // Check if we're in full-page profile mode (other sections are hidden)
    const otherSections = document.querySelectorAll('section:not(#profile)');
    const isFullPageMode = Array.from(otherSections).some(section => section.style.display === 'none');
    
    const backButton = isFullPageMode ? `
        <div style="margin-bottom: 30px; text-align: left;">
            <button onclick="showAllSections()" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 8px;">
                <i class="fas fa-arrow-left"></i>
                Back to Home
            </button>
        </div>
    ` : '';
    
    profileContent.innerHTML = `
        ${backButton}
        <div class="profile-card">
            <div class="profile-header">
                <div class="profile-avatar">
                    ${userData.profileImage ? 
                        `<img src="${userData.profileImage}" alt="Profile Picture">` : 
                        `<i class="fas fa-user"></i>`
                    }
                </div>
                <div class="profile-info">
                    <h3 id="profileName">${userData.name || currentUser.name}</h3>
                    <p id="profileEmail">${currentUser.email}</p>
                    <p id="profileType">${userData.userType || 'Job Seeker'}</p>
                </div>
                <button id="editProfileBtn" class="btn btn-secondary">Edit Profile</button>
            </div>
            <div class="profile-details">
                <div class="detail-group">
                    <label>Phone:</label>
                    <span id="profilePhone">${userData.phone || 'Not provided'}</span>
                </div>
                <div class="detail-group">
                    <label>Location:</label>
                    <span id="profileLocation">${userData.location || 'Not provided'}</span>
                </div>
                <div class="detail-group">
                    <label>Experience:</label>
                    <span id="profileExperience">${userData.experience || 'Not provided'}</span>
                </div>
                <div class="detail-group">
                    <label>Skills:</label>
                    <span id="profileSkills">${userData.skills || 'Not provided'}</span>
                </div>
                ${userData.bio ? `
                <div class="detail-group" id="profileBio">
                    <label>Bio:</label>
                    <span>${userData.bio}</span>
                </div>
                ` : ''}
            </div>
        </div>
        
        <div class="profile-sections">
            <div class="profile-section">
                <h3>Membership Status</h3>
                ${displayMembershipStatus()}
            </div>
            
            <div class="profile-section">
                <h3>Job Applications</h3>
                <div id="userJobApplications">
                    ${displayUserJobApplications()}
                </div>
            </div>
            
            <div class="profile-section">
                <h3>College Applications</h3>
                <div id="userAdmissionApplications">
                    ${displayUserAdmissionApplications()}
                </div>
            </div>
        </div>
    `;
    
    // Add event listener to edit profile button
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', showEditProfileModal);
    }
}

function displayMembershipStatus() {
    const membership = getUserMembership();
    return `
        <div class="membership-status">
            <h4>Current Plan: ${membership.plan}</h4>
            <p>Applications this month: ${membership.applicationsUsed}/${membership.applicationsLimit}</p>
            <p>Expires: ${membership.expiresAt ? new Date(membership.expiresAt).toLocaleDateString() : 'Never'}</p>
            <button class="btn btn-primary" onclick="openMembershipModal()">Upgrade Plan</button>
        </div>
    `;
}

function displayUserJobApplications() {
    if (!currentUser) return '<p>Please login to view your applications.</p>';
    
    const applications = JSON.parse(localStorage.getItem('jobApplications')) || {};
    const userApplications = applications[currentUser.id] || [];
    
    if (userApplications.length === 0) {
        return '<p>No job applications yet. <a href="#jobs">Browse jobs</a> to get started!</p>';
    }
    
    return userApplications.map(app => `
        <div class="application-item">
            <h4>${app.jobTitle}</h4>
            <p><strong>Company:</strong> ${app.companyName}</p>
            <p><strong>Applied:</strong> ${new Date(app.appliedAt).toLocaleDateString()}</p>
            <p><strong>Status:</strong> <span class="status-${app.status.toLowerCase()}">${app.status}</span></p>
        </div>
    `).join('');
}

function displayUserAdmissionApplications() {
    if (!currentUser) return '<p>Please login to view your applications.</p>';
    
    const applications = JSON.parse(localStorage.getItem('admissionApplications')) || {};
    const userApplications = applications[currentUser.id] || [];
    
    if (userApplications.length === 0) {
        return '<p>No college applications yet. <a href="#colleges">Browse colleges</a> to get started!</p>';
    }
    
    return userApplications.map(app => `
        <div class="application-item">
            <h4>${app.collegeName}</h4>
            <p><strong>Course:</strong> ${app.course}</p>
            <p><strong>Applied:</strong> ${new Date(app.appliedAt).toLocaleDateString()}</p>
            <p><strong>Status:</strong> <span class="status-${app.status.toLowerCase()}">${app.status}</span></p>
        </div>
    `).join('');
}

// Image handling functions
function previewProfileImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showNotification('Please select a valid image file', 'error');
        return;
    }
    
    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
        showNotification('Image size should be less than 2MB', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const previewImg = document.getElementById('previewImg');
        const imagePreview = document.getElementById('imagePreview');
        
        previewImg.src = e.target.result;
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function removeProfileImage() {
    const fileInput = document.getElementById('editProfileImage');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    
    fileInput.value = '';
    imagePreview.style.display = 'none';
    previewImg.src = '';
}

function loadProfileImage() {
    if (!currentUser) return;
    
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userData = users[currentUser.id] || {};
    
    if (userData.profileImage) {
        const avatar = document.querySelector('.profile-avatar');
        if (avatar) {
            avatar.innerHTML = `<img src="${userData.profileImage}" alt="Profile Picture">`;
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Edit profile form
    const editProfileForm = document.getElementById('editProfileForm');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', handleProfileUpdate);
    }
    
    // Edit profile modal close button
    const editProfileModal = document.getElementById('editProfileModal');
    if (editProfileModal) {
        const closeBtn = editProfileModal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeEditProfileModal);
        }
        
        // Close modal when clicking outside
        editProfileModal.addEventListener('click', function(e) {
            if (e.target === editProfileModal) {
                closeEditProfileModal();
            }
        });
    }
    
    // Initialize profile display
    initializeProfile();
});

// Initialize profile display
function initializeProfile() {
    const profileContent = document.getElementById('profileContent');
    if (!profileContent) return;
    
    // Check if user is logged in and display appropriate content
    if (currentUser) {
        displayProfile();
    } else {
        // Show login prompt without login button
        profileContent.innerHTML = `
            <div class="profile-card">
                <div class="profile-header">
                    <div class="profile-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="profile-info">
                        <h3>Please login to view your profile</h3>
                        <p>Create an account or login to access your profile and manage your information</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Export for use in other files
window.showEditProfileModal = showEditProfileModal;
window.closeEditProfileModal = closeEditProfileModal;
window.handleProfileUpdate = handleProfileUpdate;
window.displayProfile = displayProfile;
window.initializeProfile = initializeProfile;
window.previewProfileImage = previewProfileImage;
window.removeProfileImage = removeProfileImage;
window.loadProfileImage = loadProfileImage;
window.displayMembershipStatus = displayMembershipStatus;
window.displayUserJobApplications = displayUserJobApplications;
window.displayUserAdmissionApplications = displayUserAdmissionApplications; 