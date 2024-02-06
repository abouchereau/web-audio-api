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


const node = new ScriptProcessorNode(context, 1024, 1, 1);
const osc = new Oscillator();
osc.setSampleRate(context.sampleRate);

node.onaudioprocess = (e)=>{
    let outBuffer = e.outputBuffer;
    let outData = outBuffer.getChannelData(0);
    for (let i = 0; i < outBuffer.length; i++) {
        outData[i] = osc.play();
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



/*

let i = 0;
setTimeout(()=>{

    osc.setReg(24, 0x0F);

    osc.setReg(5,15);//AD
    osc.setReg(6,240);//SR
    osc.setReg(0,0x50);    //fq
    osc.setReg(1,0x50);    //fq
    osc.setReg(4,0x10);    //wg

    osc.setReg(5+7,15);//AD
    osc.setReg(6+7,240);//SR
    osc.setReg(0+7,0x50);    //fq
    osc.setReg(1+7,0x50);    //fq
    osc.setReg(4+7,0x10);    //wg

    osc.setReg(5+14,15);//AD
    osc.setReg(6+14,240);//SR
    osc.setReg(0+14,0x50);    //fq
    osc.setReg(1+14,0x50);    //fq
    osc.setReg(4+14,0x10);    //wg

    setInterval(()=>{
        osc.setReg(4,i%2==0?0x10:0x11);    //wg
        osc.setReg(4+7,i%2==0?0x10:0x11);    //wg
        osc.setReg(4+14,i%2==0?0x10:0x11);    //wg
        i++;
    },1000)


},1000);
*/