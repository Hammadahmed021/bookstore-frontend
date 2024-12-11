import {  getBaseURL } from "./getBaseUrl";
const BASE_URL = getBaseURL(); // Call the function to get the URL

function getImgUrl(name) {
  
  if (!name) return ""; // Handle cases where `name` is undefined
  return name.startsWith("http") ? name : `${BASE_URL}uploads/${name}`;
}

export { getImgUrl };
