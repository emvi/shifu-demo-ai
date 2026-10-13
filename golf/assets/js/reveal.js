// Fade-in of cards and tiles as they scroll into view (purely decorative).
import { reducedMotion } from "./motion.js";

const selector = [
    ".quick-link",
    ".status-item",
    ".info-column",
    ".mosaic-item",
    ".stat-item",
    ".team-member",
    ".news-card",
    ".hole-card",
    ".timeline-step",
    ".faq-item",
].join(",");

let observer = null;

export function initReveal(root = document) {
    if (reducedMotion() || !("IntersectionObserver" in window)) {
        return;
    }

    observer ??= new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.classList.add("is-visible");
                observer.unobserve(target);
                // drop the stagger delay afterwards so hover effects react instantly
                setTimeout(() => { target.style.transitionDelay = ""; }, 1000);
            }
        });
    }, { rootMargin: "0px 0px -10% 0px" });

    root.querySelectorAll(selector).forEach((el) => {
        if (el.dataset.reveal) {
            return;
        }

        el.dataset.reveal = "true";
        // stagger siblings slightly
        const siblingIndex = Array.prototype.indexOf.call(el.parentElement?.children || [], el);
        el.style.transitionDelay = `${Math.min(Math.max(siblingIndex, 0), 5) * 70}ms`;
        el.classList.add("reveal");
        observer.observe(el);
    });
}
