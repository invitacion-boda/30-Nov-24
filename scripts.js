AOS.init();

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const playPauseIcon = document.getElementById("playPauseIcon");
    const progressBar = document.getElementById("progressBar");
    let isPlaying = false;

    playPauseBtn.addEventListener("click", function () {
        if (isPlaying) {
            audio.pause();
            playPauseIcon.classList.remove("fa-pause");
            playPauseIcon.classList.add("fa-play");
        } else {
            audio.play();
            playPauseIcon.classList.remove("fa-play");
            playPauseIcon.classList.add("fa-pause");
        }
        isPlaying = !isPlaying;
    });

    audio.addEventListener("timeupdate", function () {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
    });

    progressBar.addEventListener("input", function () {
        const value = progressBar.value;
        audio.currentTime = (value / 100) * audio.duration;
    });

    // Inicializar el ícono del botón
    playPauseIcon.classList.add("fa-play");
});

$(document).ready(function () {
    function updateCountdown() {
        const eventDate = new Date("2024-11-30T18:30:00"); // Fecha del evento
        const now = new Date();
        const timeDifference = eventDate - now;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        $("#days .countdown-number").text(days.toString().padStart(2, "0"));
        $("#hours .countdown-number").text(hours.toString().padStart(2, "0"));
        $("#minutes .countdown-number").text(minutes.toString().padStart(2, "0"));
        $("#seconds .countdown-number").text(seconds.toString().padStart(2, "0"));

        // Si la cuenta regresiva ha terminado
        if (timeDifference < 0) {
            clearInterval(countdownInterval);
            $("#days .countdown-number").text("00");
            $("#hours .countdown-number").text("00");
            $("#minutes .countdown-number").text("00");
            $("#seconds .countdown-number").text("00");
        }
    }

    // Actualiza la cuenta regresiva cada segundo
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Llamada inicial para mostrar el tiempo inmediatamente
    updateCountdown();
});

document.getElementById("rsvp-form").addEventListener("submit", function (event) {
    event.preventDefault();
$("#formStatus").hide();
$("#loading").show();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch("https://script.google.com/macros/s/AKfycbxwskFzH9x6KU0bb9MLKBe68dEEfjMMnz3XL83_9nB9p0LHirsx_k-d_0RpKU7SHgjB/exec", {
        method: "POST",
        contentType: "application/json",
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            const messageDiv = document.getElementById("formStatus");
            if (result.result === "success") {
                messageDiv.innerHTML = "<b>Datos enviados con éxito.</b>";
                messageDiv.style.color = "#FF66B2"; // Estilo opcional
                event.target.reset(); // Limpia el formulario
$("#formStatus").show();
$("#loading").hide();
            } else {
                messageDiv.innerHTML = "<b>Hubo un error al enviar los datos.</b>";
                messageDiv.style.color = "red"; // Estilo opcional
$("#formStatus").show();
$("#loading").hide();
            }
        })
        .catch((error) => {
            const messageDiv = document.getElementById("formStatus");
            console.error("Error:", error);
            messageDiv.innerHTML = "<b>Hubo un error al enviar los datos.</b>";
            messageDiv.style.color = "red"; // Estilo opcional
$("#formStatus").show();
$("#loading").hide();
        });
});
