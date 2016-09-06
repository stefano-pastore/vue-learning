new Vue({
	el : '#app',
	data : {
		tasks : [
			{ body : 'Sweep the floor', completed: false },
			{ body : 'Go to the store', completed: true },
			{ body : 'Prepare lunch', completed: true },
			{ body : 'Pick up kids from school', completed: false }
		]
	},
	methods : {
		toggleCompleted : function(task)
		{
			task.completed = !task.completed;
		}
	}
});