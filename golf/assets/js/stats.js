// Counts numbers up once the section becomes visible.
import { onVisible, reducedMotion } from "./motion.js";

function animate(el) {
    const raw = el.dataset.count || "";
    const target = parseFloat(raw.replace(",", "."));

    if (Number.isNaN(target) || reducedMotion()) {
        return;
    }

    const decimals = (raw.split(/[.,]/)[1] || "").length;
    const duration = 1400;
    const start = performance.now();

    const frame = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (target * eased).toFixed(decimals).replace(".", raw.includes(",") ? "," : ".");

        if (t < 1) {
            requestAnimationFrame(frame);
        } else {
            el.textContent = raw;
        }
    };

    requestAnimationFrame(frame);
}

export function initStats(el) {
    onVisible(el, () => el.querySelectorAll("[data-count]").forEach(animate));
}
