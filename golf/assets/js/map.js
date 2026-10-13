// Two-click map: the Google Maps iframe is only loaded after consent.
export function initMap(el) {
    const button = el.querySelector(".map-contact__load");

    if (!button || !el.dataset.mapSrc) {
        return;
    }

    button.addEventListener("click", () => {
        const iframe = document.createElement("iframe");
        iframe.src = el.dataset.mapSrc;
        iframe.title = "Karte";
        iframe.loading = "lazy";
        iframe.referrerPolicy = "no-referrer-when-downgrade";
        iframe.allowFullscreen = true;
        el.querySelector(".map-contact__consent")?.remove();
        el.append(iframe);
    });
}
