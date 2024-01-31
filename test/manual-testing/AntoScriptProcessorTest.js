import AudioContext from "../../src/AudioContext.js";
import Speaker from "speaker";
import ScriptProcessorNode from "../../src/ScriptProcessorNode.js";

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
let j=0;
node.onaudioprocess = (e)=>{
    let outBuffer = e.outputBuffer;
    let outData = outBuffer.getChannelData(0);
    for (let i = 0; i < outBuffer.length; i++) {
        outData[i] = 0.2*(j<1?1:-1);
    }
    j++;
    if (j>2) {
        j=0;
    }
}
node.connect(context.destination);