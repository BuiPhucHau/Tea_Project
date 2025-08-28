// Load header
fetch("./layouts/header.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("header-placeholder").innerHTML = data;
        setActiveMenu();
    });

// Load footer
fetch("./layouts/footer.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;
    });

// Hàm tự động set active menu
function setActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    switch (currentPage) {
        case 'index.html':
        case '':
            document.querySelector('.nav-home')?.classList.add('active');
            break;
        case 'about.html':
            document.querySelector('.nav-about')?.classList.add('active');
            break;
        case 'products.html':
            document.querySelector('.nav-products')?.classList.add('active');
            break;
        case 'research.html':
            document.querySelector('.nav-research')?.classList.add('active');
            break;
        case 'news.html':
            document.querySelector('.nav-news')?.classList.add('active');
            break;
        case 'contact.html':
            document.querySelector('.nav-contact')?.classList.add('active');
            break;
        default:
            document.querySelector('.nav-home')?.classList.add('active');
    }
}

// Hàm để reset và kích hoạt animation
function resetAndStartAnimation() {
    // Reset tất cả animation trước
    const allAnimatedElements = document.querySelectorAll('.swiper-slide .text1, .swiper-slide .text2');
    allAnimatedElements.forEach(el => {
        el.classList.remove('fadeInUp', 'fadeInDown', 'animated');
        el.style.opacity = '0';
        el.style.transform = '';
    });

    // Kích hoạt animation cho slide active
    const activeSlide = document.querySelector('.swiper-slide-active');
    if (activeSlide) {
        const elementsToAnimate = activeSlide.querySelectorAll('.text1, .text2');
        
        elementsToAnimate.forEach((el, index) => {
            // Đặt lại opacity về 0 trước khi animation
            el.style.opacity = '0';
            
            setTimeout(() => {
                // Thêm class animation dựa trên class của element
                if (el.classList.contains('text1')) {
                    el.classList.add('fadeInUp');
                } else if (el.classList.contains('text2')) {
                    el.classList.add('fadeInDown');
                }
                el.classList.add('animated');
            }, index * 500); // Delay 500ms giữa text1 và text2
        });
    }
}

// Khởi tạo Swiper sau khi DOM load xong
document.addEventListener("DOMContentLoaded", function () {
    const mySwiper = new Swiper(".mySwiper", {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // Lắng nghe sự kiện khi slide thay đổi
    mySwiper.on('slideChangeTransitionStart', function () {
        // Reset ngay khi bắt đầu chuyển slide
        const allAnimatedElements = document.querySelectorAll('.swiper-slide .text1, .swiper-slide .text2');
        allAnimatedElements.forEach(el => {
            el.classList.remove('fadeInUp', 'fadeInDown', 'animated');
            el.style.opacity = '0';
        });
    });

    mySwiper.on('slideChangeTransitionEnd', function () {
        setTimeout(() => {
            resetAndStartAnimation();
        }, 100);
    });

    // Khởi tạo animation cho slide đầu tiên ngay khi trang load
    setTimeout(() => {
        resetAndStartAnimation();
    }, 500); // Delay một chút để đảm bảo Swiper đã khởi tạo hoàn toàn

    // Xử lý click cho vertical dots
    document.querySelectorAll('.vertical-dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            mySwiper.slideToLoop(index);
        });
    });

    // Cập nhật active state cho vertical dots
    function updateVerticalDots(activeIndex) {
        document.querySelectorAll('.vertical-dot').forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === activeIndex) {
                dot.classList.add('active');
            }
        });
    }

    // Lắng nghe sự kiện thay đổi slide để update dots
    mySwiper.on('slideChange', function () {
        const realIndex = mySwiper.realIndex; // Lấy real index để xử lý loop
        updateVerticalDots(realIndex);
    });
});