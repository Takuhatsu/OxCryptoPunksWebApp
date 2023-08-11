import React from 'react';

export const scrollToSectionSmoothly = (sectionId, duration = 500) => {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const targetPosition = section.getBoundingClientRect().top;
  const startPosition = window.pageYOffset || document.documentElement.scrollTop;
  const startTime = performance.now();

  const scrollStep = (timestamp) => {
    const currentTime = timestamp - startTime;
    const progress = Math.min(currentTime / duration, 1);
    const easeFunction = easeOutQuad(progress);
    window.scrollTo(0, startPosition + easeFunction * (targetPosition - startPosition));

    if (currentTime < duration) {
      requestAnimationFrame(scrollStep);
    }
  };

  const easeOutQuad = (t) => t * (2 - t);

  requestAnimationFrame(scrollStep);
};

class SmoothScrollToSection extends React.Component {
  componentDidMount() {
    const { sectionId, duration } = this.props;
    scrollToSectionSmoothly(sectionId, duration);
  }

  render() {
    return null;
  }
}

export default SmoothScrollToSection;