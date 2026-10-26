export function initNav(el) {
    const toggle = el.querySelector(".header__toggle");

    if (!toggle) {
        return;
    }

    toggle.addEventListener("click", () => {
        const open = el.classList.toggle("header--open");
        toggle.setAttribute("aria-expanded", String(open));
    });
}
