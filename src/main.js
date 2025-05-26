import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = e.target.searchQuery.value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(
      currentQuery,
      currentPage
    );

    if (hits.length === 0) {
      iziToast.info({
        title: 'No Results',
        message: 'No images found. Try a different query.',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);

    if (totalHits > currentPage * 15) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  const firstCardBefore = document.querySelector(
    '.gallery .photo-card:last-child'
  );

  try {
    const { hits, totalHits } = await getImagesByQuery(
      currentQuery,
      currentPage
    );
    createGallery(hits);

    const totalPages = Math.ceil(totalHits / 15);
    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End of Results',
        message: 'You have reached the end of the search results.',
        position: 'topRight',
      });
    }

    scrollToNewImages();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

function scrollToNewImages() {
  const firstNewCard = document.querySelectorAll('.gallery .photo-card');
  if (firstNewCard.length < 16) return; // якщо менше ніж 2 сторінки — не скролимо

  const cardHeight = firstNewCard[0].getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2 + 24 * 2, // 2 висоти з урахуванням міжрядкових відступів
    behavior: 'smooth',
  });
}
