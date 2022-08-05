const post = <T extends object>(url: string, body: T) =>
	fetch(url, {
		method: "POST",
		headers: new Headers({
			"Content-Type": "application/json",
			Accept: "application/json"
		}),
		body: JSON.stringify(body)
	});

export default post;
