import { useEffect, useState } from 'react';

const useIsBottom = () => {
  const [bottom, setBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 20) {
        setBottom(true);
      } else setBottom(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return bottom;
};

export default useIsBottom;
