Pages.Dashboard = {
    render() {
        const posts = State.posts;

        return `
            <div class="dashboard-layout fade-in">
                ${Components.Sidebar()}
                <main class="main-content">
                    ${Components.Header('Premium Dashboard')}
                    
                    <div style="margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center;">
                        <div style="position: relative; width: 300px;">
                            <i data-lucide="search" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);" size="18"></i>
                            <input type="text" class="input-field" placeholder="Search leaks..." style="padding-left: 3rem;">
                        </div>
                        <div style="display: flex; gap: 1rem;">
                            <select class="input-field" style="width: 150px;">
                                <option>All Categories</option>
                                <option>Resources</option>
                                <option>Analysis</option>
                                <option>Audits</option>
                            </select>
                        </div>
                    </div>

                    <div class="posts-grid">
                        ${posts.map(post => Components.PostCard(post)).join('')}
                    </div>

                    ${posts.length === 0 ? `
                        <div style="text-align: center; padding: 5rem; color: var(--text-muted);">
                            <i data-lucide="inbox" size="64" style="margin-bottom: 1rem; opacity: 0.3;"></i>
                            <p>No posts available yet. Check back later!</p>
                        </div>
                    ` : ''}
                </main>
            </div>
        `;
    },

    attachEvents() {
        // Search and filter logic could go here
    }
};
