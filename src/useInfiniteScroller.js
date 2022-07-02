import { useCallback, useEffect, useRef } from "react";

const getIsAtThreshold = ({ useWindow, threshold }) => {
  const useWindowCondition =
    window.innerHeight + window.scrollY + threshold >=
    document.body.offsetHeight;
  return useWindow ? useWindowCondition : false;
};

const useInfiniteScroller = ({
  onLoadMore,
  isLoading = false,
  threshold = 100,
  hasMore,
}) => {
  const containerRef = useRef(null);
  const scrollListener = useCallback(
    (event) => {
      if (getIsAtThreshold({ useWindow: true, threshold })) {
        onLoadMore();
        window.removeEventListener("scroll", scrollListener);
      }
    },
    [onLoadMore, threshold]
  );

  useEffect(() => {
    if (!isLoading && hasMore) {
      window.addEventListener("scroll", scrollListener);
      scrollListener();
    }
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener, isLoading, hasMore]);

  return { containerRef };
};

export default useInfiniteScroller;
