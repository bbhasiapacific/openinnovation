var routes = (
	<Route handler={App} path="/">
		<DefaultRoute handler={Intro} name="intro" />
		<Route handler={Login} name="login" />
		<Route handler={Register} name="register" />
		<Route handler={ForgotPassword} name="forgotpassword" />
		<Route handler={Dashboard} name="dashboard" />
		<Route handler={Project} name="project" />
		<Route handler={NewProject} name="new-project" />
		<Route handler={Profile} name="profile" />
	</Route>
);

ReactRouter.run(routes, function(Handler) {
	React.render(<Handler/>, document.getElementById("root"));
});