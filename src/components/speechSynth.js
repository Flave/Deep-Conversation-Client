const noGoVoices = [
  'Bahh', 
  'Fred', 
  'Kathy', 
  'Pipe Organ', 
  'Zarvox', 
  'Boing', 
  'Agnes', 
  'Albert', 
  'Bruce', 
  'Bubbles', 
  'Good News', 
  'Hysterical',
  'Junior',
  'Milena',
  'Princess',
  'Ralph',
  'Trinoids',
  'Vicki',
  'Victoria',
  'Whisper',
  'Bells',
  'Cellos',
  'Veena',
  'Fiona',
  'Deranged',
  'Bad News',
  'Alex'
];

export const SpeechSynth = () => {
  const synth = window.speechSynthesis;
  let voicesCache = {};
  let utterances = [];

  const getVoice = (speaker) => {
    if(voicesCache[speaker]) return voicesCache[speaker];

    const englishVoices = window.speechSynthesis.getVoices()
      .filter(voice => (
        voice.lang.indexOf('en') !== -1 && noGoVoices.indexOf(voice.voiceURI) === -1
      ))

    const voice = englishVoices[Math.floor(Math.random() * 2)]
    let voiceIsTaken = false;
    for(let cachedKey in voicesCache) {
      if(voicesCache[cachedKey].voiceURI === voice.voiceURI) {
        voiceIsTaken = true;
        break;
      }
    }

    if(voiceIsTaken) return getVoice(speaker);
    voicesCache[speaker] = voice;
    return voice;
  }

  const utter = (text, speaker, cb) => {
    if(!synth) return;
    const utterThis = new SpeechSynthesisUtterance(text);
    utterances.push(utterThis);
    utterThis.speed = 1.3;
    utterThis.voice = getVoice(speaker);
    utterThis.addEventListener('end', () => {
      cb && cb()
      const index = utterances.indexOf(utterThis);
      utterances.splice(index, 1);
    })

    synth.speak(utterThis);
  }

  return {utter}
}