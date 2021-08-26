let EventDoer = function () {
	this.listeners = {};
};

EventDoer.prototype = Object.assign({},{
	listeners:null,
	addEventListener (type, callback){
		if(!(type in this.listeners)){
			this.listeners[type] = [];
		}
		this.listeners[type].push(callback);
	},
	removeEventListener (type, callback){
		if(!(type in this.listeners)) return;
		if(!callback){
			delete this.listeners[type];
			return;
		}
		let typeHandlers = this.listeners[type];
		for(let i = 0;i < typeHandlers.length;i++){
			if(typeHandlers[i] === callback){
				typeHandlers.splice(i,1);
				return;
			}
		}
	},
	fireEvent (name, detail){
		if(!(name in this.listeners)){
			return true;
		}
		let typeHandlers = this.listeners[name].concat();

		for(let i = 0;i < typeHandlers.length;i++){
			typeHandlers[i].call(this,detail);
		}
	},
	once (type, callback){
		let wrappedCb = (detail) => {
			callback(detail);
			this.removeEventListener(type, wrappedCb);
		};
		this.addEventListener(type, wrappedCb);
	},
	getListeners (name){
		if(name){
			return this.listeners[name];
		}
		return this.listeners;
	}
});

export default EventDoer;
