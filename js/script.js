/**
 * FELISHA OKTARINA — LUXURY EDITORIAL BIRTHDAY TRIBUTE
 * Custom Interaction & Media System
 */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* ─────────────────────────────────────────────────────────────────
       1. INTRO CURTAIN REVEAL (ELEGANT & FAST)
    ───────────────────────────────────────────────────────────────── */
    const introCurtain = document.getElementById("intro-curtain");
    if (introCurtain) {
        setTimeout(() => {
            introCurtain.classList.add("is-hidden");
            document.body.classList.remove("is-entering");
        }, 850);
    }

    /* ─────────────────────────────────────────────────────────────────
       2. REAL AUDIO ENGINE (DEWA 19 PLAYLIST)
    ───────────────────────────────────────────────────────────────── */
    const playlist = [
        {
            title: "Aku Milikmu — Dewa 19",
            src: "Aku Milikmu - Dewa 19 (Lyrics Video).mp3"
        },
        {
            title: "Kangen — Dewa 19",
            src: "Dewa 19 - Kangen (Official Audio).mp3"
        }
    ];

    let currentTrackIndex = 0;
    let isPlaying = false;

    const nativeAudio   = document.getElementById("native-audio");
    const audioDock     = document.getElementById("audio-dock");
    const dockPlayBtn   = document.getElementById("dock-play-btn");
    const playIcon      = document.getElementById("play-icon");
    const dockPrevBtn   = document.getElementById("dock-prev-btn");
    const dockNextBtn   = document.getElementById("dock-next-btn");
    const trackTitleEl  = document.getElementById("track-title");
    const navSoundBtn   = document.getElementById("nav-sound-btn");
    const navSoundLabel = document.getElementById("nav-sound-label");

    function loadTrack(index) {
        if (!nativeAudio) return;
        currentTrackIndex = (index + playlist.length) % playlist.length;
        const track = playlist[currentTrackIndex];
        nativeAudio.src = encodeURI(track.src);
        if (trackTitleEl) {
            trackTitleEl.textContent = track.title;
        }
    }

    function playAudio() {
        if (!nativeAudio) return;
        nativeAudio.play().then(() => {
            isPlaying = true;
            updatePlayUI(true);
        }).catch(() => {
            // Autoplay restriction or user interaction required
            isPlaying = false;
            updatePlayUI(false);
        });
    }

    function pauseAudio() {
        if (!nativeAudio) return;
        nativeAudio.pause();
        isPlaying = false;
        updatePlayUI(false);
    }

    function toggleAudio() {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    }

    function updatePlayUI(playing) {
        if (playIcon) {
            playIcon.className = playing ? "fa-solid fa-pause" : "fa-solid fa-play";
        }
        if (audioDock) {
            audioDock.classList.toggle("is-playing", playing);
        }
        if (navSoundBtn) {
            navSoundBtn.classList.toggle("is-playing", playing);
        }
        if (navSoundLabel) {
            navSoundLabel.textContent = playing ? "Jeda Musik" : "Putar Lagu";
        }
    }

    // Init track
    loadTrack(0);

    if (dockPlayBtn) {
        dockPlayBtn.addEventListener("click", toggleAudio);
    }
    if (navSoundBtn) {
        navSoundBtn.addEventListener("click", toggleAudio);
    }
    if (dockNextBtn) {
        dockNextBtn.addEventListener("click", () => {
            loadTrack(currentTrackIndex + 1);
            playAudio();
        });
    }
    if (dockPrevBtn) {
        dockPrevBtn.addEventListener("click", () => {
            loadTrack(currentTrackIndex - 1);
            playAudio();
        });
    }
    if (nativeAudio) {
        nativeAudio.addEventListener("ended", () => {
            loadTrack(currentTrackIndex + 1);
            playAudio();
        });
    }

    /* ─────────────────────────────────────────────────────────────────
       3. CANDLE RITUAL ("MAKE A WISH")
    ───────────────────────────────────────────────────────────────── */
    const candleApparatus = document.getElementById("candle-apparatus");
    const blowBtn         = document.getElementById("blow-btn");
    const reigniteBtn     = document.getElementById("reignite-btn");
    const wishReveal      = document.getElementById("wish-reveal");
    const candlePrompt    = document.getElementById("candle-prompt");
    const candleStage     = document.querySelector(".candle-stage");

    function extinguishCandle() {
        if (!candleApparatus || candleApparatus.classList.contains("is-extinguished")) return;

        candleApparatus.classList.add("is-extinguished");
        if (candleStage) candleStage.classList.add("is-extinguished");
        if (candlePrompt) candlePrompt.style.display = "none";

        setTimeout(() => {
            if (wishReveal) {
                wishReveal.hidden = false;
            }
        }, 700);
    }

    function reigniteCandle() {
        if (!candleApparatus) return;

        candleApparatus.classList.remove("is-extinguished");
        if (candleStage) candleStage.classList.remove("is-extinguished");
        if (wishReveal) wishReveal.hidden = true;
        if (candlePrompt) candlePrompt.style.display = "block";
    }

    if (candleApparatus) {
        candleApparatus.addEventListener("click", extinguishCandle);
        candleApparatus.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                extinguishCandle();
            }
        });
    }
    if (blowBtn) {
        blowBtn.addEventListener("click", extinguishCandle);
    }
    if (reigniteBtn) {
        reigniteBtn.addEventListener("click", reigniteCandle);
    }

    /* ─────────────────────────────────────────────────────────────────
       4. VISUAL JOURNAL LIGHTBOX
    ───────────────────────────────────────────────────────────────── */
    const galleryCards  = document.querySelectorAll(".gallery-card");
    const lightbox      = document.getElementById("lightbox");
    const lightboxImg   = document.getElementById("lightbox-img");
    const lightboxCap   = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");

    galleryCards.forEach(card => {
        card.addEventListener("click", () => {
            const img = card.querySelector("img");
            const caption = card.dataset.caption || "";
            if (img && lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt || "Kenangan";
                if (lightboxCap) lightboxCap.textContent = caption;
                lightbox.hidden = false;
                requestAnimationFrame(() => {
                    lightbox.classList.add("is-open");
                });
            }
        });
    });

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove("is-open");
        setTimeout(() => {
            lightbox.hidden = true;
        }, 400);
    }

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox && !lightbox.hidden) {
            closeLightbox();
        }
    });

    /* ─────────────────────────────────────────────────────────────────
       5. PRIVATE WISHBOARD (LOCALSTORAGE PERSISTENCE)
    ───────────────────────────────────────────────────────────────── */
    const wishForm   = document.getElementById("wish-form");
    const wishesFeed = document.getElementById("wishes-feed");

    const STORAGE_KEY = "felisha_birthday_wishes_v1";

    const defaultWishes = [
        {
            author: "Raden",
            time: "14 Okt 2024",
            message: "Selamat memperingati hari kelahiran, Felisha. Semoga setiap doa dan ikhtiar luhur yang Anda panjatkan senantiasa dikabulkan dengan cara yang paling mulia oleh Tuhan Yang Maha Esa. Senantiasa dilimpahi kesehatan, kedamaian, dan keberkahan hidup."
        },
        {
            author: "Keluarga & Sahabat",
            time: "14 Okt 2024",
            message: "Barakallah fii umrik Felisha Oktarina Kustantri. Semoga senantiasa dianugerahi kelancaran dalam setiap urusan, umur yang berkah, serta kebahagiaan yang paripurna di setiap langkah."
        }
    ];

    function getStoredWishes() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : defaultWishes;
        } catch {
            return defaultWishes;
        }
    }

    function renderWishes() {
        if (!wishesFeed) return;
        const wishes = getStoredWishes();
        wishesFeed.innerHTML = "";

        wishes.forEach(item => {
            const card = document.createElement("div");
            card.className = "wish-card-item";
            card.innerHTML = `
                <div class="wish-card-header">
                    <span class="wish-card-author">${escapeHTML(item.author)}</span>
                    <span class="wish-card-time">${escapeHTML(item.time)}</span>
                </div>
                <p class="wish-card-msg">${escapeHTML(item.message)}</p>
            `;
            wishesFeed.appendChild(card);
        });
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    if (wishForm) {
        wishForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const authorInput  = document.getElementById("wish-author");
            const messageInput = document.getElementById("wish-message");

            const author  = authorInput?.value.trim();
            const message = messageInput?.value.trim();

            if (!author || !message) return;

            const now = new Date();
            const timeStr = `${now.getDate()} Okt ${now.getFullYear()}`;

            const newWish = { author, time: timeStr, message };
            const currentWishes = getStoredWishes();
            currentWishes.unshift(newWish);

            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(currentWishes));
            } catch (err) {
                console.error("Storage error:", err);
            }

            renderWishes();

            if (authorInput) authorInput.value = "";
            if (messageInput) messageInput.value = "";
        });
    }

    renderWishes();

    /* ─────────────────────────────────────────────────────────────────
       6. ROYAL ENVELOPE INTERACTION (SLIDING LETTER)
    ───────────────────────────────────────────────────────────────── */
    const envelopeStage        = document.getElementById("envelope-stage");
    const envelopeTriggerBtn   = document.getElementById("envelope-trigger-btn");
    const envelopeTriggerLabel = document.getElementById("envelope-trigger-label");
    const waxSeal              = document.getElementById("wax-seal");
    const btnRefoldTop         = document.getElementById("btn-refold-top");
    const btnRefoldBottom      = document.getElementById("btn-refold-bottom");
    const heroLetterBtn        = document.querySelector('a[href="#letter"]');

    function openEnvelope() {
        if (!envelopeStage || envelopeStage.classList.contains("is-open")) return;
        envelopeStage.classList.add("is-open");
        if (envelopeTriggerLabel) {
            envelopeTriggerLabel.textContent = "Lipat Kembali Warkat";
        }
        setTimeout(() => {
            const letterEl = document.getElementById("envelope-letter");
            if (letterEl) {
                const rect = letterEl.getBoundingClientRect();
                if (rect.top < 100 || rect.top > 350) {
                    window.scrollBy({
                        top: rect.top - 120,
                        behavior: "smooth"
                    });
                }
            }
        }, 650);
    }

    function closeEnvelope() {
        if (!envelopeStage || !envelopeStage.classList.contains("is-open")) return;
        envelopeStage.classList.remove("is-open");
        if (envelopeTriggerLabel) {
            envelopeTriggerLabel.textContent = "Buka Warkat Penghormatan";
        }
        const envelopeContainer = document.getElementById("envelope-container");
        if (envelopeContainer) {
            envelopeContainer.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    function toggleEnvelope() {
        if (!envelopeStage) return;
        if (envelopeStage.classList.contains("is-open")) {
            closeEnvelope();
        } else {
            openEnvelope();
        }
    }

    if (waxSeal) {
        waxSeal.addEventListener("click", openEnvelope);
    }
    if (envelopeTriggerBtn) {
        envelopeTriggerBtn.addEventListener("click", toggleEnvelope);
    }
    if (btnRefoldTop) {
        btnRefoldTop.addEventListener("click", closeEnvelope);
    }
    if (btnRefoldBottom) {
        btnRefoldBottom.addEventListener("click", closeEnvelope);
    }
    if (heroLetterBtn) {
        heroLetterBtn.addEventListener("click", () => {
            setTimeout(openEnvelope, 550);
        });
    }

    /* ─────────────────────────────────────────────────────────────────
       7. ACTIVE NAVIGATION SPY
    ───────────────────────────────────────────────────────────────── */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }, { passive: true });

});