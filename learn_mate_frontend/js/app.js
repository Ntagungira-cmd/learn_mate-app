// LearnMate South Sudan - Main Application Logic

// ==================== 
// State Management
// ====================
let appState = {
    currentUser: null,
    currentPage: 'home',
    sidebarOpen: true,
    isOnline: navigator.onLine,
    selectedSubject: 'All Subjects'
};

// ====================
// Initialization
// ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    checkOnlineStatus();
});

function initializeApp() {
    // Check if user was previously logged in
    const savedUser = localStorage.getItem('learnmate_user');
    if (savedUser) {
        appState.currentUser = JSON.parse(savedUser);
        showMainApp();
    }
    
    // Initialize i18n
    if (typeof initI18n === 'function') {
        initI18n();
    }
}

// ====================
// Event Listeners
// ====================
function setupEventListeners() {
    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });
    
    // Online/Offline detection
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
}

// ====================
// Authentication
// ====================
function loginAsStudent() {
    const email = document.getElementById('emailInput').value;
    
    // Simple validation (expand this in production)
    if (!email) {
        alert('Please enter your email');
        return;
    }
    
    const user = {
        name: email.split('@')[0] || 'Student',
        email: email,
        role: 'Student',
        avatar: email.charAt(0).toUpperCase()
    };
    
    appState.currentUser = user;
    localStorage.setItem('learnmate_user', JSON.stringify(user));
    
    showMainApp();
}

function continueOffline() {
    const user = {
        name: 'Guest',
        email: 'offline@local',
        role: 'Student',
        avatar: 'G'
    };
    
    appState.currentUser = user;
    appState.isOnline = false;
    
    showMainApp();
}

function logout() {
    appState.currentUser = null;
    localStorage.removeItem('learnmate_user');
    
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
}

function showMainApp() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    
    // Update user info in header
    document.getElementById('userName').textContent = appState.currentUser.name;
    document.getElementById('userRole').textContent = appState.currentUser.role;
    document.getElementById('userAvatar').textContent = appState.currentUser.avatar;
    
    // Render initial page
    renderHomePage();
    renderCoursesPage();
    renderDownloadsPage();
    renderProgressPage();
    renderSettingsPage();
}

// ====================
// Page Navigation
// ====================
function showPage(pageName) {
    const pages = ['home', 'courses', 'downloads', 'progress', 'settings'];
    
    pages.forEach(page => {
        const pageElement = document.getElementById(page + 'Page');
        if (pageElement) {
            pageElement.classList.add('hidden');
        }
    });
    
    const targetPage = document.getElementById(pageName + 'Page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }
    
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageName) {
            item.classList.add('active');
        }
    });
    
    appState.currentPage = pageName;
}

// ====================
// Sidebar Toggle
// ====================
function toggleSidebar() {
    appState.sidebarOpen = !appState.sidebarOpen;
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menuIcon');
    
    if (appState.sidebarOpen) {
        sidebar.classList.remove('collapsed');
        menuIcon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
    } else {
        sidebar.classList.add('collapsed');
        menuIcon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
    }
}

// ====================
// Online/Offline Status
// ====================
function checkOnlineStatus() {
    updateOnlineStatus();
}

function updateOnlineStatus() {
    appState.isOnline = navigator.onLine;
    const statusIcon = document.getElementById('statusIcon');
    const statusText = document.getElementById('statusText');
    
    if (appState.isOnline) {
        statusIcon.style.color = '#22c55e';
        statusIcon.innerHTML = `
            <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
            <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
            <path d="M12 20h.01"></path>
        `;
        statusText.textContent = 'Online';
    } else {
        statusIcon.style.color = '#6b7280';
        statusIcon.innerHTML = `
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
            <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
        `;
        statusText.textContent = 'Offline';
    }
}

