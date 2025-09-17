const API_BASE_URL = "https://localhost:7249/api/Product/";

export const fetchData = async (urlParam: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}${urlParam}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
