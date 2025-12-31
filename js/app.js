const App = {
    currentView: 'login',

    init() {
        this.render();
        window.addEventListener('popstate', () => this.handleRouting());
    },

    navigate(view) {
        this.currentView = view;
        this.render();
        // Minimal routing simulation
        window.history.pushState({ view }, view, `#${view}`);
    },

    handleRouting() {
        const hash = window.location.hash.replace('#', '') || 'login';
        this.currentView = hash;
        this.render();
    },

    render() {
        const appDiv = document.getElementById('app');

        // Auth check - if not logged in, can only see login/register
        if (!State.currentUser && !['login', 'register'].includes(this.currentView)) {
            this.currentView = 'login';
        }

        // If logged in as member, cannot see dashboard (only subscription/settings)
        if (State.currentUser && State.currentUser.role === 'member' && this.currentView === 'dashboard') {
            this.currentView = 'subscription';
        }

        switch (this.currentView) {
            case 'login':
                appDiv.innerHTML = Pages.Login.render();
                Pages.Login.attachEvents();
                break;
            case 'register':
                appDiv.innerHTML = Pages.Register.render();
                Pages.Register.attachEvents();
                break;
            case 'dashboard':
                appDiv.innerHTML = Pages.Dashboard.render();
                Pages.Dashboard.attachEvents();
                break;
            case 'subscription':
                appDiv.innerHTML = Pages.Subscription.render();
                Pages.Subscription.attachEvents();
                break;
            case 'admin':
                if (State.currentUser?.role !== 'admin') {
                    this.navigate('dashboard');
                    return;
                }
                appDiv.innerHTML = Pages.Admin.render();
                Pages.Admin.attachEvents();
                break;
            default:
                appDiv.innerHTML = '<h1>404 Not Found</h1>';
        }

        // Initialize Lucide icons after rendering
        lucide.createIcons();
    }
};

// Start App when everything is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Helper for global pages object
const Pages = {};
