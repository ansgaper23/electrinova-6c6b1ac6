import { useEffect, useState } from "react";

export function useCountUp(target: number, isActive: boolean, duration = 1500, decimals = 0) {
  const [count, setCount] = useState<number | string>(0);

  useEffect(() => {
    if (!isActive) return;

    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      
      setCount(decimals > 0 ? current.toFixed(decimals) : Math.round(current));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [isActive, target, duration, decimals]);

  return count;
}

