// Privacy-friendly YouTube embed: loads the player only on click.
export function initVideo(el) {
    const play = el.querySelector(".hole-card__play");
    const id = el.dataset.videoId;

    if (!play || !id) {
        return;
    }

    play.addEventListener("click", (event) => {
        event.preventDefault();
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
        iframe.title = play.getAttribute("aria-label") || "Video";
        iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        el.append(iframe);
        play.remove();
    });
}
