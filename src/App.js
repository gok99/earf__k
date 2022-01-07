import AceEditor from 'react-ace'
import sound from './test.wav'
import * as wav from 'node-wav'
import FFT from 'fft.js'
var fs = require('fs')

function App() {
  function onChange(newValue) {
    console.log('change', newValue)
    var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    const audio = new Audio(sound);
    const source = audioCtx.createMediaElementSource(audio);
    audio.play();
    var analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    source.connect(audioCtx.destination);
    source.connect(analyser);
    analyser.getByteTimeDomainData(dataArray);

    console.log(dataArray);
    let max = -1;
    let ind = -1;
    for (let i = 0; i < bufferLength; i++) {
      if (dataArray[i] >= max) {
        max = dataArray[i];
        ind = i;
      }
    }
    console.log(max);
    console.log(ind);

    let size = 4096; //fft size
    let fft = new FFT(size); //create fft object
    let realOutput = new Array(size); // to store final result
    let complexOutput = fft.createComplexArray(); // to store fft output    
    
    let buffer = fs.readFileSync('test.wav'); // open a 1s wav file(mono 16bit pcm file at   32000hz) containing only a 750hz sinusoidal tone
    let result = wav.decode(buffer); // read wav file data
    let audioData = Array.prototype.slice.call( result.channelData[0]); // convert Float32Array to normal array
    let realInput = audioData.slice(0,size); // use only 4096 sample from the buffer.

    fft.realTransform(complexOutput, realInput); // compute fft
    // fft.completeSpectrum(complexOutput);
    fft.fromComplexArray(complexOutput,realOutput); // get rid of the complex value and keep only real
    
    console.log(realOutput);
  }

  return (
    <AceEditor
      mode="java"
      theme="github"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />
  )
}

export default App
