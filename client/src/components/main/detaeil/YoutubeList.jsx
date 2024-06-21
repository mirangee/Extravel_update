import React from 'react';
import styles from '../../../scss/YoutubeList.scss';

const YoutubeList = () => {
  return (
    <div className={styles.youtubeContainer}>
      <iframe
        className='youtube1'
        width='500'
        height='285'
        src='https://www.youtube.com/embed/IRG-MEF_IDY'
      ></iframe>
      <iframe
        className='youtube2'
        width='500'
        height='285'
        src='https://www.youtube.com/embed/snW9W3rjeos'
      ></iframe>
      <iframe
        className='youtube3'
        width='500'
        height='285'
        src='https://www.youtube.com/embed/ktu5LeQgDrE'
      ></iframe>
    </div>
  );
};

export default YoutubeList;
