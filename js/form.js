import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {
  init as initEffect,
  reset as resetEffect
} from './effect.js';

const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;

const errorText = {
  INVALID_HASHTAG: 'Неправильный хэштег',
  INVALID_COUNT: `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Неуникальные хэштеги',
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю...'
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileInput = form.querySelector('.img-upload__input');
const hashtagInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, true);

const openModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  form.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContext = isDisabled
    ? SubmitButtonText.SUBMITTING
    : SubmitButtonText.IDLE;
};

const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

function onDocumentKeydown(evt) {
  if(isEscapeKey(evt) && !isErrorMessageShown()) {
    evt.preventDefault();
    closeModal();
  }
}

function onInputKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

const onFileUpload = () => {
  openModal();
};

const onCancelButtonClick = () => {
  closeModal();
};

const setOnFormSubmit = (callback) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      toggleSubmitButton(true);
      await callback(new FormData(form));
      toggleSubmitButton();
    }
  });
};

const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => tag.length > 0);

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_HASHTAG.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator (
  hashtagInput,
  hasValidCount,
  errorText.INVALID_COUNT,
  3
);

pristine.addValidator (
  hashtagInput,
  hasUniqueTags,
  errorText.NOT_UNIQUE,
  1
);

pristine.addValidator (
  hashtagInput,
  hasValidTags,
  errorText.INVALID_HASHTAG,
  2
);

hashtagInput.addEventListener('keydown', onInputKeydown);
descriptionInput.addEventListener('keydown', onInputKeydown);
fileInput.addEventListener('change', onFileUpload);
cancelButton.addEventListener('click', onCancelButtonClick);
initEffect();

export {setOnFormSubmit, closeModal};
