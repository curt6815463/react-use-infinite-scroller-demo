import { useCallback, useState } from "react";

const useLoadList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [offset, setOffset] = useState(1100);
  const [total, setTotal] = useState(Infinity);
  const [error, setError] = useState(null);
  const hasMore = total > offset;

  const loadMore = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
      );
      const data = await res.json();
      setListData([...listData, ...data.results]);
      setIsLoading(false);
      setOffset(offset + 10);
      setTotal(data.count);
    } catch (error) {
      setError(error);
    }
  }, [listData, offset]);

  return {
    listData,
    loadMore,
    isLoading,
    hasMore,
    error,
  };
};

export default useLoadList;
