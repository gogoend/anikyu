import { easingFuncs as ease } from './easing_funcs.js';
import { clamp } from './util.js';

class Animation{
    constructor(el,queue,duration = 2000, easeType = 'quadraticInOut'){
        this.el=el;
        this.queue=queue;
        this.duration=duration;
        this.easeType=easeType;

        this.i=0;
        this.animationQueueHandler=this.go();
        this.animationQueueHandler.next()
        // debugger

    }
    *go(){
        let {i,queue,executor}=this;        

        while (i <= queue.length) {
            yield queue[i + 1] ? (
                executor(
                    // el, 
                    // queue[i].props, 
                    // queue[++i].props, 
                    // queue[i].duration?queue[i].duration:duration, 
                    // ease[queue[i].easeType]?queue[i].easeType:easeType,
                    this
                ),
                true
                ) 
                :
                undefined;
        }
    }
    executor(context){
        // super();
        let {el,i,queue, duration, easeType,animationQueueHandler}=context;
        let perviousStatus=queue[i].props,
            finalStatus=queue[i+1]?queue[i+1].props:undefined;
        if(!finalStatus){
            return
        }

        easeType=queue[i+1].easeType?queue[i+1].easeType:easeType;
        duration=queue[i+1].duration?queue[i+1].duration:duration;

        let startTime = new Date().getTime();

        let totalDelta={};

        for(let key in finalStatus){
            totalDelta[key]=finalStatus[key]-parseInt(el.style[key])
        }
    
        let loop = () => {
            let endTime = startTime + duration;
            let currentTime = new Date().getTime();
            let currentProgress = clamp((currentTime - startTime) / duration, 0, 1);
            // console.log(el.style.width)

            for(let key in perviousStatus){
                el.style[key] = perviousStatus[key] + totalDelta[key] * ease[easeType](currentProgress) + 'px';
            }
    
            if (currentProgress == 1) {
                // clearInterval(timer)
                cancelAnimationFrame(loop);
                if(queue[i+1].callback instanceof Function){
                    queue[i+1].callback()
                }
                //如何执行下一步？
                context.i++;
                animationQueueHandler.next();
                // debugger
                return
            }
            requestAnimationFrame(loop)
        }
        loop()
    }
}


export { Animation }