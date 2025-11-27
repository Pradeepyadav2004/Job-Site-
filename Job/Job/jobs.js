// Jobs Modal Functionality

// Sample jobs data
let jobs = [];

function createSampleJobs() {
    jobs = [
        {
            id: 1,
            title: "Frontend Developer",
            company: "TechCorp",
            location: "Mumbai, India",
            type: "Full Time",
            category: "Technology",
            salary: "₹8,00,000 - ₹12,00,000",
            description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user-friendly web applications using modern technologies.",
            requirements: ["React", "JavaScript", "HTML/CSS", "3+ years experience"],
            postedDate: "2024-01-15",
            logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 2,
            title: "Marketing Manager",
            company: "GrowthCo",
            location: "Delhi, India",
            type: "Full Time",
            category: "Marketing",
            salary: "₹6,00,000 - ₹9,00,000",
            description: "Join our marketing team to develop and execute marketing strategies that drive growth and brand awareness.",
            requirements: ["Digital Marketing", "Analytics", "Team Management", "5+ years experience"],
            postedDate: "2024-01-14",
            logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 3,
            title: "UI/UX Designer",
            company: "DesignStudio",
            location: "Bangalore, India",
            type: "Full Time",
            category: "Design",
            salary: "₹7,00,000 - ₹10,00,000",
            description: "Create beautiful and intuitive user experiences. Work with cross-functional teams to design products that users love.",
            requirements: ["Figma", "Adobe Creative Suite", "User Research", "2+ years experience"],
            postedDate: "2024-01-13",
            logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 4,
            title: "Sales Representative",
            company: "SalesForce",
            location: "Pune, India",
            type: "Full Time",
            category: "Sales",
            salary: "₹4,00,000 - ₹7,00,000",
            description: "Drive sales growth by building relationships with clients and closing deals. Excellent communication skills required.",
            requirements: ["Sales Experience", "Communication Skills", "CRM Software", "1+ years experience"],
            postedDate: "2024-01-12",
            logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 5,
            title: "Data Analyst",
            company: "DataTech",
            location: "Hyderabad, India",
            type: "Full Time",
            category: "Technology",
            salary: "₹6,00,000 - ₹9,00,000",
            description: "Analyze complex data sets to provide insights that drive business decisions. Strong analytical skills required.",
            requirements: ["SQL", "Python", "Excel", "Statistics", "2+ years experience"],
            postedDate: "2024-01-11",
            logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 6,
            title: "Content Writer",
            company: "ContentHub",
            location: "Remote",
            type: "Part Time",
            category: "Marketing",
            salary: "₹3,00,000 - ₹5,00,000",
            description: "Create engaging content for various platforms. Write blog posts, social media content, and marketing materials.",
            requirements: ["Content Writing", "SEO", "Social Media", "1+ years experience"],
            postedDate: "2024-01-10",
            logo: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 7,
            title: "TEST JOB - Software Engineer",
            company: "Test Company",
            location: "Test Location",
            type: "Full Time",
            category: "Technology",
            salary: "₹10,00,000 - ₹15,00,000",
            description: "This is a test job to verify the jobs section is working properly.",
            requirements: ["JavaScript", "React", "Node.js", "5+ years experience"],
            postedDate: "2024-01-20",
            logo: ""
        }
    ];
}

