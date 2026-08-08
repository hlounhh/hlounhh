/**
 * CORE LOGIC — HOÀNG TRỌNG LƯƠNG PORTFOLIO
 * Implements typewriter effect, viewport scroll animations, and dynamic JSON-based localization.
 */

// Embedded fallback translations in case of CORS limitations when opening via file:// protocol
const fallbackTranslations = {
    "vi": {
        "title": "Hoàng Trọng Lương — Kỹ sư Phần mềm",
        "title_role": "Web Developer & Automation Machine",
        "bio": "Xây dựng các công cụ tự động hóa cá nhân, hiệu quả và có giá trị sử dụng thực tế.",
        "label_stack": "CÔNG NGHỆ",
        "label_location": "ĐỊA ĐIỂM",
        "val_location": "Việt Nam",
        "label_status": "TRẠNG THÁI",
        "val_status": "Buồn Ngủ, Nhớ Em",
        "quote": "“Xem quyết tâm đưa một kẻ bình thường đi được bao xa.”",
        "license_label": "Giấy phép mã nguồn mở yêu thích:",
        "meta_featured": "FEATURED WORK",
        "view_source": "Xem mã nguồn",
        "meta_repos": "REPOSITORIES",
        "title_repos": "Kho mã nguồn GitHub",
        "desc_repo_profile": "Repository chứa cấu hình thông tin cá nhân hiển thị trên trang GitHub Profile.",
        "meta_timeline": "EXPERIENCE",
        "title_timeline": "Tiến trình hoạt động",
        "time_daily": "HẰNG NGÀY",
        "title_daily": "Phát triển dự án EduZone",
        "text_daily": "Học thế hệ mới, hòa mình cùng AI.",
        "time_winnest": "2025 - 2026",
        "title_winnest_exp": "Phát triển các dự án cá nhân",
        "text_winnest_exp": "Thiết kế giải pháp tự động hóa và xây dựng phòng thí nghiệm tự động."
    },
    "en": {
        "title": "Hoàng Trọng Lương — Software Engineer",
        "title_role": "Web Developer & Automation Machine",
        "bio": "Building personal automation tools that are efficient and practical for real-world use.",
        "label_stack": "TECHNOLOGY",
        "label_location": "LOCATION",
        "val_location": "Vietnam",
        "label_status": "STATUS",
        "val_status": "Sleepy, Miss You",
        "quote": "“Let’s see how far sheer determination can take an ordinary person.”",
        "license_label": "Preferred open-source license:",
        "meta_featured": "FEATURED WORK",
        "view_source": "View Source",
        "meta_repos": "REPOSITORIES",
        "title_repos": "GitHub Repositories",
        "desc_repo_profile": "Repository containing personal settings displayed on the GitHub Profile page.",
        "meta_timeline": "EXPERIENCE",
        "title_timeline": "Technical Timeline",
        "time_daily": "DAILY",
        "title_daily": "Developing EduZone Project",
        "text_daily": "Next-generation learning powered by AI integration.",
        "time_winnest": "2025 - 2026",
        "title_winnest_exp": "Personal Projects Development",
        "text_winnest_exp": "Designing automation solutions and building automated laboratory environments."
    }
};

const fallbackRepos = [
    {
        "name": "AutoLab",
        "url": "https://github.com/hlounhh/AutoLab",
        "visibility": "Public",
        "lang": "Python",
        "lang_class": "py",
        "stars": 12,
        "description": {
            "vi": "Hệ thống tự động hóa môi trường thử nghiệm và tối ưu quy trình kiểm thử phần mềm.",
            "en": "Automated laboratory testing environment and software workflow optimization."
        }
    },
    {
        "name": "hlounhh",
        "url": "https://github.com/hlounhh/hlounhh",
        "visibility": "Public",
        "lang": "HTML",
        "lang_class": "html",
        "stars": 6,
        "description": {
            "vi": "Không gian lưu trữ thông tin cá nhân, định hình phong cách và dự án.",
            "en": "Personal identity repository showcasing portfolio details and projects."
        }
    }
];

let activeTranslations = fallbackTranslations;
let reposList = fallbackRepos;
let currentLang = localStorage.getItem("preferred-lang") || "vi";

document.addEventListener("DOMContentLoaded", () => {
    initLocalization();
    initTypewriter("typing-name", "Hoàng Trọng Lương", 80);
    initScrollReveal();
});

/**
 * Loads translations, popular work, and repositories from JSON files.
 */
