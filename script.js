// ===== DATA ARRAYS =====

const loveItems = [
    "...the way you over-apologize",
    "...your blonde hair",
    "...your eyes",
    "...how passionate you are about volleyball",
    "...that Linkin Park makes you emotional",
    "...that flowers make you smile",
    "...the way you type 😭😭😭",
    "...how excited you get",
    "...how much effort you put into loving people",
    "...that you make me feel safe",
    "...that you still believe in us",
    "...the way you randomly use 😉",
    "...that you say 'So I am glad you're happy'",
    "...how you tell me 'Don't thank me'",
    "...the way you remember tiny details about my life",
    "...that you've never judged me",
    "...the gentle heart you have",
    "...that you're you"
];

// ===== CASSETTE FUNCTIONALITY =====

const cassettButtons = document.querySelectorAll('.cassette-button');

cassettButtons.forEach(button => {
    button.addEventListener('click', function() {
        const cassetteNum = this.dataset.cassette;
        const message = this.parentElement.querySelector('.cassette-message');
        const audio = this.parentElement.querySelector('.cassette-audio');

        // Toggle message visibility
        message.classList.toggle('hidden');

        // Toggle audio playback
        if (!audio.paused || audio.currentTime > 0) {
            // Audio is playing, pause it
            audio.pause();
            audio.currentTime = 0;
        } else {
            // Audio is not playing, play it
            audio.play().catch(err => console.log('Audio play failed:', err));
        }
    });
});

// ===== ROSE FUNCTIONALITY =====

const roseButtons = document.querySelectorAll('.rose-button');

roseButtons.forEach(button => {
    button.addEventListener('click', function() {
        const roseNum = this.dataset.rose;
        const message = this.parentElement.querySelector('.rose-message');

        // Toggle message visibility
        message.classList.toggle('hidden');
    });
});

// ===== POPULATE "THINGS I LOVE" LIST =====

const lovesList = document.querySelector('.loves-list');

loveItems.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'love-item';
    div.innerHTML = `I love ${item}`;
    div.style.animationDelay = `${index * 0.1}s`;
    lovesList.appendChild(div);
});

// ===== INTERSECTION OBSERVER FOR FADE-INS =====

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.getAttribute('data-animation') || 'slideUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.section-subtitle, .memories-list p, .love-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== LETTER REVEAL ANIMATION ON SCROLL =====

const letterSection = document.getElementById('letter');
const letterPages = document.querySelectorAll('.letter-page');

const letterObserverOptions = {
    threshold: 0.2
};

const letterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger the letter reveal animations
            letterPages.forEach((page, index) => {
                page.style.animation = `letterReveal 0.8s ease-out forwards`;
                page.style.animationDelay = `${index * 0.3}s`;
            });
            letterObserver.unobserve(entry.target);
        }
    });
}, letterObserverOptions);

if (letterSection) {
    letterObserver.observe(letterSection);
}

// ===== GIFT SECTION SCROLL REVEAL =====

const giftTexts = document.querySelectorAll('.gift-text');
const giftSection = document.getElementById('gift');

const giftObserverOptions = {
    threshold: 0.3
};

const giftObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger gift text animations
            giftTexts.forEach((text, index) => {
                text.style.animation = `slideUp 1s ease-out forwards`;
                text.style.animationDelay = `${index * 1}s`;
            });
            giftObserver.unobserve(entry.target);
        }
    });
}, giftObserverOptions);

if (giftSection) {
    giftObserver.observe(giftSection);
}

// ===== PAUSE ALL AUDIO WHEN PAGE LOSES FOCUS =====

window.addEventListener('blur', function() {
    document.querySelectorAll('video').forEach(video => {
        video.pause();
    });
});

// ===== LOG ON LOAD =====

console.log('Nel\'s website has loaded with love. 💕');
