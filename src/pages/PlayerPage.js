import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PlayerPage() {
	//The players can login and choose a venue to Enter
	//The can also set a favourite venue

	const [venue, setVenue] = useState([]);
	const [userV, setUserV] = useState("");
	const navigate = useNavigate();
	useEffect(() => {
		const user = localStorage.getItem("Username");
		if (user !== "player01" && user !== "player02") {
			navigate("/");
		}
		const fetch = async () => {
			try {
				const { data } = await axios.get("http://localhost:5000/api/allvenue");
				setVenue(data);
			} catch (e) {
				alert(e);
			}
		};
		const fetchUser = async () => {
			const user = localStorage.getItem("Username");
			//console.log(user);
			try {
				const { data } = await axios.post(
					"http://localhost:5000/api/userInfo",
					{
						user: user,
					}
				);
				setUserV(data);
			} catch (e) {
				alert(e);
			}
		};
		fetch();
		fetchUser();
	}, [navigate]);

	const logoutHandler = () => {
		localStorage.setItem("Username", "");
		navigate("/");
	};

	return (
		<div className="container text-center">
			<h1 className="mb-3">Welcome {localStorage.getItem("Username")}</h1>
			<div className="row">
				<table className="table table-bordered table-striped ">
					<thead>
						<tr>
							<th className="text-center">Venue Names:</th>
							<th>Action:</th>
						</tr>
					</thead>

					<tbody>
						{venue.map((v) => (
							<tr key={v._id}>
								<td className="text-center">{v.name}</td>
								<td>
									<button
										type="button"
										className="btn btn-primary"
										onClick={() => navigate(`/venue/${v.name}`)}
									>
										visit
									</button>
									{userV.favVenue === v._id && <div>Your fav</div>}
								</td>
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
