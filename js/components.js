const Components = {
    Sidebar() {
        const user = State.currentUser;
        const isAdmin = user?.role === 'admin';
        const isPremium = user?.role === 'premium' || isAdmin;

        return `
            <aside class="sidebar">
                <div class="brand">
                    <i data-lucide="shield-check"></i>
                    LeakPro
                </div>
                <ul class="nav-links">
                    ${isPremium ? `
                        <li><a href="#" class="nav-link ${App.currentView === 'dashboard' ? 'active' : ''}" onclick="App.navigate('dashboard'); return false;">
                            <i data-lucide="layout-dashboard"></i> Dashboard
                        </a></li>
                    ` : ''}
                    
                    ${user?.role === 'member' ? `
                        <li><a href="https://discord.gg/leakpro" target="_blank" class="nav-link" style="color: var(--accent-secondary);">
                            <i data-lucide="message-square"></i> Open Ticket
                        </a></li>
                    ` : ''}

                    ${isAdmin ? `
                        <li><a href="#" class="nav-link ${App.currentView === 'admin' ? 'active' : ''}" onclick="App.navigate('admin'); return false;">
                            <i data-lucide="settings"></i> Admin Panel
                        </a></li>
                    ` : ''}

                    <li><a href="#" class="nav-link ${App.currentView === 'subscription' ? 'active' : ''}" onclick="App.navigate('subscription'); return false;">
                        <i data-lucide="credit-card"></i> Subscription
                    </a></li>
                    
                    <li><a href="#" class="nav-link">
                        <i data-lucide="user"></i> My Account
                    </a></li>
                </ul>
                
                <div style="margin-top: auto;">
                    <button class="btn btn-block" style="background: rgba(239, 68, 68, 0.1); color: #ef4444;" onclick="State.logout(); App.navigate('login');">
                        <i data-lucide="log-out"></i> Logout
                    </button>
                </div>
            </aside>
        `;
    },

    Header(title) {
        const user = State.currentUser;
        return `
            <header class="header">
                <h2>${title}</h2>
                <div class="user-badge">
                    <div class="avatar">${user?.username[0].toUpperCase()}</div>
                    <div>
                        <div style="font-size: 0.875rem; font-weight: 600;">${user?.username}</div>
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">${user?.role.toUpperCase()}</div>
                    </div>
                </div>
            </header>
        `;
    },

    PostCard(post) {
        return `
            <div class="glass-card post-card fade-in">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div class="badge" style="background: rgba(99, 102, 241, 0.1); color: var(--accent-primary);">
                        ${post.category}
                    </div>
                    <span style="font-size: 0.75rem; color: var(--text-muted);"><i data-lucide="calendar" size="12"></i> ${post.date.split(' ')[0]}</span>
                </div>
                <h3 style="margin-bottom: 1rem;">${post.title}</h3>
                <p style="margin-bottom: 2rem; min-height: 4.5em;">${post.description}</p>
                <div class="post-meta" style="border: none; padding-top: 0;">
                    <a href="${post.link}" target="_blank" class="btn btn-primary btn-block" style="text-decoration: none;">
                        <i data-lucide="external-link" size="16"></i> Access Source
                    </a>
                </div>
            </div>
        `;
    },

    Toast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `glass fade-in`;
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 1rem;
            border-left: 4px solid ${type === 'success' ? 'var(--success)' : 'var(--error)'};
            color: white;
            box-shadow: var(--shadow-xl);
        `;
        toast.innerHTML = `
            <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        lucide.createIcons();
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            toast.style.transition = 'all 0.5s ease';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
};

