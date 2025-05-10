document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".scroll-controlled-video");

  videos.forEach(video => {
    let isHovering = false;
    let lastScrollTop = 0;

    // Evita que el video se reproduzca automáticamente
    video.pause();
    video.currentTime = 0;

    // Cuando el cursor entra
    video.addEventListener("mouseenter", () => {
      isHovering = true;
    });

    // Cuando el cursor sale
    video.addEventListener("mouseleave", () => {
      isHovering = false;
    });

    // Control del scroll global
    window.addEventListener("wheel", event => {
      if (!isHovering) return; // Solo activa si el cursor está sobre el video

      event.preventDefault(); // Previene el scroll normal

      // Dirección del scroll
      const delta = Math.sign(event.deltaY);

      // Control proporcional del video
      const speed = 0.005; // Ajusta esta constante según sensibilidad deseada
      video.currentTime += delta * speed * video.duration;

      // Limita entre 0 y duración máxima
      if (video.currentTime < 0) video.currentTime = 0;
      if (video.currentTime > video.duration) video.currentTime = video.duration;
    }, { passive: false });
  });
});
