import React, { useState, useEffect } from 'react';
import '../../scss/ScrollToTopButton.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener(
        'scroll',
        toggleVisibility,
      );
    };
  }, []);

  // 페이지가 스크롤될 때 호출되는 함수
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 맨 위로 이동하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='scroll-to-top'>
      {isVisible && (
        <div className='top-button' onClick={scrollToTop}>
          <FontAwesomeIcon
            icon={faArrowUp}
            size='lg'
            style={{ color: '#266d5f' }}
          />
        </div>
      )}
    </div>
  );
};

export default ScrollToTopButton;
