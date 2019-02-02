import React from "react";
import { Link } from "react-router-dom";

import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbar } from "../component/navbar.jsx";

export class Home extends React.Component {
	render() {
		return (
			<div className="container mt-5">
				<Navbar />
				<h1 className="pt-3">Welcome to Crippy !</h1>
			</div>
		);
	}
}
