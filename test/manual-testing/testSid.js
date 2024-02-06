import childProcess from 'child_process';
let process = childProcess.fork("./test/manual-testing/SidScriptProcessorTest.js");


let i = 0;
setTimeout(()=>{

    process.send([24,0x0F]);    //vol


    process.send([5,15]);//AD
    process.send([6,240]);//SR
    process.send([0,0x40]);    //fq
    process.send([1,0x40]);    //fq
    process.send([4,0x10]);    //wg

    process.send([5+7,15]);//AD
    process.send([6+7,240]);//SR
    process.send([0+7,0x30]);    //fq
    process.send([1+7,0x30]);    //fq
    process.send([4+7,0x10]);    //wg

    process.send([5+14,15]);//AD
    process.send([6+14,240]);//SR
    process.send([0+14,0x20]);    //fq
    process.send([1+14,0x20]);    //fq
    process.send([4+14,0x10]);    //wg

    setInterval(()=>{
        process.send([4,i%2==0?0x10:0x11]);    //wg
        process.send([4+7,i%2==0?0x10:0x11]);    //wg
        process.send([4+14,i%2==0?0x10:0x11]);    //wg
        i++;
    },1000)


},1000);


