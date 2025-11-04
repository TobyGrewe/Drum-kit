//Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)()

//Drum sound generators
const sounds = {
    kick: () => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();


        osc.connect(gain);
        gain.connect(audioContext.destination);

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
    noiseGain.connect(audioContext.destination);

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
    gain.connect(audioContext.destination);


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
    gain.connect(audioContext.destination);

    noise.start(audioContext.currentTime);
    noise.stop(audioContext.currentTime + 0.3);

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
