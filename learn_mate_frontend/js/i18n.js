// LearnMate South Sudan - Internationalization (i18n)

// ====================
// Translation Data

const translations = {
    en: {
        app: {
            title: 'LearnMate South Sudan',
            subtitle: 'Empowering Education, Anywhere',
            tagline: 'Supporting low-connectivity learning environments'
        },
        login: {
            email: 'Email',
            password: 'Password',
            studentBtn: 'Login as Student',
            teacherBtn: 'Login as Teacher',
            offlineBtn: 'Continue Offline',
            noAccount: "Don't have an account?",
            signup: 'Sign Up'
        },
        nav: {
            home: 'Home',
            courses: 'My Courses',
            progress: 'Progress',
            downloads: 'Downloads',
            settings: 'Settings'
        },
        home: {
            welcome: 'Welcome',
            continueJourney: 'Continue your learning journey. You have {count} courses in progress.',
            continueLearning: 'Continue Learning',
            startLearning: 'Start Learning',
            startLearningDesc: 'Access your courses and lessons',
            viewOffline: 'View Offline Lessons',
            viewOfflineDesc: 'Study without internet connection',
            uploadLesson: 'Upload Lesson',
            uploadLessonDesc: 'For teachers only',
            activeCourses: 'Active Courses',
            completed: 'Completed',
            studyHours: 'Study Hours',
            offlineLessons: 'Offline Lessons',
            continueWhere: 'Continue Where You Left Off'
        },
        courses: {
            title: 'My Courses',
            subtitle: 'Browse and manage your learning materials',
            filters: 'Filters',
            subject: 'Subject',
            grade: 'Grade',
            availability: 'Availability',
            allSubjects: 'All Subjects',
            allGrades: 'All Grades',
            allLessons: 'All Lessons',
            downloadedOnly: 'Downloaded Only',
            onlineOnly: 'Online Only',
            progress: 'Progress',
            lessons: 'lessons',
            start: 'Start',
            continue: 'Continue'
        },
        downloads: {
            title: 'Offline Lessons',
            subtitle: 'Access your downloaded content anytime, anywhere',
            storageUsed: 'Total Storage Used',
            downloaded: 'Downloaded Lessons',
            readyStudy: 'Ready to Study',
            inProgress: 'In Progress',
            availableContent: 'Available Offline Content'
        },
        progress: {
            title: 'Progress Page',
            subtitle: 'Your learning statistics and achievements will appear here.'
        },
        settings: {
            title: 'Settings',
            subtitle: 'Manage your account and preferences',
            profile: 'Profile Information',
            fullName: 'Full Name',
            emailAddress: 'Email Address',
            bio: 'Bio',
            bioPlaceholder: 'Tell us about yourself...',
            saveChanges: 'Save Changes',
            language: 'Language Preferences',
            interfaceLanguage: 'Interface Language',
            languageDesc: 'Choose your preferred language for the interface',
            languageSupport: 'Language Support',
            languageSupportDesc: 'LearnMate supports multiple languages to make learning accessible for everyone in South Sudan',
            appearance: 'Appearance',
            darkMode: 'Dark Mode',
            darkModeDesc: 'Switch to dark theme',
            comingSoon: 'Coming Soon',
            darkModeComingSoon: 'Dark mode is currently in development and will be available soon',
            offlineStorage: 'Offline & Storage',
            autoDownload: 'Auto-Download Lessons',
            autoDownloadDesc: 'Automatically download enrolled courses when connected',
            downloadQuality: 'Download Quality',
            downloadQualityDesc: 'Choose video quality for downloads',
            cachedData: 'Cached Data',
            offlineContent: 'of offline content',
            clearCache: 'Clear Cached Data',
            notifications: 'Notifications',
            courseUpdates: 'Course Updates',
            courseUpdatesDesc: 'Get notified when new lessons are available',
            assignmentReminders: 'Assignment Reminders',
            assignmentRemindersDesc: 'Receive reminders for upcoming deadlines',
            discussionReplies: 'Discussion Replies',
            discussionRepliesDesc: 'Get notified when someone replies to your posts',
            accountActions: 'Account Actions',
            changePassword: 'Change Password',
            exportData: 'Export My Data',
            deleteAccount: 'Delete Account'
        },
        help: {
            title: 'Need Help?',
            contact: 'Contact support for assistance'
        },
        status: {
            online: 'Online',
            offline: 'Offline'
        }
    },
    
    ar: {
        app: {
            title: 'LearnMate جنوب السودان',
            subtitle: 'تمكين التعليم في كل مكان',
            tagline: 'دعم بيئات التعلم منخفضة الاتصال'
        },
        login: {
            email: 'البريد الإلكتروني',
            password: 'كلمة المرور',
            studentBtn: 'تسجيل الدخول كطالب',
            teacherBtn: 'تسجيل الدخول كمعلم',
            offlineBtn: 'متابعة بدون إنترنت',
            noAccount: 'ليس لديك حساب؟',
            signup: 'إنشاء حساب'
        },
        nav: {
            home: 'الرئيسية',
            courses: 'دوراتي',
            progress: 'التقدم',
            downloads: 'التنزيلات',
            settings: 'الإعدادات'
        },
        home: {
            welcome: 'مرحباً',
            continueJourney: 'تابع رحلة التعلم الخاصة بك. لديك {count} دورات قيد التقدم.',
            continueLearning: 'متابعة التعلم',
            startLearning: 'ابدأ التعلم',
            startLearningDesc: 'الوصول إلى دوراتك ودروسك',
            viewOffline: 'عرض الدروس غير المتصلة',
            viewOfflineDesc: 'الدراسة بدون اتصال بالإنترنت',
            uploadLesson: 'تحميل درس',
            uploadLessonDesc: 'للمعلمين فقط',
            activeCourses: 'الدورات النشطة',
            completed: 'مكتمل',
            studyHours: 'ساعات الدراسة',
            offlineLessons: 'الدروس غير المتصلة',
            continueWhere: 'تابع من حيث توقفت'
        },
        courses: {
            title: 'دوراتي',
            subtitle: 'تصفح وإدارة مواد التعلم الخاصة بك',
            filters: 'الفلاتر',
            subject: 'المادة',
            grade: 'الصف',
            availability: 'التوفر',
            allSubjects: 'جميع المواد',
            allGrades: 'جميع الصفوف',
            allLessons: 'جميع الدروس',
            downloadedOnly: 'المنزلة فقط',
            onlineOnly: 'عبر الإنترنت فقط',
            progress: 'التقدم',
            lessons: 'دروس',
            start: 'ابدأ',
            continue: 'متابعة'
        },
        status: {
            online: 'متصل',
            offline: 'غير متصل'
        }
    },
    
    local: {
        app: {
            title: 'LearnMate South Sudan',
            subtitle: 'Supporting Education Everywhere',
            tagline: 'Learning for communities with limited internet'
        },
        nav: {
            home: 'Home',
            courses: 'My Courses',
            progress: 'Progress',
            downloads: 'Downloads',
            settings: 'Settings'
        },
        status: {
            online: 'Connected',
            offline: 'Not Connected'
        }
    }
};


