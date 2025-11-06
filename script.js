//Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)()



// Create Master volume control
const masterGain = audioContext.createGain();
masterGain.connect(audioContext.destination);
masterGain.gain.value = 0.7; //Volume default at 70%




// Create analyser for visualizer
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256;
masterGain.connect(analyser);

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

//Drum sound generators
const sounds = {
    kick: () => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();


        osc.connect(gain);
        gain.connect(masterGain);

        osc.frequency.setValueAtTime(150, audioContext.currentTime);
        
        osc.frequency.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        gain.gain.setValueAtTime(1, audioContext.currentTime);

        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);


        osc.start(audioContext.currentTime);
        
        osc.stop(audioContext.currentTime + 0.5)
},

snare: () => {
    const noise = audioContext.createBufferSource();

    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.2, audioContext.sampleRate);
    
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    noise.buffer = noiseBuffer;
    
    const noiseFilter = audioContext.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;


    const noiseGain = audioContext.createGain();

    noiseGain.gain.setValueAtTime(1, audioContext.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    noise.start(audioContext.currentTime);
    noise.stop(audioContext.currentTime + 0.2);

},



hihat: () => {
    const noise = audioContext.createBufferSource();
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.05, audioContext.sampleRate);

    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;

    }

    noise.buffer = noiseBuffer;


    const bandpass = audioContext.createBiquadFilter();

    bandpass.type ='bandpass';

    bandpass.frequency.value = 1000;

    const gain = audioContext.createGain();

    gain.gain.setValueAtTime(0.5, audioContext.currentTime);

    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);


    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(masterGain);


    noise.start(audioContext.currentTime);
    noise.stop(audioContext.currentTime + 0.05);

},



    openhat: () => {
    const noise = audioContext.createBufferSource();
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.3, audioContext.sampleRate);

    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    noise.buffer = noiseBuffer;

    const bandpass = audioContext.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 8000;

    const gain = audioContext.createGain();

    gain.gain.setValueAtTime(0.4, audioContext.currentTime);

    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(masterGain);

    noise.start(audioContext.currentTime);
    noise.stop(audioContext.currentTime + 0.3);
    },

    rimshot: () => {
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc1.type = 'square';
        osc2.type = 'square';
        
        osc1.frequency.setValueAtTime(180, audioContext.currentTime);
        osc2.frequency.setValueAtTime(320, audioContext.currentTime);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(masterGain);

        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        osc1.start(audioContext.currentTime);
        osc2.start(audioContext.currentTime);
        osc1.stop(audioContext.currentTime + 0.1);
        osc2.stop(audioContext.currentTime + 0.1);
    },

    tom: () => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.connect(gain);
        gain.connect(masterGain);

        osc.frequency.setValueAtTime(220, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.15);

        gain.gain.setValueAtTime(0.8, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.15);
    },

    clap: () => {
        const noise1 = audioContext.createBufferSource();
        const noise2 = audioContext.createBufferSource();
        const noise3 = audioContext.createBufferSource();
        
        const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.05, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < noiseBuffer.length; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        noise1.buffer = noiseBuffer;
        noise2.buffer = noiseBuffer;
        noise3.buffer = noiseBuffer;

        const filter = audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1500;

        const gain = audioContext.createGain();
        gain.gain.setValueAtTime(0.6, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

        noise1.connect(filter);
        noise2.connect(filter);
        noise3.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        noise1.start(audioContext.currentTime);
        noise2.start(audioContext.currentTime + 0.03);
        noise3.start(audioContext.currentTime + 0.05);
    },

    crash: () => {
        const noise = audioContext.createBufferSource();
        const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 1.5, audioContext.sampleRate);
        
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        noise.buffer = noiseBuffer;

        const highpass = audioContext.createBiquadFilter();
        highpass.type = 'highpass';
        highpass.frequency.value = 5000;

        const gain = audioContext.createGain();
        gain.gain.setValueAtTime(0.5, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);

        noise.connect(highpass);
        highpass.connect(gain);
        gain.connect(masterGain);

        noise.start(audioContext.currentTime);
        noise.stop(audioContext.currentTime + 1.5);
    },

    cowbell: () => {
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc1.frequency.setValueAtTime(800, audioContext.currentTime);
        osc2.frequency.setValueAtTime(540, audioContext.currentTime);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(masterGain);

        gain.gain.setValueAtTime(0.5, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        osc1.start(audioContext.currentTime);
        osc2.start(audioContext.currentTime);
        osc1.stop(audioContext.currentTime + 0.3);
        osc2.stop(audioContext.currentTime + 0.3);
    }

};

//Play sound function:
function playSound(soundName) {
    if (sounds[soundName]) {
        sounds[soundName]();
    }
}

//Add visual feedback
function activatePad(key) {
    const pad = document.querySelector(`[data-key="${key}"]`);
    if (pad) {
        pad.classList.add('active');
        setTimeout(() => pad.classList.remove('active'), 100);
    }
}

//Keyboard event listner
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    const pad = document.querySelector(`[data-key="${key}"]`);

    if (pad && !e.repeat) {
        const sound = pad.dataset.sound;
        playSound(sound);
        activatePad(key);

    }
});


//Mouse click support

document.querySelectorAll('.pad').forEach(pad => {
    pad.addEventListener('click', () => {
        const sound = pad.dataset.sound;
        playSound(sound);
        pad.classList.add('active');
        setTimeout(() => pad.classList.remove('active'), 100);
        
    });
});


// Master volume control
const volumeSlider = document.getElementById('volume');
const volumeValue = document.getElementById('volume-value');

volumeSlider.addEventListener('input', (e) =>{
    const volume = e.target.value / 100;
    masterGain.gain.value = volume;
    volumeValue.textContent = e.target.value + '%';
});




// Dark / Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Light Mode';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌒 Dark Mode';
        localStorage.setItem('theme', 'light');
    }
});






// Audio Visualizer
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 150;

function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;


        const r = barHeight + 25;
        const g = 250 - barHeight;
        const b = 50;

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }
}

drawVisualizer();