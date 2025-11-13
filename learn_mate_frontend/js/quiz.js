// LearnMate South Sudan - Quiz & Assessment System

// ====================
// Quiz Data Structure
// ====================
function getQuizData(courseId, lessonId) {
    // Sample quiz data - would typically come from API/database
    const quizzes = {
        '1_1': {
            id: 1,
            courseId: 1,
            lessonId: 1,
            title: 'Algebra Basics Quiz',
            description: 'Test your understanding of basic algebra concepts',
            timeLimit: 600, // 10 minutes in seconds
            passingScore: 70,
            questions: [
                {
                    id: 1,
                    type: 'multiple-choice',
                    question: 'What is the value of x in the equation: 2x + 5 = 13?',
                    options: ['2', '4', '6', '8'],
                    correctAnswer: 1, // index of correct answer
                    points: 10,
                    explanation: 'Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4'
                },
                {
                    id: 2,
                    type: 'multiple-choice',
                    question: 'Simplify: 3(x + 2)',
                    options: ['3x + 2', '3x + 6', 'x + 6', '3x + 5'],
                    correctAnswer: 1,
                    points: 10,
                    explanation: 'Distribute 3 to both terms inside parentheses: 3x + 6'
                },
                {
                    id: 3,
                    type: 'true-false',
                    question: 'The expression 2x + 3x equals 5x',
                    correctAnswer: true,
                    points: 10,
                    explanation: 'Combine like terms: 2x + 3x = 5x'
                },
                {
                    id: 4,
                    type: 'multiple-choice',
                    question: 'What is the coefficient of x in the expression: 7x - 3?',
                    options: ['7', '-3', '4', 'x'],
                    correctAnswer: 0,
                    points: 10,
                    explanation: 'The coefficient is the number multiplying the variable, which is 7'
                }
            ]
        }
    };
    
    const key = `${courseId}_${lessonId}`;
    return quizzes[key] || null;
}

// ====================
// Quiz Session Management
// ====================
class QuizSession {
    constructor(quizData) {
        this.quizData = quizData;
        this.startTime = new Date();
        this.answers = {};
        this.currentQuestion = 0;
        this.completed = false;
    }
    
    answerQuestion(questionId, answer) {
        this.answers[questionId] = {
            answer,
            timestamp: new Date()
        };
    }
    
    getTimeElapsed() {
        return Math.floor((new Date() - this.startTime) / 1000);
    }
    
    getTimeRemaining() {
        const elapsed = this.getTimeElapsed();
        return Math.max(0, this.quizData.timeLimit - elapsed);
    }
    
    calculateScore() {
        let totalPoints = 0;
        let earnedPoints = 0;
        
        this.quizData.questions.forEach(question => {
            totalPoints += question.points;
            
            const userAnswer = this.answers[question.id];
            if (userAnswer) {
                if (this.isAnswerCorrect(question, userAnswer.answer)) {
                    earnedPoints += question.points;
                }
            }
        });
        
        return {
            earned: earnedPoints,
            total: totalPoints,
            percentage: totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0
        };
    }
    
    isAnswerCorrect(question, answer) {
        if (question.type === 'multiple-choice') {
            return answer === question.correctAnswer;
        } else if (question.type === 'true-false') {
            return answer === question.correctAnswer;
        }
        return false;
    }
    
    getResults() {
        const score = this.calculateScore();
        const passed = score.percentage >= this.quizData.passingScore;
        
        return {
            quizId: this.quizData.id,
            score,
            passed,
            timeElapsed: this.getTimeElapsed(),
            completedAt: new Date(),
            answers: this.answers,
            details: this.quizData.questions.map(question => ({
                question: question.question,
                userAnswer: this.answers[question.id]?.answer,
                correctAnswer: question.correctAnswer,
                isCorrect: this.answers[question.id] ? 
                    this.isAnswerCorrect(question, this.answers[question.id].answer) : false,
                explanation: question.explanation,
                points: question.points
            }))
        };
    }
}

