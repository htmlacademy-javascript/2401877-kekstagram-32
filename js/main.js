import {renderGallery} from './render-gallery.js';
import {getData, sendData} from './api.js';
import {showAlert, debounce} from './util.js';
import {setOnFormSubmit, closeModal} from './form.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {init as initFilter, getFilteredPictures} from './filter.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderGallery);
  initFilter(data, debouncedRenderGallery);
  renderGallery(getFilteredPictures());
} catch {
  showAlert();
}
