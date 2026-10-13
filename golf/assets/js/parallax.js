// Gentle parallax for elements with data-parallax-layer="<speed>" inside the component.
import { reducedMotion } from "./motion.js";

export function initParallax(el) {
    if (reducedMotion()) {
        return;
    }

    let ticking = false;

    const update = () => {
        ticking = false;

        if (!el.isConnected) {
            window.removeEventListener("scroll", onScroll);
            return;
        }

        const rect = el.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - window.innerHeight / 2;

        el.querySelectorAll("[data-parallax-layer]").forEach((layer) => {
            const speed = parseFloat(layer.dataset.parallaxLayer) || 0;
            layer.style.translate = `0 ${(offset * speed).toFixed(1)}px`;
        });
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
