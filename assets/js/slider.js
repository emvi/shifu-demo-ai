// Enhances the scroll-snap slider with thumbnails, arrows, active state and autoplay.
import { reducedMotion } from "./motion.js";

export function initSlider(el) {
    const track = el.querySelector(".slider__track");
    const thumbs = el.querySelector(".slider__thumbs");
    const prev = el.querySelector(".slider__arrow--prev");
    const next = el.querySelector(".slider__arrow--next");

    if (!track || !thumbs) {
        return;
    }

    const slides = () => Array.from(track.querySelectorAll(":scope > .slide"));
    let active = 0;
    let timer = null;

    const goTo = (index) => {
        const list = slides();

        if (!list.length) {
            return;
        }

        const i = (index + list.length) % list.length;
        track.scrollTo({ left: list[i].offsetLeft, behavior: reducedMotion() ? "auto" : "smooth" });
    };

    const setActive = (index) => {
        active = index;
        slides().forEach((slide, i) => slide.classList.toggle("is-active", i === index));
        thumbs.querySelectorAll(".slider__thumb").forEach((thumb, i) => thumb.setAttribute("aria-current", String(i === index)));
    };

    const buildThumbs = () => {
        thumbs.replaceChildren(...slides().map((slide, i) => {
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.type = "button";
            button.className = "slider__thumb";
            button.setAttribute("aria-label", `${i + 1}: ${slide.dataset.thumbTitle || ""}`);

            if (slide.dataset.thumbImage) {
                const img = document.createElement("img");
                img.src = slide.dataset.thumbImage;
                img.alt = "";
                img.loading = "lazy";
                button.append(img);
            }

            const text = document.createElement("span");
            const title = document.createElement("span");
            title.className = "slider__thumb-title";
            title.textContent = slide.dataset.thumbTitle || "";
            text.append(title);

            if (slide.dataset.thumbText) {
                const sub = document.createElement("span");
                sub.className = "slider__thumb-text";
                sub.textContent = slide.dataset.thumbText;
                text.append(sub);
            }

            button.append(text);
            button.addEventListener("click", () => {
                stop();
                goTo(i);
            });
            li.append(button);
            return li;
        }));
        setActive(Math.min(active, slides().length - 1));
    };

    const onScroll = () => {
        const index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));

        if (index !== active) {
            setActive(index);
        }
    };

    const start = () => {
        const seconds = parseInt(el.dataset.autoplay || "0", 10);

        if (seconds > 0 && !reducedMotion()) {
            stop();
            timer = setInterval(() => goTo(active + 1), seconds * 1000);
        }
    };

    function stop() {
        clearInterval(timer);
        timer = null;
    }

    prev?.addEventListener("click", () => { stop(); goTo(active - 1); });
    next?.addEventListener("click", () => { stop(); goTo(active + 1); });
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("pointerdown", stop);
    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", start);
    el.addEventListener("focusin", stop);

    el.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") { stop(); goTo(active - 1); }
        if (event.key === "ArrowRight") { stop(); goTo(active + 1); }
    });

    // rebuild thumbnails when slides are added/edited in the admin
    new MutationObserver(buildThumbs).observe(track, { childList: true });

    buildThumbs();
    el.classList.add("is-ready");
    start();
}
