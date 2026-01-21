$(document).ready(function () {


    $(document).ready(function () {

        function handleDropdown() {
            const winWidth = $(window).width();

            // Reset classes on resize change
            $('.dropdown').removeClass('active_lg active_sm');

            if (winWidth >= 992) {
                // DESKTOP: Hover behavior
                $('.dropdown').off('mouseenter mouseleave click');

                $('.dropdown').on('mouseenter', function () {
                    $(this).addClass('active_lg');
                });

                $('.dropdown').on('mouseleave', function () {
                    $(this).removeClass('active_lg');
                });

            } else {
                // MOBILE + TABLET: Click behavior
                $('.dropdown').off('mouseenter mouseleave');

                $('.dropdown').off('click').on('click', function (e) {
                    e.stopPropagation(); // Prevent body click closing immediately

                    // Close others
                    $('.dropdown').not(this).removeClass('active_sm');

                    // Toggle current
                    $(this).toggleClass('active_sm');
                });

                // Click outside closes dropdown
                $('body').off('click.dropdown').on('click.dropdown', function () {
                    $('.dropdown').removeClass('active_sm');
                });
            }
        }

        // Run on load
        handleDropdown();

        // Run on resize (with slight delay)
        let resizeTimer;
        $(window).on('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleDropdown, 150);
        });

    });

    // checkbox
    $('.checkbox').on('click', function (e) {
        $(this).toggleClass('active');
    });

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 200) {
            $('body').addClass('screen_up');
        } else {
            $('body').removeClass('screen_up');
        }
    });

    // got_to_top
    $('.got_to_top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    function checkScroll() {
        if ($(window).scrollTop() > 200) {
            $('.got_to_top').addClass('scrolled_up');
        } else {
            $('.got_to_top').removeClass('scrolled_up');
        }
    }

    // Run on scroll
    $(window).on('scroll', checkScroll);

    // Run on refresh / page load
    $(document).ready(checkScroll);


    // hamburgar_btn
    $('.hamburgar_btn').on('click', function () {
        $('body').toggleClass('menu_active');
        $(this).toggleClass('active');
    });



    // flatpickr js
    const isMobile = window.innerWidth <= 768;

    flatpickr("#selectDate", {
        dateFormat: "Y-m-d",
        monthSelectorType: isMobile ? "dropdown" : "static",
        yearSelectorType: isMobile ? "dropdown" : "static",
        disableMobile: false,
        static: !isMobile,
    });

    flatpickr("#selectDate2", {
        dateFormat: "Y-m-d",
        monthSelectorType: isMobile ? "dropdown" : "static",
        yearSelectorType: isMobile ? "dropdown" : "static",
        disableMobile: false,
        static: !isMobile,
    });


    // Hero slider
    swiper = new Swiper(".hero_slider", {
        slidesPerView: 1,
        loop: true,
        speed: 700,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper_button_next",
            prevEl: ".swiper_button_prev"
        }
    });

    // service_slider
    // service_slider
    swiper = new Swiper(".service_slider", {
        loop: true,
        speed: 700,
        spaceBetween: 2,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 5,
            }
        }
    });


    // niceSelect
    $('.nice-select').niceSelect();

    // ======================================
    // 浮動預約按鈕組件
    // ======================================
    const floatingWidget = {
        widget: document.getElementById('floating-contact-widget'),
        toggleBtn: document.getElementById('widget-toggle-btn'),
        contactList: document.getElementById('widget-contact-list'),

        init: function() {
            if (!this.widget || !this.toggleBtn || !this.contactList) {
                return;
            }
            this.attachEventListeners();
        },

        attachEventListeners: function() {
            const self = this;

            // 點擊預約按鈕切換聯絡清單
            this.toggleBtn.addEventListener('click', function() {
                self.toggleContactList();
            });

            // 點擊外部隱藏清單
            document.addEventListener('click', function(e) {
                if (!self.widget.contains(e.target) && self.contactList.classList.contains('visible')) {
                    self.hideContactList();
                }
            });
        },

        toggleContactList: function() {
            if (this.contactList.classList.contains('visible')) {
                this.hideContactList();
            } else {
                this.showContactList();
            }
        },

        showContactList: function() {
            this.contactList.classList.add('visible');
            this.toggleBtn.setAttribute('aria-expanded', 'true');
        },

        hideContactList: function() {
            this.contactList.classList.remove('visible');
            this.toggleBtn.setAttribute('aria-expanded', 'false');
        }
    };

    // 初始化浮動預約按鈕
    floatingWidget.init();

})

