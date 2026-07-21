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
// SEARCH DATA
// ===================================================
const allPerfumes = [
    { name: "Prada", url: "#" },
    { name: "YSL", url: "#" },
    { name: "Amouage", url: "#" },
    { name: "Casamorati", url: "#" },
    { name: "Ajmal", url: "#" },
    { name: "Nina Ricci", url: "#" },
    { name: "Dolce & Gabbana", url: "#" },
    { name: "Clive Christian", url: "#" },
    { name: "Carolina Herrera", url: "#" },
    { name: "Bvlgari", url: "#" },
    { name: "Lancome", url: "#" }
];

// ===================================================
// 1. ԿՈՄՊՈՆԵՆՏՆԵՐԻ ԱՎՏՈՄԱՏ ԲԵՌՆՈՒՄ (FETCH COMPONENTS)
// ===================================================
document.addEventListener("DOMContentLoaded", async () => {
    const currentSavedLang = localStorage.getItem('selectedLang') || 'eng';

    // 1. Բեռնում ենք Header-ը
    const headerComponent = document.getElementById("header-component");
    if (headerComponent) {
        try {
            const response = await fetch("/components/header.html");
            const html = await response.text();
            headerComponent.innerHTML = html;

            if (typeof initSwipers === 'function') initSwipers();
            initLanguageDropdown();
        } catch (error) { console.error("Header load error:", error); }
    }

    // Price Filter-ի լսողներ
    const minInput = document.getElementById('minPrice');
    const maxInput = document.getElementById('maxPrice');
    const priceRange = document.getElementById('priceRange');

    if (minInput && maxInput && priceRange) {
        priceRange.addEventListener('input', function() {
            maxInput.value = this.value;
            filterProductsByPrice();
        });
        minInput.addEventListener('input', filterProductsByPrice);
        maxInput.addEventListener('input', filterProductsByPrice);
    }

    // 2. Footer և Auth Modal
    const footerComponent = document.getElementById("footer-component");
    if (footerComponent) {
        try {
            const response = await fetch("/components/footer.html");
            footerComponent.innerHTML = await response.text();
        } catch (error) { console.error("Footer load error:", error); }
    }

    const authModalComponent = document.getElementById("auth-modal-component");
    if (authModalComponent) {
        try {
            const response = await fetch("/components/auth-modal.html");
            authModalComponent.innerHTML = await response.text();
            if (typeof initAuthModal === 'function') initAuthModal();
        } catch (error) { console.error("Auth Modal load error:", error); }
    }

    initLiveSearch();
    applyTranslations(currentSavedLang);
});

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
            } catch (error) { console.error('❌ Սխալ գրանցման ընթացքում:', error); }
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
            } catch (error) { console.error('❌ Սխալ մուտքի ընթացքում:', error); }
        }
    });
}

// ===================================================
// 3. SWIPER SLIDERS INITIALIZATION
// ===================================================
function initSwipers() {
    if (typeof Swiper === 'undefined') return;

    const heroSlider = document.querySelector('.heroSwiper');
    const productsSlider = document.querySelector('.productsSwiper');

    if (heroSlider) {
        new Swiper(".heroSwiper", {
            loop: true,
            effect: "slide",
            speed: 1800,
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        });
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
    }
}

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
// ===================================================
// 6. FILTER LOGIC (PERFUME PAGE)
// ===================================================
document.addEventListener("DOMContentLoaded", () => {
    const filterInputs = document.querySelectorAll('.gender-filter .filter-input');
    filterInputs.forEach(input => {
        input.addEventListener('change', filterProducts);
    });
});

function filterProducts() {
    const checkedValues = Array.from(document.querySelectorAll('.gender-filter .filter-input:checked'))
        .map(c => c.value);

    const products = document.querySelectorAll('.product-item');

    products.forEach(product => {
        const category = product.getAttribute('data-category');
        if (checkedValues.length === 0) {
            product.style.display = 'block';
        } else {
            product.style.display = checkedValues.includes(category) ? 'block' : 'none';
        }
    });
}



// ===================================================
// 6. MAKEUP CATEGORY FILTER
// ===================================================

document.addEventListener("DOMContentLoaded", () => {

    const filters = document.querySelectorAll(".filter-input");


    filters.forEach(filter => {

        filter.addEventListener("change", () => {


            let selected = [];


            filters.forEach(item => {

                if(item.checked){
                    selected.push(item.value);
                }

            });



            document.querySelectorAll(".product-item").forEach(product => {


                let category = product.dataset.category;



                if(
                    selected.length === 0 ||
                    selected.includes(category)
                ){

                    product.style.display = "block";

                } else {

                    product.style.display = "none";

                }


            });



        });


    });



});
// document.addEventListener("DOMContentLoaded", () => {
//     const filterInputs = document.querySelectorAll('.gender-filter .filter-input');
//     filterInputs.forEach(input => {
//         input.addEventListener('change', filterProducts);
//     });
// });
//
// function filterProducts() {
//     const checkedValues = Array.from(document.querySelectorAll('.gender-filter .filter-input:checked'))
//         .map(c => c.value);
//
//     const products = document.querySelectorAll('.product-item');
//
//     products.forEach(product => {
//         const category = product.getAttribute('data-category');
//         if (checkedValues.length === 0) {
//             product.style.display = 'block';
//         } else {
//             product.style.display = checkedValues.includes(category) ? 'block' : 'none';
//         }
//     });
// }

