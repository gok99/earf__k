const wav = require('node-wav');
const FFT = require('fft.js');
const fs = require('fs');
const plotlib = require('nodeplotlib');

let size = 1024; //fft size
let fft = new FFT(size); //create fft object
let realOutput = new Array(size); // to store final result
let complexOutput = fft.createComplexArray(); // to store fft output

let buffer = fs.readFileSync('/home/gok99/Local/NUS/hnr22/earf__k/src/2000.wav'); // open a 1s wav file(mono 16bit pcm file at   32000hz) containing only a 750hz sinusoidal tone
let result = wav.decode(buffer); // read wav file data
let audioData = Array.prototype.slice.call( result.channelData[0]); // convert Float32Array to normal array
let realInput = audioData.slice(0,size); // use only 4096 sample from the buffer.

fft.realTransform(complexOutput, realInput); // compute fft
// fft.completeSpectrum(complexOutput);
fft.fromComplexArray(complexOutput,realOutput); // get rid of the complex value and keep only real

console.log(realOutput);

let x =[];
for(let i=0;i<size;i++) x.push(i); //create a simple dumb x axis for the fft plot

let xf=[]
let sampleReal=[];
let mod= Math.floor(size/512);

let max = -1;
let ind = -1;

for(let i=0; i<size; i++) {
    if ((i%mod) === 0) {
        if(realOutput[i] > max) {
            max = realOutput[i]
            ind = i/mod
        }
        sampleReal.push(realOutput[i]);
        xf.push(i/mod);
    }
}

console.log(max);
console.log(ind);

console.log(realOutput.length)

plotlib.plot( // plotting the input data
    [{
        x: x,
        y: realInput,
        type: 'line',
        name:'input'
    }]
);

plotlib.plot( // plotting the fft output
    [{
        x: xf, //x,
        y: sampleReal, //realOutput,
        type: 'line',
        name:'output'
    }]
);
