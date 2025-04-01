// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 立即隐藏加载指示器
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.classList.add('hidden');

    // 视频加载和播放控制
    const video = document.querySelector('.background-video');
    if (video) {
        // 设置视频源
        video.src = 'images/background.mp4';
        
        // 确保视频加载完成后播放
        video.addEventListener('canplay', () => {
            video.play().catch(error => {
                console.log('Video autoplay failed:', error);
                // 如果自动播放失败，添加一个点击事件来手动播放
                document.addEventListener('click', () => {
                    video.play();
                }, { once: true });
            });
        });

        // 如果视频已经加载完成，直接尝试播放
        if (video.readyState >= 3) {
            video.play().catch(error => {
                console.log('Video autoplay failed:', error);
            });
        }
    }

    // 加载个人照片
    const profileImage = document.querySelector('.profile-image');
    const img = profileImage.querySelector('img');
    
    if (img.complete) {
        profileImage.classList.add('loaded');
    } else {
        img.onload = () => profileImage.classList.add('loaded');
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

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.7)';
            navbar.style.backdropFilter = 'blur(5px)';
        }
    });

    // 加载项目
    loadProjects();

    // 监听滚动以触发项目卡片动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // 观察所有项目卡片
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
});

// 示例项目数据
const projects = [
    {
        title: 'High-Precision 3D Foot Scanning',
        description: 'An innovative system utilizing advanced 3D scanning technology to create precise digital models of feet. This solution combines multiple sensors and AI algorithms to capture detailed foot measurements, enabling perfect fit customization for footwear design and medical applications.',
        image: 'images/project1.webp',
        category: 'Technology'
    },
    {
        title: '3D Printed Footwear Design',
        description: 'Revolutionary footwear design project leveraging 3D printing technology to create customized, ergonomic shoes. The process integrates personalized foot scan data with parametric design algorithms to produce comfortable, stylish, and perfectly fitted footwear.',
        image: 'images/project2.webp',
        category: 'Design'
    },
    {
        title: 'AR Glasses Design',
        description: 'Cutting-edge augmented reality glasses design that seamlessly blends technology with fashion. Features include an ultra-lightweight frame, advanced optical system, and intuitive user interface, creating an immersive AR experience while maintaining aesthetic appeal.',
        image: 'images/project3.webp',
        category: 'Innovation'
    }
];

// 加载项目
function loadProjects() {
    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) return;

    projectGrid.innerHTML = ''; // 清空现有内容

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

    // 添加渐入动画
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200);
        });
    }, 100);
}
