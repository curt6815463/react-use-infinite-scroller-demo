import getScrollInfo from "./getScrollInfo.js";

const getIsAtThreshold = ({
  isAxisX,
  useWindow,
  threshold,
  containerRef,
  reverseDirection,
}) => {
  if (reverseDirection) {
    const { scrolledLength } = getScrollInfo({
      useWindow,
      isAxisX,
      containerRef,
    });

    return scrolledLength - threshold <= 0;
  }

  const { containerLength, scrolledLength, totalScrollLength } = getScrollInfo({
    useWindow,
    isAxisX,
    containerRef,
  });

  return containerLength + scrolledLength + threshold >= totalScrollLength;
};

export default getIsAtThreshold;
