import MicRecorder from 'mic-recorder-to-mp3';
import { useState, useEffect } from 'react';
import RecordIcon from '../icons/Record';
import StopRecording from '../icons/StopRecording';
import NewRecord from '../icons/NewRecord';
import styles from './recorderButton.module.css';

const Recorder = ({
  returnFile,
  scanningFirstTime,
  recordingStatus,
  processingAudio,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(new MicRecorder({ bitRate: 128 }));

  const startRecording = () => {
    if (isRecording === false) {
      setIsRecording(true);
      recordingStatus(true);
      recorder
        .start()
        .then(() => {
          console.log('recording');
          setTimeout(() => {
            setIsRecording(false);
            recordingStatus(false);
            stopRecording();
          }, 10000);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const stopRecording = () => {
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
  };

  const RecordingText = ({ isRecording, scanningFirstTime }) => {
    let text;
    switch (scanningFirstTime) {
      case true:
        text = isRecording ? 'Processing...' : 'New scan';
        break;
      case false:
        text = isRecording ? 'Processing...' : 'New record';
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
      <div className={styles.container}>
        <div
          className={styles.cleanCircleContainer}
          onClick={() => startRecording()}
        >
          {processingAudio ? (
            <>
              <div className={styles.outlineCircleAnimated}></div>
              <div className={styles.stopIcon}>
                <StopRecording />
              </div>
            </>
          ) : (
            <SwitchRecordIcon scanningFirstTime={scanningFirstTime} />
          )}
        </div>
        <RecordingText
          isRecording={processingAudio}
          scanningFirstTime={scanningFirstTime}
        />
      </div>
    </>
  );
};

export default Recorder;
