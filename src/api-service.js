import axios from 'axios';


axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

const API_KEY = '27052738-1c695e8f266ee15d7b1e30a8e';
const BASE_URL = 'https://pixabay.com/api/';


// export const getContacts = async () => {
//   const { data } = await axios.get(`${BASE_URL}?key=${API_KEY}`);

//   return data;
// }

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }


 async getPhotos () {
  const { data } = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
this.incrementPage();
  return data;
}
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}