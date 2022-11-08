import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function useScroll(fetchNextPage, hasNextPage) {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return ref;
}
