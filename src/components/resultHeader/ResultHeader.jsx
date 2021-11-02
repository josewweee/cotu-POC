import styles from './resultHeader.module.css';
import Clock from '../icons/Clock';
const ResultHeader = ({ videoName, videoTime }) => {
  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <span>{videoName}:</span>
      </div>
      <div className={styles.timeContainer}>
        <Clock />
        <span className={styles.time}>{`${videoTime} Seconds`}</span>
      </div>
    </div>
  );
};

export default ResultHeader;
