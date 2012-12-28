$(function() {
	
	//the model instances
	var activity = new Activity();
	var events = new EventList();
	
	//view instances
	var activityView = new ActivityDetailsView({model: activity});
	var listView = new EventListView({model: events});
	var createView = new CreateEventView({model: events});
	
	//the router
	var Router = Backbone.Router.extend({
		routes: {
			"":                       "displayActivitiesList",
			"activities/:activityId": "displayActivity"
		},
		
		displayActivity: function(activityId) {
			activity.set({name: activityId});
			//doesn't do anything with local storage:
			events.url = "/activities/" + activityId + "/events";
			alert("reloading event list from url " + events.url);
			events.fetch();
			$("#activity-details").show();
			$("#activities-list").hide();
		},
		
		displayActivitiesList: function() {
			$("#activity-details").hide();
			$("#activities-list").show();
		}
	});
	var router = new Router();
	Backbone.history.start();
	
	//oldschool DOM manipulation for the log
	events.on("add",    function(item) { $('#log-el').append('Item added: ' + JSON.stringify(item) + '\n'); });
	events.on("remove", function(item) { $('#log-el').append('Item removed: ' + JSON.stringify(item) + '\n'); });
	events.on("reset",  function(item) { $('#log-el').append('EventsList reset.\n'); });
	
});

