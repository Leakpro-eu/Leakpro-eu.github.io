Pages.Register = {
    render() {
        return `
            <div class="auth-page fade-in">
                <div class="glass-card auth-card">
                    <div class="brand">
                        <i data-lucide="shield-check" size="32"></i>
                        LeakPro
                    </div>
                    <h2 style="text-align: center; margin-bottom: 2rem;">Create Account</h2>
                    
                    <form id="register-form">
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" id="reg-username" class="input-field" placeholder="CoolHacker" required>
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" id="reg-email" class="input-field" placeholder="user@example.com" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="reg-password" class="input-field" placeholder="Min 8 characters" minlength="8" required>
                        </div>
                        
                        <div id="register-error" style="color: var(--error); font-size: 0.875rem; margin-bottom: 1rem; text-align: center; display: none;"></div>

                        <button type="submit" class="btn btn-primary btn-block">
                            Register Now
                        </button>
                    </form>
                    
                    <p style="text-align: center; margin-top: 1.5rem; font-size: 0.875rem; color: var(--text-secondary);">
                        Already have an account? <a href="#" style="color: var(--accent-primary);" onclick="App.navigate('login'); return false;">Login</a>
                    </p>
                </div>
            </div>
        `;
    },

    attachEvents() {
        const form = document.getElementById('register-form');
        const errorDiv = document.getElementById('register-error');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('reg-username').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;

            // Password validation
            if (!/[0-9]/.test(password) || !/[a-zA-Z]/.test(password)) {
                Components.Toast('Password must include both letters and numbers.', 'error');
                return;
            }

            try {
                State.register(username, email, password);
                Components.Toast('Account created successfully! Please login.');
                App.navigate('login');
            } catch (err) {
                Components.Toast(err.message, 'error');
            }
        });
    }
};
