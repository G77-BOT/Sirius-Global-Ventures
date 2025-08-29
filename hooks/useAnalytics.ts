import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview, event, trackButtonClick, trackFormSubmission, trackLinkClick } from '@/lib/analytics';

export const usePageView = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      pageview(pathname);
    }
  }, [pathname]);
};

export const useAnalytics = () => {
  // Track page views by default when using this hook
  usePageView();

  return {
    event,
    trackButtonClick,
    trackFormSubmission,
    trackLinkClick,
  };
};

// Example usage in a component:
/*
const { trackButtonClick } = useAnalytics();

<button 
  onClick={() => {
    trackButtonClick('Subscribe Button', 'Hero Section');
    // Your click handler logic
  }}
>
  Subscribe
</button>
*/

export default useAnalytics;