function displayJobs(jobsToDisplay = jobs) {
    const jobsGrid = document.getElementById('jobsList');
    console.log('Jobs.js: displayJobs called, jobsGrid found:', !!jobsGrid);
    
    if (!jobsGrid) {
        console.error('Jobs.js: jobsList element not found!');
        return;
    }
    
    console.log('Jobs.js: Displaying', jobsToDisplay.length, 'jobs');
    
    if (jobsToDisplay.length === 0) {
        jobsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <h3>No jobs found</h3>
                <p>Try adjusting your filters or search terms.</p>
            </div>
        `;
        return;
    }
    
    jobsGrid.innerHTML = jobsToDisplay.map(job => `
        <div class="job-card">
            <div class="job-header">
                
                <div class="job-info">
                    <h3 class="job-title">${job.title}</h3>
                    <p class="company-name">${job.company}</p>
                </div>
            </div>
            <div class="job-tags">
                <span class="job-tag">${job.type}</span>
                <span class="job-tag">${job.category}</span>
                <span class="job-tag">${job.location}</span>
            </div>
            <p class="job-description">${job.description}</p>
            <div class="job-footer">
                <span class="job-salary">${job.salary}</span>
                <button class="btn btn-primary" onclick="applyForJob(${job.id})">Apply Now</button>
            </div>
        </div>
    `).join('');
    
    console.log('Jobs.js: Jobs HTML generated and inserted');
}

function filterJobs() {
    const category = document.getElementById('jobCategory').value;
    const type = document.getElementById('jobType').value;
    const location = document.getElementById('jobLocation').value;
    const searchTerm = document.getElementById('jobSearch').value.toLowerCase();
    
    let filteredJobs = jobs.filter(job => {
        const matchesCategory = !category || job.category === category;
        const matchesType = !type || job.type === type;
        const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
        const matchesSearch = !searchTerm || 
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm);
        
        return matchesCategory && matchesType && matchesLocation && matchesSearch;
    });
    
    displayJobs(filteredJobs);
}

function handleJobSearch(e) {
    e.preventDefault();
    filterJobs();
}

function applyForJob(jobId) {
    if (!currentUser) {
        showNotification('Please login to apply for jobs', 'error');
        return;
    }
    
    if (!canApplyForJob()) {
        showApplicationLimitWarning();
        return;
    }
    
    const job = jobs.find(j => j.id === jobId);
    if (!job) {
        showNotification('Job not found', 'error');
        return;
    }
    
    // Save application
    const applications = JSON.parse(localStorage.getItem('jobApplications')) || {};
    if (!applications[currentUser.id]) {
        applications[currentUser.id] = [];
    }
    
    const application = {
        jobId: jobId,
        jobTitle: job.title,
        companyName: job.company,
        appliedAt: new Date().toISOString(),
        status: 'Pending'
    };
    
    applications[currentUser.id].push(application);
    localStorage.setItem('jobApplications', JSON.stringify(applications));
    
    // Update membership application count
    const memberships = JSON.parse(localStorage.getItem('memberships')) || {};
    const userMembership = memberships[currentUser.id] || {
        plan: 'bronze',
        applicationsUsed: 0,
        applicationsLimit: 3
    };
    
    userMembership.applicationsUsed += 1;
    memberships[currentUser.id] = userMembership;
    localStorage.setItem('memberships', JSON.stringify(memberships));
    
    // Update UI
    updateMembershipUI();
    
    showNotification(`Successfully applied for ${job.title} at ${job.company}!`, 'success');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('Jobs.js: DOM Content Loaded');
    
    // Initialize jobs
    createSampleJobs();
    console.log('Jobs.js: Sample jobs created:', jobs.length, 'jobs');
    
    displayJobs();
    console.log('Jobs.js: Jobs displayed');
    
    // Also try to display jobs after a short delay to ensure DOM is fully ready
    setTimeout(() => {
        console.log('Jobs.js: Delayed display attempt');
        displayJobs();
    }, 100);
    
    // Job search form - search box is in hero section
    const searchInput = document.getElementById('jobSearch');
    const searchBtn = document.querySelector('.search-btn');
    
    console.log('Jobs.js: Search elements found:', { searchInput: !!searchInput, searchBtn: !!searchBtn });
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleJobSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleJobSearch(e);
            }
        });
        
        // Also listen for input changes for real-time search
        searchInput.addEventListener('input', filterJobs);
    }
    
    // Filter change events
    const jobCategory = document.getElementById('jobCategory');
    const jobType = document.getElementById('jobType');
    const jobLocation = document.getElementById('jobLocation');
    
    console.log('Jobs.js: Filter elements found:', { 
        jobCategory: !!jobCategory, 
        jobType: !!jobType, 
        jobLocation: !!jobLocation 
    });
    
    if (jobCategory) {
        jobCategory.addEventListener('change', filterJobs);
    }
    
    if (jobType) {
        jobType.addEventListener('change', filterJobs);
    }
    
    if (jobLocation) {
        jobLocation.addEventListener('change', filterJobs);
    }
});

// Export for use in other files
window.displayJobs = displayJobs;
window.filterJobs = filterJobs;
window.handleJobSearch = handleJobSearch;
window.applyForJob = applyForJob;
window.createSampleJobs = createSampleJobs;

// Global function for testing
window.testJobsDisplay = function() {
    console.log('Testing jobs display...');
    createSampleJobs();
    displayJobs();
    console.log('Jobs test completed');
}; 