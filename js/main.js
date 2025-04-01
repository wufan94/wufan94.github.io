// 图片加载处理
function handleImageLoading() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    const heroOverlay = document.querySelector('.hero-overlay');
    const profileImage = document.querySelector('.profile-image');
    const imagesToLoad = [
        { url: 'images/background.gif', element: heroOverlay },
        { url: 'images/profile.png', element: profileImage }
    ];

    let loadedImages = 0;

    function preloadImage(imageData) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imageData.url;
            img.onload = () => {
                imageData.element.classList.add('loaded');
                loadedImages++;
                if (loadedImages === imagesToLoad.length) {
                    loadingOverlay.classList.add('hidden');
                }
                resolve();
            };
            img.onerror = reject;
        });
    }

    // 预加载所有图片
    Promise.all(imagesToLoad.map(preloadImage))
        .catch(error => {
            console.error('Error loading images:', error);
            loadingOverlay.classList.add('hidden');
        });
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
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.7)';
        navbar.style.backdropFilter = 'blur(5px)';
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
    handleImageLoading();
    
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
        title: 'Project 1',
        description: '项目描述...',
        image: 'images/project1.jpg',
        category: 'Design'
    },
    {
        title: 'Project 2',
        description: '项目描述...',
        image: 'images/project2.jpg',
        category: 'Research'
    },
    {
        title: 'Project 3',
        description: '项目描述...',
        image: 'images/project3.jpg',
        category: 'Development'
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