// LearnMate South Sudan - Lessons Data & Management

// ====================
// Courses Data
// ====================
function getAllCourses() {
    return [
        {
            id: 1,
            subject: 'Mathematics',
            grade: 'Grade 9',
            title: 'Algebra Basics',
            lessons: 12,
            progress: 75,
            color: 'bg-blue-100',
            iconColor: 'text-blue-600',
            downloaded: true,
            description: 'Learn fundamental algebra concepts including variables, equations, and expressions.'
        },
        {
            id: 2,
            subject: 'English',
            grade: 'Grade 8',
            title: 'Grammar Fundamentals',
            lessons: 15,
            progress: 50,
            color: 'bg-green-100',
            iconColor: 'text-green-600',
            downloaded: true,
            description: 'Master English grammar rules, sentence structure, and proper punctuation.'
        },
        {
            id: 3,
            subject: 'Science',
            grade: 'Grade 10',
            title: 'Biology Introduction',
            lessons: 20,
            progress: 30,
            color: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            downloaded: true,
            description: 'Explore the basics of biology including cells, organisms, and life processes.'
        },
        {
            id: 4,
            subject: 'History',
            grade: 'Grade 9',
            title: 'World History',
            lessons: 18,
            progress: 0,
            color: 'bg-purple-100',
            iconColor: 'text-purple-600',
            downloaded: false,
            description: 'Journey through major events and civilizations that shaped our world.'
        },
        {
            id: 5,
            subject: 'Technology',
            grade: 'Grade 8',
            title: 'Computer Basics',
            lessons: 10,
            progress: 60,
            color: 'bg-blue-100',
            iconColor: 'text-blue-600',
            downloaded: true,
            description: 'Learn computer fundamentals, basic programming, and digital literacy skills.'
        },
        {
            id: 6,
            subject: 'Geography',
            grade: 'Grade 9',
            title: 'Geography Essentials',
            lessons: 14,
            progress: 20,
            color: 'bg-green-100',
            iconColor: 'text-green-600',
            downloaded: false,
            description: 'Study Earth\'s physical features, climate patterns, and human-environment interactions.'
        }
    ];
}

// ====================
// Offline Lessons Data
// ====================
function getOfflineLessons() {
    return [
        {
            id: 1,
            subject: 'Mathematics',
            title: 'Algebra Basics',
            size: '45 MB',
            downloaded: '2 days ago',
            progress: 75,
            lastAccessed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        },
        {
            id: 2,
            subject: 'English',
            title: 'Grammar Fundamentals',
            size: '32 MB',
            downloaded: '5 days ago',
            progress: 50,
            lastAccessed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        },
        {
            id: 3,
            subject: 'Technology',
            title: 'Computer Basics',
            size: '68 MB',
            downloaded: '1 week ago',
            progress: 60,
            lastAccessed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
    ];
}

// ====================
// Lesson Content Structure
// ====================
function getLessonContent(courseId, lessonId) {
    // This would typically fetch from a database or API
    return {
        id: lessonId,
        courseId: courseId,
        title: 'Sample Lesson',
        content: 'Lesson content goes here...',
        duration: '30 minutes',
        type: 'video', // video, text, interactive
        resources: [],
        quiz: null
    };
}

// ====================
// Progress Tracking
// ====================
function updateLessonProgress(courseId, lessonId, progress) {
    const key = `lesson_progress_${courseId}_${lessonId}`;
    const progressData = {
        courseId,
        lessonId,
        progress,
        lastUpdated: new Date().toISOString()
    };
    
    try {
        localStorage.setItem(key, JSON.stringify(progressData));
        return true;
    } catch (error) {
        console.error('Error saving progress:', error);
        return false;
    }
}

function getLessonProgress(courseId, lessonId) {
    const key = `lesson_progress_${courseId}_${lessonId}`;
    
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading progress:', error);
        return null;
    }
}

