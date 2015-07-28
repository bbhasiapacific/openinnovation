var Admin = React.createClass({
	render: function() {
		return (
			<div className="admin">
				<Header />
				<main>
					<Admin.Content />
				</main>
				<Footer />
			</div>
		)
	},
});

Admin.Content = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="container">
					<div className="projects">
						<Admin.Content.LatestProjects />
					</div>
				</div>
			</div>
		)
	},
});

Admin.Content.LatestProjects = React.createClass({
	mixins: [ Navigation ],
	getInitialState: function() {
		return {projects: []};
	},
	componentDidMount: function() {
		dispatcher.register(function(payload) {
			switch (payload.type) {
			case "latestProjectsDone":
				this.setState({projects: payload.data.data});
				break;
			case "latestProjectsFail":
				this.transitionTo("dashboard");
				break;
			}
		}.bind(this));

		OI.latestProjects({
			count: 10,
		});
	},
	render: function() {
		return (
			<div className="row">
				<h5>Latest Projects</h5>
				<ul className="collection">
					{this.projectElements()}
				</ul>
			</div>
		)
	},
	projectElements: function() {
		return buildElements(this.state.projects, function(i, el) {
			return (
				<li className="collection-item">{el.title}</li>
			)
		});
	},
});
