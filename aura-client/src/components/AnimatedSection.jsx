import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Animated Section wrapper component
 * Wraps content and animates it when it comes into view
 */
export function AnimatedSection({ 
  children, 
  animation = 'slide-up', 
  className = '',
  delay = 0,
  threshold = 0.1,
  as: Component = 'div',
  ...props 
}) {
  const [ref, isVisible] = useScrollAnimation({ threshold });

  const delayStyle = delay ? { transitionDelay: `${delay}ms` } : {};

  return (
    <Component
      ref={ref}
      className={`${animation} ${isVisible ? 'visible' : ''} ${className}`}
      style={delayStyle}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Staggered Grid container
 * Children animate in sequence when container comes into view
 */
export function StaggeredGrid({ 
  children, 
  className = '',
  threshold = 0.1,
  ...props 
}) {
  const [ref, isVisible] = useScrollAnimation({ threshold });

  return (
    <div
      ref={ref}
      className={`stagger-container ${isVisible ? 'visible' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Fade In wrapper
 */
export function FadeIn({ children, delay = 0, className = '', ...props }) {
  return (
    <AnimatedSection animation="fade-in" delay={delay} className={className} {...props}>
      {children}
    </AnimatedSection>
  );
}

/**
 * Slide Up wrapper
 */
export function SlideUp({ children, delay = 0, className = '', ...props }) {
  return (
    <AnimatedSection animation="slide-up" delay={delay} className={className} {...props}>
      {children}
    </AnimatedSection>
  );
}

/**
 * Slide In Left wrapper
 */
export function SlideInLeft({ children, delay = 0, className = '', ...props }) {
  return (
    <AnimatedSection animation="slide-in-left" delay={delay} className={className} {...props}>
      {children}
    </AnimatedSection>
  );
}

/**
 * Slide In Right wrapper
 */
export function SlideInRight({ children, delay = 0, className = '', ...props }) {
  return (
    <AnimatedSection animation="slide-in-right" delay={delay} className={className} {...props}>
      {children}
    </AnimatedSection>
  );
}

/**
 * Scale Up wrapper
 */
export function ScaleUp({ children, delay = 0, className = '', ...props }) {
  return (
    <AnimatedSection animation="scale-up" delay={delay} className={className} {...props}>
      {children}
    </AnimatedSection>
  );
}

/**
 * Zoom In wrapper
 */
export function ZoomIn({ children, delay = 0, className = '', ...props }) {
  return (
    <AnimatedSection animation="zoom-in" delay={delay} className={className} {...props}>
      {children}
    </AnimatedSection>
  );
}

/**
 * Blur In wrapper
 */
export function BlurIn({ children, delay = 0, className = '', ...props }) {
  return (
    <AnimatedSection animation="blur-in" delay={delay} className={className} {...props}>
      {children}
    </AnimatedSection>
  );
}
