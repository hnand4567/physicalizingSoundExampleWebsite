const audioUpload = document.getElementById("audioUpload");
const sampleAudio = document.getElementById("sampleAudio");
const loadSample = document.getElementById("loadSample");

const audioPlayer = document.getElementById("audioPlayer");

const fileName = document.getElementById("fileName");
const duration = document.getElementById("duration");

const statusMessage = document.getElementById("statusMessage");

const trimSection = document.getElementById("trimSection");

const startSlider = document.getElementById("startSlider");
const endSlider = document.getElementById("endSlider");

const previewTrim = document.getElementById("previewTrim");
const applyTrim = document.getElementById("applyTrim");

let currentAudio = null;
let originalDuration = 0;

// =========================
// LOAD AUDIO
// =========================

function loadAudio(src, name) {

    audioPlayer.src = src;
    fileName.textContent = name;
    statusMessage.textContent = "Audio loaded successfully.";

}

// Upload
audioUpload.addEventListener("change", function () {

    const file = this.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    loadAudio(url, file.name);

});

// Sample
loadSample.addEventListener("click", function () {

    if (!sampleAudio.value) return;

    const name = sampleAudio.value.split("/").pop();

    loadAudio(sampleAudio.value, name);

});

// =========================
// METADATA
// =========================

audioPlayer.addEventListener("loadedmetadata", function () {

    originalDuration = audioPlayer.duration;

    duration.textContent = originalDuration.toFixed(2) + " sec";

    startSlider.max = Math.floor(originalDuration);
    endSlider.max = Math.floor(originalDuration);

    endSlider.value = Math.min(10, Math.floor(originalDuration));

    if (originalDuration > 10) {
        trimSection.classList.remove("hidden");
        statusMessage.textContent = "Audio is longer than 10 seconds. You can trim it.";
    } else {
        trimSection.classList.add("hidden");
    }

});

// =========================
// PREVIEW TRIM
// =========================

previewTrim.addEventListener("click", function () {

    audioPlayer.currentTime = startSlider.value;
    audioPlayer.play();

    const stopTime = parseFloat(endSlider.value);

    const check = setInterval(() => {

        if (audioPlayer.currentTime >= stopTime) {
            audioPlayer.pause();
            clearInterval(check);
        }

    }, 200);

});

// =========================
// APPLY TRIM (SIMULATED)
// =========================

applyTrim.addEventListener("click", function () {

    audioPlayer.currentTime = startSlider.value;

    statusMessage.textContent =
        `Trim applied (preview mode): ${startSlider.value}s → ${endSlider.value}s`;

});
