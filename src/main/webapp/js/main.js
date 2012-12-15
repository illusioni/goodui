//most stuff here will be replaced by better code
//and/or go into individual files later
//right now I am focussed on the model part and consciously choose
//to hack everything else

$(function() {
	
	var Events = new EventList;
	
	//hack for displaying an EventList
	//uses Backbone's event mechanism
	
		
	Events.on("add", function(item) {
		var source = $("#item-template").html();
		var template = Handlebars.compile(source);
		$('#events-table').append(template(item.attributes));
		
		$('#log-el').append('Item added: ' + JSON.stringify(item) + '\n');
	});
	
	Events.add(new Event({date: '2012-12-01', attending: ['Frank', 'Verena', 'Ada',  'Klaus', 'Dan'], absent: ['Saskia', 'Michi']}));
	Events.add(new Event({date: '2012-12-08', attending: ['Frank', 'Verena', 'Ada',  'Klaus', 'Saskia', 'Michi'], absent: ['Dan']}));
	Events.add(new Event({date: '2012-12-15', attending: ['Frank', 'Ada', 'Dan'], absent: ['Michi']}));

	window.addNewEvent = function(form) {
		Events.add(new Event({date: form.date.value, attending: $(form.attending).val(), absent: $(form.absent).val()}));
	}
});

