// Global Variables
let currentScreen = 'welcomeScreen';
let sleepStartTime = null;
let isSleeping = false;
let feedingLog = [];
let sleepLog = [];
let feedbackData = {};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load saved data from localStorage
    loadSavedData();
    
    // Show welcome screen with animation
    showScreen('welcomeScreen');
    
    // Initialize sleep tracker
    updateSleepStats();
    
    // Show loading animation on page load
    showLoading();
    setTimeout(hideLoading, 1500);
});

// Screen Management
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen with animation
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
        
        // Add bounce animation to new screen
        targetScreen.classList.add('bounce');
        setTimeout(() => {
            targetScreen.classList.remove('bounce');
        }, 600);
    }
}

// Loading Management
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.add('active');
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.remove('active');
}

// Growth Calculation
function calculateGrowth() {
    showLoading();
    
    setTimeout(() => {
        const age = parseFloat(document.getElementById('babyAge').value);
        const weight = parseFloat(document.getElementById('babyWeight').value);
        const height = parseFloat(document.getElementById('babyHeight').value);
        
        if (!age || !weight || !height) {
            hideLoading();
            showError('Lütfen tüm alanları doldurun!');
            return;
        }
        
        const results = analyzeGrowth(age, weight, height);
        displayGrowthResults(results);
        hideLoading();
    }, 1000);
}

function analyzeGrowth(age, weight, height) {
    // Simple growth analysis (in real app, this would use WHO growth charts)
    const avgWeights = {
        0: 3.5, 1: 4.5, 2: 5.5, 3: 6.5, 4: 7.0, 5: 7.5, 6: 8.0,
        7: 8.5, 8: 9.0, 9: 9.5, 10: 10.0, 11: 10.5, 12: 11.0
    };
    
    const avgHeights = {
        0: 50, 1: 54, 2: 58, 3: 61, 4: 64, 5: 67, 6: 68,
        7: 69, 8: 70, 9: 71, 10: 72, 11: 73, 12: 74
    };
    
    const expectedWeight = avgWeights[Math.floor(age)] || avgWeights[12];
    const expectedHeight = avgHeights[Math.floor(age)] || avgHeights[12];
    
    const weightPercentile = ((weight / expectedWeight) * 100).toFixed(1);
    const heightPercentile = ((height / expectedHeight) * 100).toFixed(1);
    
    let weightStatus = 'Normal';
    if (weightPercentile < 85) weightStatus = 'Düşük';
    else if (weightPercentile > 115) weightStatus = 'Yüksek';
    
    let heightStatus = 'Normal';
    if (heightPercentile < 90) heightStatus = 'Kısa';
    else if (heightPercentile > 110) heightStatus = 'Uzun';
    
    return {
        weightPercentile,
        heightPercentile,
        weightStatus,
        heightStatus,
        age,
        weight,
        height
    };
}

function displayGrowthResults(results) {
    const resultsDiv = document.getElementById('growthResults');
    resultsDiv.innerHTML = `
        <h3><i class="fas fa-chart-bar"></i> Büyüme Analizi Sonuçları</h3>
        <div style="margin-top: 15px;">
            <div class="stat-row">
                <strong>Yaş:</strong> ${results.age} ay
            </div>
            <div class="stat-row">
                <strong>Kilo:</strong> ${results.weight} kg (${results.weightPercentile}% - ${results.weightStatus})
            </div>
            <div class="stat-row">
                <strong>Boy:</strong> ${results.height} cm (${results.heightPercentile}% - ${results.heightStatus})
            </div>
        </div>
        <div class="growth-advice">
            <p><i class="fas fa-info-circle"></i> Bu değerler sadece genel bir değerlendirmedir. Kesin değerlendirme için doktorunuza danışın.</p>
        </div>
    `;
    
    resultsDiv.classList.add('active');
    resultsDiv.classList.add('glow');
    
    setTimeout(() => {
        resultsDiv.classList.remove('glow');
    }, 2000);
}

// Feeding Tracker
function recordFeeding(type) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    const feedingTypes = {
        'breast': { icon: 'fas fa-heart', name: 'Anne Sütü', color: '#e74c3c' },
        'bottle': { icon: 'fas fa-baby-carriage', name: 'Mama', color: '#3498db' },
        'solid': { icon: 'fas fa-utensils', name: 'Katı Gıda', color: '#27ae60' }
    };
    
    const feeding = {
        type: type,
        time: timeString,
        timestamp: now.getTime(),
        ...feedingTypes[type]
    };
    
    feedingLog.push(feeding);
    updateFeedingDisplay();
    saveData();
    
    // Add animation to the button
    event.target.classList.add('bounce');
    setTimeout(() => {
        event.target.classList.remove('bounce');
    }, 600);
}

function updateFeedingDisplay() {
    const logEntries = document.getElementById('logEntries');
    const today = new Date().toDateString();
    
    const todayFeedings = feedingLog.filter(feeding => 
        new Date(feeding.timestamp).toDateString() === today
    );
    
    if (todayFeedings.length === 0) {
        logEntries.innerHTML = '<p style="color: #666; text-align: center;">Henüz beslenme kaydı yok</p>';
        return;
    }
    
    logEntries.innerHTML = todayFeedings
        .sort((a, b) => b.timestamp - a.timestamp)
        .map(feeding => `
            <div class="log-entry">
                <div>
                    <i class="${feeding.icon}" style="color: ${feeding.color}"></i>
                    <span>${feeding.name}</span>
                </div>
                <span>${feeding.time}</span>
            </div>
        `).join('');
}

