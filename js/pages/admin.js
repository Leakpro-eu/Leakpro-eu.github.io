Pages.Admin = {
    activeTab: 'users', // 'users' or 'posts'

    render() {
        return `
            <div class="dashboard-layout fade-in">
                ${Components.Sidebar()}
                <main class="main-content">
                    ${Components.Header('Admin Control Panel')}
                    
                    <div class="stats-row">
                        <div class="glass-card stat-card">
                            <div class="stat-label">Total Users</div>
                            <div class="stat-value">${State.users.length}</div>
                            <i data-lucide="users" color="var(--accent-primary)"></i>
                        </div>
                        <div class="glass-card stat-card">
                            <div class="stat-label">Premium Members</div>
                            <div class="stat-value">${State.users.filter(u => u.role === 'premium').length}</div>
                            <i data-lucide="award" color="var(--accent-secondary)"></i>
                        </div>
                        <div class="glass-card stat-card">
                            <div class="stat-label">Total Posts</div>
                            <div class="stat-value">${State.posts.length}</div>
                            <i data-lucide="file-text" color="#10b981"></i>
                        </div>
                        <div class="glass-card stat-card">
                            <div class="stat-label">Revenue (Mock)</div>
                            <div class="stat-value">$${State.users.filter(u => u.role === 'premium').length * 49}</div>
                            <i data-lucide="dollar-sign" color="#f59e0b"></i>
                        </div>
                    </div>

                    <div style="display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem;">
                        <button class="btn" style="background: ${this.activeTab === 'users' ? 'var(--accent-primary)' : 'transparent'}" onclick="Pages.Admin.setTab('users')">User Management</button>
                        <button class="btn" style="background: ${this.activeTab === 'posts' ? 'var(--accent-primary)' : 'transparent'}" onclick="Pages.Admin.setTab('posts')">Post Management</button>
                    </div>

                    ${this.activeTab === 'users' ? this.renderUsers() : this.renderPosts()}
                </main>

                <!-- Create Post Modal -->
                <div id="post-modal" class="modal-overlay">
                    <div class="glass-card modal-content" style="max-width: 600px;">
                        <h3>Create New Post</h3>
                        <form id="post-form" style="margin-top: 1.5rem;">
                            <div class="form-group">
                                <label>Title</label>
                                <input type="text" id="p-title" class="input-field" required>
                            </div>
                            <div class="form-group">
                                <label>Description</label>
                                <textarea id="p-desc" class="input-field" style="height: 100px; resize: none;" required></textarea>
                            </div>
                            <div class="form-group">
                                <label>Image URL</label>
                                <input type="url" id="p-image" class="input-field" required>
                            </div>
                            <div class="form-group">
                                <label>Category</label>
                                <input type="text" id="p-cat" class="input-field" placeholder="e.g. Resource" required>
                            </div>
                            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                                <button type="button" class="btn btn-block" style="background: var(--bg-input);" onclick="Pages.Admin.hidePostModal()">Cancel</button>
                                <button type="submit" class="btn btn-primary btn-block">Publish Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    },

    setTab(tab) {
        this.activeTab = tab;
        App.render();
    },

    renderUsers() {
        return `
            <div class="glass-card" style="padding: 0;">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${State.users.map(user => `
                            <tr>
                                <td>
                                    <div style="font-weight: 600;">${user.username}</div>
                                    <div style="font-size: 0.75rem; color: var(--text-muted);">${user.email}</div>
                                </td>
                                <td><span class="badge badge-${user.role}">${user.role}</span></td>
                                <td><span style="color: ${user.status === 'active' ? 'var(--success)' : 'var(--error)'}">${user.status}</span></td>
                                <td>${user.registrationDate}</td>
                                <td>
                                    <div style="display: flex; gap: 0.5rem;">
                                        <select class="input-field" style="padding: 0.25rem; font-size: 0.75rem; width: 100px;" onchange="State.updateUserRole(${user.id}, this.value); App.render();">
                                            <option value="member" ${user.role === 'member' ? 'selected' : ''}>Member</option>
                                            <option value="premium" ${user.role === 'premium' ? 'selected' : ''}>Premium</option>
                                            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                                        </select>
                                        <button class="btn" style="padding: 0.25rem 0.5rem; background: ${user.status === 'active' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'}; color: ${user.status === 'active' ? '#ef4444' : '#10b981'};" onclick="State.toggleUserStatus(${user.id}); App.render();">
                                            ${user.status === 'active' ? 'Ban' : 'Unban'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    renderPosts() {
        return `
            <div style="display: flex; justify-content: flex-end; margin-bottom: 1rem;">
                <button class="btn btn-primary" onclick="Pages.Admin.showPostModal()">
                    <i data-lucide="plus"></i> New Post
                </button>
            </div>
            <div class="glass-card" style="padding: 0;">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Post Title</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${State.posts.map(post => `
                            <tr>
                                <td style="font-weight: 600;">${post.title}</td>
                                <td><span class="badge" style="background: rgba(99, 102, 241, 0.1); color: var(--accent-primary);">${post.category}</span></td>
                                <td>${post.date}</td>
                                <td>
                                    <button class="btn" style="padding: 0.25rem 0.5rem; background: rgba(239, 68, 68, 0.1); color: #ef4444;" onclick="State.deletePost(${post.id}); App.render();">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    showPostModal() {
        document.getElementById('post-modal').style.display = 'flex';
    },

    hidePostModal() {
        document.getElementById('post-modal').style.display = 'none';
    },

    attachEvents() {
        const form = document.getElementById('post-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const postData = {
                title: document.getElementById('p-title').value,
                description: document.getElementById('p-desc').value,
                image: document.getElementById('p-image').value,
                category: document.getElementById('p-cat').value,
                link: '#'
            };
            State.addPost(postData);
            this.hidePostModal();
            App.render();
        });
    }
};
