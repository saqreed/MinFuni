(function () {
    // Курсор и анимация при наведении на ссылки
    const links = document.querySelectorAll('nav > .link');
    const cursor = document.querySelector('.cursor');
  
    const animateLink = function (e) {
      const span = this.querySelector('span');
      const { offsetX: x, offsetY: y } = e,
        { offsetWidth: width, offsetHeight: height } = this,
        move = 25,
        xMove = (x / width) * (move * 2) - move,
        yMove = (y / height) * (move * 2) - move;
  
      span.style.transform = `translate(${xMove}px, ${yMove}px)`;
  
      if (e.type === 'mouseleave') span.style.transform = '';
    };
  
    const moveCursor = e => {
      const { clientX: x, clientY: y } = e;
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
    };
  
    links.forEach(link => {
      link.addEventListener('mousemove', animateLink);
      link.addEventListener('mouseleave', animateLink);
    });
    window.addEventListener('mousemove', moveCursor);
  
    // Плавная прокрутка к секциям
    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
      });
    });
  
    // Плавное появление секций и галерей
    document.addEventListener('DOMContentLoaded', () => {
      const sections = document.querySelectorAll('.section');
      const gallery = document.getElementById('gallery');
      const productData = {
        chairs: [
          { model: 'Elegant Chair', price: '$120', image: 'chair1.jpg' },
          { model: 'Luxury Recliner', price: '$250', image: 'chair2.jpg' },
          { model: 'Modern Seat', price: '$180', image: 'chair3.jpg' },
        ],
        tables: [
          { model: 'Wooden Table', price: '$300', image: 'table1.jpg' },
          { model: 'Glass Table', price: '$400', image: 'table2.jpg' },
          { model: 'Minimal Table', price: '$350', image: 'table3.jpg' },
        ],
        cabinets: [
          { model: 'Storage Cabinet', price: '$200', image: 'cabinet1.jpg' },
          { model: 'Compact Shelf', price: '$150', image: 'cabinet2.jpg' },
          { model: 'Elegant Shelf', price: '$220', image: 'cabinet3.jpg' },
        ],
      };
  
      // Наблюдатель для плавного появления секций
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );
  
      sections.forEach(section => observer.observe(section));
  
      // Обработка категорий
      const loadGallery = category => {
        const products = productData[category];
        gallery.classList.remove('visible'); // Скрываем старую галерею
        setTimeout(() => {
          gallery.innerHTML = products
            .map(
              product => `
            <div class="product-item">
              <img src="${product.image}" alt="${product.model}">
              <h3>${product.model}</h3>
              <p>${product.price}</p>
            </div>`
            )
            .join('');
          gallery.classList.add('visible'); // Показываем новую галерею
        }, 300);
      };
  
      document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', () => {
          const category = button.dataset.category;
          loadGallery(category);
        });
      });
    });
  })();
  