async function initLocalization() {
    console.log("[i18n] Loading configurations...");
    
    // 1. Fetch Translations
    try {
        const response = await fetch(
            "translations.json?v=" + Date.now(),
            {
                cache: "no-store"
            }
        );

        if (response.ok) {
            activeTranslations = await response.json();
        }
    } catch (e) {
        console.warn("[i18n] translations.json fetch failed (CORS mode active).");
    }

    // 3. Fetch Repositories
    try {
        const repoRes = await fetch(
            "repositories.json?v=" + Date.now(),
            {
                cache: "no-store"
            }
        );

        if (repoRes.ok) {
            reposList = await repoRes.json();
        }
    } catch (e) {
        console.warn("[i18n] repositories.json fetch failed (CORS mode active).");
    }

    // Apply translations and render dynamic blocks
    applyLanguage(currentLang);

    // Setup switch button event listeners
    const viBtn = document.getElementById("lang-btn-vi");
    const enBtn = document.getElementById("lang-btn-en");

    if (viBtn && enBtn) {
        viBtn.addEventListener("click", () => switchLanguage("vi"));
        enBtn.addEventListener("click", () => switchLanguage("en"));
    }
}

/**
 * Switches current language and updates UI.
 * @param {string} lang - Language code ('vi' or 'en').
 */
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("preferred-lang", lang);
    applyLanguage(lang);
}

/**
 * Translates DOM elements and dynamically renders list elements.
 * @param {string} lang - Language code ('vi' or 'en').
 */
function applyLanguage(lang) {
    const i18nElements = document.querySelectorAll("[data-i18n]");
    const dict = activeTranslations[lang] || fallbackTranslations[lang];

    if (!dict) return;

    i18nElements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key] !== undefined) {
            el.textContent = dict[key];
        }
    });

    // Update document title
    if (dict["title"]) {
        document.title = dict["title"];
    }

    // Render Dynamic Content blocks
    renderDynamicContent(lang, dict);

    // Update active class on switch buttons
    const viBtn = document.getElementById("lang-btn-vi");
    const enBtn = document.getElementById("lang-btn-en");

    if (viBtn && enBtn) {
        if (lang === "vi") {
            viBtn.classList.add("active");
            enBtn.classList.remove("active");
        } else {
            enBtn.classList.add("active");
            viBtn.classList.remove("active");
        }
    }
}

/**
 * Renders the projects and repositories markup based on selected language.
 * @param {string} lang - Selected language ('vi' or 'en').
 * @param {object} dict - Localized text dictionary.
 */
function renderDynamicContent(lang, dict) {
    // Render Repositories Grid
    const reposContainer = document.getElementById("repos-container");
    if (reposContainer) {
        reposContainer.innerHTML = "";
        reposList.forEach(repo => {
            const desc = repo.description[lang] || repo.description["vi"];
            const repoCard = document.createElement("a");
            repoCard.href = repo.url;
            repoCard.target = "_blank";
            repoCard.rel = "noopener noreferrer";
            repoCard.className = "repo-item-card";

            repoCard.innerHTML = `
                <div class="repo-card-top">
                    <div class="repo-title">
                        <i class="ph ph-git-fork"></i>
                        <span class="repo-anchor">${repo.name}</span>
                    </div>
                    <span class="tag-pub">${repo.visibility}</span>
                </div>
                <p class="repo-description">${desc}</p>
                <div class="repo-card-bottom">
                    <span class="lang"><span class="indicator ${repo.lang_class}"></span>${repo.lang}</span>
                </div>
            `;
            reposContainer.appendChild(repoCard);
        });
    }
}

/**
 * Creates a natural, custom typewriter effect with a blinking cursor.
 */
function initTypewriter(elementId, textToType, speed = 80) {
    const container = document.getElementById(elementId);
    if (!container) return;

    container.textContent = "";

    const textSpan = document.createElement("span");
    container.appendChild(textSpan);

    const cursorSpan = document.createElement("span");
    cursorSpan.className = "typewriter-cursor";
    cursorSpan.textContent = "|";
    container.appendChild(cursorSpan);

    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            textSpan.textContent += textToType.charAt(charIndex);
            charIndex++;
            const randomizedDelay = speed + (Math.random() * 40 - 20);
            setTimeout(type, randomizedDelay);
        } else {
            setTimeout(() => {
                cursorSpan.style.transition = "opacity 0.5s ease";
                cursorSpan.style.opacity = "0";
                setTimeout(() => cursorSpan.remove(), 500);
            }, 3000);
        }
    }

    setTimeout(type, 300);
}

/**
 * Initializes the IntersectionObserver for entry animations.
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".scroll-reveal");
    revealElements.forEach(el => {
        el.classList.add("reveal-active");
    });
}
