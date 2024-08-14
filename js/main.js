import {renderGallery} from './render-gallery.js';
import {getData, sendData} from './api.js';
import {showAlert} from './util.js';
import {setOnFormSubmit, closeModal} from './form.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

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
  renderGallery(data);
} catch {
  showAlert();
}
