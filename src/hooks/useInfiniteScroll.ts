import { useState, useEffect, useRef, useCallback } from 'react';
import { List, Pagination } from '../types/dataTypes';

export function useInfiniteScroll(
  fetchData: (page: number, size: number, userId?: number) => Promise<any>,
  pageNum: number,
  userNum: number,
  userId?: number | undefined,
  initialData = [],
  initialPagination = null
) {
  const [items, setItems] = useState<List[]>(initialData);
  const [pagination, setPagination] = useState<Pagination | null>(
    initialPagination
  );

  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(pageNum);
  const [userSize, setUserSize] = useState(userNum);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    const fetchMoreData = async () => {
      setIsLoading(true);
      setTimeout(async () => {
        const res = await fetchData(page, userSize, userId);

        setIsLoading(false);
        setItems([...items, ...res.data.list]);
        setPagination(res.data.pagination);
      }, 1500);

      if (pagination?.current === pagination?.total) setHasMore(true);
    };

    fetchMoreData();
  }, [page, userSize, userId]);

  return { items, pagination, isLoading, lastItemRef, hasMore };
}
