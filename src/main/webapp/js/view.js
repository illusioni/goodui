$(function() {
	
	window.ActivityDetailsView = Backbone.View.extend({
		
		el: $("#activity-view"),
		
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},
		
		template: Handlebars.compile($("#activity-template").html()),
		
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
	
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
		
		el: $("#list-view"),
		
		initialize: function() {
			this.listenTo(this.model, "add", this.addEvent);
      		this.listenTo(this.model, 'reset', this.resetAll);
			this.model.fetch();
		},
		
		addEvent: function(newEvent) {
			var view = new EventItemView({model: newEvent});
			this.$("#events-table").append(view.render().el);
		},
		
		resetAll: function() {
			this.$("#events-table").html("");
			this.model.each(this.addEvent);
		}
		
	});
	
	window.CreateEventView = Backbone.View.extend({
		
		el: $("#new-event-view"),
		
		initialize: function() {
			this.date = this.$('[name="date"]');
			this.attending = this.$('[name="attending"]');
			this.absent = this.$('[name="absent"]');
		},
		
		events: {
			"click button": "createEvent"
		},
		
		createEvent: function(form) {
			this.model.create({date: this.date.val(), attending: this.attending.val(), absent: this.absent.val()});
		}
		
	});
	  
});