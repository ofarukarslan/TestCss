const textarea = document.querySelector("textarea");
const voiceList = document.querySelector("select"); 
const speechBtn = document.querySelector("button"); 
let synth = window.speechSynthesis;
let isSpeaking = false; 

voices(); 
function voices() {
   
    synth.addEventListener("voiceschanged", function() {
        voiceList.innerHTML = ""; 
        synth.getVoices().forEach(function(voice) {
            let selected = voice.name === "Google US English" ? "selected" : "";
            let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
            voiceList.insertAdjacentHTML("beforeend", option);
        });
    });
}

function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    synth.getVoices().forEach(function(voice) {
        if (voice.name === voiceList.value) {
            utterance.voice = voice;
        }
    });
    synth.speak(utterance);
}

speechBtn.addEventListener("click", function(e) {
    e.preventDefault();
    if (textarea.value.trim() !== "") {

        if (!synth.speaking) {
            textToSpeech(textarea.value);
        }

        if (textarea.value.length > 80) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause";
            } else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume";
            }
        } else {
            speechBtn.innerText = "Convert";
        }
    }
});
