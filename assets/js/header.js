// Sticky header: scrolled state, mobile off-canvas panel, dropdown toggles.
const desktop = window.matchMedia("(min-width: 1100px)");

export function initHeader(el) {
    const toggle = el.querySelector(".header__toggle");

    const onScroll = () => {
        if (!el.isConnected) {
            window.removeEventListener("scroll", onScroll);
            return;
        }

        el.classList.toggle("header--scrolled", window.scrollY > 24);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const setOpen = (open) => {
        el.classList.toggle("header--open", open);
        document.body.classList.toggle("is-locked", open);

        if (toggle) {
            toggle.setAttribute("aria-expanded", String(open));
        }
    };

    if (toggle) {
        toggle.addEventListener("click", () => setOpen(!el.classList.contains("header--open")));
    }

    // Event delegation, so nav items added later by the admin work too.
    el.addEventListener("click", (event) => {
        const subToggle = event.target.closest(".nav-item__toggle");

        if (subToggle) {
            const item = subToggle.closest(".nav-item");
            const open = !item.classList.contains("nav-item--open");

            el.querySelectorAll(".nav-item--open").forEach((other) => {
                if (other !== item) {
                    other.classList.remove("nav-item--open");
                    other.querySelector(".nav-item__toggle")?.setAttribute("aria-expanded", "false");
                }
            });

            item.classList.toggle("nav-item--open", open);
            subToggle.setAttribute("aria-expanded", String(open));
            return;
        }

        // close the mobile panel when following an in-page link
        if (event.target.closest(".header__panel a") && !desktop.matches) {
            setOpen(false);
        }
    });

    // A parent item without a link (rendered as <span>) opens its submenu on mobile
    el.addEventListener("click", (event) => {
        const label = event.target.closest("span.nav-item__link");

        if (label) {
            label.parentElement.querySelector(".nav-item__toggle")?.click();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && el.isConnected) {
            setOpen(false);
            el.querySelectorAll(".nav-item--open").forEach((item) => item.classList.remove("nav-item--open"));
        }
    });

    document.addEventListener("click", (event) => {
        if (el.isConnected && desktop.matches && !el.contains(event.target)) {
            el.querySelectorAll(".nav-item--open").forEach((item) => item.classList.remove("nav-item--open"));
        }
    });

    desktop.addEventListener("change", () => setOpen(false));
}
