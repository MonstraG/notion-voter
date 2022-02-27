import type { NextPage } from "next";
import { useState } from "react";
import { Row } from "types/Row";

const Home: NextPage = () => {
	const [state, setState] = useState<Row[]>([]);

	return (
		<div>
			<button
				onClick={() =>
					fetch("/api/hello")
						.then((r) => r.json())
						.then(setState)
						.catch(console.error)
				}
			>
				fetch stuff
			</button>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Players</th>
						<th>Played</th>
						<th>Completed</th>
					</tr>
				</thead>
				<tbody>
					{state.map((row) => (
						<tr key={row.name}>
							<td>{row.name}</td>
							<td>{row.players}</td>
							<td>{row.played ? "yep" : "no"}</td>
							<td>{row.completed ? "yep" : "no"}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Home;
