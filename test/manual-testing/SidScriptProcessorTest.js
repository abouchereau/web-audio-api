import AudioContext from "../../src/AudioContext.js";
import Speaker from "speaker";
import ScriptProcessorNode from "../../src/ScriptProcessorNode.js";
import Oscillator from "./Oscillator.js";

const context = new AudioContext;

console.log('encoding format : '
    + context.format.numberOfChannels + ' channels ; '
    + context.format.bitDepth + ' bits ; '
    + context.sampleRate + ' Hz'
)
context.outStream = new Speaker({
    channels: context.format.numberOfChannels,
    bitDepth: context.format.bitDepth,
    sampleRate: context.sampleRate
})


const node = new ScriptProcessorNode(context, 256, 1, 1);
const osc = new Oscillator();
osc.setSampleRate(context.sampleRate);

node.onaudioprocess = (e)=>{
    let outBuffer = e.outputBuffer;
    let outData = outBuffer.getChannelData(0);
    for (let i = 0; i < outBuffer.length; i++) {
        outData[i] = osc.play()*2;
    }
}
node.connect(context.destination);


process.on('message', msg => {
    if (msg.length>1) {
        for(let i = 0;i<msg.length;i+=2) {
            osc.setReg(msg[i], msg[i+1]);
        }
    }
});



