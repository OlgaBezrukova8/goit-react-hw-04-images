import axios from 'axios';

const API_KEY = '28090612-053d38b519fb99dbfe43ba7b5';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImageAPI = async (name, page) => {
  const response = await axios.get(
    `?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};
