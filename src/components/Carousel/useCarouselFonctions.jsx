import { Children, useCallback, useState } from 'react';

const useCarouselFonctions = (carousel, children, itemToShow) => {
  const [page, setPage] = useState(0);
  const [touchStart, setTouchStart] = useState();
  const [touchEnd, setTouchEnd] = useState();
  const childrensCount = Children.count(children);

  // PAGE CHANGE
  const updateActive = useCallback(
    (newIndex) => {
      setTouchEnd();
      setTouchStart();
      if (newIndex < 0) setPage(childrensCount / itemToShow - 1);
      else if (newIndex >= childrensCount / itemToShow) setPage(0);
      else setPage(newIndex);
    },
    [childrensCount, itemToShow]
  );

  // SLIDER
  const handleTouchStart = (event) => setTouchStart(event.targetTouches[0].clientX);

  const handleTouchMove = (event) => setTouchEnd(event.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) updateActive(page + 1);
    if (touchStart - touchEnd < -100) updateActive(page - 1);
  };

  return {
    childrensCount,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    page,
    updateActive,
  };
};

export default useCarouselFonctions;
