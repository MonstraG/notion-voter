const debounce = (func: Function, delay: number) => {
	let timeout: ReturnType<typeof setTimeout>;
	let debouncing = false; // was there even a call to debounce
	return (...args: any[]) => {
		debouncing = true;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			if (debouncing) {
				func.apply(null, args);
			}
			debouncing = false;
		}, delay);
	};
};

export default debounce;
