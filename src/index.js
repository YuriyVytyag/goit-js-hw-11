// import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import photoList from './templates/photoList.hbs';
import { getPhotos } from './photoSearch';

const searchFormEl = document.querySelector('.search-form');
const listEl = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-btn');

let searchQuery = '';
let page = 1;
let totalPages = 0;
const gallery = new SimpleLightbox('.gallery a');

const onInputChange = event => {
  event.preventDefault();
  searchQuery = event.target.elements['searchQuery'].value;
  if (searchQuery === '') {
    return Notiflix.Notify.warning('Sorry, input is empty,enter data');
  }
  updateData();
  fetchPhotos();
};

function updateData() {
  listEl.innerHTML = '';
  page = 1;
}

function onLoadMore() {
  page += 1;
  fetchPhotos();
}

async function fetchPhotos() {
  const data = await getPhotos(searchQuery, page);
  const { hits, totalHits } = data;
  /*   getPhotos(searchQuery, page).then(({ hits, totalHits }) => { */
  totalPages = totalHits / 40;
  if (hits.length === 0) {
    loadBtn.classList.add('hidden');
    return Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  listEl.insertAdjacentHTML('beforeend', photoList(hits));
  gallery.refresh();
  loadBtn.classList.remove('hidden');
  if (page === 1) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }
  if (page === totalPages) {
    loadBtn.classList.add('hidden');
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
  /*  }); */
}

searchFormEl.addEventListener('submit', onInputChange);
loadBtn.addEventListener('click', onLoadMore);
