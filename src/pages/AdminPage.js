import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminPage(props) {
	//After checking the admin actually logged in using localStorage
	//The admin can view and add a venue and it upload atuomatically
	const [name, setName] = useState("");
	const [venue, setVenue] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const user = localStorage.getItem("Username");
		if (user !== "admin") {
			navigate("/");
		}
		const fetch = async () => {
			try {
				const { data } = await axios.get("http://localhost:5000/api/allvenue");
				setVenue(data);
				//console.log(data);
			} catch (e) {
				alert(e);
			}
		};
		fetch();
	}, [navigate, venue]);

	const handleClick = async () => {
		const admin = localStorage.getItem("Username");
		try {
			await axios.post("http://localhost:5000/api/addvenue", {
				admin,
				name,
			});
			setName("");
			alert("Added!");
		} catch (e) {
			alert(e);
		}
	};

	const logoutHandler = () => {
		localStorage.setItem("Username", "");
	};

	return (
		<div className="container mt-5">
			<h1>Welcome Admin</h1>
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<button
						className="btn btn-primary mt-3"
						type="button"
						id="button-addon1"
						onClick={handleClick}
					>
						Add
					</button>
				</div>
				<input
					type="text"
					className="form-control mt-3"
					placeholder="Enter a Venue"
					aria-label="Example text with button addon"
					aria-describedby="button-addon1"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="row">
				<table className="table table-bordered table-striped ">
					<thead>
						<tr>
							<th className="text-center">Venue Names:</th>
						</tr>
					</thead>

					<tbody>
						{venue.map((v) => (
							<tr key={v._id}>
								<td className="text-center">{v.name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<button
				type="button"
				className="btn btn-primary "
				onClick={logoutHandler}
			>
				Logout
			</button>
		</div>
	);
}