// Sleep Tracker
function toggleSleep() {
    const button = document.getElementById('sleepToggle');
    const icon = button.querySelector('i');
    
    if (!isSleeping) {
        // Start sleep
        isSleeping = true;
        sleepStartTime = new Date();
        
        button.innerHTML = '<i class="fas fa-sun"></i> Uyandır';
        button.classList.add('active');
        
        // Add pulsing animation
        button.classList.add('glow');
        
    } else {
        // End sleep
        isSleeping = false;
        const sleepEndTime = new Date();
        const duration = sleepEndTime - sleepStartTime;
        
        const sleepEntry = {
            startTime: sleepStartTime,
            endTime: sleepEndTime,
            duration: duration,
            date: sleepStartTime.toDateString()
        };
        
        sleepLog.push(sleepEntry);
        
        button.innerHTML = '<i class="fas fa-moon"></i> Uyku Başlat';
        button.classList.remove('active', 'glow');
        
        updateSleepStats();
        saveData();
        
        // Show sleep summary
        showSleepSummary(duration);
    }
}

function updateSleepStats() {
    const todaySleepEl = document.getElementById('todaySleep');
    const lastSleepEl = document.getElementById('lastSleep');
    
    const today = new Date().toDateString();
    const todaysSleeps = sleepLog.filter(sleep => sleep.date === today);
    
    // Calculate total sleep for today
    const totalTodaySleep = todaysSleeps.reduce((total, sleep) => total + sleep.duration, 0);
    const todayHours = Math.floor(totalTodaySleep / (1000 * 60 * 60));
    const todayMinutes = Math.floor((totalTodaySleep % (1000 * 60 * 60)) / (1000 * 60));
    
    todaySleepEl.textContent = `${todayHours} saat ${todayMinutes} dakika`;
    
    // Show last sleep
    if (sleepLog.length > 0) {
        const lastSleep = sleepLog[sleepLog.length - 1];
        const lastHours = Math.floor(lastSleep.duration / (1000 * 60 * 60));
        const lastMinutes = Math.floor((lastSleep.duration % (1000 * 60 * 60)) / (1000 * 60));
        lastSleepEl.textContent = `${lastHours} saat ${lastMinutes} dakika`;
    }
}

function showSleepSummary(duration) {
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'sleep-summary';
    summaryDiv.innerHTML = `
        <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-top: 20px; text-align: center;">
            <h4><i class="fas fa-bed"></i> Uyku Tamamlandı!</h4>
            <p>Uyku süresi: <strong>${hours} saat ${minutes} dakika</strong></p>
        </div>
    `;
    
    const sleepLog = document.getElementById('sleepLog');
    sleepLog.appendChild(summaryDiv);
    
    summaryDiv.classList.add('bounce');
    
    // Remove summary after 5 seconds
    setTimeout(() => {
        summaryDiv.remove();
    }, 5000);
}

// Feedback System
function submitFeedback(screen, type) {
    if (!feedbackData[screen]) {
        feedbackData[screen] = { positive: 0, negative: 0 };
    }
    
    feedbackData[screen][type]++;
    
    // Show feedback toast
    showFeedbackToast();
    
    // Add animation to clicked button
    event.target.classList.add('bounce');
    setTimeout(() => {
        event.target.classList.remove('bounce');
    }, 600);
    
    // Save feedback data
    saveData();
    
    // In a real app, this would send data to a server for AI learning
    console.log('Feedback collected:', { screen, type, data: feedbackData });
}

function showFeedbackToast() {
    const toast = document.getElementById('feedbackToast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Data Persistence
function saveData() {
    const data = {
        feedingLog,
        sleepLog,
        feedbackData,
        lastSaved: new Date().getTime()
    };
    
    localStorage.setItem('babyAppData', JSON.stringify(data));
}

function loadSavedData() {
    const savedData = localStorage.getItem('babyAppData');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            feedingLog = data.feedingLog || [];
            sleepLog = data.sleepLog || [];
            feedbackData = data.feedbackData || {};
            
            // Update displays
            updateFeedingDisplay();
            updateSleepStats();
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

// Error Handling
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div style="background: #dc3545; color: white; padding: 15px; border-radius: 10px; margin: 20px 0; text-align: center;">
            <i class="fas fa-exclamation-triangle"></i> ${message}
        </div>
    `;
    
    const currentScreenEl = document.getElementById(currentScreen);
    currentScreenEl.appendChild(errorDiv);
    
    errorDiv.classList.add('shake');
    
    setTimeout(() => {
        errorDiv.remove();
    }, 4000);
}

// Additional CSS for dynamic elements
const additionalStyles = `
    <style>
        .stat-row {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
        }
        
        .stat-row:last-child {
            border-bottom: none;
        }
        
        .growth-advice {
            margin-top: 20px;
            padding: 15px;
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            color: #856404;
        }
        
        .growth-advice i {
            margin-right: 8px;
        }
        
        .sleep-summary {
            animation: slideIn 0.5s ease;
        }
        
        .error-message {
            animation: slideIn 0.3s ease;
        }
    </style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here for offline functionality
        console.log('App ready for service worker registration');
    });
}

// Export functions for potential testing
window.BabyApp = {
    showScreen,
    calculateGrowth,
    recordFeeding,
    toggleSleep,
    submitFeedback,
    saveData,
    loadSavedData
};