// i18n State

let currentLanguage = 'en';


// Initialize i18n

function initI18n() {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('learnmate_language');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    }
    
    // Set language selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
    }
    
    // Apply translations
    translatePage();
    
    // Set direction for RTL languages
    if (currentLanguage === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
}


// Change Language

function changeLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Language ${lang} not found`);
        return;
    }
    
    currentLanguage = lang;
    localStorage.setItem('learnmate_language', lang);
    
    // Update direction
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
    
    // Apply translations
    translatePage();
}


// Translate Page

function translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}


// Get Translation

function getTranslation(key, params = {}) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
        if (value && typeof value === 'object') {
            value = value[k];
        } else {
            value = undefined;
            break;
        }
    }
    
    // Fallback to English if translation not found
    if (value === undefined && currentLanguage !== 'en') {
        value = translations.en;
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                break;
            }
        }
    }
    
    // Replace parameters
    if (typeof value === 'string' && Object.keys(params).length > 0) {
        Object.keys(params).forEach(param => {
            value = value.replace(`{${param}}`, params[param]);
        });
    }
    
    return value || key;
}


// Translate Dynamic Content

function t(key, params = {}) {
    return getTranslation(key, params);
}

// Get Current Language

function getCurrentLanguage() {
    return currentLanguage;
}

// Get Available Languages

function getAvailableLanguages() {
    return Object.keys(translations).map(code => ({
        code,
        name: getLanguageName(code)
    }));
}

function getLanguageName(code) {
    const names = {
        en: 'English',
        ar: 'العربية (Arabic)',
        local: 'Local Language'
    };
    return names[code] || code;
}


// Format Number (locale-aware)

function formatNumber(number) {
    if (currentLanguage === 'ar') {
        // Arabic numerals
        const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return number.toString().split('').map(digit => 
            /\d/.test(digit) ? arabicNumerals[parseInt(digit)] : digit
        ).join('');
    }
    return number.toString();
}


// Format Date (locale-aware)

function formatDate(date, format = 'short') {
    const d = new Date(date);
    
    const options = format === 'short' 
        ? { year: 'numeric', month: 'short', day: 'numeric' }
        : { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    
    const locale = currentLanguage === 'ar' ? 'ar-SA' : 'en-US';
    
    return d.toLocaleDateString(locale, options);
}

// Export functions
if (typeof window !== 'undefined') {
    window.initI18n = initI18n;
    window.changeLanguage = changeLanguage;
    window.translatePage = translatePage;
    window.getTranslation = getTranslation;
    window.t = t;
    window.getCurrentLanguage = getCurrentLanguage;
    window.getAvailableLanguages = getAvailableLanguages;
    window.formatNumber = formatNumber;
    window.formatDate = formatDate;
}