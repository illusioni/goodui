//most stuff here will be replaced by better code
//and/or go into individual files later

$(function() {
	
	var Events = new EventList;
		
	Events.on("add", function(item) {
		$('#log-el').append('Item added: ' + JSON.stringify(item) + '\n');
	});
	
	
	//TODO: move to view.js
	
	var EventItemView = Backbone.View.extend({
		
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
	
	var EventListView = Backbone.View.extend({
		
		el: $("#content"),
		
		initialize: function() {
			this.listenTo(Events, "add", this.addEvent);
		},
		
		addEvent: function(newEvent) {
			var view = new EventItemView({model: newEvent});
			this.$("#events-table").append(view.render().el);
		}
		
	  });
	
	var EventsView = new EventListView;
	
	
	Events.add(new Event({date: '2012-12-01', attending: ['Frank', 'Verena', 'Ada',  'Klaus', 'Dan'], absent: ['Saskia', 'Michi']}));
	Events.add(new Event({date: '2012-12-08', attending: ['Frank', 'Verena', 'Ada',  'Klaus', 'Saskia', 'Michi'], absent: ['Dan']}));
	Events.add(new Event({date: '2012-12-15', attending: ['Frank', 'Ada', 'Dan'], absent: ['Michi']}));
	
	alert("klick ok to remove one event");
	Events.at(1).destroy();
	
	alert("klick ok to modify an event");
	Events.at(1).set({attending: ['nobody'], absent: ['everybody']});

	window.addNewEvent = function(form) {
		Events.add(new Event({date: form.date.value, attending: $(form.attending).val(), absent: $(form.absent).val()}));
	}
	
});

