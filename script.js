// Скрипт для анимированных счётчиков
document.addEventListener('DOMContentLoaded', function() {
    
    // Находим все элементы со счётчиками
    const counters = document.querySelectorAll('.stat-number');
    
    // Если счётчиков нет — выходим
    if (!counters.length) return;
    
    // Функция для анимации одного счётчика
    function animateCounter(counter) {
        // Получаем целевое значение из атрибута data-target
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 секунды
        const step = 20; // обновляем каждые 20мс для плавности
        const steps = duration / step;
        const increment = target / steps;
        
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, step);
    }
    
    // Настройка Intersection Observer — запускает анимацию,
    // когда секция появляется в окне браузера
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Запускаем все счётчики внутри видимой секции
                const countersInView = entry.target.querySelectorAll('.stat-number');
                countersInView.forEach(counter => {
                    // Проверяем, не запускали ли уже анимацию для этого счётчика
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                });
                
                // Можно отключить observer после срабатывания, чтобы не тратить ресурсы
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }); // Срабатывает, когда видно 30% элемента
    
    // Наблюдаем за секцией about
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        observer.observe(aboutSection);
    } else {
        // Если секция не найдена по ID, пробуем найти по классу
        const aboutSectionByClass = document.querySelector('.about');
        if (aboutSectionByClass) {
            observer.observe(aboutSectionByClass);
        }
    }
    
    // Резервный вариант для очень старых браузеров
    // (запустить анимацию сразу без Intersection Observer)
    if (!window.IntersectionObserver) {
        counters.forEach(counter => {
            if (!counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        });
    }
});