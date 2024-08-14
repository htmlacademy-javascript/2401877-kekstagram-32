const ALERT_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showAlert = () => {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showAlert, isEscapeKey, debounce};
