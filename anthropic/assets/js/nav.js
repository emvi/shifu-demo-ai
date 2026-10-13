const OPEN = "nav-item--open";

function setOpen(item, open) {
    item.classList.toggle(OPEN, open);
    item.querySelectorAll(".nav-item__trigger").forEach((trigger) => {
        trigger.setAttribute("aria-expanded", String(open));
    });
}

function closeAll(root = document, except = null) {
    root.querySelectorAll(`.${OPEN}`).forEach((item) => {
        if (item !== except) {
            setOpen(item, false);
        }
    });
}

function setMenu(header, open) {
    const toggle = header.querySelector(".header__toggle");
    header.classList.toggle("header--open", open);
    document.documentElement.classList.toggle("nav-open", open);

    if (toggle) {
        toggle.setAttribute("aria-expanded", String(open));
    }
}

// Global listeners are registered once and work on whatever header is in the DOM,
// so they keep working when the admin UI replaces the header markup.
let globalsBound = false;

function bindGlobals() {
    if (globalsBound) {
        return;
    }

    globalsBound = true;

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".nav-item--dropdown")) {
            closeAll();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") {
            return;
        }

        const openItem = document.querySelector(`.${OPEN}`);

        if (openItem) {
            closeAll();
            openItem.querySelector(".nav-item__trigger")?.focus();
            return;
        }

        const header = document.querySelector(".header--open");

        if (header) {
            setMenu(header, false);
            header.querySelector(".header__toggle")?.focus();
        }
    });

    const onScroll = () => {
        document.querySelectorAll(".header").forEach((header) => {
            header.classList.toggle("header--scrolled", window.scrollY > 8);
        });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
}

export function initNav(header) {
    bindGlobals();
    header.classList.add("header--js");

    const toggle = header.querySelector(".header__toggle");

    if (toggle) {
        toggle.hidden = false;
    }

    // delegated, so nav items added or re-rendered by the admin work as well
    header.addEventListener("click", (e) => {
        if (e.target.closest(".header__toggle")) {
            setMenu(header, !header.classList.contains("header--open"));
            return;
        }

        const trigger = e.target.closest(".nav-item__trigger");

        if (trigger) {
            const item = trigger.closest(".nav-item");
            const open = !item.classList.contains(OPEN);
            closeAll(document, item);
            setOpen(item, open);
        }
    });
}
