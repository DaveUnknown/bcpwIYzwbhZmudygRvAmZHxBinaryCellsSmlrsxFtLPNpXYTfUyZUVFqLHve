export default function mouseMove(callback) {
    document.addEventListener("mousemove", (event) => {
        callback({ x: event.clientX, y: event.clientY });
    });

    document.addEventListener("touchmove", (event) => {
        event.preventDefault();
        const touch = event.touches[0];
        callback({ x: touch.clientX, y: touch.clientY });
    }, { passive: false });
}
