import { easingFuncs as ease } from './easing_funcs.js';
import { clamp } from './util.js';

// class Animation{
//     constructor(el,queue,duration = 2000, easeType = 'quadraticInOut'){
//         this.el=el;
//         this.queue=queue;
//         this.duration=duration;
//         this.easeType=easeType;

//         this.i=0;
//         let i=this.i;
//         while (i <= queue.length) {
//             yield queue[i + 1] ? (
//                 executor(
//                     el, 
//                     queue[i].props, 
//                     queue[++i].props, 
//                     queue[i].duration?queue[i].duration:duration, 
//                     ease[queue[i].easeType]?queue[i].easeType:easeType
//                 ),
//                 true
//                 ) 
//                 :
//                 undefined;
//         }
//     }
//     executor(){
//         let {i,queue, duration, easeType}=this;
//         let perviousStatus=queue[i].props,
//             finalStatus=queue[i+1]?queue[i+1].props:undefined;
//         if(!finalStatus){
//             return
//         }

//         let startTime = new Date().getTime();

//         let totalDelta = {
//             width: finalStatus.width - parseInt(el.style.width),
//             height: finalStatus.height - parseInt(el.style.height),
//         }
    
//         let loop = () => {
//             let endTime = startTime + duration;
//             let currentTime = new Date().getTime();
//             let currentProgress = clamp((currentTime - startTime) / duration, 0, 1);
//             // console.log(el.style.width)
//             el.style.width = perviousStatus.width + totalDelta.width * ease[easeType](currentProgress) + 'px';
//             el.style.height = perviousStatus.height + totalDelta.height * ease[easeType](currentProgress) + 'px';
    
//             if (currentProgress == 1) {
//                 // clearInterval(timer)
//                 cancelAnimationFrame(loop);
//                 //如何执行下一步？
//                 zzz.next()
//                 // debugger
//                 return
//             }
//             requestAnimationFrame(loop)
//         }
//         loop()
//     }
// }

function* animation(el, queue, duration = 2000, easeType = 'quadraticInOut') {
    console.log(queue);

    let i = 0;

    while (i <= queue.length) {
        yield queue[i + 1] ? (
            animationExecutor(
                el, 
                queue[i].props, 
                queue[++i].props, 
                queue[i].duration?queue[i].duration:duration, 
                ease[queue[i].easeType]?queue[i].easeType:easeType
            ),
            true
            ) 
            :
            undefined;
    }

}

function animationExecutor(el, perviousStatus, finalStatus, duration, easeType) {
    let startTime = new Date().getTime();

    let totalDelta = {
        width: finalStatus.width - parseInt(el.style.width),
        height: finalStatus.height - parseInt(el.style.height),
    }

    let loop = () => {
        let endTime = startTime + duration;
        let currentTime = new Date().getTime();
        let currentProgress = clamp((currentTime - startTime) / duration, 0, 1);
        // console.log(el.style.width)
        el.style.width = perviousStatus.width + totalDelta.width * ease[easeType](currentProgress) + 'px';
        el.style.height = perviousStatus.height + totalDelta.height * ease[easeType](currentProgress) + 'px';

        if (currentProgress == 1) {
            // clearInterval(timer)
            cancelAnimationFrame(loop);
            //如何执行下一步？
            zzz.next()
            // debugger
            return
        }
        requestAnimationFrame(loop)
    }
    loop()
}

export { animation }