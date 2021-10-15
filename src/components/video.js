import styles from './video.module.css';

const Video = ({ name }) => {
  return (
    <>
      <div className={styles.video}>{name}</div>
    </>
  );
};

export default Video;
