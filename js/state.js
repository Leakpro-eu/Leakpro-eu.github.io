const State = {
    currentUser: null,
    users: [
        {
            id: 1,
            username: 'admin',
            email: 'admin@leakpro.com',
            password: 'password123',
            role: 'admin',
            registrationDate: '2023-01-01',
            subscriptionStatus: 'active',
            status: 'active'
        },
        {
            id: 2,
            username: 'premium_user',
            email: 'premium@example.com',
            password: 'password123',
            role: 'premium',
            registrationDate: '2023-05-15',
            subscriptionStatus: 'active',
            status: 'active'
        },
        {
            id: 3,
            username: 'regular_member',
            email: 'member@example.com',
            password: 'password123',
            role: 'member',
            registrationDate: '2023-11-20',
            subscriptionStatus: 'inactive',
            status: 'active'
        }
    ],
    posts: [
        {
            id: 1,
            title: 'Exclusive Content Release v1.0',
            description: 'This is a premium post available only to our elite members. It contains high-value resources and insights into the latest leaks and information.',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
            link: 'https://example.com/leak1',
            category: 'Resource',
            date: '2023-12-28 14:30'
        },
        {
            id: 2,
            title: 'Deep Web Analysis: Report #22',
            description: 'Our latest research into hidden networks and data patterns. Essential reading for all premium security researchers.',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800',
            link: 'https://example.com/leak2',
            category: 'Analysis',
            date: '2023-12-30 09:15'
        },
        {
            id: 3,
            title: 'Infrastructure Vulnerabilities Found',
            description: 'A comprehensive list of findings from the recent audit of major cloud providers. Direct download links included.',
            image: 'https://images.unsplash.com/photo-1614064641935-3bb7518b2c5f?auto=format&fit=crop&q=80&w=800',
            link: 'https://example.com/leak3',
            category: 'Audit',
            date: '2023-12-31 03:00'
        }
    ],

    // Actions
    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            if (user.status === 'banned') throw new Error('Your account has been banned.');
            this.currentUser = { ...user };
            return this.currentUser;
        }
        throw new Error('Invalid email or password.');
    },

    register(username, email, password) {
        if (this.users.find(u => u.email === email)) throw new Error('Email already registered.');
        const newUser = {
            id: this.users.length + 1,
            username,
            email,
            password,
            role: 'member',
            registrationDate: new Date().toISOString().split('T')[0],
            subscriptionStatus: 'inactive',
            status: 'active'
        };
        this.users.push(newUser);
        return newUser;
    },

    logout() {
        this.currentUser = null;
    },

    upgradeToPremium() {
        if (!this.currentUser) return;
        const user = this.users.find(u => u.id === this.currentUser.id);
        user.role = 'premium';
        user.subscriptionStatus = 'active';
        this.currentUser = { ...user };
    },

    addPost(postData) {
        const newPost = {
            id: this.posts.length + 1,
            ...postData,
            date: new Date().toLocaleString()
        };
        this.posts.unshift(newPost);
    },

    deletePost(id) {
        this.posts = this.posts.filter(p => p.id !== id);
    },

    updateUserRole(userId, newRole) {
        const user = this.users.find(u => u.id === userId);
        if (user) user.role = newRole;
    },

    toggleUserStatus(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.status = user.status === 'active' ? 'banned' : 'active';
        }
    }
};
