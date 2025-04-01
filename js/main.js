// 图片加载处理
function handleImageLoading() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    const heroOverlay = document.querySelector('.hero-overlay');
    const profileImage = document.querySelector('.profile-image');
    
    // 立即隐藏加载遮罩
    loadingOverlay.classList.add('hidden');
    
    // 延迟加载图片
    setTimeout(() => {
        // 加载背景图
        const bgImg = new Image();
        bgImg.src = 'images/background.gif';
        bgImg.onload = () => {
            heroOverlay.classList.add('loaded');
        };
        
        // 加载个人照片
        const img = profileImage.querySelector('img');
        
        if (img.complete) {
            profileImage.classList.add('loaded');
        } else {
            img.onload = () => profileImage.classList.add('loaded');
        }
    }, 100);
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    // 导航栏效果
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.classList.add('scrolled');
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.7)';
        navbar.style.backdropFilter = 'blur(5px)';
        navbar.classList.remove('scrolled');
    }
    
    // 内容渐入效果
    const elements = document.querySelectorAll('.project-card, .about-content');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 立即隐藏加载指示器
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.classList.add('hidden');

    // 延迟加载图片
    setTimeout(() => {
        // 加载背景图
        const heroOverlay = document.querySelector('.hero-overlay');
        heroOverlay.classList.add('loaded');

        // 加载个人照片
        const profileImage = document.querySelector('.profile-image');
        const img = profileImage.querySelector('img');
        
        if (img.complete) {
            profileImage.classList.add('loaded');
        } else {
            img.onload = () => profileImage.classList.add('loaded');
        }
    }, 100);

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const elements = document.querySelectorAll('.project-card, .about-content');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});

// 示例项目数据
const projects = [
    {
        title: 'High-Precision 3D Foot Scanning',
        description: 'An innovative system utilizing advanced 3D scanning technology to create precise digital models of feet. This solution combines multiple sensors and AI algorithms to capture detailed foot measurements, enabling perfect fit customization for footwear design and medical applications.',
        image: 'images/project1.jpg',
        category: 'Technology'
    },
    {
        title: '3D Printed Footwear Design',
        description: 'Revolutionary footwear design project leveraging 3D printing technology to create customized, ergonomic shoes. The process integrates personalized foot scan data with parametric design algorithms to produce comfortable, stylish, and perfectly fitted footwear.',
        image: 'images/project2.jpg',
        category: 'Design'
    },
    {
        title: 'AR Glasses Design',
        description: 'Cutting-edge augmented reality glasses design that seamlessly blends technology with fashion. Features include an ultra-lightweight frame, advanced optical system, and intuitive user interface, creating an immersive AR experience while maintaining aesthetic appeal.',
        image: 'images/project3.jpg',
        category: 'Innovation'
    }
];

// 加载项目
function loadProjects() {
    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) return;

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <span class="project-category">${project.category}</span>
            </div>
        `;
        projectGrid.appendChild(projectCard);
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
}); 