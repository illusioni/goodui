//most stuff here will be replaced by better code
//and/or go into individual files later

$(function() {
	
	var Events = new EventList;
		
	Events.on("add", function(item) {
		$('#log-el').append('Item added: ' + JSON.stringify(item) + '\n');
	});
	
	var EventsView = new EventListView({model: Events});
	
	if (Events.length<2) {
		alert("adding some dummy data");
		Events.create({date: '2012-12-01', attending: ['Frank', 'Verena', 'Ada',  'Klaus', 'Dan'], absent: ['Saskia', 'Michi']});
		Events.create({date: '2012-12-08', attending: ['Frank', 'Verena', 'Ada',  'Klaus', 'Saskia', 'Michi'], absent: ['Dan']});
		Events.create({date: '2012-12-15', attending: ['Frank', 'Ada', 'Dan'], absent: ['Michi']});
	}
	
	alert("klick ok to modify an event without addressing storage");
	Events.at(0).set({attending: ['nobody'], absent: ['everybody']});
	alert("klick ok to modify and store an event");
	Events.at(1).save({attending: ['everybody'], absent: ['nobody']});

	window.addNewEvent = function(form) {
		Events.create({date: form.date.value, attending: $(form.attending).val(), absent: $(form.absent).val()});
	}
	
});