// ===================================================
// 7. PRICE FILTER LOGIC
// ===================================================
function filterProductsByPrice() {
    const min = parseInt(document.getElementById('minPrice').value) || 0;
    const max = parseInt(document.getElementById('maxPrice').value) || 1000000;

    document.querySelectorAll('.product-item').forEach(p => {
        const price = parseInt(p.getAttribute('data-price')) || 0;
        const genderChecked = Array.from(document.querySelectorAll('.gender-filter .filter-input:checked')).map(c => c.value);
        const category = p.getAttribute('data-category');

        const priceMatch = (price >= min && price <= max);
        const genderMatch = (genderChecked.length === 0 || genderChecked.includes(category));

        p.style.display = (priceMatch && genderMatch) ? 'block' : 'none';
    });
}

// ===================================================
// 8. LIVE SEARCH LOGIC
// ===================================================
function initLiveSearch() {
    const searchBoxes = document.querySelectorAll('.search-box');
    searchBoxes.forEach(box => {
        const input = box.querySelector('input');
        if (!input) return;

        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results-dropdown';
        box.appendChild(resultsContainer);

        input.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            resultsContainer.innerHTML = '';
            if (!query) { resultsContainer.style.display = 'none'; return; }

            const filtered = allPerfumes.filter(item => item.name.toLowerCase().includes(query));
            if (filtered.length === 0) { resultsContainer.style.display = 'none'; return; }

            filtered.forEach(itemData => {
                const item = document.createElement('a');
                item.className = 'search-result-item';
                item.href = `/pages/product-details.html?name=${encodeURIComponent(itemData.name)}`;
                item.innerHTML = `<span>${itemData.name}</span>`;
                item.addEventListener('click', () => resultsContainer.style.display = 'none');
                resultsContainer.appendChild(item);
            });

            const allResults = document.createElement('div');
            allResults.className = 'search-result-item all-results';
            allResults.textContent = 'All Results';
            allResults.addEventListener('click', () => {
                window.location.href = '/pages/perfume.html?search=' + encodeURIComponent(query);
            });
            resultsContainer.appendChild(allResults);
            resultsContainer.style.display = 'block';
        });

        document.addEventListener('click', (e) => {
            if (!box.contains(e.target)) resultsContainer.style.display = 'none';
        });
    });
}

// ===================================================
// 9. ԶԱՄԲՅՈՒՂԻ ՏՎՅԱԼՆԵՐԻ ՊԱՀՊԱՆՈՒՄ ԵՎ ՖՈՒՆԿՑԻԱՆԵՐ
// ===================================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartIcon() {
    const cartCount = document.querySelector('.cart-count') || document.querySelector('.cart-link span');
    if(cartCount) cartCount.textContent = cart.length;
}

function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
    const modal = document.querySelector('.cart-modal');
    if (modal && modal.style.display === 'block') {
        openCartModal();
    } else {
        alert(product.name + ' added to cart!');
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
    openCartModal();
}

function openCartModal() {
    const modal = document.querySelector('.cart-modal');
    if (!modal) return;
    modal.style.position = 'fixed';
    modal.style.top = '20px';
    modal.style.right = '20px';
    modal.style.width = '550px';
    modal.style.maxWidth = '90vw';
    modal.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    modal.style.backdropFilter = 'blur(15px)';
    modal.style.padding = '50px';
    modal.style.borderRadius = '30px';
    modal.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    modal.style.color = 'black';
    modal.style.zIndex = '1000';

    const list = modal.querySelector('.cart-items-list');
    list.innerHTML = '';
    if (cart.length === 0) {
        list.innerHTML = '<p style="color:black; text-align:center; padding:40px;">YOUR CART IS EMPTY.</p>';
    } else {
        let total = 0;
        cart.forEach((item, index) => {
            const priceValue = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
            total += priceValue;
            list.innerHTML += `
                <div class="cart-item" style="display:flex; align-items:center; border-bottom:1px solid rgba(0,0,0,0.1); padding:25px 0; color:black;">
                    <img src="${item.img || ''}" style="width:80px; height:80px; object-fit:cover; border-radius:15px; flex-shrink:0;">
                    <div style="flex-grow:1; margin:0 30px; color:black; font-weight:600; font-size:1.1em;">${item.name}</div>
                    <div style="width: 70px; text-align: center; color:black;">1 pcs</div>
                    <div style="width: 130px; text-align: right; color:black; font-weight:bold; font-size:1.1em;">${item.price}</div>
                    <button onclick="removeFromCart(${index})" style="background:none; border:none; cursor:pointer; color:black; margin-left:30px; font-size:1.5em;">🗑️</button>
                </div>`;
        });
        list.innerHTML += `
            <div class="cart-total" style="padding:30px 0; font-weight:bold; display:flex; justify-content:space-between; color:black; font-size:1.5em;">
                <span>Total:</span><span>${total} ֏</span>
            </div>
            <button onclick="window.location.href='/pages/checkout.html'" style="background:black; color:white; border:none; padding:20px; width:100%; cursor:pointer; border-radius:15px; font-weight:bold; font-size:1.1em;">
                CHECKOUT
            </button>`;
    }
    modal.style.display = 'block';
}