// ====================
// Page Rendering
// ====================
function renderHomePage() {
    const homePage = document.getElementById('homePage');
    
    homePage.innerHTML = `
        <div class="hero-banner">
            <h2>Welcome, ${appState.currentUser.name}!</h2>
            <p>Continue your learning journey. You have 3 courses in progress.</p>
            <button class="btn">Continue Learning</button>
        </div>

        <div class="grid grid-3">
            <div class="card" style="cursor: pointer;" onclick="showPage('courses')">
                <div class="card-icon bg-green-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" style="stroke: #22c55e;">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                </div>
                <h3>Start Learning</h3>
                <p>Access your courses and lessons</p>
            </div>

            <div class="card" style="cursor: pointer;" onclick="showPage('downloads')">
                <div class="card-icon bg-yellow-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" style="stroke: #eab308;">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </div>
                <h3>View Offline Lessons</h3>
                <p>Study without internet connection</p>
            </div>

            <div class="card" style="cursor: pointer;">
                <div class="card-icon bg-blue-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" style="stroke: #3b82f6;">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 14 12 9 7 14"></polyline>
                        <line x1="12" y1="9" x2="12" y2="21"></line>
                    </svg>
                </div>
                <h3>Upload Lesson</h3>
                <p>For teachers only</p>
            </div>
        </div>

        <div class="grid grid-4">
            <div class="card stat-card">
                <div>
                    <p class="stat-label">Active Courses</p>
                    <p class="stat-value">3</p>
                </div>
                <svg width="32" height="32" viewBox="0 0 24 24" style="color: #3b82f6;">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
            </div>

            <div class="card stat-card">
                <div>
                    <p class="stat-label">Completed</p>
                    <p class="stat-value">12</p>
                </div>
                <svg width="32" height="32" viewBox="0 0 24 24" style="color: #22c55e;">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>

            <div class="card stat-card">
                <div>
                    <p class="stat-label">Study Hours</p>
                    <p class="stat-value">24h</p>
                </div>
                <svg width="32" height="32" viewBox="0 0 24 24" style="color: #eab308;">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            </div>

            <div class="card stat-card">
                <div>
                    <p class="stat-label">Offline Lessons</p>
                    <p class="stat-value">8</p>
                </div>
                <svg width="32" height="32" viewBox="0 0 24 24" style="color: #a855f7;">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
            </div>
        </div>

        <div class="card">
            <h3 style="margin-bottom: 1rem;">Continue Where You Left Off</h3>
            <div id="continueList"></div>
        </div>
    `;
    
    renderContinueList();
}

