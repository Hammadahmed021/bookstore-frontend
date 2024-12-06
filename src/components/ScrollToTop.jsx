import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to the top of the page when route changes
  }, [location]);  // Triggered when the location changes (i.e., route changes)

  return null; // No need to render anything
};

export default ScrollToTop;
