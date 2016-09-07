Vue.component('tasks-component', {
	props : ['list'],
	template : '#tasks-template',
	methods : {
		toggleCompleted : function(task)
		{
			task.completed = !task.completed;
		},
		isCompleted : function(task)
		{
			return task.completed;
		},
		inProgress : function(task)
		{
			return ! this.isCompleted(task);
		},
		deleteTask : function(task)
		{
			this.list.$remove(task);
		}
	},
	computed : {
		remainingTasks : function()
		{
			return this.list.filter(this.inProgress).length;
		}
	}
});

Vue.component('task-form-component', {
	template : '#task-form-template',
	props : ['list'],
	methods : {
		addNewTask : function(task)
		{
			this.list.push({ body : task, completed : false });
		}
	},
	data : function()
	{
		return {
			task : ''
		};
	}
});

new Vue({
	el : '#app',
	data : {
		tasks : []
	}
});