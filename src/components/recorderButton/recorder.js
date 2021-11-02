import MicRecorder from 'mic-recorder-to-mp3';
import { useState } from 'react';
import RecordIcon from '../icons/Record';
import StopRecording from '../icons/StopRecording';
import NewRecord from '../icons/NewRecord';
import styles from './recorderButton.module.css';

const Recorder = ({ returnFile, scanningFirstTime }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(new MicRecorder({ bitRate: 128 }));

  const toggleRecord = () => {
    if (isRecording === false) {
      recorder
        .start()
        .then(() => {
          // wait
          console.log('recording');
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          // do what ever you want with buffer and blob
          // Example: Create a mp3 file and play
          const randomNumber = Math.floor(Math.random() * 9999);
          const file = new File(buffer, `recording-${randomNumber}.mp3`, {
            type: blob.type,
            lastModified: Date.now(),
          });
          returnFile(file);
          /*           const player = new Audio(URL.createObjectURL(file));
          player.play(); */
        })
        .catch((e) => {
          console.log('We could not retrieve your message');
          console.log(e);
        });
    }
    setIsRecording(!isRecording);
  };

  const RecordingText = ({ isRecording, scanningFirstTime }) => {
    let text;
    switch (scanningFirstTime) {
      case true:
        text = ' New scan';
        break;
      case false:
        text = isRecording ? 'Processing...' : 'new record';
      default:
        break;
    }
    return <p className={styles.recordText}>{text}</p>;
  };

  const SwitchRecordIcon = ({ scanningFirstTime }) => {
    return (
      <>
        {scanningFirstTime ? (
          <div className={styles.newRecordIcon}>
            <NewRecord />
          </div>
        ) : (
          <div className={styles.recordIcon}>
            <RecordIcon />
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div onClick={() => toggleRecord()} className={styles.container}>
        <div className={styles.outlineCircle}>
          {isRecording ? (
            <div className={styles.stopIcon}>
              <StopRecording />
            </div>
          ) : (
            /*  <div className={styles.recordIcon}>
              <RecordIcon />
            </div> */
            <SwitchRecordIcon scanningFirstTime={scanningFirstTime} />
          )}
        </div>
        <RecordingText
          isRecording={isRecording}
          scanningFirstTime={scanningFirstTime}
        />
      </div>
    </>
  );
};

export default Recorder;
