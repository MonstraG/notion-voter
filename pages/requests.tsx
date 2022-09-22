export const post = <T extends object>(url: string, body: T): Promise<Response> =>
	fetch(url, {
		method: "POST",
		headers: new Headers({
			"Content-Type": "application/json",
			Accept: "application/json"
		}),
		body: JSON.stringify(body)
	});

export const get = <T extends object>(url: string): Promise<T> =>
	fetch(url).then((res) => res.json() as T);
