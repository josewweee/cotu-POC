import React from 'react';
import styles from './videoIframe.module.css';

export const VideoIframe = () => {
  return (
    <div>
      <iframe
        src="https://preproduction.cotu.tv/v/b6S"
        title="Cotu video"
        className={styles.iframe}
      ></iframe>
    </div>
  );
};

export default VideoIframe;
