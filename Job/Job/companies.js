// Companies Modal Functionality

// Sample companies data
let companies = [];

function createSampleCompanies() {
    companies = [
        {
            id: 1,
            name: "TechCorp",
            industry: "Technology",
            location: "Mumbai, India",
            description: "Leading technology company specializing in software development and digital solutions.",
            employees: "500-1000",
            founded: "2010",
            website: "www.techcorp.com",
            logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 2,
            name: "GrowthCo",
            industry: "Marketing",
            location: "Delhi, India",
            description: "Digital marketing agency helping businesses grow through innovative marketing strategies.",
            employees: "100-500",
            founded: "2015",
            website: "www.growthco.com",
            logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 3,
            name: "DesignStudio",
            industry: "Design",
            location: "Bangalore, India",
            description: "Creative design studio focused on user experience and visual design solutions.",
            employees: "50-100",
            founded: "2018",
            website: "www.designstudio.com",
            logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 4,
            name: "SalesForce",
            industry: "Sales",
            location: "Pune, India",
            description: "Sales and customer relationship management company with innovative solutions.",
            employees: "200-500",
            founded: "2012",
            website: "www.salesforce.com",
            logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 5,
            name: "DataTech",
            industry: "Technology",
            location: "Hyderabad, India",
            description: "Data analytics and business intelligence company providing insights-driven solutions.",
            employees: "100-200",
            founded: "2016",
            website: "www.datatech.com",
            logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 6,
            name: "ContentHub",
            industry: "Marketing",
            location: "Remote",
            description: "Content creation and digital marketing platform connecting creators with brands.",
            employees: "50-100",
            founded: "2019",
            website: "www.contenthub.com",
            logo: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        }
    ];
}

function displayCompanies() {
    const companiesList = document.getElementById('companiesList');
    if (!companiesList) return;
    
    companiesList.innerHTML = companies.map(company => `
        <div class="company-card" onclick="viewCompanyJobs(${company.id})">
            <div class="company-logo-large">
                <img src="${company.logo}" alt="${company.name}">
            </div>
            <div class="company-info">
                <h3 class="company-name-large">${company.name}</h3>
                <p class="company-industry">${company.industry}</p>
                <p class="company-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${company.location}
                </p>
            </div>
            <div class="company-stats">
                <div class="company-stat">
                    <h4>Employees</h4>
                    <p>${company.employees}</p>
                </div>
                <div class="company-stat">
                    <h4>Founded</h4>
                    <p>${company.founded}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function viewCompanyJobs(companyId) {
    const company = companies.find(c => c.id === companyId);
    if (!company) {
        showNotification('Company not found', 'error');
        return;
    }
    
    // Filter jobs by company
    const companyJobs = jobs.filter(job => job.company === company.name);
    
    if (companyJobs.length === 0) {
        showNotification('No jobs available for this company at the moment', 'info');
        return;
    }
    
    // Navigate to jobs section and filter by company
    document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' });
    
    // Set company filter (if it exists)
    const jobLocationFilter = document.getElementById('jobLocation');
    if (jobLocationFilter) {
        jobLocationFilter.value = company.location;
        filterJobs();
    }
    
    showNotification(`Showing jobs from ${company.name}`, 'info');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize companies
    createSampleCompanies();
    displayCompanies();
});

// Export for use in other files
window.createSampleCompanies = createSampleCompanies;
window.displayCompanies = displayCompanies;
window.viewCompanyJobs = viewCompanyJobs;
