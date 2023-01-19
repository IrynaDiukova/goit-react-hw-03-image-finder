import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const config = {
  params: {
    key: '31401063-2fc2c5c1a98c516a563113d56',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  },
};

async function searchImages(query, page = 1) {
  const urlAXIOS = `?page=${page}&q=${query}`;
  const { data } = await axios.get(urlAXIOS, config);
  return data;
}

const api = {
  searchImages,
};

export default api;