// ====================
// Quiz UI Renderer
// ====================
function renderQuiz(quizData, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const session = new QuizSession(quizData);
    
    container.innerHTML = `
        <div class="quiz-container" style="max-width: 800px; margin: 0 auto;">
            <div class="quiz-header card" style="margin-bottom: 1.5rem;">
                <h2 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">
                    ${quizData.title}
                </h2>
                <p style="color: #6b7280; margin-bottom: 1rem;">${quizData.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="color: #6b7280;">
                        <span style="font-weight: 600;">Time Limit:</span> ${Math.floor(quizData.timeLimit / 60)} minutes
                    </div>
                    <div style="color: #6b7280;">
                        <span style="font-weight: 600;">Passing Score:</span> ${quizData.passingScore}%
                    </div>
                </div>
            </div>
            
            <div id="quiz-timer" class="card" style="margin-bottom: 1.5rem; text-align: center; background: #fef9c3; border-color: #fde047;">
                <p style="font-size: 1.25rem; font-weight: bold; color: #854d0e;">
                    Time Remaining: <span id="timer-display">--:--</span>
                </p>
            </div>
            
            <div id="quiz-questions"></div>
            
            <div class="card" style="margin-top: 1.5rem;">
                <button onclick="submitQuiz()" class="btn-continue" style="width: 100%;">
                    Submit Quiz
                </button>
            </div>
        </div>
    `;
    
    renderQuestions(quizData, session);
    startTimer(session);
    
    // Store session globally for submission
    window.currentQuizSession = session;
}

