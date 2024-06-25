import React from 'react';
import styles from '../../../scss/YoutubeList.module.scss';

const YoutubeList = () => {
  return (
    <div className={styles.youtubeContainer}>
      <iframe
        className={styles.youtube1}
        width='500'
        height='285'
        src='https://www.youtube.com/embed/IRG-MEF_IDY'
      ></iframe>
      <iframe
        className={styles.youtube2}
        width='500'
        height='285'
        src='https://www.youtube.com/embed/snW9W3rjeos'
      ></iframe>
      <iframe
        className={styles.youtube3}
        width='500'
        height='285'
        src='https://www.youtube.com/embed/ktu5LeQgDrE'
      ></iframe>
    </div>
  );
};

export default YoutubeList;
