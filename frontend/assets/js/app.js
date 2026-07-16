// ===================================================
// 0. ԹԱՐԳՄԱՆՈՒԹՅՈՒՆՆԵՐԻ ԲԱՌԱՐԱՆ (TRANSLATIONS DICTIONARY)
// ===================================================
const translations = {
    eng: {
        welcomeTitle: "WELCOME",
        welcomeText: "You have visited the Hermitage" +
            " online shop of unique perfumes and cosmetics." +
            " Hermitage is the official representative " +
            "of a number of brands in Armenia. Founded in 2012," +
            " Hermitage has 12 stores, 10 of which are located in the capital" +
            " Yerevan and 2 are in Gyumri and Vanadzor.",
        loadMore: "LOAD MORE",
        shop: "SHOP",
        brands: "BRANDS",
        giftcard: "GIFT CARD",
        contacts: "CONTACTS",
        blog: "BLOG",
        search: "Search",
        login: "Login",
        addToCart: "ADD TO CART",
        currentStatus: "Current status",
        work: "Work",
        aboutUs: "About us",
        footerBrands: "Brands",
        footerShop: "Shop",
        event: "Event",
        footerContacts: "Contacts",
        newsletterTitle: "Newsletter subscription",
        newsletterPlaceholder: "Email address",
        newsletterSub: "Get our exclusive news! You can unsubscribe at any time using our email link:",
        tabNew: "NEW ARRIVALS",
        tabBestsellers: "BESTSELLERS",
        tabDiscounts: "DISCOUNTS",
        priceOnRequest: "PRICE ON REQUEST"
    },
    arm: {
        welcomeTitle: "ԲԱՐԻ ԳԱԼՈՒՍՏ",
        welcomeText: "Դուք այցելել եք Hermitage բացառիկ օծանելիքի և կոսմետիկայի" +
            " օնլայն խանութ: Hermitage-ը հանդիսանում է մի շարք բրենդերի պաշտոնական" +
            " ներկայացուցիչը Հայաստանում: Հիմնադրված լինելով 2012 թվականին` " +
            "Hermitage-ն այժմ ունի 12 խանութ-սրահ, որոնցից 10-ը գտնվում են մայրաքաղաք " +
            "Երևանում, իսկ 2-ը՝ Գյումրիում և Վանաձորում:",
        loadMore: "ԲԵՌՆԵԼ ԱՎԵԼԻՆ",
        shop: "ԽԱՆՈՒԹ",
        brands: "ԲՐԵՆԴՆԵՐ",
        giftcard: "ՆՎԵՐ ՔԱՐՏ",
        contacts: "ԿԱՊ",
        blog: "ԲԼՈԳ",
        search: "Փնտրել",
        login: "Մուտք",
        addToCart: "ԱՎԵԼԱՑՆԵԼ ԶԱՄԲՅՈՒՂ",
        currentStatus: "Այս պահին",
        work: "Աշխատանք",
        aboutUs: "Մեր մասին",
        footerBrands: "Բրենդներ",
        footerShop: "Խանութ",
        event: "Միջոցառում",
        footerContacts: "Կոնտակտներ",
        newsletterTitle: "Լրատու բաժանորդագրություն",
        newsletterPlaceholder: "Էլեկտրոնային հասցե",
        newsletterSub: "Ստացեք մեր բացառիկ նորությունները։ Դուք կարող եք ցանկացած ժամանակ չեղարկել բաժանորդագրությունը՝ օգտագործելով մեր էլ․ նամակների հղումը։",
        tabNew: "ՆՈՐՈՒԹՅՈՒՆՆԵՐ",
        tabBestsellers: "ԲԵՍԹՍԵԼԵՐՆԵՐ",
        tabDiscounts: "ԶԵՂՉԵՐ",
        priceOnRequest: "ԳՆԱՅԻՆ ՀԱՐՑՈՒՄ"
    }
};

