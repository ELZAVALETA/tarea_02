function createAudioPlayer(containerId, audioFilePath, audioTitle = "") {
  const container = document.getElementById(containerId);
  container.classList.add("audio-player-box");

  // Título
  const title = document.createElement("div");
  title.className = "audio-title";
  title.textContent = audioTitle;
  container.appendChild(title);

  // Waveform
  const waveformDiv = document.createElement("div");
  waveformDiv.id = `${containerId}-waveform`;
  waveformDiv.className = "wave";
  container.appendChild(waveformDiv);

  // Controles
  const controlsDiv = document.createElement("div");
  controlsDiv.className = "controls";

  // Botón Play/Pause
  const playButton = document.createElement("button");
  playButton.id = `${containerId}-play`;
  playButton.textContent = "▶";

  // Tiempo
  const timeDiv = document.createElement("div");
  timeDiv.className = "time-display";
  timeDiv.textContent = "0:00 / 0:00";

  // Volumen
  const volumeSlider = document.createElement("input");
  volumeSlider.id = `${containerId}-volume`;
  volumeSlider.type = "range";
  volumeSlider.min = "0";
  volumeSlider.max = "1";
  volumeSlider.step = "0.01";
  volumeSlider.value = "1";

  // Agregar controles en orden: botón → tiempo → volumen
  controlsDiv.appendChild(playButton);
  controlsDiv.appendChild(timeDiv);
  controlsDiv.appendChild(volumeSlider);
  container.appendChild(controlsDiv);

  // WaveSurfer
  const wavesurfer = WaveSurfer.create({
    container: `#${containerId}-waveform`,
    waveColor: "#ccc",
    progressColor: "#2196f3",
    cursorWidth: 0, // ← elimina la línea vertical
    height: 80
  });

  wavesurfer.load(audioFilePath);

  // Reproducción
  playButton.addEventListener("click", () => {
    wavesurfer.playPause();
  });

  wavesurfer.on("play", () => {
    playButton.textContent = "❚❚";
  });

  wavesurfer.on("pause", () => {
    playButton.textContent = "▶";
  });

  wavesurfer.on("finish", () => {
    playButton.textContent = "▶";
  });

  // Tiempo
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  wavesurfer.on("ready", () => {
    const duration = formatTime(wavesurfer.getDuration());
    timeDiv.textContent = `0:00 / ${duration}`;
  });

  wavesurfer.on("audioprocess", () => {
    if (wavesurfer.isPlaying()) {
      const current = formatTime(wavesurfer.getCurrentTime());
      const duration = formatTime(wavesurfer.getDuration());
      timeDiv.textContent = `${current} / ${duration}`;
    }
  });

  wavesurfer.on("seek", () => {
    const current = formatTime(wavesurfer.getCurrentTime());
    const duration = formatTime(wavesurfer.getDuration());
    timeDiv.textContent = `${current} / ${duration}`;
  });

  // Volumen
  volumeSlider.addEventListener("input", (e) => {
    wavesurfer.setVolume(e.target.value);
  });
}
