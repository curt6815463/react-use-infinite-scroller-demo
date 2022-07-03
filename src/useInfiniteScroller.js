import { useCallback, useEffect, useRef } from "react";
import getIsAtThreshold from "./getIsAtThreshold.js";

const axisEnum = {
  x: "x",
  y: "y",
};

const useInfiniteScroller = ({
  onLoadMore,
  isLoading,
  threshold = 100,
  hasMore,
  axis = axisEnum.y,
  useWindow = false,
  reverseDirection = false,
}) => {
  const containerRef = useRef(null);
  const scrollListener = useCallback(() => {
    if (
      getIsAtThreshold({
        isAxisX: axis === axisEnum.x,
        useWindow,
        threshold,
        containerRef,
        reverseDirection,
      })
    ) {
      onLoadMore();
      const scrollerElement = useWindow ? window : containerRef.current;
      scrollerElement.removeEventListener("scroll", scrollListener);
    }
  }, [axis, onLoadMore, threshold, useWindow, reverseDirection]);

  useEffect(() => {
    const scrollerElement = useWindow ? window : containerRef.current;
    if (!isLoading && hasMore && scrollerElement) {
      scrollerElement.addEventListener("scroll", scrollListener);
      scrollListener();
    }
    return () => {
      scrollerElement?.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener, isLoading, hasMore, useWindow]);

  return { containerRef };
};

export default useInfiniteScroller;