// ===================================================
// 1. ԿՈՄՊՈՆԵՆՏՆԵՐԻ ԱՎՏՈՄԱՏ ԲԵՌՆՈՒՄ (FETCH COMPONENTS)
// ===================================================
document.addEventListener("DOMContentLoaded", async () => {
    const currentSavedLang = localStorage.getItem('selectedLang') || 'eng';

    // 1. Բեռնում ենք Header-ը (Ավելացրել եմ '/' սկզբում)
    const headerComponent = document.getElementById("header-component");
    if (headerComponent) {
        try {
            const response = await fetch("/components/header.html");
            if (!response.ok) throw new Error("Header-ը չգտնվեց");
            const html = await response.text();
            headerComponent.innerHTML = html;

            console.log("✅ Header-ը բեռնվեց");
            // const logo = document.getElementById("logoHome");
            //
            // if (logo) {
            //     logo.addEventListener("click", (e) => {
            //         e.preventDefault();
            //         window.location.href = "/";
            //     });
            // }
            // const logo = document.getElementById("logoHome");
            //
            // if (logo) {
            //     logo.addEventListener("click", (e) => {
            //         e.preventDefault();
            //         window.location.href = "․․/index.html";
            //     });
            // }
            console.log("✅ Header-ը բեռնվեց");

            // Միայն այստեղ ենք կանչում initSwipers, երբ header-ը պատրաստ է
            // Եվ ավելացրել ենք ստուգում, որպեսզի սխալ չտա, եթե Swiper-ը չկա
            if (typeof initSwipers === 'function') {
                initSwipers();
            }

            initLanguageDropdown();
        } catch (error) {
            console.error("Խնդիր Header-ը բեռնելիս:", error);
        }
    }

    // 2. Բեռնում ենք Footer-ը (Ավելացրել եմ '/' սկզբում)
    const footerComponent = document.getElementById("footer-component");
    if (footerComponent) {
        try {
            const response = await fetch("/components/footer.html");
            footerComponent.innerHTML = await response.text();
            console.log("✅ Footer-ը բեռնվեց");
        } catch (error) {
            console.error("Խնդիր Footer-ը բեռնելիս:", error);
        }
    }

    // 3. Բեռնում ենք Auth Modal-ը (Ավելացրել եմ '/' սկզբում)
    const authModalComponent = document.getElementById("auth-modal-component");
    if (authModalComponent) {
        try {
            const response = await fetch("/components/auth-modal.html");
            if (!response.ok) throw new Error("Auth Modal-ը չգտնվեց");
            authModalComponent.innerHTML = await response.text();
            console.log("✅ Auth Modal-ը բեռնվեց");
            if (typeof initAuthModal === 'function') {
                initAuthModal();
            }
        } catch (error) {
            console.error("Խնդիր Մոդալը բեռնելիս:", error);
        }
    }

    applyTranslations(currentSavedLang);
});
// document.addEventListener("DOMContentLoaded", async () => {
//     const currentSavedLang = localStorage.getItem('selectedLang') || 'eng';
//
//     // 1. Բեռնում ենք Header-ը
//     const headerComponent = document.getElementById("header-component");
//     if (headerComponent) {
//         try {
//             const response = await fetch("components/header.html");
//             if (!response.ok) throw new Error("Header-ը չգտնվեց");
//             headerComponent.innerHTML = await response.text();
//             console.log("✅ Header-ը բեռնվեց");
//             initSwipers();
//             initLanguageDropdown();
//         } catch (error) {
//             console.error("Խնդիր Header-ը բեռնելիս:", error);
//         }
//     }
//
//     // 2. Բեռնում ենք Footer-ը
//     const footerComponent = document.getElementById("footer-component");
//     if (footerComponent) {
//         try {
//             const response = await fetch("components/footer.html");
//             footerComponent.innerHTML = await response.text();
//             console.log("✅ Footer-ը բեռնվեց");
//         } catch (error) {
//             console.error("Խնդիր Footer-ը բեռնելիս:", error);
//         }
//     }
//
//     // 3. Բեռնում ենք Auth Modal-ը
//     const authModalComponent = document.getElementById("auth-modal-component");
//     if (authModalComponent) {
//         try {
//             const response = await fetch("components/auth-modal.html");
//             if (!response.ok) throw new Error("Auth Modal-ը չգտնվեց");
//             authModalComponent.innerHTML = await response.text();
//             console.log("✅ Auth Modal-ը բեռնվեց");
//             initAuthModal();
//         } catch (error) {
//             console.error("Խնդիր Մոդալը բեռնելիս:", error);
//         }
//     }
//
//     applyTranslations(currentSavedLang);
// });

