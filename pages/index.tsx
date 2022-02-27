import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
	const [state, setState] = useState<any>({});
	return (
		<div>
			<button
				onClick={() =>
					fetch("/api/hello")
						.then((r) => r.json())
						.then(setState)
						.catch((e) => console.error(e))
				}
			>
				b
			</button>
			<pre>{JSON.stringify(state, null, 4)}</pre>
		</div>
	);
};

export default Home;
