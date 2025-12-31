const Pages = {};

const State = {
    currentUser: null,
    users: [],
    posts: [],

    // Initialization
    init() {
        const savedUsers = localStorage.getItem('leakpro_users');
        const savedPosts = localStorage.getItem('leakpro_posts');
        const savedSession = localStorage.getItem('leakpro_session');

        if (savedUsers) {
            this.users = JSON.parse(savedUsers);
        } else {
            // Default users if first time
            this.users = [
                { id: 1, username: 'admin', email: 'admin@leakpro.com', password: 'password123', role: 'admin', registrationDate: '2023-01-01', subscriptionStatus: 'active', status: 'active' },
                { id: 2, username: 'premium_user', email: 'premium@example.com', password: 'password123', role: 'premium', registrationDate: '2023-05-15', subscriptionStatus: 'active', status: 'active' },
                { id: 3, username: 'regular_member', email: 'member@example.com', password: 'password123', role: 'member', registrationDate: '2023-11-20', subscriptionStatus: 'inactive', status: 'active' }
            ];
            this.save();
        }

        if (savedPosts) {
            this.posts = JSON.parse(savedPosts);
        } else {
            // Default posts if first time
            this.posts = [
                { id: 1, title: 'Exclusive Content Release v1.0', description: 'This is a premium post available only to our elite members.', link: 'https://mega.nz/file/leak1', category: 'Resource', date: '2023-12-28 14:30' },
                { id: 2, title: 'Deep Web Analysis: Report #22', description: 'Our latest research into hidden networks.', link: 'https://pastebin.com/raw/leak2', category: 'Analysis', date: '2023-12-30 09:15' }
            ];
            this.save();
        }

        if (savedSession) {
            this.currentUser = JSON.parse(savedSession);
        }
    },

    save() {
        localStorage.setItem('leakpro_users', JSON.stringify(this.users));
        localStorage.setItem('leakpro_posts', JSON.stringify(this.posts));
        if (this.currentUser) {
            localStorage.setItem('leakpro_session', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('leakpro_session');
        }
    },

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            if (user.status === 'banned') throw new Error('Your account has been banned.');
            this.currentUser = { ...user };
            this.save();
            return this.currentUser;
        }
        throw new Error('Invalid email or password.');
    },

    register(username, email, password) {
        if (this.users.find(u => u.email === email)) throw new Error('Email already registered.');
        const newUser = {
            id: Date.now(), // Better unique ID
            username,
            email,
            password,
            role: 'member',
            registrationDate: new Date().toISOString().split('T')[0],
            subscriptionStatus: 'inactive',
            status: 'active'
        };
        this.users.push(newUser);
        this.save();
        return newUser;
    },

    logout() {
        this.currentUser = null;
        this.save();
    },

    upgradeToPremium() {
        if (!this.currentUser) return;
        const user = this.users.find(u => u.id === this.currentUser.id);
        if (user) {
            user.role = 'premium';
            user.subscriptionStatus = 'active';
            this.currentUser = { ...user };
            this.save();
        }
    },

    addPost(postData) {
        const newPost = {
            id: Date.now(),
            ...postData,
            date: new Date().toLocaleString()
        };
        this.posts.unshift(newPost);
        this.save();
    },

    deletePost(id) {
        this.posts = this.posts.filter(p => p.id !== id);
        this.save();
    },

    updateUserRole(userId, newRole) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.role = newRole;
            // If the updated user is the current user, update session too
            if (this.currentUser && this.currentUser.id === userId) {
                this.currentUser.role = newRole;
            }
            this.save();
        }
    },

    toggleUserStatus(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.status = user.status === 'active' ? 'banned' : 'active';
            this.save();
        }
    }
};

// Initialize state immediately
State.init();
