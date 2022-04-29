import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from './api-service';
// import {addMarkupGallery} from './markup-gallery'

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const LoadMoreBtn = document.querySelector('.load-more');
const submitBtnEl = document.querySelector('button[type="submit"]')


const apiService = new ApiService();


searchFormEl.addEventListener('submit', onSearchFormElSubmit);
LoadMoreBtn.addEventListener('click', fetchPhotos);

let lightbox = new SimpleLightbox('.gallery a')

hide();


function onSearchFormElSubmit(e) {
e.preventDefault()
    apiService.query = e.currentTarget.elements.searchQuery.value;
    if (apiService.query === '') {
    return 
  }
  
  apiService.resetPage();
  clearGallery();
  fetchPhotos();

}
 

function clearGallery() {
 galleryEl.innerHTML = '';
}



function show() {
        LoadMoreBtn.classList.remove('is-hidden');
    }

function    hide() {
        LoadMoreBtn.classList.add('is-hidden');
}
    


function fetchPhotos() {
   hide();
  apiService.getPhotos().then(data => {
    addMarkupGallery(data)
    lightbox.refresh();
    if (data.totalHits === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }
    if (data.totalHits !== 0 && data.hits.length === 0) {
    Notify.warning(`We're sorry, but you've reached the end of search results.`);
    return;
    }
    show();
    
  })
  
}

function addMarkupGallery(data) {
    const markupGallery = data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`).join("");
    galleryEl.innerHTML = markupGallery;
    
}