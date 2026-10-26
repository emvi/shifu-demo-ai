import { initNav } from "./nav.js";

const components = {
    nav: initNav,
};

function init(root = document) {
    root.querySelectorAll("[data-component]").forEach((el) => {
        if (el.dataset.componentReady) {
            return;
        }

        const fn = components[el.dataset.component];

        if (fn) {
            fn(el);
            el.dataset.componentReady = "true";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    init();
    // the admin UI swaps element HTML in place after edits
    new MutationObserver(() => init()).observe(document.body, { childList: true, subtree: true });
});