function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCartIcon();
    openCartModal();
}

function closeCartModal() {
    const modal = document.querySelector('.cart-modal');
    if (modal) modal.style.display = 'none';
}

// ===================================================
// 10. ԻՍԿԱԿԱՆ ԻԼՈԳԻԿԱ (Event Listeners)
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('buy-btn') || e.target.classList.contains('add-to-cart-btn')) {
        e.preventDefault();
        const item = e.target.closest('.product-item') || e.target.closest('.product-card');
        if (item) {
            const nameEl = item.querySelector('h3');
            const name = nameEl ? nameEl.innerText.trim() : 'Product';
            const priceEl = item.querySelector('.product-price') || item.querySelector('.price') || item.querySelector('.price-tag');
            const price = priceEl ? priceEl.innerText.trim() : '0 ֏';
            const img = item.querySelector('img') ? item.querySelector('img').src : '';
            addToCart({ name, price, img });
        }
    }
    if (e.target.closest('.cart-link')) {
        e.preventDefault();
        openCartModal();
    }
});

document.addEventListener("click",function(e){


    if(e.target.classList.contains("wishlist-btn")){


        e.target.classList.toggle("active");



        if(e.target.classList.contains("active")){

            e.target.innerHTML="♥";

        }
        else{

            e.target.innerHTML="♡";

        }


    }



});



