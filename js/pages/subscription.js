Pages.Subscription = {
    render() {
        const user = State.currentUser;
        const isMember = user?.role === 'member';

        return `
            <div class="dashboard-layout fade-in">
                ${Components.Sidebar()}
                <main class="main-content">
                    ${Components.Header('Subscription')}
                    
                    <div style="max-width: 800px; margin: 0 auto;">
                        <div class="glass-card" style="text-align: center; margin-bottom: 3rem;">
                            <h2 style="font-size: 2rem; margin-bottom: 1rem;">Unlock Premium Access</h2>
                            <p style="color: var(--text-secondary);">Unlock exclusive content by purchasing a subscription. After payment, a ticket will be required on Discord for validation by an administrator.</p>
                        </div>

                        <div class="pricing-grid">
                            <div class="glass-card pricing-card fade-in" style="border: 2px solid ${isMember ? 'var(--accent-primary)' : 'var(--border)'}">
                                <h3>ESTATE PLAN</h3>
                                <div class="price">$49<span>/month</span></div>
                                <ul style="list-style: none; text-align: left; margin: 2rem 0; color: var(--text-secondary);">
                                    <li style="margin-bottom: 0.75rem;"><i data-lucide="check" size="16" color="#10b981"></i> Access to all 500+ leaks</li>
                                    <li style="margin-bottom: 0.75rem;"><i data-lucide="check" size="16" color="#10b981"></i> Weekly fresh content</li>
                                    <li style="margin-bottom: 0.75rem;"><i data-lucide="check" size="16" color="#10b981"></i> Private Discord access</li>
                                    <li style="margin-bottom: 0.75rem;"><i data-lucide="check" size="16" color="#10b981"></i> 24/7 Priority support</li>
                                </ul>
                                
                                ${isMember ? `
                                    <button class="btn btn-primary btn-block" onclick="Pages.Subscription.showPayment()">
                                        Upgrade Now
                                    </button>
                                ` : `
                                    <div style="color: var(--success); font-weight: 600;">
                                        <i data-lucide="check-circle"></i> Already Active
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>

                    <!-- Payment Modal -->
                    <div id="payment-modal" class="modal-overlay">
                        <div class="glass-card modal-content fade-in">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                                <h3>Complete Payment</h3>
                                <button onclick="Pages.Subscription.hidePayment()" style="background: none; border: none; color: white; cursor: pointer;">
                                    <i data-lucide="x"></i>
                                </button>
                            </div>
                            
                            <form id="payment-form">
                                <div class="form-group">
                                    <label>Cardholder Name</label>
                                    <input type="text" class="input-field" value="${user?.username}" required>
                                </div>
                                <div class="form-group">
                                    <label>Card Number</label>
                                    <input type="text" class="input-field" placeholder="xxxx xxxx xxxx xxxx" required>
                                </div>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                    <div class="form-group">
                                        <label>Expiry Date</label>
                                        <input type="text" class="input-field" placeholder="MM/YY" required>
                                    </div>
                                    <div class="form-group">
                                        <label>CVV</label>
                                        <input type="password" class="input-field" placeholder="•••" maxlength="3" required>
                                    </div>
                                </div>
                                
                                <button type="submit" id="pay-btn" class="btn btn-primary btn-block" style="margin-top: 1rem;">
                                    Pay $49.00
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        `;
    },

    showPayment() {
        document.getElementById('payment-modal').style.display = 'flex';
        lucide.createIcons();
    },

    hidePayment() {
        document.getElementById('payment-modal').style.display = 'none';
    },

    attachEvents() {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('pay-btn');
            btn.textContent = 'Processing...';
            btn.disabled = true;

            setTimeout(() => {
                Components.Toast('Payment received! Please open a ticket on Discord for admin validation.');
                Pages.Subscription.hidePayment();
                // We no longer auto-upgrade here, admin must do it in panel
            }, 1500);
        });
    }
};
