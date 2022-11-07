const debounce = (func: (...args: unknown[]) => unknown, delay: number) => {
	let timeout: ReturnType<typeof setTimeout>;
	let debouncing = false; // was there even a call to debounce
	return (...args: unknown[]) => {
		debouncing = true;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			if (debouncing) {
				func(...args);
			}
			debouncing = false;
		}, delay);
	};
};

export default debounce;
