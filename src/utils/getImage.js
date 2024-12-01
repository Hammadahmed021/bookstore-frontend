import { BASE_URL } from "./getBaseUrl";

function getImgUrl(name) {
  
  if (!name) return ""; // Handle cases where `name` is undefined
  return name.startsWith("http") ? name : `${BASE_URL()}uploads/${name}`;
}

export { getImgUrl };
