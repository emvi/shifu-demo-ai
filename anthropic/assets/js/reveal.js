let observer = null;

function getObserver() {
    if (!observer) {
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal--visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    }

    return observer;
}

// Fades sections in when they scroll into view. Content stays visible without JS
// because the hidden state is only applied here.
export function initReveal(el) {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    el.classList.add("reveal");
    getObserver().observe(el);
}
