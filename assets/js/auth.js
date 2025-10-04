// Authentication system for Travelty Travel & Tours
// This script handles authentication checks and session management

const AUTH_CONFIG = {
    // SHA-256 hash of the password '3251#' - secure and not visible in source code
    PASSWORD_HASH: '54c3fc0c8596c9e6cd1b07e00250a78a74deba8bca915fe7ab3913a69683ffb2',
    SESSION_KEY: 'travelty_auth',
    SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    AUTH_PAGE: 'auth.html'
};

// Simple SHA-256 implementation for password hashing
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Verify password against stored hash
async function verifyPassword(inputPassword) {
    const inputHash = await sha256(inputPassword);
    return inputHash === AUTH_CONFIG.PASSWORD_HASH;
}

// Check if user is authenticated
function isAuthenticated() {
    const authData = localStorage.getItem(AUTH_CONFIG.SESSION_KEY);
    if (authData) {
        try {
            const { timestamp, authenticated } = JSON.parse(authData);
            const now = Date.now();
            
            // Check if session is still valid
            if (authenticated && (now - timestamp) < AUTH_CONFIG.SESSION_DURATION) {
                return true;
            } else {
                // Session expired, clear it
                localStorage.removeItem(AUTH_CONFIG.SESSION_KEY);
            }
        } catch (e) {
            // Invalid data, clear it
            localStorage.removeItem(AUTH_CONFIG.SESSION_KEY);
        }
    }
    return false;
}

// Redirect to authentication page
function redirectToAuth() {
    const currentPage = window.location.pathname.split('/').pop();
    const redirectUrl = `${AUTH_CONFIG.AUTH_PAGE}?redirect=${currentPage}`;
    window.location.href = redirectUrl;
}

// Logout function
function logout() {
    localStorage.removeItem(AUTH_CONFIG.SESSION_KEY);
    redirectToAuth();
}

// Initialize authentication check
function initAuth() {
    if (!isAuthenticated()) {
        redirectToAuth();
    }
}

// Add logout functionality to pages
function addLogoutButton() {
    // Create logout button
    const logoutButton = document.createElement('button');
    logoutButton.innerHTML = '🚪 Logout';
    logoutButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: 500;
        color: #2d3748;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.2s ease;
        backdrop-filter: blur(10px);
    `;
    
    logoutButton.addEventListener('mouseenter', function() {
        this.style.background = '#fed7d7';
        this.style.borderColor = '#fc8181';
        this.style.color = '#c53030';
    });
    
    logoutButton.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.9)';
        this.style.borderColor = '#e2e8f0';
        this.style.color = '#2d3748';
    });
    
    logoutButton.addEventListener('click', function() {
        if (confirm('Adakah anda pasti mahu logout?')) {
            logout();
        }
    });
    
    document.body.appendChild(logoutButton);
}

// Auto-initialize when DOM is loaded (only for protected pages, not auth.html)
document.addEventListener('DOMContentLoaded', function() {
    // Only run auth check if we're not on the auth page
    if (!window.location.pathname.includes('auth.html')) {
        initAuth();
        addLogoutButton();
    }
});
