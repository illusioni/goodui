$(function() {
	
	window.EventItemView = Backbone.View.extend({
		
		events: {
			"click .delbtn": "deleteThisItem",
			"dblclick": "showInfoForThisItem"
		},
		
		deleteThisItem: function() {
			this.model.destroy();
		},
		
		showInfoForThisItem: function() {
			alert("You doubleclicked the event scheduled for " + this.model.get("date"));
		},
		
		template: Handlebars.compile($("#item-template").html()),
		
		tagName: "tr",
		
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove); //TODO
		},
		
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
		
	});
	
	window.EventListView = Backbone.View.extend({
		
		el: $("#content"),
		
		initialize: function() {
			this.listenTo(this.model, "add", this.addEvent);
      		this.listenTo(this.model, 'reset', this.addAll);
			this.model.fetch();
		},
		
		addEvent: function(newEvent) {
			var view = new EventItemView({model: newEvent});
			this.$("#events-table").append(view.render().el);
		},
		
		addAll: function() {
			this.model.each(this.addEvent);
		}
		
	});
	  
});