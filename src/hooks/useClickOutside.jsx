import { useEffect } from 'react';

const useClickOutside = (reference, callback) => {
  const handleClick = (event) => {
    if (reference.current && !reference.current.contains(event.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useClickOutside;
