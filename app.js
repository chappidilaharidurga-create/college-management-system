// State Management
const state = {
    user: null, // { name, role, email }
    currentView: 'login', // login, dashboard, admissions, settings
    students: [
        { id: 1, name: "lahari", course: "Computer Science", status: "Active", fees: "Paid" },
        { id: 2, name: "anushka", course: "Business Mgmt", status: "Active", fees: "Pending" },
        { id: 3, name: "renu", course: "Engineering", status: "On Leave", fees: "Paid" }
    ]
};

// DOM Elements
const app = document.getElementById('app');

// Router/View Manager
function render() {
    console.log('Rendering view:', state.currentView);
    app.innerHTML = '';

    if (state.currentView === 'login') {
        renderLogin();
    } else {
        renderLayout();
    }
}

function renderLogin() {
    const container = document.createElement('div');
    container.className = 'auth-container';
    container.innerHTML = `
        <div class="auth-box">
            <div class="text-center" style="margin-bottom: 2rem; text-align: center;">
                <h1 style="color: var(--primary); font-size: 2rem;">CMS</h1>
                <p class="text-muted">College Management System</p>
            </div>
            <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-input" id="email" placeholder="admin@college.edu" value="admin@college.edu">
            </div>
            <div class="form-group">
                <label class="form-label">Password</label>
                <input type="password" class="form-input" id="password" placeholder="••••••••" value="password">
            </div>
            <button class="btn btn-primary" onclick="handleLogin()">Sign In</button>
            <p class="text-muted text-sm" style="margin-top: 1rem; text-align: center;">Demo: Click Sign In</p>
        </div>
    `;
    app.appendChild(container);
}

function renderLayout() {
    const layout = document.createElement('div');
    layout.className = 'layout-container';

    // Sidebar
    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
        <div class="brand">
            <span>🎓</span> CMS
        </div>
        <ul class="nav-links">
            <li class="nav-item ${state.currentView === 'dashboard' ? 'active' : ''}" onclick="navigate('dashboard')">
                <span>📊</span> Dashboard
            </li>
            <li class="nav-item ${state.currentView === 'admissions' ? 'active' : ''}" onclick="navigate('admissions')">
                <span>👥</span> Students
            </li>
            <li class="nav-item ${state.currentView === 'schedule' ? 'active' : ''}" onclick="navigate('schedule')">
                <span>📅</span> Schedule
            </li>
             <li class="nav-item" onclick="handleLogout()">
                <span>🚪</span> Logout
            </li>
        </ul>
        <div class="user-profile">
            <div class="avatar">${state.user ? state.user.name[0] : 'U'}</div>
            <div>
                <div class="text-sm" style="font-weight: 600;">${state.user ? state.user.name : 'User'}</div>
                <div class="text-sm text-muted">${state.user ? state.user.role : 'Guest'}</div>
            </div>
        </div>
    `;

    // Main Content Area
    const main = document.createElement('main');
    main.className = 'main-content';

    // Header
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
        <div>
            <h2 class="text-xl">${normalizeTitle(state.currentView)}</h2>
            <p class="text-muted text-sm">${getDateString()}</p>
        </div>
        <div class="actions">
            <button class="btn btn-primary" style="width: auto; padding: 0.5rem 1rem;">🔔 Notifications</button>
        </div>
    `;
    main.appendChild(header);

    // View Content
    const content = document.createElement('div');
    main.appendChild(content);

    if (state.currentView === 'dashboard') {
        renderDashboard(content);
    } else if (state.currentView === 'admissions') {
        renderAdmissions(content);
    }

    layout.appendChild(sidebar);
    layout.appendChild(main);
    app.appendChild(layout);
}

// Sub-views
function renderDashboard(container) {
    container.innerHTML = `
        <div class="card-grid">
            <div class="card">
                <div class="stat-label">Total Students</div>
                <div class="stat-value">1,204</div>
                <div class="text-sm text-success">↑ 12% vs last year</div>
            </div>
             <div class="card">
                <div class="stat-label">Faculty Members</div>
                <div class="stat-value">84</div>
                <div class="text-sm text-muted">Full capacity</div>
            </div>
             <div class="card">
                <div class="stat-label">Avg. Attendance</div>
                <div class="stat-value">92%</div>
                <div class="text-sm text-success">↑ 2% this week</div>
            </div>
             <div class="card">
                <div class="stat-label">Revenue Collection</div>
                <div class="stat-value">$450k</div>
                <div class="text-sm text-warning">8% Pending</div>
            </div>
        </div>
        
        <div class="card">
            <div class="flex justify-between items-center" style="margin-bottom: 1rem;">
                <h3 class="text-xl">Recent Admissions</h3>
                <button class="text-primary text-sm" style="background:none; border:none; cursor:pointer;" onclick="navigate('admissions')">View All</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${state.students.map(s => `
                        <tr>
                            <td>#${s.id}</td>
                            <td>${s.name}</td>
                            <td>${s.course}</td>
                            <td><span style="padding: 2px 8px; background: #dcfce7; color: #166534; border-radius: 10px; font-size: 0.75rem;">${s.status}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderAdmissions(container) {
    container.innerHTML = `
         <div class="card">
            <div class="flex justify-between items-center" style="margin-bottom: 1rem;">
                <h3 class="text-xl">Student Directory</h3>
                <button class="btn btn-primary" style="width: auto;">+ New Admission</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Fees</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${state.students.map(s => `
                        <tr>
                            <td>#${s.id}</td>
                            <td>${s.name}</td>
                            <td>${s.course}</td>
                             <td>${s.fees === 'Paid' ? '✅ Paid' : '❌ Pending'}</td>
                            <td>${s.status}</td>
                            <td><button class="text-primary" style="background:none; border:none; cursor:pointer;">Edit</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Logic / Actions
window.handleLogin = function () {
    const email = document.getElementById('email').value;
    // Mock login
    state.user = {
        name: "Admin User",
        email: email,
        role: "Administrator"
    };
    state.currentView = 'dashboard';
    render();
}

window.handleLogout = function () {
    state.user = null;
    state.currentView = 'login';
    render();
}

window.navigate = function (view) {
    state.currentView = view;
    render();
}

// Utils
function normalizeTitle(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getDateString() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    render();
});