// ====================
// Download Management
// ====================
function downloadLesson(courseId, lessonId) {
    // Simulate download process
    console.log(`Downloading lesson ${lessonId} from course ${courseId}`);
    
    // In a real implementation, this would:
    // 1. Fetch lesson content from server
    // 2. Store in IndexedDB
    // 3. Update offline availability
    
    return new Promise((resolve) => {
        setTimeout(() => {
            const downloadData = {
                courseId,
                lessonId,
                downloadedAt: new Date().toISOString(),
                size: Math.floor(Math.random() * 100) + ' MB'
            };
            
            const key = `offline_lesson_${courseId}_${lessonId}`;
            localStorage.setItem(key, JSON.stringify(downloadData));
            
            resolve(downloadData);
        }, 1000);
    });
}

function deleteDownloadedLesson(courseId, lessonId) {
    const key = `offline_lesson_${courseId}_${lessonId}`;
    
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error deleting lesson:', error);
        return false;
    }
}

function isLessonDownloaded(courseId, lessonId) {
    const key = `offline_lesson_${courseId}_${lessonId}`;
    return localStorage.getItem(key) !== null;
}

// ====================
// Course Enrollment
// ====================
function enrollInCourse(courseId) {
    const enrollments = getEnrolledCourses();
    
    if (!enrollments.includes(courseId)) {
        enrollments.push(courseId);
        localStorage.setItem('enrolled_courses', JSON.stringify(enrollments));
        return true;
    }
    
    return false;
}

function getEnrolledCourses() {
    try {
        const data = localStorage.getItem('enrolled_courses');
        return data ? JSON.parse(data) : [1, 2, 3, 5]; // Default enrollments
    } catch (error) {
        console.error('Error loading enrollments:', error);
        return [];
    }
}

// ====================
// Search & Filter
// ====================
function searchCourses(query) {
    const courses = getAllCourses();
    const lowerQuery = query.toLowerCase();
    
    return courses.filter(course => 
        course.title.toLowerCase().includes(lowerQuery) ||
        course.subject.toLowerCase().includes(lowerQuery) ||
        course.description.toLowerCase().includes(lowerQuery)
    );
}

function filterCoursesByGrade(grade) {
    const courses = getAllCourses();
    return grade === 'All Grades' 
        ? courses 
        : courses.filter(course => course.grade === grade);
}

function filterCoursesBySubject(subject) {
    const courses = getAllCourses();
    return subject === 'All Subjects' 
        ? courses 
        : courses.filter(course => course.subject === subject);
}

// ====================
// Statistics
// ====================
function getUserStatistics() {
    const courses = getAllCourses();
    const enrolled = getEnrolledCourses();
    
    const activeCourses = courses.filter(c => 
        enrolled.includes(c.id) && c.progress > 0 && c.progress < 100
    );
    
    const completedCourses = courses.filter(c => 
        enrolled.includes(c.id) && c.progress === 100
    );
    
    const totalProgress = courses.reduce((sum, c) => 
        enrolled.includes(c.id) ? sum + c.progress : sum, 0
    );
    
    const averageProgress = enrolled.length > 0 
        ? Math.round(totalProgress / enrolled.length) 
        : 0;
    
    return {
        totalEnrolled: enrolled.length,
        activeCourses: activeCourses.length,
        completedCourses: completedCourses.length,
        averageProgress,
        totalLessons: courses.reduce((sum, c) => 
            enrolled.includes(c.id) ? sum + c.lessons : sum, 0
        )
    };
}

// Export functions for use in other modules
if (typeof window !== 'undefined') {
    window.getAllCourses = getAllCourses;
    window.getOfflineLessons = getOfflineLessons;
    window.getLessonContent = getLessonContent;
    window.updateLessonProgress = updateLessonProgress;
    window.getLessonProgress = getLessonProgress;
    window.downloadLesson = downloadLesson;
    window.deleteDownloadedLesson = deleteDownloadedLesson;
    window.isLessonDownloaded = isLessonDownloaded;
    window.enrollInCourse = enrollInCourse;
    window.getEnrolledCourses = getEnrolledCourses;
    window.searchCourses = searchCourses;
    window.getUserStatistics = getUserStatistics;
}