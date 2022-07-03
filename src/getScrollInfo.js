const getScrollInfo = ({ useWindow, isAxisX, containerRef }) => {
  let containerLength;
  let scrolledLength;
  let totalScrollLength;

  if (useWindow) {
    containerLength = isAxisX ? window.innerWidth : window.innerHeight;
    scrolledLength = isAxisX ? window.scrollX : window.scrollY;
    totalScrollLength = isAxisX
      ? document.body.offsetWidth
      : document.body.offsetHeight;
    return { containerLength, scrolledLength, totalScrollLength };
  }

  const element = containerRef.current;
  containerLength = isAxisX ? element.clientWidth : element.clientHeight;
  scrolledLength = isAxisX ? element.scrollLeft : element.scrollTop;
  totalScrollLength = isAxisX ? element.scrollWidth : element.scrollHeight;
  return { containerLength, scrolledLength, totalScrollLength };
};

export default getScrollInfo;
