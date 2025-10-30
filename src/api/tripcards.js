
export async function fetchTripCards() {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error('Failed to load trips');
    }

    const data = await response.json();
    return data.trips;
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
}
