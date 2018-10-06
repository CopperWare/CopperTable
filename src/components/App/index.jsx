import React from "react";

import Searchbox from "../Searchbox";
import DataDisplay from "../DataDisplay";

import "./index.less";

const App = () => (
	<div className="App">
		<div className="Title">CopperTable</div>
		<div className="Description">
			Search for students, teachers, classes,
			<br />
			classrooms, subjects and more…
		</div>
		<Searchbox />
		<DataDisplay />
	</div>
);

export default App;
