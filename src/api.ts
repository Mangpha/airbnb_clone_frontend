const BASE_URL = 'http://localhost:8000/api/v1'

export const getRooms = async () => {
  const response = await fetch(`${BASE_URL}/rooms/`);
  const json = await response.json();
  return json;
}