import axios from 'axios';

const API_KEY = '28090612-053d38b519fb99dbfe43ba7b5';
// `https://pixabay.com/api/?q=cat&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`

export const getImageAPI = async name => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${name}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
