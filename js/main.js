// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 立即隐藏加载指示器
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.classList.add('hidden');

    // 初始化粒子动画
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 250,
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
                anim: {
                    enable: true,
                    speed: 0.5,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 2,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    size_min: 0.5,
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
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'window',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: false
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                }
            }
        },
        retina_detect: true
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

// 项目数据
const projects = [
    {
        title: "Smart Manufacturing Platform",
        description: "Revolutionizing industrial processes through IoT and AI integration",
        category: "Industrial Innovation",
        image: "project1.jpg",
        link: "project-1.html"
    },
    {
        title: "Healthcare Innovation Hub",
        description: "Advanced medical solutions powered by cutting-edge technology",
        category: "Healthcare",
        image: "project2.jpg",
        link: "project-2.html"
    },
    {
        title: "Sustainable Design Initiative",
        description: "Eco-friendly innovation for a better future",
        category: "Sustainability",
        image: "project3.jpg",
        link: "project-3.html"
    }
];

// 加载项目卡片
function loadProjects() {
    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) return;

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        card.innerHTML = `
            <a href="${project.link}" style="text-decoration: none; color: inherit;">
                <img src="images/${project.image}" alt="${project.title}">
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
