var EventDoer = function () {
	this.listeners = {};
};

var eventDoerInstanceFunc = {
	listeners:{},
	addEventListener: function (type, callback){
		if(!(type in this.listeners)){
			this.listeners[type] = [];
		}
		this.listeners[type].push(callback);
	},
	removeEventListener: function (type, callback){
		if(!(type in this.listeners)) return;
		var typeHandlers = this.listeners[type];
		for(var i = 0;i < typeHandlers.length;i++){
			if(typeHandlers[i] === callback){
				typeHandlers.splice(i,1);
				return;
			}
		}
	},
	fireEvent: function (name, detail){
		if(!(name in this.listeners)){
			return true;
		}
		var typeHandlers = this.listeners[name].concat();

		for(var i = 0;i < typeHandlers.length;i++){
			typeHandlers[i].call(this,detail);
		}
	},
	getListeners: function (name){
		if(name){
			return this.listeners[name];
		}
		return this.listeners;
	}
};

for( var key in eventDoerInstanceFunc){
	EventDoer.prototype[key] = eventDoerInstanceFunc[key];
}

export default EventDoer;
