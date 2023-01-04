import axios from 'axios';

const API_KEY = '32552516-7a8b8b8a438842b22faf37c20';
const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = `${BASE_URL}`;

export async function getPhotos(searchQuery, page) {
  const { data } = await axios.get(
    `?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  return data;
}
