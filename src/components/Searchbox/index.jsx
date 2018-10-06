import React from "react";

import "./index.less";

class Searchbox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: ""
		};
	}

	changeInput = e => {
		this.setState({input: e.target.value});
	}

	render() {
		return (
			<input
				className="Search"
				type="text"
				placeholder="Search here…"
				value={this.state.input}
				onChange={this.changeInput}
			/>
		);
	}
}

export default Searchbox;
