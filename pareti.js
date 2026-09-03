
document.addEventListener('DOMContentLoaded', () => {
    // Effetto base sulle schede delle pareti al passaggio del mouse
    const wallCards = document.querySelectorAll('.wall-card');

    wallCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'var(--accent-orange)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'var(--border-color)';
        });
    });
});