// Entrypoint bundled by Shifu (config.json → js). Components are bound via
// data-component="<name>" and initialised idempotently, so elements that the
// admin inserts or re-renders are picked up as well.
import { initHeader } from "./header.js";
import { initStats } from "./stats.js";
import { initSlider } from "./slider.js";
import { initParallax } from "./parallax.js";
import { initCarousel } from "./carousel.js";
import { initMap } from "./map.js";
import { initVideo } from "./video.js";
import { initGallery } from "./gallery.js";
import { initTimeline } from "./timeline.js";
import { initReveal } from "./reveal.js";

document.documentElement.classList.remove("no-js");

const components = {
    header: initHeader,
    stats: initStats,
    slider: initSlider,
    parallax: initParallax,
    carousel: initCarousel,
    map: initMap,
    video: initVideo,
    gallery: initGallery,
    timeline: initTimeline,
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

    initReveal(root);
}

document.addEventListener("DOMContentLoaded", () => {
    init();
    // the admin UI swaps element HTML in place after edits
    new MutationObserver(() => init()).observe(document.body, { childList: true, subtree: true });
});
