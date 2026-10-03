document.addEventListener("DOMContentLoaded", function () {
    const birthdayLoader = document.getElementById("birthday-loader");
    const birthdayLoaderProgress = document.getElementById("birthday-loader-progress");
    const birthdayLoaderFill = document.getElementById("birthday-loader-progress-fill");
    const loadingStartedAt = performance.now();
    let loadingProgress = 0;
    document.body.classList.add("is-loading");

    const loadingProgressTimer = window.setInterval(() => {
        loadingProgress = Math.min(92, loadingProgress + 2.8);
        birthdayLoaderFill.style.width = `${loadingProgress}%`;
        birthdayLoaderProgress.setAttribute("aria-valuenow", String(Math.round(loadingProgress)));
    }, 60);

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const ambientContainer = document.querySelector(".ambient-particles");
    const particleColors = ["#7d1d2c", "#c63d58", "#d8a448", "#f0a3b0"];
    for (let index = 0; index < 44; index++) {
        const particle = document.createElement("span");
        particle.className = "ambient-particle";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.setProperty("--particle-size", `${4 + Math.random() * 4}px`);
        particle.style.setProperty("--particle-color", particleColors[index % particleColors.length]);
        particle.style.setProperty("--particle-duration", `${5 + Math.random() * 8}s`);
        particle.style.setProperty("--particle-delay", `${-Math.random() * 10}s`);
        particle.style.setProperty("--particle-drift", `${-12 + Math.random() * 24}px`);
        ambientContainer.appendChild(particle);
    }

    // Animate Sections on Scroll
    const sections = document.querySelectorAll("main > section");
    sections.forEach((section, index) => {
        gsap.fromTo(section,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Party popper effect
    const partyContainer = document.querySelector(".party-pop-container");
    const triggers = document.querySelectorAll(".party-trigger");

    const spawnPartyPopper = (event) => {
        const rect = partyContainer.getBoundingClientRect();
        const centerX = event.clientX || rect.width / 2;
        const centerY = event.clientY || rect.height / 2;
        const colors = ["#fca5a5", "#f9a8d4", "#fbbf24", "#bef264", "#c4b5fd", "#67e8f9", "#f87171", "#fde68a"];

        for (let i = 0; i < 28; i++) {
            const piece = document.createElement("span");
            const angle = (Math.PI * 2 * i) / 28;
            const distance = 40 + Math.random() * 120;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            const rotation = (Math.random() * 360) - 180;

            piece.className = "party-piece";
            piece.style.left = `${centerX}px`;
            piece.style.top = `${centerY}px`;
            piece.style.background = colors[i % colors.length];
            piece.style.setProperty("--dx", `${dx}px`);
            piece.style.setProperty("--dy", `${dy}px`);
            piece.style.setProperty("--rotation", `${rotation}deg`);

            partyContainer.appendChild(piece);

            setTimeout(() => piece.remove(), 1200);
        }
    };

    triggers.forEach((trigger) => {
        trigger.addEventListener("click", spawnPartyPopper);
    });

    const memoryImages = document.querySelectorAll(".memory-section img");
    const memoryLightbox = document.getElementById("memory-lightbox");
    const memoryLightboxImage = document.getElementById("memory-lightbox-image");
    const memoryLightboxCaption = document.getElementById("memory-lightbox-caption");
    const memoryLightboxClose = document.getElementById("memory-lightbox-close");
    let activeMemoryImage = null;
    let lightboxCloseTimeout;

    const closeMemoryLightbox = () => {
        if (memoryLightbox.hidden) return;
        memoryLightbox.classList.remove("is-open");
        memoryLightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        lightboxCloseTimeout = setTimeout(() => {
            memoryLightbox.hidden = true;
            activeMemoryImage?.focus();
        }, 220);
    };

    const openMemoryLightbox = (image) => {
        clearTimeout(lightboxCloseTimeout);
        activeMemoryImage = image;
        memoryLightboxImage.src = image.src;
        memoryLightboxImage.alt = image.alt;
        const memoryCard = image.closest(".bg-white");
        const caption = memoryCard?.querySelector("p")?.textContent.trim() ?? image.alt;
        memoryLightboxCaption.textContent = caption;
        memoryLightbox.setAttribute("aria-label", caption);
        memoryLightbox.hidden = false;
        memoryLightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        requestAnimationFrame(() => memoryLightbox.classList.add("is-open"));
        memoryLightboxClose.focus();
    };

    memoryImages.forEach((image) => {
        image.setAttribute("role", "button");
        image.setAttribute("tabindex", "0");
        image.setAttribute("aria-haspopup", "dialog");
        image.setAttribute("aria-label", `Perbesar ${image.alt}`);
        image.addEventListener("click", () => openMemoryLightbox(image));
        image.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openMemoryLightbox(image);
            }
        });
    });

    memoryLightboxClose.addEventListener("click", closeMemoryLightbox);
    memoryLightbox.addEventListener("click", (event) => {
        if (event.target === memoryLightbox) closeMemoryLightbox();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMemoryLightbox();
    });

    const birthdayMessage = document.getElementById("birthday-message");
    const birthdayMessageToggle = document.getElementById("birthday-message-toggle");
    birthdayMessageToggle.addEventListener("click", () => {
        const shouldRevealMessage = birthdayMessage.hidden;
        birthdayMessage.hidden = !shouldRevealMessage;
        birthdayMessageToggle.setAttribute("aria-expanded", String(shouldRevealMessage));
        birthdayMessageToggle.setAttribute("aria-label", shouldRevealMessage ? "Sembunyikan pesan ulang tahun" : "Tampilkan pesan ulang tahun");

        if (shouldRevealMessage) {
            gsap.fromTo(birthdayMessage, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" });
        }
    });

    const musicToggle = document.getElementById("music-toggle");
    const musicProgress = document.getElementById("music-progress");
    const musicCurrentTime = document.getElementById("music-current-time");
    const musicDuration = document.getElementById("music-duration");
    const musicTrackTitle = document.getElementById("music-track-title");
    const musicPlayer = document.getElementById("music-player");
    const musicExpand = document.getElementById("music-expand");
    const musicAudio = document.getElementById("birthday-music");
    const musicTracks = [
        { title: "Aku Milikmu - Dewa 19", source: "Aku%20Milikmu%20-%20Dewa%2019%20(Lyrics%20Video).mp3" },
        { title: "Kangen - Dewa 19", source: "Dewa%2019%20-%20Kangen%20%28Official%20Audio%29.mp3" }
    ];
    let currentTrackIndex = 0;
    let selectedMusicName = musicTracks[currentTrackIndex].title;
    let activeTrackUrl = "";
    let trackLoadRequest = 0;

    const formatMusicTime = (seconds) => {
        if (!Number.isFinite(seconds)) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
        return `${minutes}:${remainingSeconds}`;
    };

    const updateMusicProgress = () => {
        const duration = Number.isFinite(musicAudio.duration) ? musicAudio.duration : 0;
        const progress = duration ? (musicAudio.currentTime / duration) * Number(musicProgress.max) : 0;
        musicProgress.value = String(progress);
        musicCurrentTime.textContent = formatMusicTime(musicAudio.currentTime);
        musicDuration.textContent = formatMusicTime(duration);
    };

    const setMusicControlsExpanded = (expanded) => {
        musicPlayer.classList.toggle("is-expanded", expanded);
        musicExpand.setAttribute("aria-expanded", String(expanded));
        musicExpand.setAttribute("aria-label", expanded ? "Sembunyikan kontrol musik" : "Tampilkan kontrol musik");
        musicExpand.title = expanded ? "Sembunyikan kontrol musik" : "Tampilkan kontrol musik";
    };

    const updateMusicToggle = () => {
        const isPlaying = !musicAudio.paused;
        musicToggle.innerHTML = `<i class="fa-solid fa-${isPlaying ? "pause" : "play"}" aria-hidden="true"></i>`;
        musicToggle.setAttribute("aria-label", `${isPlaying ? "Pause" : "Play"} music: ${selectedMusicName}`);
        musicToggle.title = selectedMusicName;
        musicTrackTitle.textContent = selectedMusicName;
        musicTrackTitle.title = selectedMusicName;
        musicPlayer.classList.add("is-collapsed");
    };

    const syncMusicPlaybackState = () => {
        updateMusicToggle();
        setMusicControlsExpanded(false);
    };

    const playTrack = async (index, autoplay = true) => {
        currentTrackIndex = (index + musicTracks.length) % musicTracks.length;
        const track = musicTracks[currentTrackIndex];
        const requestId = ++trackLoadRequest;
        selectedMusicName = track.title;
        musicAudio.pause();
        musicAudio.removeAttribute("src");
        musicAudio.load();
        if (activeTrackUrl) URL.revokeObjectURL(activeTrackUrl);
        activeTrackUrl = "";
        musicToggle.disabled = true;
        updateMusicToggle();
        updateMusicProgress();

        try {
            const response = await fetch(track.source);
            if (!response.ok) throw new Error(`Unable to load ${track.title}`);
            const audioBlob = await response.blob();
            if (requestId !== trackLoadRequest) return;

            activeTrackUrl = URL.createObjectURL(audioBlob);
            musicAudio.src = activeTrackUrl;
            musicAudio.load();
            musicToggle.disabled = false;
            updateMusicToggle();
            if (autoplay) musicAudio.play().catch(updateMusicToggle);
        } catch (error) {
            if (requestId !== trackLoadRequest) return;
            musicToggle.disabled = false;
            console.error(error);
            updateMusicToggle();
        }
    };

    musicToggle.addEventListener("click", () => {
        if (musicAudio.paused) {
            musicAudio.play().catch(updateMusicToggle);
        } else {
            musicAudio.pause();
        }
    });

    musicExpand.addEventListener("click", () => {
        setMusicControlsExpanded(!musicPlayer.classList.contains("is-expanded"));
    });

    document.getElementById("music-previous-track").addEventListener("click", () => playTrack(currentTrackIndex - 1));
    document.getElementById("music-next-track").addEventListener("click", () => playTrack(currentTrackIndex + 1));
    musicProgress.addEventListener("input", () => {
        if (!Number.isFinite(musicAudio.duration)) return;
        musicAudio.currentTime = (Number(musicProgress.value) / Number(musicProgress.max)) * musicAudio.duration;
        updateMusicProgress();
    });

    musicAudio.addEventListener("play", syncMusicPlaybackState);
    musicAudio.addEventListener("pause", syncMusicPlaybackState);
    musicAudio.addEventListener("ended", syncMusicPlaybackState);
    musicAudio.addEventListener("loadedmetadata", updateMusicProgress);
    musicAudio.addEventListener("durationchange", updateMusicProgress);
    musicAudio.addEventListener("timeupdate", updateMusicProgress);
    updateMusicToggle();
    updateMusicProgress();
    playTrack(currentTrackIndex, false);
    const minimumDuration = 1500;
    const remainingTime = Math.max(0, minimumDuration - (performance.now() - loadingStartedAt));
    window.setTimeout(() => {
        window.clearInterval(loadingProgressTimer);
        birthdayLoaderFill.style.width = "100%";
        birthdayLoaderProgress.setAttribute("aria-valuenow", "100");
        window.setTimeout(() => {
            birthdayLoader.classList.add("is-hidden");
            document.body.classList.remove("is-loading");
            window.setTimeout(() => { birthdayLoader.hidden = true; }, 500);
        }, 220);
    }, remainingTime);

});