//most stuff here will be replaced by better code
//and/or go into individual files later
//right now I am focussed on the model part and consciously choose
//to hack everything else

$(function() {
	
	var Events = new EventList;
	
	//hack for displaying an EventList
	//uses Backbone's event mechanism
	//TODO: remove - we will use views instead
		
	Events.on("add", function(item) {
//TODO rm
//		var source = $("#item-template").html();
//		var template = Handlebars.compile(source);
//		$('#events-table').append(template(item.attributes));
		
		$('#log-el').append('Item added: ' + JSON.stringify(item) + '\n');
	});
	
	
	//TODO: move to view.js
	
	var EventItemView = Backbone.View.extend({
		
		template: Handlebars.compile($("#item-template").html()),
		
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
		
		initialize: function() {
			alert('EventListView.initialize()');
//TODO		this.listenTo(Events, 'add', this.addEvent);
		},
		
		addEvent: function(newEvent) {
			alert('EventListView.addEvent()');
//TODO		alert('EventListView.addEvent(' + JSON.stringify(newEvent.toJSON()) + ')');
//			var view = new EventItemView({model: newEvent});
//			this.$("#events-table").append(view.render().el);
		}
		
	});
	
	alert('a');
	var EventsView = new EventListView;
	alert('b');
	
	
	Events.add(new Event({date: '2012-12-01', attending: ['Frank', 'Verena', 'Ada',  'Klaus', 'Dan'], absent: ['Saskia', 'Michi']}));
	Events.add(new Event({date: '2012-12-08', attending: ['Frank', 'Verena', 'Ada',  'Klaus', 'Saskia', 'Michi'], absent: ['Dan']}));
	Events.add(new Event({date: '2012-12-15', attending: ['Frank', 'Ada', 'Dan'], absent: ['Michi']}));

	window.addNewEvent = function(form) {
		Events.add(new Event({date: form.date.value, attending: $(form.attending).val(), absent: $(form.absent).val()}));
	}
	
});

