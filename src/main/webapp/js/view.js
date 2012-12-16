$(function() {
	
	window.EventItemView = Backbone.View.extend({
		
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
		},
		
		addEvent: function(newEvent) {
			var view = new EventItemView({model: newEvent});
			this.$("#events-table").append(view.render().el);
		}
		
	  });
	  
});