document.addEventListener('DOMContentLoaded', () => {
    // Carica il piano selezionato dall'URL (es: checkout.html?piano=mensile)
    const urlParams = new URLSearchParams(window.location.search);
    const planType = urlParams.get('piano') || 'singolo';

    const plans = {
        'singolo': { name: 'Ingresso Singolo', price: '€12' },
        'mensile': { name: 'Abbonamento Mensile', price: '€65' },
        'carnet': { name: 'Carnet 10 Ingressi', price: '€100' }
    };

    const currentPlan = plans[planType] || plans['singolo'];
    document.getElementById('selected-plan-name').textContent = currentPlan.name;
    document.getElementById('selected-plan-price').textContent = currentPlan.price;

    // Elementi DOM
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const authForms = document.getElementById('auth-forms');
    const userWelcome = document.getElementById('user-welcome');
    const loggedUserEmail = document.getElementById('logged-user-email');
    const btnLogout = document.getElementById('btn-logout');

    // Tab Switch
    tabLogin.addEventListener('click', () => {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        formLogin.classList.remove('hidden');
        formRegister.classList.add('hidden');
    });

    tabRegister.addEventListener('click', () => {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        formRegister.classList.remove('hidden');
        formLogin.classList.add('hidden');
    });

    // Controllo Sessione Utente Attivo
    function checkUserSession() {
        const currentUser = JSON.parse(localStorage.getItem('verticality_session'));
        if (currentUser) {
            authForms.classList.add('hidden');
            userWelcome.classList.remove('hidden');
            loggedUserEmail.textContent = currentUser.email;
        } else {
            authForms.classList.remove('hidden');
            userWelcome.classList.add('hidden');
        }
    }

    // Registrazione
    formRegister.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;

        let users = JSON.parse(localStorage.getItem('verticality_users')) || [];
        if (users.some(u => u.email === email)) {
            alert('Questa email risulta già registrata. Effettua l\'accesso.');
            return;
        }

        users.push({ email, password });
        localStorage.setItem('verticality_users', JSON.stringify(users));
        localStorage.setItem('verticality_session', JSON.stringify({ email }));

        checkUserSession();
    });

    // Login
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        let users = JSON.parse(localStorage.getItem('verticality_users')) || [];
        const userMatch = users.find(u => u.email === email && u.password === password);

        if (userMatch) {
            localStorage.setItem('verticality_session', JSON.stringify({ email }));
            checkUserSession();
        } else {
            alert('Credenziali errate o utente non registrato.');
        }
    });

    // Logout
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('verticality_session');
        checkUserSession();
    });

    //Gestione Pagamento
    const formPayment = document.getElementById('form-payment');
    const paymentSuccess = document.getElementById('payment-success');
    const authSection = document.getElementById('auth-section');
    const paymentSection = document.getElementById('payment-section');

    formPayment.addEventListener('submit', (e) => {
        e.preventDefault();
        const currentUser = localStorage.getItem('verticality_session');
        
        if (!currentUser) {
            alert('Effettua l\'accesso o registrati prima di completare il pagamento.');
            return;
        }

        // Simula la transazione riuscita
        authSection.classList.add('hidden');
        paymentSection.classList.add('hidden');
        paymentSuccess.classList.remove('hidden');
    });

    checkUserSession();
});