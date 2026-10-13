// Shared helpers.
export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function onVisible(el, callback, options = { threshold: 0.3 }) {
    if (!("IntersectionObserver" in window)) {
        callback();
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                observer.disconnect();
                callback();
            }
        });
    }, options);

    observer.observe(el);
}
