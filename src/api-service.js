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

  fetchArticles() {
    const url = `${BASE_URL}/everything?q=${this.searchQuery}&language=en&pageSize=5&page=${this.page}`;

    return fetch(url, options)
      .then(response => response.json())
      .then(({ articles }) => {
        this.incrementPage();
        return articles;
      });
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