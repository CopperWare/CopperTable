import React from "react";

import "./index.less";

const App = () => (
	<div className="App">
		<div className="Title">CopperTable</div>
		<div className="Description">
			Search for students, teachers, classes,
			<br />
			classrooms, subjects and more…
		</div>
		<input className="Search" type="text" placeholder="Search here…" />
		<div className="Content" />
	</div>
);

export default App;
