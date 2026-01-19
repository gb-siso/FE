import { useState } from 'react';

type AsyncFunction<T extends unknown[] = [], R = void> = (
  ...args: T
) => Promise<R>;

function useHandler<T extends unknown[] = [], R = void>(
  func: AsyncFunction<T, R>,
  isInfinityLoading: boolean = false
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handler = async (...args: T): Promise<R | undefined> => {
    try {
      if (isLoading) return;

      setIsLoading(true);

      const res = await func(...args);

      return res;
    } catch (err) {
      setIsLoading(false);
      throw err;
    } finally {
      if (!isInfinityLoading) {
        setIsLoading(false);
      }
    }
  };

  return {
    isLoading,
    handler
  };
}

export default useHandler;
