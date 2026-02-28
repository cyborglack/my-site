// Скрипт для кнопки "Наверх"
document.addEventListener('DOMContentLoaded', function() {
    
    const backToTopButton = document.getElementById('back-to-top');
    
    // Если кнопки нет на странице — выходим
    if (!backToTopButton) return;
    
    // Функция для проверки прокрутки
    function toggleBackToTop() {
        if (window.scrollY > 300) { // Если прокрутили больше 300px
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
    
    // Слушаем событие прокрутки
    window.addEventListener('scroll', toggleBackToTop);
    
    // Обработчик клика по кнопке
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Плавная прокрутка наверх
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Проверяем позицию при загрузке страницы
    toggleBackToTop();
});