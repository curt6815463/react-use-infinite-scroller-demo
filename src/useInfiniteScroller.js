import { useCallback, useEffect, useRef } from "react";

const axisEnum = {
  x: "x",
  y: "y",
};

// containerLength + scrolledLength >= totalScrollLength
const getIsAtThreshold = ({ axis, useWindow, threshold, containerRef }) => {
  const isAxisX = axis === axisEnum.x;

  // return containerLength + scrolledLength >= totalScrollLength
  const useWindowXAxisCondition =
    window.innerWidth + window.scrollX + threshold >= document.body.offsetWidth;
  const useWindowYAxisCondition =
    window.innerHeight + window.scrollY + threshold >=
    document.body.offsetHeight;

  const useWindowCondition = isAxisX
    ? useWindowXAxisCondition
    : useWindowYAxisCondition;

  const element = containerRef.current;
  const useContainerXAxisCondition =
    element.clientWidth + element.scrollLeft + threshold >= element.scrollWidth;

  const useContainerYAxisCondition =
    element.clientHeight + element.scrollTop + threshold >=
    element.scrollHeight;

  const useContainerCondition = isAxisX
    ? useContainerXAxisCondition
    : useContainerYAxisCondition;

  return useWindow ? useWindowCondition : useContainerCondition;
};

const useInfiniteScroller = ({
  onLoadMore,
  useWindow = true,
  isLoading = false,
  threshold = 100,
  hasMore,
  axis = axisEnum.y,
}) => {
  const containerRef = useRef(null);

  const scrollListener = useCallback(() => {
    if (getIsAtThreshold({ axis, useWindow, threshold, containerRef })) {
      onLoadMore();
      const scrollerElement = useWindow ? window : containerRef.current;
      scrollerElement.removeEventListener("scroll", scrollListener);
    }
  }, [axis, onLoadMore, threshold, useWindow]);

  useEffect(() => {
    const scrollerElement = useWindow ? window : containerRef.current;
    if (!isLoading && hasMore && scrollerElement) {
      scrollerElement.addEventListener("scroll", scrollListener);
      scrollListener(scrollerElement);
    }
    return () => {
      scrollerElement.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener, isLoading, hasMore, useWindow]);

  return { containerRef };
};

export default useInfiniteScroller;
