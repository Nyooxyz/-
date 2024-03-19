export default {
    async loadJsonDataLazy(jsonPath, start, end) {
        try {
            const response = await fetch(`${jsonPath}?start=${start}&end=${end}`);
            if (!response.ok) {
                throw new Error('Failed to load data');
            }
            return await response.json();
        } catch (error) {
            throw new Error(`Error loading JSON data: ${error.message}`);
        }
    },
};