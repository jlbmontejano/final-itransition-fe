const API_URL = import.meta.env.VITE_URL;

type FetchOptions = {
	method?: "GET" | "POST" | "PUT" | "DELETE";
	body?: Record<string, unknown>;
	headers?: Record<string, string>;
};

const fetchApi = async <T>(
	endpoint: string,
	options: FetchOptions = {}
): Promise<T> => {
	try {
		const response = await fetch(`${API_URL}${endpoint}`, {
			method: options.method || "GET",
			headers: {
				"Content-Type": "application/json",
				...(options.headers || {}),
			},
			body: options.body ? JSON.stringify(options.body) : undefined,
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || `HTTP Error: ${response.status}`);
		}

		return response.json();
	} catch (err) {
		return Promise.reject(err);
	}
};

export default fetchApi;
