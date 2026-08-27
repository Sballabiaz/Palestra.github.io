/**
 * Verticality Climbing Gym - JS Logic
 * Gestione esclusiva dell'accordion FAQ 
 */

document.addEventListener('DOMContentLoaded', () => {
    // Seleziona tutti i bottoni delle domande FAQ
    const faqButtons = document.querySelectorAll('.faq-question');

    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const icon = button.querySelector('.faq-icon');
            const isCurrentlyOpen = answer.style.display === 'block';

            // Chiude tutte le altre risposte aperte per mantenere l'interfaccia pulita
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.style.display = 'none';
            });

            // Ripristina tutte le icone a '+'
            document.querySelectorAll('.faq-icon').forEach(ic => {
                ic.textContent = '+';
            });

            // Ripristina attributo aria-expanded
            document.querySelectorAll('.faq-question').forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
            });

            // Se l'elemento cliccato non era già aperto, lo apre
            if (!isCurrentlyOpen) {
                answer.style.display = 'block';
                icon.textContent = '−'; // Simbolo meno
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });
});
