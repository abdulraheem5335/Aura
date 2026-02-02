import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../style/pageTransition.css';

export function PageTransition({ children }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionState, setTransitionState] = useState('entered');

  useEffect(() => {
    // Start exit animation
    setTransitionState('exiting');
    
    const exitTimer = setTimeout(() => {
      // Update children and start enter animation
      setDisplayChildren(children);
      setTransitionState('entering');
      
      // Scroll to top on page change
      window.scrollTo(0, 0);
      
      const enterTimer = setTimeout(() => {
        setTransitionState('entered');
      }, 300);
      
      return () => clearTimeout(enterTimer);
    }, 200);

    return () => clearTimeout(exitTimer);
  }, [location.pathname]);

  return (
    <div className={`page-transition ${transitionState}`}>
      {displayChildren}
    </div>
  );
}

/**
 * Simple fade transition wrapper
 */
export function FadeTransition({ children }) {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
      window.scrollTo(0, 0);
    }, 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className={`fade-transition ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
}