function renderContinueList() {
    const continueList = document.getElementById('continueList');
    if (!continueList) return;
    
    const activeCourses = getAllCourses().slice(0, 3);
    
    continueList.innerHTML = activeCourses.map(course => `
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div style="width: 3rem; height: 3rem; background: #dbeafe; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg width="24" height="24" viewBox="0 0 24 24" style="stroke: #3b82f6;">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
            </div>
            <div style="flex: 1;">
                <h4 style="font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">${course.subject} - ${course.title}</h4>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div class="progress-bar" style="flex: 1;">
                        <div class="progress-fill" style="width: ${course.progress}%"></div>
                    </div>
                    <span style="font-size: 0.875rem; font-weight: 600; color: #6b7280;">${course.progress}%</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderCoursesPage() {
    const coursesPage = document.getElementById('coursesPage');
    
    coursesPage.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">My Courses</h2>
            <p class="page-subtitle">Browse and manage your learning materials</p>
        </div>

        <div class="card" style="margin-bottom: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" style="color: #6b7280;">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                <h3 style="font-weight: 600; color: #1f2937;">Filters</h3>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <div>
                    <label style="display: block; font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">Subject</label>
                    <select id="subjectFilter" onchange="filterCourses()" style="width: 100%; padding: 0.5rem 1rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.5rem; font-size: 1rem; outline: none;">
                        <option>All Subjects</option>
                        <option>Mathematics</option>
                        <option>English</option>
                        <option>Science</option>
                        <option>History</option>
                        <option>Technology</option>
                        <option>Geography</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">Grade</label>
                    <select style="width: 100%; padding: 0.5rem 1rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.5rem; font-size: 1rem; outline: none;">
                        <option>All Grades</option>
                        <option>Grade 8</option>
                        <option>Grade 9</option>
                        <option>Grade 10</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">Availability</label>
                    <select style="width: 100%; padding: 0.5rem 1rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.5rem; font-size: 1rem; outline: none;">
                        <option>All Lessons</option>
                        <option>Downloaded Only</option>
                        <option>Online Only</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="grid grid-3" id="coursesList"></div>
    `;
    
    renderCourses();
}

function filterCourses() {
    const filter = document.getElementById('subjectFilter').value;
    appState.selectedSubject = filter;
    renderCourses(filter);
}

function renderCourses(filter = 'All Subjects') {
    const coursesList = document.getElementById('coursesList');
    if (!coursesList) return;
    
    const courses = getAllCourses();
    const filteredCourses = filter === 'All Subjects' 
        ? courses 
        : courses.filter(c => c.subject === filter);
    
    coursesList.innerHTML = filteredCourses.map(course => `
        <div class="course-card ${course.color}">
            ${course.downloaded ? `
                <div class="course-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" style="stroke: #22c55e;">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </div>
            ` : ''}
            <div class="course-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" class="${course.iconColor}">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
            </div>
            <div class="course-info">
                <p class="course-subject ${course.iconColor}">
                    ${course.subject} <span style="color: #6b7280;">${course.grade}</span>
                </p>
                <h3 class="course-title">${course.title}</h3>
                <div class="course-lessons">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>${course.lessons} lessons</span>
                </div>
            </div>
            <div class="course-progress">
                <div class="progress-header">
                    <span class="progress-label">Progress</span>
                    <span class="progress-percent">${course.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${course.progress}%"></div>
                </div>
            </div>
            <button class="btn-continue" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem;" onclick="openLesson(${course.id})">
                ${course.progress === 0 ? 'Start' : 'Continue'}
                ${course.downloaded ? `
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                ` : ''}
            </button>
        </div>
    `).join('');
}

function openLesson(courseId) {
    alert(`Opening lesson for course ID: ${courseId}`);
    // Implement lesson viewer here
}

function renderDownloadsPage() {
    const downloadsPage = document.getElementById('downloadsPage');
    
    downloadsPage.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
            <div class="page-header" style="margin-bottom: 0;">
                <h2 class="page-title">Offline Lessons</h2>
                <p class="page-subtitle">Access your downloaded content anytime, anywhere</p>
            </div>
            <div style="text-align: right;">
                <p style="font-size: 0.875rem; color: #6b7280;">Total Storage Used</p>
                <p style="font-size: 1.25rem; font-weight: bold; color: #1f2937;">145 MB</p>
            </div>
        </div>

        <div class="grid grid-3" style="margin-bottom: 2rem;">
            <div class="card stat-card">
                <div>
                    <p class="stat-label">Downloaded Lessons</p>
                    <p class="stat-value">3</p>
                </div>
                <svg width="32" height="32" viewBox="0 0 24 24" style="color: #3b82f6;">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
            </div>

            <div class="card stat-card">
                <div>
                    <p class="stat-label">Ready to Study</p>
                    <p class="stat-value">3</p>
                </div>
                <svg width="32" height="32" viewBox="0 0 24 24" style="color: #22c55e;">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>

            <div class="card stat-card">
                <div>
                    <p class="stat-label">In Progress</p>
                    <p class="stat-value">3</p>
                </div>
                <svg width="32" height="32" viewBox="0 0 24 24" style="color: #eab308;">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
            </div>
        </div>

        <div class="card">
            <h3 style="margin-bottom: 1rem;">Available Offline Content</h3>
            <div id="offlineLessonsList"></div>
        </div>
    `;
    
    renderOfflineLessons();
}

function renderOfflineLessons() {
    const lessonsList = document.getElementById('offlineLessonsList');
    if (!lessonsList) return;
    
    const lessons = getOfflineLessons();
    
    lessonsList.innerHTML = lessons.map(lesson => `
        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 1rem; transition: background 0.2s;">
            <div style="width: 3rem; height: 3rem; background: #dbeafe; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg width="24" height="24" viewBox="0 0 24 24" style="stroke: #3b82f6;">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
            </div>
            <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: #1f2937; margin-bottom: 0.25rem;">
                    <h4>${lesson.title}</h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" style="stroke: #22c55e;">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem;">
                    ${lesson.subject} • ${lesson.size} • Downloaded ${lesson.downloaded}
                </p>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div class="progress-bar" style="flex: 1;">
                        <div class="progress-fill" style="width: ${lesson.progress}%"></div>
                    </div>
                    <span style="font-size: 0.875rem; font-weight: 600; color: #6b7280;">${lesson.progress}%</span>
                </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn-continue" onclick="openLesson(${lesson.id})">Continue</button>
                <button class="btn-delete" onclick="deleteOfflineLesson(${lesson.id})">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

function deleteOfflineLesson(lessonId) {
    if (confirm('Are you sure you want to delete this offline lesson?')) {
        alert(`Deleting lesson ID: ${lessonId}`);
        // Implement deletion logic here
    }
}

function renderProgressPage() {
    const progressPage = document.getElementById('progressPage');
    
    progressPage.innerHTML = `
        <div style="background: white; border-radius: 0.75rem; padding: 3rem; text-align: center; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border: 1px solid #f3f4f6;">
            <svg style="width: 4rem; height: 4rem; color: #22c55e; margin: 0 auto 1rem;" viewBox="0 0 24 24">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            <h2 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">Progress Page</h2>
            <p style="color: #6b7280;">Your learning statistics and achievements will appear here.</p>
        </div>
    `;
}

function renderSettingsPage() {
    const settingsPage = document.getElementById('settingsPage');
    
   
    settingsPage.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Settings</h2>
            <p class="page-subtitle">Manage your account and preferences</p>
        </div>
        <div class="card">
            <p>Settings page content loading...</p>
        </div>
    `;
}

// Make functions available globally
window.loginAsStudent = loginAsStudent;
window.continueOffline = continueOffline;
window.logout = logout;
window.showPage = showPage;
window.toggleSidebar = toggleSidebar;
window.filterCourses = filterCourses;
window.openLesson = openLesson;
window.deleteOfflineLesson = deleteOfflineLesson;