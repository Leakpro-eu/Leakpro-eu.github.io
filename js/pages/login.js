Pages.Login = {
    render() {
        return `
            <div class="auth-page fade-in">
                <div class="glass-card auth-card">
                    <div class="brand">
                        <i data-lucide="shield-check" size="32"></i>
                        LeakPro
                    </div>
                    <h2 style="text-align: center; margin-bottom: 2rem;">Welcome Back</h2>
                    
                    <form id="login-form">
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" id="email" class="input-field" placeholder="admin@leakpro.com" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="password" class="input-field" placeholder="••••••••" required>
                        </div>
                        
                        <div id="login-error" style="color: var(--error); font-size: 0.875rem; margin-bottom: 1rem; text-align: center; display: none;"></div>

                        <button type="submit" class="btn btn-primary btn-block">
                            Login Access
                        </button>
                    </form>
                    
                    <p style="text-align: center; margin-top: 1.5rem; font-size: 0.875rem; color: var(--text-secondary);">
                        Don't have an account? <a href="#" style="color: var(--accent-primary);" onclick="App.navigate('register'); return false;">Register</a>
                    </p>
                </div>
            </div>
        `;
    },

    attachEvents() {
        const form = document.getElementById('login-form');
        const errorDiv = document.getElementById('login-error');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                State.login(email, password);
                if (State.currentUser.role === 'member') {
                    App.navigate('subscription');
                } else {
                    App.navigate('dashboard');
                }
            } catch (err) {
                errorDiv.textContent = err.message;
                errorDiv.style.display = 'block';
            }
        });
    }
};
