import { useCallback, useEffect, useRef } from 'react';

type UseIsMountedReturnType = () => boolean;

const useIsMounted = (): UseIsMountedReturnType => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
};

export default useIsMounted;
