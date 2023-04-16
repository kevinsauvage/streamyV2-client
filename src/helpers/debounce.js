const debounce = (function_, delay) => {
  let timeoutId;
  return (...arguments_) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      function_.apply(this, arguments_);
    }, delay);
  };
};

export default debounce;
