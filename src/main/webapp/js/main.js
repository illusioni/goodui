//most stuff here will be replaced by better code
//and/or go into individual files later

$(function() {
	
	//the model instance
	var Events = new EventList;
	
	//view instances
	var ListView = new EventListView({model: Events});
	var CreateView = new CreateEventView({model: Events});
	
	//oldschool DOM manipulation for the log
	Events.on("add",    function(item) { $('#log-el').append('Item added: ' + JSON.stringify(item) + '\n'); });
	Events.on("remove", function(item) { $('#log-el').append('Item removed: ' + JSON.stringify(item) + '\n'); });
	Events.on("reset",  function(item) { $('#log-el').append('EventsList reset.\n'); });
	
});