function renderQuestions(quizData, session) {
    const questionsContainer = document.getElementById('quiz-questions');
    
    questionsContainer.innerHTML = quizData.questions.map((question, index) => `
        <div class="card" style="margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                <h3 style="font-weight: 600; color: #1f2937; flex: 1;">
                    ${index + 1}. ${question.question}
                </h3>
                <span style="background: #dbeafe; color: #3b82f6; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 600;">
                    ${question.points} pts
                </span>
            </div>
            
            ${question.type === 'multiple-choice' ? `
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    ${question.options.map((option, optIndex) => `
                        <label style="display: flex; align-items: center; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem; cursor: pointer; transition: background 0.2s;" class="quiz-option">
                            <input type="radio" name="question_${question.id}" value="${optIndex}" 
                                onchange="answerQuestion(${question.id}, ${optIndex})"
                                style="margin-right: 0.75rem; width: 1.25rem; height: 1.25rem; cursor: pointer;">
                            <span style="color: #374151;">${option}</span>
                        </label>
                    `).join('')}
                </div>
            ` : question.type === 'true-false' ? `
                <div style="display: flex; gap: 1rem;">
                    <label style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 1rem; background: #f9fafb; border-radius: 0.5rem; cursor: pointer; transition: background 0.2s;" class="quiz-option">
                        <input type="radio" name="question_${question.id}" value="true" 
                            onchange="answerQuestion(${question.id}, true)"
                            style="margin-right: 0.75rem; width: 1.25rem; height: 1.25rem; cursor: pointer;">
                        <span style="color: #374151; font-weight: 600;">True</span>
                    </label>
                    <label style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 1rem; background: #f9fafb; border-radius: 0.5rem; cursor: pointer; transition: background 0.2s;" class="quiz-option">
                        <input type="radio" name="question_${question.id}" value="false" 
                            onchange="answerQuestion(${question.id}, false)"
                            style="margin-right: 0.75rem; width: 1.25rem; height: 1.25rem; cursor: pointer;">
                        <span style="color: #374151; font-weight: 600;">False</span>
                    </label>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function startTimer(session) {
    const timerDisplay = document.getElementById('timer-display');
    
    const updateTimer = () => {
        const remaining = session.getTimeRemaining();
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (remaining <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    };
    
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

function answerQuestion(questionId, answer) {
    if (window.currentQuizSession) {
        window.currentQuizSession.answerQuestion(questionId, answer);
    }
}

function submitQuiz() {
    if (!window.currentQuizSession) return;
    
    const results = window.currentQuizSession.getResults();
    
    // Save results
    saveQuizResults(results);
    
    // Display results
    displayQuizResults(results);
}

function displayQuizResults(results) {
    const container = document.querySelector('.quiz-container');
    if (!container) return;
    
    const passedClass = results.passed ? 'bg-green-100' : 'bg-red-100';
    const passedColor = results.passed ? '#22c55e' : '#ef4444';
    
    container.innerHTML = `
        <div class="card" style="text-align: center; padding: 2rem;">
            <div style="width: 5rem; height: 5rem; background: ${passedClass}; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                <svg width="40" height="40" viewBox="0 0 24 24" style="stroke: ${passedColor};">
                    ${results.passed ? 
                        '<polyline points="20 6 9 17 4 12"></polyline>' : 
                        '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'
                    }
                </svg>
            </div>
            
            <h2 style="font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">
                ${results.passed ? 'Congratulations!' : 'Keep Trying!'}
            </h2>
            
            <p style="font-size: 1.25rem; color: #6b7280; margin-bottom: 2rem;">
                You scored ${results.score.earned} out of ${results.score.total} points (${results.score.percentage}%)
            </p>
            
            <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem;">
                <div style="padding: 1rem; background: #f9fafb; border-radius: 0.5rem;">
                    <p style="font-size: 0.875rem; color: #6b7280;">Time Taken</p>
                    <p style="font-size: 1.25rem; font-weight: bold; color: #1f2937;">
                        ${Math.floor(results.timeElapsed / 60)}:${(results.timeElapsed % 60).toString().padStart(2, '0')}
                    </p>
                </div>
                <div style="padding: 1rem; background: #f9fafb; border-radius: 0.5rem;">
                    <p style="font-size: 0.875rem; color: #6b7280;">Correct Answers</p>
                    <p style="font-size: 1.25rem; font-weight: bold; color: #1f2937;">
                        ${results.details.filter(d => d.isCorrect).length} / ${results.details.length}
                    </p>
                </div>
            </div>
            
            <button onclick="location.reload()" class="btn-continue" style="width: auto; padding: 0.75rem 2rem;">
                Back to Lessons
            </button>
        </div>
        
        <div class="card" style="margin-top: 1.5rem;">
            <h3 style="font-weight: bold; color: #1f2937; margin-bottom: 1rem;">Review Answers</h3>
            ${results.details.map((detail, index) => `
                <div style="padding: 1rem; background: ${detail.isCorrect ? '#f0fdf4' : '#fef2f2'}; border-left: 4px solid ${detail.isCorrect ? '#22c55e' : '#ef4444'}; border-radius: 0.5rem; margin-bottom: 1rem;">
                    <p style="font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">
                        ${index + 1}. ${detail.question}
                    </p>
                    <p style="font-size: 0.875rem; color: ${detail.isCorrect ? '#16a34a' : '#dc2626'}; margin-bottom: 0.25rem;">
                        ${detail.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </p>
                    ${!detail.isCorrect ? `
                        <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">
                            Your answer: ${detail.userAnswer !== undefined ? detail.userAnswer : 'Not answered'}
                        </p>
                        <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">
                            Correct answer: ${detail.correctAnswer}
                        </p>
                    ` : ''}
                    <p style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem; font-style: italic;">
                        ${detail.explanation}
                    </p>
                </div>
            `).join('')}
        </div>
    `;
}

// ====================
// Results Storage
// ====================
function saveQuizResults(results) {
    const key = `quiz_results_${results.quizId}_${Date.now()}`;
    
    try {
        localStorage.setItem(key, JSON.stringify(results));
        
        // Also update course progress
        const courseId = window.currentQuizSession.quizData.courseId;
        const lessonId = window.currentQuizSession.quizData.lessonId;
        
        if (results.passed) {
            updateLessonProgress(courseId, lessonId, 100);
        }
        
        return true;
    } catch (error) {
        console.error('Error saving quiz results:', error);
        return false;
    }
}

function getQuizHistory(quizId) {
    const results = [];
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`quiz_results_${quizId}_`)) {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                results.push(data);
            } catch (error) {
                console.error('Error loading quiz result:', error);
            }
        }
    }
    
    return results.sort((a, b) => 
        new Date(b.completedAt) - new Date(a.completedAt)
    );
}

// Export functions
if (typeof window !== 'undefined') {
    window.getQuizData = getQuizData;
    window.renderQuiz = renderQuiz;
    window.answerQuestion = answerQuestion;
    window.submitQuiz = submitQuiz;
    window.saveQuizResults = saveQuizResults;
    window.getQuizHistory = getQuizHistory;
}