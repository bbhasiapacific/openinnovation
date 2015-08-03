function notifyApp(type) {
	return function(resp) {
		dispatcher.dispatch({
			type: type,
			data: resp,
		});
	}
}

var OI = {
	api: function(name, data, done, fail) {
		if (!done) done = notifyApp(name + "Done");
		if (!fail) fail = notifyApp(name + "Fail");
		$.ajax(data).done(done).fail(fail);
	},
	isLoggedIn: function() {
		this.api("isLoggedIn", {
			url: "/login",
			method: "GET",
			data: {userID: "me"},
			dataType: "json",
		});
	},
	login: function(data) {
		this.api("login", {
			url: "/login",
			method: "POST",
			data: data,
			dataType: "json",
		});
	},
	logout: function() {
		this.api("logout", {
			url: "/api/logout",
			method: "POST",
			dataType: "json",
		});
	},
	register: function(data) {
		this.api("register", {
			url: "/register",
			method: "POST",
			data: data,
			dataType: "json",
		});
	},
	user: function(data) {
		this.api("user", {
			url: "/api/user",
			method: "GET",
			data: data,
			dataType: "json",
		});
	},
	updateUser: function(data) {
		this.api("updateUser", {
			url: "/api/user",
			method: "PUT",
			data: data,
			dataType: "json",
		});
	},
	updateUserAvatar: function(data) {
		this.api("updateUserAvatar", {
			url: "/api/user",
			method: "PUT",
			data: data,
			dataType: "json",
			processData: false,
			contentType: false,
		});
	},
	involvedProjects: function(data) {
		this.api("involvedProjects", {
			url: "/api/user/project",
			method: "GET",
			data: m(data, {type: "involved"}),
			dataType: "json",
		});
	},
	createProject: function(data) {
		this.api("createProject", {
			url: "/api/project",
			method: "POST",
			data: data,
			dataType: "json",
			processData: false,
			contentType: false,
		});
	},
	featuredProjects: function(data) {
		this.api("featuredProjects", {
			url: "/api/project",
			method: "GET",
			dataType: "json",
			data: m(data, {type: "featured"}),
		});
	},
	latestProjects: function(data) {
		this.api("latestProjects", {
			url: "/api/project",
			method: "GET",
			dataType: "json",
			data: m(data, {type: "latest"}),
		});
	},
	project: function(data) {
		this.api("project", {
			url: "/api/project",
			method: "GET",
			dataType: "json",
			data: data,
		});
	},
	updateProject: function(data) {
		this.api("updateProject", {
			url: "/api/project",
			method: "PUT",
			dataType: "json",
			data: data,
		});
	},
	createTask: function(data) {
		this.api("createTask", {
			url: "/api/task",
			method: "POST",
			dataType: "json",
			data: data,
		});
	},
	updateTask: function(data) {
		this.api("updateTask", {
			url: "/api/task",
			method: "PUT",
			dataType: "json",
			data: data,
		});
	},
	deleteTask: function(data) {
		this.api("deleteTask", {
			url: "/api/task?taskID=" + data.taskID + "&projectID=" + data.projectID,
			method: "DELETE",
			dataType: "json"
		});
	},
	getTask: function(data) {
		this.api("getTask", {
			url: "/api/task",
			method: "GET",
			dataType: "json",
			data: data,
		});
	},
	toggleTaskStatus: function(data) {
		this.api("toggleTaskStatus", {
			url: "/api/task",
			method: "PUT",
			dataType: "json",
			data: m(data, {type: "toggleStatus"}),
		});
	},
	getProjectTasks: function(data) {
		this.api("getProjectTasks", {
			url: "/api/task",
			method: "GET",
			dataType: "json",
			data: m(data, {type: "project"}),
		});
	},
	getProjectMilestones: function(data) {
		this.api("getProjectMilestones", {
			url: "/api/milestone",
			method: "GET",
			dataType: "json",
			data: m(data, {type: "project"}),
		});
	},
	getProjectMembers: function(data) {
		this.api("getProjectMembers", {
			url: "/api/project/member",
			method: "GET",
			dataType: "json",
			data: data,
		});
	},
	assignWorker: function(data) {
		this.api("assignWorker", {
			url: "/api/task/worker",
			method: "POST",
			dataType: "json",
			data: data,
		});
	},
	createMilestone: function(data) {
		this.api("createMilestone", {
			url: "/api/milestone",
			method: "POST",
			dataType: "json",
			data: data,
		});
	},
	updateMilestone: function(data) {
		this.api("updateMilestone", {
			url: "/api/milestone",
			method: "PUT",
			dataType: "json",
			data: data,
		});
	},
	deleteMilestone: function(data) {
		this.api("deleteMilestone", {
			url: "/api/milestone?" + data,
			method: "DELETE",
			dataType: "json",
		});
	},
};
