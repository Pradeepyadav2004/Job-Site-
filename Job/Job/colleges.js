// Colleges Modal Functionality

// Sample colleges data
let colleges = [];

function initializeColleges() {
    createSampleColleges();
    displayColleges(colleges);
    setupCollegeFilters();
}

function createSampleColleges() {
    colleges = [
        {
            id: 1,
            name: "Indian Institute of Technology (IIT) Delhi",
            location: "New Delhi, India",
            courses: ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering"],
            description: "Premier engineering institution known for excellence in technical education and research.",
            fee: "₹2,50,000/year",
            rating: 4.8,
            logo: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 2,
            name: "Delhi University",
            location: "New Delhi, India",
            courses: ["BBA", "B.Com", "BA English", "BA Economics", "BSc Mathematics"],
            description: "One of India's largest and most prestigious universities offering diverse undergraduate programs.",
            fee: "₹15,000/year",
            rating: 4.5,
            logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 3,
            name: "National Institute of Design (NID)",
            location: "Ahmedabad, India",
            courses: ["Product Design", "Graphic Design", "Fashion Design", "Animation"],
            description: "Premier design institute fostering creativity and innovation in design education.",
            fee: "₹3,00,000/year",
            rating: 4.7,
            logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 4,
            name: "Symbiosis International University",
            location: "Pune, India",
            courses: ["MBA", "BBA", "Law", "Media Studies", "Hotel Management"],
            description: "Private university known for quality education in management, law, and media studies.",
            fee: "₹4,50,000/year",
            rating: 4.3,
            logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 5,
            name: "Manipal Academy of Higher Education",
            location: "Manipal, Karnataka",
            courses: ["Medicine", "Engineering", "Pharmacy", "Nursing", "Architecture"],
            description: "Comprehensive university offering programs in healthcare, engineering, and allied sciences.",
            fee: "₹5,00,000/year",
            rating: 4.4,
            logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 6,
            name: "Amity University",
            location: "Noida, Uttar Pradesh",
            courses: ["Engineering", "Management", "Law", "Arts", "Science", "Education"],
            description: "Private university offering a wide range of programs across multiple disciplines.",
            fee: "₹3,50,000/year",
            rating: 4.1,
            logo: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        }
    ];
}

function displayColleges(collegesToDisplay) {
    const collegesGrid = document.getElementById('collegesList');
    if (!collegesGrid) return;
    
    if (collegesToDisplay.length === 0) {
        collegesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <h3>No colleges found</h3>
                <p>Try adjusting your filters or search terms.</p>
            </div>
        `;
        return;
    }
    
    collegesGrid.innerHTML = collegesToDisplay.map(college => `
        <div class="college-card">
            <div class="college-header">
                <div class="college-logo">
                    <img src="${college.logo}" alt="${college.name}">
                </div>
                <div class="college-info">
                    <h3>${college.name}</h3>
                    <p class="college-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${college.location}
                    </p>
                </div>
            </div>
            <div class="college-courses">
                ${college.courses.map(course => `<span class="course-tag">${course}</span>`).join('')}
            </div>
            <p class="college-description">${college.description}</p>
            <div class="college-stats">
                <div class="college-stat">
                    <h4>Fee</h4>
                    <p>${college.fee}</p>
                </div>
                <div class="college-stat">
                    <h4>Rating</h4>
                    <p class="college-rating">
                        ${college.rating}
                        <i class="fas fa-star"></i>
                    </p>
                </div>
            </div>
            <div class="college-footer">
                <span class="college-fee">${college.fee}</span>
                <button class="btn btn-primary" onclick="openAdmissionModal(${college.id})">Apply Now</button>
            </div>
        </div>
    `).join('');
}

function setupCollegeFilters() {
    const courseFilter = document.getElementById('courseType');
    const locationFilter = document.getElementById('collegeLocation');
    const ratingFilter = document.getElementById('degreeLevel');
    
    if (courseFilter) {
        courseFilter.addEventListener('change', filterColleges);
    }
    
    if (locationFilter) {
        locationFilter.addEventListener('change', filterColleges);
    }
    
    if (ratingFilter) {
        ratingFilter.addEventListener('change', filterColleges);
    }
}

function filterColleges() {
    const course = document.getElementById('courseType').value;
    const location = document.getElementById('collegeLocation').value;
    const rating = parseFloat(document.getElementById('degreeLevel').value);
    
    let filteredColleges = colleges.filter(college => {
        const matchesCourse = !course || college.courses.includes(course);
        const matchesLocation = !location || college.location.toLowerCase().includes(location.toLowerCase());
        const matchesRating = !rating || college.rating >= rating;
        
        return matchesCourse && matchesLocation && matchesRating;
    });
    
    displayColleges(filteredColleges);
}

function openAdmissionModal(collegeId) {
    if (!currentUser) {
        showNotification('Please login to apply for admission', 'error');
        return;
    }
    
    const college = colleges.find(c => c.id === collegeId);
    if (!college) {
        showNotification('College not found', 'error');
        return;
    }
    
    // Populate modal with college details
    document.getElementById('admissionCollegeName').textContent = college.name;
    document.getElementById('admissionCollegeLocation').textContent = college.location;
    
    // Populate course dropdown
    const courseSelect = document.getElementById('admissionCourse');
    courseSelect.innerHTML = '<option value="">Select a course</option>' +
        college.courses.map(course => `<option value="${course}">${course}</option>`).join('');
    
    // Show modal
    document.getElementById('admissionModal').style.display = 'block';
}

function handleAdmissionSubmit(event) {
    event.preventDefault();
    
    if (!currentUser) {
        showNotification('Please login to submit application', 'error');
        return;
    }
    
    const collegeName = document.getElementById('admissionCollegeName').textContent;
    const course = document.getElementById('admissionCourse').value;
    const studentName = document.getElementById('admissionName').value;
    const studentEmail = document.getElementById('admissionEmail').value;
    const studentPhone = document.getElementById('admissionPhone').value;
    const studentEducation = document.getElementById('admissionEducation').value;
    
    if (!course || !studentName || !studentEmail || !studentPhone || !studentEducation) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Save application
    const applications = JSON.parse(localStorage.getItem('admissionApplications')) || {};
    if (!applications[currentUser.id]) {
        applications[currentUser.id] = [];
    }
    
    const application = {
        collegeName: collegeName,
        course: course,
        studentName: studentName,
        studentEmail: studentEmail,
        studentPhone: studentPhone,
        studentEducation: studentEducation,
        appliedAt: new Date().toISOString(),
        status: 'Pending'
    };
    
    applications[currentUser.id].push(application);
    localStorage.setItem('admissionApplications', JSON.stringify(applications));
    
    // Close modal and reset form
    document.getElementById('admissionModal').style.display = 'none';
    document.getElementById('admissionForm').reset();
    
    showNotification(`Successfully applied for ${course} at ${collegeName}!`, 'success');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize colleges
    initializeColleges();
    
    // Admission form
    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        admissionForm.addEventListener('submit', handleAdmissionSubmit);
    }
});

// Export for use in other files
window.initializeColleges = initializeColleges;
window.createSampleColleges = createSampleColleges;
window.displayColleges = displayColleges;
window.setupCollegeFilters = setupCollegeFilters;
window.filterColleges = filterColleges;
window.openAdmissionModal = openAdmissionModal;
window.handleAdmissionSubmit = handleAdmissionSubmit;
