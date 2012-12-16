//most stuff here will be replaced by better code
//and/or go into individual files later

$(function() {
	
	var Events = new EventList;
		
	Events.on("add", function(item) {
		$('#log-el').append('Item added: ' + JSON.stringify(item) + '\n');
	});
	
	var EventsView = new EventListView({model: Events});
	
	
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

