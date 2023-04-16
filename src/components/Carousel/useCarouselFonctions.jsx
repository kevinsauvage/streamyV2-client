import { Children, useCallback, useLayoutEffect, useState } from 'react';

const useCarouselFonctions = (carousel, children, width) => {
  const [page, setPage] = useState(0);
  const [touchStart, setTouchStart] = useState();
  const [touchEnd, setTouchEnd] = useState();
  const childrensCount = Children.count(children);
  const [itemsShow, setItemsShow] = useState(0);

  // HANDLE RESPONSIVNESS
  useLayoutEffect(() => {
    if (carousel.current) {
      setItemsShow(Math.ceil(carousel.current.offsetWidth / Number(width)));
    }
  }, [carousel, width]);

  // PAGE CHANGE
  const updateActive = useCallback(
    (newIndex) => {
      setTouchEnd();
      setTouchStart();
      if (newIndex < 0) setPage(childrensCount / itemsShow - 1);
      else if (newIndex >= childrensCount / itemsShow) setPage(0);
      else setPage(newIndex);
    },
    [childrensCount, itemsShow]
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
    itemsShow,
    page,
    updateActive,
  };
};

export default useCarouselFonctions;
