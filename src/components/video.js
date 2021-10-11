import styles from './video.module.css';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const Video = ({ name }) => {
  return (
    <>
      <div className={styles.video}>{name}</div>
    </>
  );
};

export default Video;
