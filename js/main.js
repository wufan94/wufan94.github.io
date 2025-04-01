// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 要加载的图片列表
    const imagesToLoad = [
        'images/background.gif',
        'images/logo.png',
        'images/profile.webp',
        'images/profile2.webp',
        'images/project1.webp',
        'images/project2.webp',
        'images/project3.webp'
    ];

    let loadedImages = 0;
    const totalImages = imagesToLoad.length;
    const loadingOverlay = document.querySelector('.loading-overlay');

    // 预加载所有图片
    imagesToLoad.forEach(src => {
        const img = new Image();
        img.onload = () => {
            loadedImages++;
            if (loadedImages === totalImages) {
                // 所有图片加载完成后
                if (loadingOverlay) {
                    loadingOverlay.style.opacity = '0';
                    setTimeout(() => {
                        loadingOverlay.style.display = 'none';
                        // 初始化项目展示
                        loadProjects();
                        // 初始化粒子动画
                        initParticles();
                    }, 500);
                }
            }
        };
        img.onerror = () => {
            console.error('Error loading image:', src);
            loadedImages++;
        };
        img.src = src;
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 监听滚动事件
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 添加淡入效果
        document.querySelectorAll('.fade-in').forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = elementTop < window.innerHeight && elementBottom >= 0;
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    });

    // 视频加载和播放控制
    const video = document.querySelector('.background-video');
    if (video) {
        // 强制加载视频
        video.load();
        
        // 尝试播放
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Video started playing');
            }).catch(error => {
                console.log('Video autoplay failed:', error);
                // 如果自动播放失败，添加一个点击事件来手动播放
                document.addEventListener('click', () => {
                    video.play();
                }, { once: true });
            });
        }
    }

    // 加载个人照片
    document.querySelectorAll('.profile-image').forEach(profileImage => {
        const img = profileImage.querySelector('img');
        if (img) {
            if (img.complete) {
                profileImage.classList.add('loaded');
            } else {
                img.onload = () => profileImage.classList.add('loaded');
            }
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

// 项目数据
const projects = [
    {
        title: "Smart Manufacturing Platform",
        description: "Revolutionizing industrial processes through IoT and AI integration",
        category: "Industrial Innovation",
        image: "project1.webp",
        link: "project-1.html"
    },
    {
        title: "Healthcare Innovation Hub",
        description: "Advanced medical solutions powered by cutting-edge technology",
        category: "Healthcare",
        image: "project2.webp",
        link: "project-2.html"
    },
    {
        title: "Sustainable Design Initiative",
        description: "Eco-friendly innovation for a better future",
        category: "Sustainability",
        image: "project3.webp",
        link: "project-3.html"
    }
];

// 加载项目卡片
function loadProjects() {
    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) return;

    // 清空现有内容，防止重复
    projectGrid.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        card.innerHTML = `
            <a href="${project.link}" style="text-decoration: none; color: inherit;">
                <img src="images/${project.image}" alt="${project.title}" class="project-image">
                <div class="project-card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <span class="project-category">${project.category}</span>
                </div>
            </a>
        `;
        
        projectGrid.appendChild(card);
        
        // 添加延迟以创建动画效果
        setTimeout(() => {
            card.classList.add('visible');
        }, 100);
    });
}

// 初始化粒子动画
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'bubble'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    bubble: {
                        distance: 100,
                        size: 4,
                        duration: 2,
                        opacity: 0.8,
                        speed: 3
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}
