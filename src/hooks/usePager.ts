import { useState } from 'react';

export default function usePager(page: number, tag?: string) {
  const [currentPage, setPage] = useState(page);

  return [
    currentPage, 
    (value: number) => {
      setPage(value);
      window.history.pushState(
        undefined /*data*/,
        '',
        `${tag ? `/tag/${tag}/` : '/'}${value ? `page/${value}` : ''}`
      );
    }
  ] as const;
}