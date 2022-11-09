import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signin() {
	//This is a normal signin page that the admin is rediercty staticly while for players it checks
	//the database (mongo) for the credential while storing the name of the player in a localStorge
	// for access instead of using Redux or useContext hook because it's a small project.
	//While using Bootstrap for the UI
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();
		if (userName === "admin" && password === "123456") {
			localStorage.setItem("Username", userName);
			navigate("/admin");
		} else {
			const { data } = await axios.post("http://localhost:5000/api/signin", {
				username: userName,
				password,
			});
			if (data.error) {
				alert(data.error);
				return;
			}
			localStorage.setItem("Username", userName);
			navigate("/player");
		}
	};
	return (
		<div className="container mt-5">
			<h1>Sign In</h1>
			<form onSubmit={submitHandler}>
				<div className="form-group m-3">
					<label className="mb-1">Email address</label>
					<input
						required
						className="form-control"
						placeholder="Enter your user name"
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>
				<div className="form-group m-3">
					<label className="mb-1">Password</label>
					<input
						type="password"
						required
						className="form-control"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit" className="btn btn-primary ms-3">
					Submit
				</button>
			</form>
		</div>
	);
}