// ===================================================
// 2. AUTH MODAL LOGIC (LOGIN / SIGNUP & BACKEND)
// ===================================================
function initAuthModal() {
    const authModal = document.getElementById('authModal');
    if (!authModal) return;

    document.addEventListener('click', function (e) {
        const targetLink = e.target.closest('.tool-link');
        if (targetLink && (targetLink.textContent.toLowerCase().includes('login') || targetLink.textContent.includes('Մուտք'))) {
            e.preventDefault();
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            return;
        }
        const isCloseBtn = e.target.closest('.hm-modal-close-btn');
        const isOverlay = e.target.classList.contains('hm-modal-overlay');
        if (isCloseBtn || isOverlay) {
            authModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    const tabButtons = authModal.querySelectorAll('.hm-auth-tab-btn');
    const tabContents = authModal.querySelectorAll('.hm-auth-tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            this.classList.add('active');
            const targetTabId = this.getAttribute('data-tab') + 'Tab';
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    authModal.addEventListener('click', async (e) => {
        const target = e.target;
        if (target.textContent && target.textContent.trim().toUpperCase() === 'SIGN UP' && target.tagName === 'BUTTON') {
            e.preventDefault();
            const container = target.closest('.hm-auth-tab-content');
            const inputs = container.querySelectorAll('input');
            const userData = {
                first_name: inputs[0] ? inputs[0].value.trim() : '',
                last_name: inputs[1] ? inputs[1].value.trim() : '',
                email: inputs[2] ? inputs[2].value.trim() : '',
                password: inputs[3] ? inputs[3].value : ''
            };
            if (!userData.first_name || !userData.last_name || !userData.email || !userData.password) {
                alert('Խնդրում ենք լրացնել բոլոր դաշտերը:');
                return;
            }
            try {
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });
                const data = await response.json();
                if (response.ok && data.success) {
                    alert('Գրանցումը հաջողությամբ կատարվեց:');
                    authModal.classList.remove('active');
                    document.body.style.overflow = '';
                    window.location.reload();
                } else {
                    alert(data.message || 'Գրանցման սխալ:');
                }
            } catch (error) {
                console.error('❌ Սխալ գրանցման ընթացքում:', error);
            }
        }
        if (target.textContent && target.textContent.trim().toUpperCase() === 'LOG IN' && target.tagName === 'BUTTON') {
            e.preventDefault();
            const container = target.closest('.hm-auth-tab-content');
            const inputs = container.querySelectorAll('input');
            const loginData = {
                email: inputs[0] ? inputs[0].value.trim() : '',
                password: inputs[1] ? inputs[1].value : ''
            };
            if (!loginData.email || !loginData.password) {
                alert('Խնդրում ենք լրացնել EMAIL և PASSWORD դաշտերը:');
                return;
            }
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(loginData)
                });
                const data = await response.json();
                if (response.ok && data.success) {
                    alert(`Բարի գալուստ, ${data.user.first_name || 'Օգտատեր'}:`);
                    authModal.classList.remove('active');
                    document.body.style.overflow = '';
                    window.location.reload();
                } else {
                    alert(data.message || 'Մուտքի սխալ:');
                }
            } catch (error) {
                console.error('❌ Սխալ մուտքի ընթացքում:', error);
            }
        }
    });
}

// ===================================================
// 3. SWIPER SLIDERS INITIALIZATION
// ===================================================
// ===================================================
// 3. SWIPER SLIDERS INITIALIZATION (Ուղղված տարբերակ)
// ===================================================
function initSwipers() {
    // 1. Ստուգում ենք՝ արդյո՞ք Swiper գրադարանը հասանելի է
    if (typeof Swiper === 'undefined') {
        console.warn("⚠️ Swiper գրադարանը բեռնված չէ, սպասում ենք կամ բաց թողնում...");
        return;
    }

    // 2. Ստուգում ենք՝ արդյո՞ք էջում կան սլայդերների կոնտեյներներ
    const heroSlider = document.querySelector('.heroSwiper');
    const productsSlider = document.querySelector('.productsSwiper');

    // 3. Միացնում ենք միայն այն, ինչը գտնվել է էջում
    if (heroSlider) {
        new Swiper(".heroSwiper", {
            loop: true,
            effect: "slide",
            speed: 1800,
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        });
        console.log("✅ Hero Swiper-ը հաջողությամբ ակտիվացավ");
    }

    if (productsSlider) {
        new Swiper(".productsSwiper", {
            slidesPerView: 4,
            spaceBetween: 30,
            navigation: { nextEl: ".prod-next", prevEl: ".prod-prev" },
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 30 }
            }
        });
        console.log("✅ Products Swiper-ը հաջողությամբ ակտիվացավ");
    }
}
// function initSwipers() {
//     // Ստուգում ենք՝ արդյո՞ք էջում կա Swiper-ի գրադարանը, նոր նոր աշխատում ենք
//     if (typeof Swiper === 'undefined') {
//         console.warn("⚠️ Swiper գրադարանը բեռնված չէ");
//         return;
//     }
//
//     if (document.querySelector('.heroSwiper')) {
//         new Swiper(".heroSwiper", {
//             loop: true,
//             effect: "slide",
//             speed: 1800,
//             autoplay: { delay: 3000, disableOnInteraction: false },
//             pagination: { el: ".swiper-pagination", clickable: true },
//             navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
//         });
//     }
//     if (document.querySelector('.productsSwiper')) {
//         new Swiper(".productsSwiper", {
//             slidesPerView: 4,
//             spaceBetween: 30,
//             navigation: { nextEl: ".prod-next", prevEl: ".prod-prev" },
//             breakpoints: {
//                 320: { slidesPerView: 1, spaceBetween: 10 },
//                 768: { slidesPerView: 2, spaceBetween: 20 },
//                 1024: { slidesPerView: 4, spaceBetween: 30 }
//             }
//         });
//     }
// }
// function initSwipers() {
//
//     if (document.querySelector('.heroSwiper')) {
//         new Swiper(".heroSwiper", {
//             loop: true,
//             effect: "slide",
//             speed: 1800,
//             autoplay: { delay: 3000, disableOnInteraction: false },
//             pagination: { el: ".swiper-pagination", clickable: true },
//             navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
//         });
//     }
//     if (document.querySelector('.productsSwiper')) {
//         new Swiper(".productsSwiper", {
//             slidesPerView: 4,
//             spaceBetween: 30,
//             navigation: { nextEl: ".prod-next", prevEl: ".prod-prev" },
//             breakpoints: {
//                 320: { slidesPerView: 1, spaceBetween: 10 },
//                 768: { slidesPerView: 2, spaceBetween: 20 },
//                 1024: { slidesPerView: 4, spaceBetween: 30 }
//             }
//         });
//     }
// }

