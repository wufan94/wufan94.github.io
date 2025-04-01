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
    const profileImage = document.querySelector('.profile-image');
    const aboutContent = document.querySelector('.about-content');
    
    // 导航栏效果
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 11, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(10, 11, 26, 0.7)';
        navbar.style.backdropFilter = 'blur(5px)';
    }
    
    // 个人照片悬浮效果
    if (profileImage) {
        const scrolled = window.scrollY;
        const rate = Math.min(scrolled * 0.1, 100);
        profileImage.style.transform = `translateX(-50%) translateY(${rate}px)`;
    }
    
    // 内容渐入效果
    const elements = document.querySelectorAll('.skill-category, .interests-content, .contact-content');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// 初始化动画
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.skill-category, .interests-content, .contact-content');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});

// 项目数据
const projects = [
    {
        title: '项目一',
        description: '项目描述...',
        image: 'images/project1.jpg',
        link: '#'
    },
    {
        title: '项目二',
        description: '项目描述...',
        image: 'images/project2.jpg',
        link: '#'
    },
    // 添加更多项目...
];

// 动态加载项目
function loadProjects() {
    const projectGrid = document.querySelector('.project-grid');
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" class="project-link">查看详情</a>
        `;
        projectGrid.appendChild(projectCard);
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
}); 