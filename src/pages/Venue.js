import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Venue() {
	const navigate = useNavigate();
	useEffect(() => {
		const user = localStorage.getItem("Username");

		if (user !== "player01" && user !== "player02") {
			navigate("/");
		}
	}, [navigate]);
	const params = useParams();

	const handleClick = async () => {
		const user = localStorage.getItem("Username");
		try {
			await axios.post("http://localhost:5000/api/addfav", {
				name: params.name,
				user,
			});
			alert("Added as your favourite");
			navigate("/player");
		} catch (e) {
			alert(e);
		}
	};
	return (
		<div className="container text-center">
			<h1>Welcome to {params.name} </h1>
			<button
				type="button"
				className="btn btn-success mt-5"
				onClick={handleClick}
			>
				make this venue your favourite
			</button>
		</div>
	);
}