//
// // ===================================================
// // 0. ԹԱՐԳՄԱՆՈՒԹՅՈՒՆՆԵՐԻ ԲԱՌԱՐԱՆ (TRANSLATIONS DICTIONARY)
// // ===================================================
// const translations = {
//     eng: {
//         welcomeTitle: "WELCOME",
//         welcomeText: "You have visited the Hermitage" +
//             " online shop of unique perfumes and cosmetics." +
//             " Hermitage is the official representative " +
//             "of a number of brands in Armenia. Founded in 2012," +
//             " Hermitage has 12 stores, 10 of which are located in the capital" +
//             " Yerevan and 2 are in Gyumri and Vanadzor.",
//         loadMore: "LOAD MORE",
//         shop: "SHOP",
//         brands: "BRANDS",
//         giftcard: "GIFT CARD",
//         contacts: "CONTACTS",
//         blog: "BLOG",
//         search: "Search",
//         login: "Login",
//         addToCart: "ADD TO CART",
//         currentStatus: "Current status",
//         work: "Work",
//         aboutUs: "About us",
//         footerBrands: "Brands",
//         footerShop: "Shop",
//         event: "Event",
//         footerContacts: "Contacts",
//         newsletterTitle: "Newsletter subscription",
//         newsletterPlaceholder: "Email address",
//         newsletterSub: "Get our exclusive news! You can unsubscribe at any time using our email link:",
//         tabNew: "NEW ARRIVALS",
//         tabBestsellers: "BESTSELLERS",
//         tabDiscounts: "DISCOUNTS",
//         priceOnRequest: "PRICE ON REQUEST"
//     },
//     arm: {
//         welcomeTitle: "ԲԱՐԻ ԳԱԼՈՒՍՏ",
//         welcomeText: "Դուք այցելել եք Hermitage բացառիկ օծանելիքի և կոսմետիկայի" +
//             " օնլայն խանութ: Hermitage-ը հանդիսանում է մի շարք բրենդերի պաշտոնական" +
//             " ներկայացուցիչը Հայաստանում: Հիմնադրված լինելով 2012 թվականին` " +
//             "Hermitage-ն այժմ ունի 12 խանութ-սրահ, որոնցից 10-ը գտնվում են մայրաքաղաք " +
//             "Երևանում, իսկ 2-ը՝ Գյումրիում և Վանաձորում:",
//         loadMore: "ԲԵՌՆԵԼ ԱՎԵԼԻՆ",
//         shop: "ԽԱՆՈՒԹ",
//         brands: "ԲՐԵՆԴՆԵՐ",
//         giftcard: "ՆՎԵՐ ՔԱՐՏ",
//         contacts: "ԿԱՊ",
//         blog: "ԲԼՈԳ",
//         search: "Փնտրել",
//         login: "Մուտք",
//         addToCart: "ԱՎԵԼԱՑՆԵԼ ԶԱՄԲՅՈՒՂ",
//         currentStatus: "Այս պահին",
//         work: "Աշխատանք",
//         aboutUs: "Մեր մասին",
//         footerBrands: "Բրենդներ",
//         footerShop: "Խանութ",
//         event: "Միջոցառում",
//         footerContacts: "Կոնտակտներ",
//         newsletterTitle: "Լրատու բաժանորդագրություն",
//         newsletterPlaceholder: "Էլեկտրոնային հասցե",
//         newsletterSub: "Ստացեք մեր բացառիկ նորությունները։ Դուք կարող եք ցանկացած ժամանակ չեղարկել բաժանորդագրությունը՝ օգտագործելով մեր էլ․ նամակների հղումը։",
//         tabNew: "ՆՈՐՈՒԹՅՈՒՆՆԵՐ",
//         tabBestsellers: "ԲԵՍԹՍԵԼԵՐՆԵՐ",
//         tabDiscounts: "ԶԵՂՉԵՐ",
//         priceOnRequest: "ԳՆԱՅԻՆ ՀԱՐՑՈՒՄ"
//     }
// };
//
// // ===================================================
// // SEARCH DATA
// // ===================================================
// const allPerfumes = [
//     { name: "Prada", url: "#" },
//     { name: "YSL", url: "#" },
//     { name: "Amouage", url: "#" },
//     { name: "Casamorati", url: "#" },
//     { name: "Ajmal", url: "#" },
//     { name: "Nina Ricci", url: "#" },
//     { name: "Dolce & Gabbana", url: "#" },
//     { name: "Clive Christian", url: "#" },
//     { name: "Carolina Herrera", url: "#" },
//     { name: "Bvlgari", url: "#" },
//     { name: "Lancome", url: "#" }
// ];
//
// // ===================================================
// // 1. ԿՈՄՊՈՆԵՆՏՆԵՐԻ ԱՎՏՈՄԱՏ ԲԵՌՆՈՒՄ (FETCH COMPONENTS)
// // ===================================================
// document.addEventListener("DOMContentLoaded", async () => {
//     const currentSavedLang = localStorage.getItem('selectedLang') || 'eng';
//
//     // 1. Բեռնում ենք Header-ը
//     const headerComponent = document.getElementById("header-component");
//     if (headerComponent) {
//         try {
//             const response = await fetch("/components/header.html");
//             const html = await response.text();
//             headerComponent.innerHTML = html;
//
//             if (typeof initSwipers === 'function') initSwipers();
//             initLanguageDropdown();
//         } catch (error) { console.error("Header load error:", error); }
//     }
//
//     // --- Price Filter-ի լսողները տեղադրիր այստեղ (դուրս հանեցինք header-ի if-ից) ---
//     const minInput = document.getElementById('minPrice');
//     const maxInput = document.getElementById('maxPrice');
//     const priceRange = document.getElementById('priceRange');
//
//     if (minInput && maxInput && priceRange) {
//         priceRange.addEventListener('input', function() {
//             maxInput.value = this.value;
//             filterProductsByPrice(); // Սա կանչում է քո 7-րդ կետի ֆունկցիան
//         });
//         minInput.addEventListener('input', filterProductsByPrice);
//         maxInput.addEventListener('input', filterProductsByPrice);
//     }
//     // --------------------------------------------------------------------------
//
//     // 2. Footer և Auth Modal
//     const footerComponent = document.getElementById("footer-component");
//     if (footerComponent) {
//         try {
//             const response = await fetch("/components/footer.html");
//             footerComponent.innerHTML = await response.text();
//         } catch (error) { console.error("Footer load error:", error); }
//     }
//
//     const authModalComponent = document.getElementById("auth-modal-component");
//     if (authModalComponent) {
//         try {
//             const response = await fetch("/components/auth-modal.html");
//             authModalComponent.innerHTML = await response.text();
//             if (typeof initAuthModal === 'function') initAuthModal();
//         } catch (error) { console.error("Auth Modal load error:", error); }
//     }
//     initLiveSearch();
//     applyTranslations(currentSavedLang);
// });
//
//
// // ===================================================
// // 2. AUTH MODAL LOGIC (LOGIN / SIGNUP & BACKEND)
// // ===================================================
// function initAuthModal() {
//     const authModal = document.getElementById('authModal');
//     if (!authModal) return;
//
//     document.addEventListener('click', function (e) {
//         const targetLink = e.target.closest('.tool-link');
//         if (targetLink && (targetLink.textContent.toLowerCase().includes('login') || targetLink.textContent.includes('Մուտք'))) {
//             e.preventDefault();
//             authModal.classList.add('active');
//             document.body.style.overflow = 'hidden';
//             return;
//         }
//         const isCloseBtn = e.target.closest('.hm-modal-close-btn');
//         const isOverlay = e.target.classList.contains('hm-modal-overlay');
//         if (isCloseBtn || isOverlay) {
//             authModal.classList.remove('active');
//             document.body.style.overflow = '';
//         }
//     });
//
//     const tabButtons = authModal.querySelectorAll('.hm-auth-tab-btn');
//     const tabContents = authModal.querySelectorAll('.hm-auth-tab-content');
//
//     tabButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             tabButtons.forEach(btn => btn.classList.remove('active'));
//             tabContents.forEach(content => content.classList.remove('active'));
//             this.classList.add('active');
//             const targetTabId = this.getAttribute('data-tab') + 'Tab';
//             const targetContent = document.getElementById(targetTabId);
//             if (targetContent) targetContent.classList.add('active');
//         });
//     });
//
//     authModal.addEventListener('click', async (e) => {
//         const target = e.target;
//         if (target.textContent && target.textContent.trim().toUpperCase() === 'SIGN UP' && target.tagName === 'BUTTON') {
//             e.preventDefault();
//             const container = target.closest('.hm-auth-tab-content');
//             const inputs = container.querySelectorAll('input');
//             const userData = {
//                 first_name: inputs[0] ? inputs[0].value.trim() : '',
//                 last_name: inputs[1] ? inputs[1].value.trim() : '',
//                 email: inputs[2] ? inputs[2].value.trim() : '',
//                 password: inputs[3] ? inputs[3].value : ''
//             };
//             if (!userData.first_name || !userData.last_name || !userData.email || !userData.password) {
//                 alert('Խնդրում ենք լրացնել բոլոր դաշտերը:');
//                 return;
//             }
//             try {
//                 const response = await fetch('/api/auth/signup', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(userData)
//                 });
//                 const data = await response.json();
//                 if (response.ok && data.success) {
//                     alert('Գրանցումը հաջողությամբ կատարվեց:');
//                     authModal.classList.remove('active');
//                     document.body.style.overflow = '';
//                     window.location.reload();
//                 } else {
//                     alert(data.message || 'Գրանցման սխալ:');
//                 }
//             } catch (error) {
//                 console.error('❌ Սխալ գրանցման ընթացքում:', error);
//             }
//         }
//         if (target.textContent && target.textContent.trim().toUpperCase() === 'LOG IN' && target.tagName === 'BUTTON') {
//             e.preventDefault();
//             const container = target.closest('.hm-auth-tab-content');
//             const inputs = container.querySelectorAll('input');
//             const loginData = {
//                 email: inputs[0] ? inputs[0].value.trim() : '',
//                 password: inputs[1] ? inputs[1].value : ''
//             };
//             if (!loginData.email || !loginData.password) {
//                 alert('Խնդրում ենք լրացնել EMAIL և PASSWORD դաշտերը:');
//                 return;
//             }
//             try {
//                 const response = await fetch('/api/auth/login', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(loginData)
//                 });
//                 const data = await response.json();
//                 if (response.ok && data.success) {
//                     alert(`Բարի գալուստ, ${data.user.first_name || 'Օգտատեր'}:`);
//                     authModal.classList.remove('active');
//                     document.body.style.overflow = '';
//                     window.location.reload();
//                 } else {
//                     alert(data.message || 'Մուտքի սխալ:');
//                 }
//             } catch (error) {
//                 console.error('❌ Սխալ մուտքի ընթացքում:', error);
//             }
//         }
//     });
// }
//
// // ===================================================
// // 3. SWIPER SLIDERS INITIALIZATION
// // ===================================================
// function initSwipers() {
//     // 1. Ստուգում ենք՝ արդյո՞ք Swiper գրադարանը հասանելի է
//     if (typeof Swiper === 'undefined') {
//         console.warn("⚠️ Swiper գրադարանը բեռնված չէ, սպասում ենք կամ բաց թողնում...");
//         return;
//     }
//
//     // 2. Ստուգում ենք՝ արդյո՞ք էջում կան սլայդերների կոնտեյներներ
//     const heroSlider = document.querySelector('.heroSwiper');
//     const productsSlider = document.querySelector('.productsSwiper');
//
//     // 3. Միացնում ենք միայն այն, ինչը գտնվել է էջում
//     if (heroSlider) {
//         new Swiper(".heroSwiper", {
//             loop: true,
//             effect: "slide",
//             speed: 1800,
//             autoplay: { delay: 3000, disableOnInteraction: false },
//             pagination: { el: ".swiper-pagination", clickable: true },
//             navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
//         });
//         console.log("✅ Hero Swiper-ը հաջողությամբ ակտիվացավ");
//     }
//
//     if (productsSlider) {
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
//         console.log("✅ Products Swiper-ը հաջողությամբ ակտիվացավ");
//     }
// }
//
//
// // ===================================================
// // 4. LANGUAGE DROPDOWN
// // ===================================================
// function initLanguageDropdown() {
//     const langBtn = document.getElementById('currentLang');
//     const langMenu = document.getElementById('langMenu');
//     if (!langBtn || !langMenu) return;
//
//     const currentSavedLang = localStorage.getItem('selectedLang') || 'eng';
//     langBtn.innerHTML = `${currentSavedLang === 'arm' ? 'Հայ' : 'Eng'} <i class="fa-solid fa-caret-down"></i>`;
//
//     document.querySelectorAll('.lang-item').forEach(item => {
//         item.classList.remove('active');
//         if (item.getAttribute('data-lang') === currentSavedLang) item.classList.add('active');
//     });
//
//     langBtn.addEventListener('click', (e) => {
//         e.stopPropagation();
//         langMenu.classList.toggle('show');
//     });
//
//     langMenu.addEventListener('click', (e) => {
//         const selectedItem = e.target.closest('.lang-item');
//         if (!selectedItem) return;
//         e.preventDefault();
//         const newLang = selectedItem.getAttribute('data-lang');
//         localStorage.setItem('selectedLang', newLang);
//         window.location.reload();
//     });
//
//     document.addEventListener('click', () => langMenu.classList.remove('show'));
// }
//
// // ===================================================
// // 5. APPLY TRANSLATIONS
// // ===================================================
// function applyTranslations(lang) {
//     const dict = translations[lang];
//     if (!dict) return;
//
//     const wTitle = document.getElementById('welcome-title');
//     if (wTitle) wTitle.textContent = dict.welcomeTitle;
//     const wText = document.getElementById('welcome-text');
//     if (wText) wText.textContent = dict.welcomeText;
//     const lMore = document.getElementById('load-more-btn');
//     if (lMore) lMore.textContent = dict.loadMore;
//
//     const shopLink = document.querySelector('.shop-link');
//     const otherLinks = document.querySelectorAll('.nav-links > li:not(.dropdown) a');
//     if (shopLink) shopLink.textContent = dict.shop;
//     if (otherLinks.length >= 4) {
//         otherLinks[0].textContent = dict.brands;
//         otherLinks[1].textContent = dict.giftcard;
//         otherLinks[2].textContent = dict.contacts;
//         otherLinks[3].textContent = dict.blog;
//     }
//
//     const search = document.querySelector('.search-box input');
//     if (search) search.placeholder = dict.search;
//     const login = document.querySelector('.tool-link');
//     if (login) login.innerHTML = `<i class="fa-regular fa-user"></i> ${dict.login}`;
//
//     document.querySelectorAll('.tab-btn').forEach(el => {
//         const dataTab = el.getAttribute('data-tab');
//         if (dataTab === 'new') el.textContent = dict.tabNew;
//         if (dataTab === 'best') el.textContent = dict.tabBestsellers;
//         if (dataTab === 'sale') el.textContent = dict.tabDiscounts;
//     });
// }
//
// // ===================================================
// // 6. FILTER LOGIC (PERFUME PAGE)
// // ===================================================
// // Ֆիլտրման լոգիկա
// document.addEventListener("DOMContentLoaded", () => {
//     // Լսում ենք միայն մեր ստեղծած gender-filter-ի ներսի checkbox-երը
//     const filterInputs = document.querySelectorAll('.gender-filter .filter-input');
//
//     filterInputs.forEach(input => {
//         input.addEventListener('change', filterProducts);
//     });
// });
//
// function filterProducts() {
//     // Հավաքում ենք բոլոր նշված (checked) արժեքները
//     const checkedValues = Array.from(document.querySelectorAll('.gender-filter .filter-input:checked'))
//         .map(c => c.value);
//
//     const products = document.querySelectorAll('.product-item');
//
//     products.forEach(product => {
//         const category = product.getAttribute('data-category');
//
//         // Եթե ոչինչ ընտրված չէ, ցույց ենք տալիս բոլորը
//         if (checkedValues.length === 0) {
//             product.style.display = 'block';
//         } else {
//             // Եթե ընտրված է, ցույց ենք տալիս միայն համապատասխանները
//             product.style.display = checkedValues.includes(category) ? 'block' : 'none';
//         }
//     });
// }
// // ===================================================
// // 7. PRICE FILTER LOGIC
// // ===================================================
// function filterProductsByPrice() {
//     const min = parseInt(document.getElementById('minPrice').value) || 0;
//     const max = parseInt(document.getElementById('maxPrice').value) || 1000000;
//
//     document.querySelectorAll('.product-item').forEach(p => {
//         const price = parseInt(p.getAttribute('data-price')) || 0;
//
//         // Ստուգում ենք թե՛ գինը, թե՛ gender-ի ֆիլտրը (միասին)
//         const genderChecked = Array.from(document.querySelectorAll('.gender-filter .filter-input:checked')).map(c => c.value);
//         const category = p.getAttribute('data-category');
//
//         const priceMatch = (price >= min && price <= max);
//         const genderMatch = (genderChecked.length === 0 || genderChecked.includes(category));
//
//         p.style.display = (priceMatch && genderMatch) ? 'block' : 'none';
//     });
// }
//
// // ===================================================
// // 8. LIVE SEARCH LOGIC
// // ===================================================
// function initLiveSearch() {
//     const searchBoxes = document.querySelectorAll('.search-box');
//
//     searchBoxes.forEach(box => {
//         const input = box.querySelector('input');
//         if (!input) return;
//
//         const resultsContainer = document.createElement('div');
//         resultsContainer.className = 'search-results-dropdown';
//         box.appendChild(resultsContainer);
//
//         input.addEventListener('input', (e) => {
//             const query = e.target.value.trim().toLowerCase();
//
//             resultsContainer.innerHTML = '';
//
//             if (!query) {
//                 resultsContainer.style.display = 'none';
//                 return;
//             }
//
//             const filtered = allPerfumes.filter(item =>
//                 item.name.toLowerCase().includes(query)
//             );
//
//             if (filtered.length === 0) {
//                 resultsContainer.style.display = 'none';
//                 return;
//             }
//
//             // filtered.forEach(itemData => {
//             //     const item = document.createElement('div');
//             //
//             //     item.className = 'search-result-item';
//             //
//             //     item.innerHTML = `
//             //         <span>${itemData.name}</span>
//             //     `;
//             //
//             //     item.addEventListener('click', () => {
//             //         input.value = itemData.name;
//             //         resultsContainer.innerHTML = '';
//             //         resultsContainer.style.display = 'none';
//             //     });
//             //
//             //     resultsContainer.appendChild(item);
//             // });
//             filtered.forEach(itemData => {
//                 // Ստեղծում ենք հղում (a), որը կտանի կոնկրետ ապրանքի էջ
//                 const item = document.createElement('a');
//                 item.className = 'search-result-item';
//
//                 // ԱՅՍՏԵՂ Է ԿԱՊԸ. Հղումը տանում է դեպի perfume.html
//                 // Մենք փոխանցում ենք անունը որպես պարամետր
//                 // app.js-ում
//                 item.href = `/pages/product-details.html?name=${encodeURIComponent(itemData.name)}`;
//
//                 item.innerHTML = `<span>${itemData.name}</span>`;
//
//                 // Եթե ցանկանում ես, որ սեղմելուց միանգամից փակվի dropdown-ը
//                 item.addEventListener('click', () => {
//                     resultsContainer.style.display = 'none';
//                 });
//
//                 resultsContainer.appendChild(item);
//             });
//
//
//             const allResults = document.createElement('div');
//
//             allResults.className = 'search-result-item all-results';
//
//             allResults.textContent = 'All Results';
//
//             allResults.addEventListener('click', () => {
//                 window.location.href =
//                     '/pages/perfume.html?search=' +
//                     encodeURIComponent(query);
//             });
//
//             resultsContainer.appendChild(allResults);
//
//             resultsContainer.style.display = 'block';
//         });
//
//         document.addEventListener('click', (e) => {
//             if (!box.contains(e.target)) {
//                 resultsContainer.style.display = 'none';
//             }
//         });
//     });
// }
//
// // ===================================================
// // 1. ԶԱՄԲՅՈՒՂԻ ՏՎՅԱԼՆԵՐԻ ՊԱՀՊԱՆՈՒՄ ԵՎ ՖՈՒՆԿՑԻԱՆԵՐ
// // ===================================================
//
// let cart = JSON.parse(localStorage.getItem('cart')) || [];
//
// function updateCartIcon() {
//     const cartCount = document.querySelector('.cart-count') || document.querySelector('.cart-link span');
//     if(cartCount) cartCount.textContent = cart.length;
// }
//
// // Ավելացնել զամբյուղին
// function addToCart(product) {
//     cart.push(product);
//     localStorage.setItem('cart', JSON.stringify(cart));
//     updateCartIcon();
//
//     // Ստուգում ենք՝ արդյո՞ք մոդալը բաց է, որպեսզի ավտոմատ թարմացնենք
//     const modal = document.querySelector('.cart-modal');
//     if (modal && modal.style.display === 'block') {
//         openCartModal();
//     } else {
//         alert(product.name + ' added to cart!');
//     }
// }
//
// function removeFromCart(index) {
//     cart.splice(index, 1);
//     localStorage.setItem('cart', JSON.stringify(cart));
//     updateCartIcon();
//     openCartModal();
// }
//
// function openCartModal() {
//     const modal = document.querySelector('.cart-modal');
//     if (!modal) return;
//
//     // Մոդալի տեղադրությունը և չափերը
//     modal.style.position = 'fixed';
//     modal.style.top = '20px';
//     modal.style.right = '20px'; // Սկզբնական դիրքը
//     modal.style.width = '550px'; // Ավելի լայն դարձրինք (400-ից 550)
//     modal.style.maxWidth = '90vw'; // Էկրանի լայնության 90%-ը
//
//     // Դիզայն
//     modal.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
//     modal.style.backdropFilter = 'blur(15px)';
//     modal.style.padding = '50px'; // Ավելի մեծ padding
//     modal.style.borderRadius = '30px';
//     modal.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)'; // Ստվեր՝ ավելի ծավալուն տեսքի համար
//     modal.style.color = 'black';
//     modal.style.zIndex = '1000'; // Համոզվելու համար, որ ամեն ինչի վերևում է
//
//     const list = modal.querySelector('.cart-items-list');
//     list.innerHTML = '';
//
//     if (cart.length === 0) {
//         list.innerHTML = '<p style="color:black; text-align:center; padding:40px;">YOUR CART IS EMPTY.</p>';
//     } else {
//         let total = 0;
//
//         cart.forEach((item, index) => {
//             const priceValue = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
//             total += priceValue;
//
//             list.innerHTML += `
//                 <div class="cart-item" style="display:flex; align-items:center; border-bottom:1px solid rgba(0,0,0,0.1); padding:25px 0; color:black;">
//                     <img src="${item.img || ''}" style="width:80px; height:80px; object-fit:cover; border-radius:15px; flex-shrink:0;">
//
//                     <div style="flex-grow:1; margin:0 30px; color:black; font-weight:600; font-size:1.1em;">
//                         ${item.name}
//                     </div>
//
//                     <div style="width: 70px; text-align: center; color:black;">1 pcs</div>
//
//                     <div style="width: 130px; text-align: right; color:black; font-weight:bold; font-size:1.1em;">
//                         ${item.price}
//                     </div>
//
//                     <button onclick="removeFromCart(${index})" style="background:none; border:none; cursor:pointer; color:black; margin-left:30px; font-size:1.5em;">🗑️</button>
//                 </div>
//             `;
//         });
//
//         list.innerHTML += `
//             <div class="cart-total" style="padding:30px 0; font-weight:bold; display:flex; justify-content:space-between; color:black; font-size:1.5em;">
//                 <span>Total:</span>
//                 <span>${total} ֏</span>
//             </div>
//             <button onclick="window.location.href='/pages/checkout.html'" style="background:black; color:white; border:none; padding:20px; width:100%; cursor:pointer; border-radius:15px; font-weight:bold; font-size:1.1em;">
//                 CHECKOUT
//             </button>
//         `;
//     }
//     modal.style.display = 'block';
// }
//
// function clearCart() {
//     cart = [];
//     localStorage.removeItem('cart');
//     updateCartIcon();
//     openCartModal();
// }
// function closeCartModal() {
//     const modal = document.querySelector('.cart-modal');
//     if (modal) {
//         modal.style.display = 'none';
//     }
// }
// // ===================================================
// // 2. ԻՍԿԱԿԱՆ ԻԼՈԳԻԿԱ (Event Listeners)
// // ===================================================
//
// document.addEventListener('DOMContentLoaded', () => {
//     updateCartIcon();
// });
//
// document.addEventListener('click', function(e) {
//     // ՈՒՂՂՎԱԾ՝ ավելացվել է նկարը վերցնելու տրամաբանությունը
//     if (e.target.classList.contains('buy-btn') || e.target.classList.contains('add-to-cart-btn')) {
//         e.preventDefault();
//
//         // Գտնում ենք ապրանքի կոնտեյները
//         const item = e.target.closest('.product-item') || e.target.closest('.product-card');
//
//         if (item) {
//             // Անունը գտնելու համար փնտրում ենք h3
//             const nameEl = item.querySelector('h3');
//             const name = nameEl ? nameEl.innerText.trim() : 'Product';
//
//             // Գինը գտնելու համար փնտրում ենք .product-price դասը
//             // Գինը գտնելու համար փնտրում ենք մի քանի հնարավոր տարբերակ
//             const priceEl = item.querySelector('.product-price') ||
//                 item.querySelector('.price') ||
//                 item.querySelector('.price-tag');
//
//             const price = priceEl ? priceEl.innerText.trim() : '0 ֏';
//
//             const img = item.querySelector('img') ? item.querySelector('img').src : '';
//
//             addToCart({ name, price, img });
//         }
//     }
//
//     // Զամբյուղի պատկերակի վրա սեղմելիս
//     if (e.target.closest('.cart-link')) {
//         e.preventDefault();
//         openCartModal();
//     }
// });