// ===================================================
// 4. LANGUAGE DROPDOWN
// ===================================================
function initLanguageDropdown() {
    const langBtn = document.getElementById('currentLang');
    const langMenu = document.getElementById('langMenu');
    if (!langBtn || !langMenu) return;

    const currentSavedLang = localStorage.getItem('selectedLang') || 'eng';
    langBtn.innerHTML = `${currentSavedLang === 'arm' ? 'Հայ' : 'Eng'} <i class="fa-solid fa-caret-down"></i>`;

    document.querySelectorAll('.lang-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-lang') === currentSavedLang) item.classList.add('active');
    });

    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('show');
    });

    langMenu.addEventListener('click', (e) => {
        const selectedItem = e.target.closest('.lang-item');
        if (!selectedItem) return;
        e.preventDefault();
        const newLang = selectedItem.getAttribute('data-lang');
        localStorage.setItem('selectedLang', newLang);
        window.location.reload();
    });

    document.addEventListener('click', () => langMenu.classList.remove('show'));
}

// ===================================================
// 5. APPLY TRANSLATIONS
// ===================================================
function applyTranslations(lang) {
    const dict = translations[lang];
    if (!dict) return;

    const wTitle = document.getElementById('welcome-title');
    if (wTitle) wTitle.textContent = dict.welcomeTitle;
    const wText = document.getElementById('welcome-text');
    if (wText) wText.textContent = dict.welcomeText;
    const lMore = document.getElementById('load-more-btn');
    if (lMore) lMore.textContent = dict.loadMore;

    const shopLink = document.querySelector('.shop-link');
    const otherLinks = document.querySelectorAll('.nav-links > li:not(.dropdown) a');
    if (shopLink) shopLink.textContent = dict.shop;
    if (otherLinks.length >= 4) {
        otherLinks[0].textContent = dict.brands;
        otherLinks[1].textContent = dict.giftcard;
        otherLinks[2].textContent = dict.contacts;
        otherLinks[3].textContent = dict.blog;
    }

    const search = document.querySelector('.search-box input');
    if (search) search.placeholder = dict.search;
    const login = document.querySelector('.tool-link');
    if (login) login.innerHTML = `<i class="fa-regular fa-user"></i> ${dict.login}`;

    document.querySelectorAll('.tab-btn').forEach(el => {
        const dataTab = el.getAttribute('data-tab');
        if (dataTab === 'new') el.textContent = dict.tabNew;
        if (dataTab === 'best') el.textContent = dict.tabBestsellers;
        if (dataTab === 'sale') el.textContent = dict.tabDiscounts;
    });
}

// ===================================================
// 6. FILTER LOGIC (PERFUME PAGE)
// ===================================================
// Ֆիլտրման լոգիկա
document.addEventListener("DOMContentLoaded", () => {
    // Լսում ենք միայն մեր ստեղծած gender-filter-ի ներսի checkbox-երը
    const filterInputs = document.querySelectorAll('.gender-filter .filter-input');

    filterInputs.forEach(input => {
        input.addEventListener('change', filterProducts);
    });
});

function filterProducts() {
    // Հավաքում ենք բոլոր նշված (checked) արժեքները
    const checkedValues = Array.from(document.querySelectorAll('.gender-filter .filter-input:checked'))
        .map(c => c.value);

    const products = document.querySelectorAll('.product-item');

    products.forEach(product => {
        const category = product.getAttribute('data-category');

        // Եթե ոչինչ ընտրված չէ, ցույց ենք տալիս բոլորը
        if (checkedValues.length === 0) {
            product.style.display = 'block';
        } else {
            // Եթե ընտրված է, ցույց ենք տալիս միայն համապատասխանները
            product.style.display = checkedValues.includes(category) ? 'block' : 'none';
        }
    });
}