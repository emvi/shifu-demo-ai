// Lightbox for gallery images using a native <dialog>. Links work without JS.
let dialog = null;
let items = [];
let index = 0;

const icon = (path) => `<svg class="icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"/></svg>`;

function ensureDialog() {
    if (dialog) {
        return dialog;
    }

    dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Bildansicht");
    dialog.innerHTML = `
        <figure class="lightbox__figure">
            <img class="lightbox__image" alt="" />
            <figcaption class="lightbox__caption"></figcaption>
        </figure>
        <button class="lightbox__button lightbox__button--prev" type="button" aria-label="Vorheriges Bild">${icon("M15 6l-6 6 6 6")}</button>
        <button class="lightbox__button lightbox__button--next" type="button" aria-label="Nächstes Bild">${icon("M9 6l6 6-6 6")}</button>
        <button class="lightbox__button lightbox__button--close" type="button" aria-label="Schließen">${icon("M6 6l12 12M18 6L6 18")}</button>`;

    dialog.querySelector(".lightbox__button--close").addEventListener("click", () => dialog.close());
    dialog.querySelector(".lightbox__button--prev").addEventListener("click", () => show(index - 1));
    dialog.querySelector(".lightbox__button--next").addEventListener("click", () => show(index + 1));
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog || event.target.classList.contains("lightbox__figure")) {
            dialog.close();
        }
    });
    dialog.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") show(index - 1);
        if (event.key === "ArrowRight") show(index + 1);
    });

    document.body.append(dialog);
    return dialog;
}

function show(i) {
    index = (i + items.length) % items.length;
    const link = items[index];
    const img = dialog.querySelector(".lightbox__image");
    img.src = link.href;
    img.alt = link.querySelector("img")?.alt || "";
    dialog.querySelector(".lightbox__caption").textContent = link.dataset.caption || "";
    const multiple = items.length > 1;
    dialog.querySelector(".lightbox__button--prev").hidden = !multiple;
    dialog.querySelector(".lightbox__button--next").hidden = !multiple;
}

export function initGallery(el) {
    // delegation: images added later in the admin work as well
    el.addEventListener("click", (event) => {
        const link = event.target.closest("[data-lightbox]");

        if (!link || typeof HTMLDialogElement === "undefined") {
            return;
        }

        event.preventDefault();
        items = Array.from(el.querySelectorAll("[data-lightbox]"));
        ensureDialog();
        show(items.indexOf(link));
        dialog.showModal();
    });
}
