// Fills the timeline line according to scroll progress.
import { reducedMotion } from "./motion.js";

export function initTimeline(el) {
    const list = el.querySelector(".timeline__list");

    if (!list) {
        return;
    }

    if (reducedMotion()) {
        list.style.setProperty("--progress", "1");
        return;
    }

    let ticking = false;

    const update = () => {
        ticking = false;

        if (!el.isConnected) {
            window.removeEventListener("scroll", onScroll);
            return;
        }

        const rect = list.getBoundingClientRect();
        const viewport = window.innerHeight * 0.6;
        const progress = Math.min(Math.max((viewport - rect.top) / rect.height, 0), 1);
        list.style.setProperty("--progress", progress.toFixed(3));
    };

    function onScroll() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
}
