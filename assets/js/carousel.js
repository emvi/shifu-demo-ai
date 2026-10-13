// Auto-scrolling logo strip. Pauses on hover/focus/touch, respects reduced motion.
import { reducedMotion } from "./motion.js";

export function initCarousel(el) {
    const track = el.querySelector(".logos__track");

    if (!track || reducedMotion()) {
        return;
    }

    let paused = false;

    const step = () => {
        if (!el.isConnected) {
            clearInterval(timer);
            return;
        }

        if (paused || track.scrollWidth <= track.clientWidth) {
            return;
        }

        const item = track.querySelector(".logo-item");
        const width = item ? item.getBoundingClientRect().width + 16 : 200;
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
        track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + width, behavior: "smooth" });
    };

    const timer = setInterval(step, 3500);
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);
    track.addEventListener("pointerdown", pause);
}
