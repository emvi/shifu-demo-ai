import { initNav } from "./nav.js";
import { initAccordion } from "./accordion.js";
import { initReveal } from "./reveal.js";

// data-component may contain several space-separated component names
const components = {
    nav: initNav,
    accordion: initAccordion,
    reveal: initReveal,
};

function init(root = document) {
    root.querySelectorAll("[data-component]").forEach((el) => {
        if (el.dataset.componentReady) {
            return;
        }

        el.dataset.component.split(/\s+/).forEach((name) => {
            const fn = components[name];

            if (fn) {
                fn(el);
            }
        });

        el.dataset.componentReady = "true";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    init();
    // the admin UI swaps element HTML in place after edits
    new MutationObserver(() => init()).observe(document.body, { childList: true, subtree: true });
});
