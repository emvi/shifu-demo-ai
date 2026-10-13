// Keeps only one <details> open at a time inside the element.
// Works without JS too (then several can be open at once).
export function initAccordion(el) {
    // "toggle" does not bubble, so listen in the capture phase
    el.addEventListener("toggle", (e) => {
        const details = e.target;

        if (!(details instanceof HTMLDetailsElement) || !details.open) {
            return;
        }

        el.querySelectorAll("details[open]").forEach((other) => {
            if (other !== details) {
                other.open = false;
            }
        });
    }, true);
}
