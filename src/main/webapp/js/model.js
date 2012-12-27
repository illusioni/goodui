$(function() {
	
	window.Activity = Backbone.Model.extend({
		defaults: function() {
		  return {
			name: "Nameless activity"
		  };
		}
	});
	
	window.Event = Backbone.Model.extend({
		defaults: function() {
		  return {
			date: "2012-12-21",
			attending: [],
			absent: []
		  };
		}
	});
	
	window.EventList = Backbone.Collection.extend({
		model: Event,
		localStorage: new Backbone.LocalStorage("eventlist-backbone")
	});
	
});