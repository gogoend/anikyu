let EventTarget = function () {
	this.listeners = {};
};

EventTarget.prototype = Object.assign({},{
	listeners:{},
	addEventListener (type, callback){
		if(!(type in this.listeners)){
			this.listeners[type] = [];
		}
		this.listeners[type].push(callback);
	},
	removeEventListener (type, callback){
		if(!(type in this.listeners)) return;
		let typeHandlers = this.listeners[type];
		for(let i = 0;i < typeHandlers.length;i++){
			if(typeHandlers[i] === callback){
				typeHandlers.splice(i,1);
				return;
			}
		}
	},
	dispatchEvent (event){
		if(!(event.type in this.listeners)){
			return true;
		}
		let typeHandlers = this.listeners[event.type].concat();
        
		for(let i = 0;i < typeHandlers.length;i++){
			typeHandlers[i].call(this,event);
		}
	}
});

export default EventTarget;
