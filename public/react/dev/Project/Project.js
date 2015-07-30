var Project = React.createClass({
	mixins: [ State, Navigation ],
	getInitialState: function() {
		return {project: null};
	},
	componentDidMount: function() {
		OI.project({projectID: this.getParams().projectID,});

		this.dispatchID = dispatcher.register(function(payload) {
			switch (payload.type) {
			case "projectDone":
				this.setState({project: payload.data.data});
				break;
			case "projectFail":
				this.transitionTo("dashboard");
				break;
			case "newTaskDone":
			case "updateTaskDone":
			case "deleteTaskDone":
				var project = this.state.project;
				if (!project) {
					return;
				}
				OI.getProjectTasks({projectID: project.id});
				break;
			case "newTaskFail":
				Materialize.toast("Failed to create new task!", 3000, "red white-text");
				break;
			case "deleteTaskFail":
				Materialize.toast("Failed to delete existing task!", 3000, "red white-text");
				break;
			case "getProjectTasksDone":
				var project = this.state.project;
				if (!project) {
					return;
				}
				project.tasks = payload.data.data;
				this.setState({project: project});
				break;
			}
		}.bind(this));
	},
	componentWillUnmount: function() {
		dispatcher.unregister(this.dispatchID);
	},
	render: function() {
		var project = this.state.project;
		if (!project) {
			return <div/>
		}
		return (
			<main className="project">
				<Project.Cover project={project} />
				<Project.Content project={project} />
			</main>
		)
	},
});

Project.Cover = React.createClass({
	componentDidMount: function() {
		$(React.findDOMNode(this.refs.parallax)).parallax();
	},
	render: function() {
		var project = this.props.project;
		return (
			<div className="parallax-container">
				<div ref="parallax" className="parallax">
					<img src={project.imageURL} />
				</div>
				<div className="parallax-overlay valign-wrapper">
					<div className="valign">
						<Project.Cover.Title project={project} />
						<h4 className="text-center">{project.tagline}</h4>
					</div>
				</div>
			</div>
		)
	},
});

Project.Cover.Title = React.createClass({
	componentDidMount: function() {
		$(React.findDOMNode(this.refs.title));
	},
	render: function() {
		var project = this.props.project;
		return <h1 className="text-center">{project.title}</h1>
	},
});

Project.Content = React.createClass({
	componentDidMount: function() {
		$(React.findDOMNode(this.refs.tabs)).tabs();
	},
	render: function() {
		var project = this.props.project;
		return (
			<div className="row container">
				<div className="col s12">
					<ul className="tabs" ref="tabs">
						<li className="tab col s3"><a href="#project-overview">Overview</a></li>
						<li className="tab col s3"><a href="#project-tasks">Tasks</a></li>
						<li className="tab col s3"><a href="#project-milestones">Milestones</a></li>
						<li className="tab col s3"><a href="#project-members">Members</a></li>
					</ul>
				</div>
				<Project.Overview project={project} />
				<Project.Tasks project={project} />
				<Project.Milestones project={project} />
				<Project.Members project={project} />
			</div>
		)
	},
});
