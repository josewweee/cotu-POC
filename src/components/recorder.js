import MicRecorder from 'mic-recorder-to-mp3';
import { useState } from 'react';

const Recorder = ({ returnFile }) => {
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
  return (
    <>
      <button onClick={() => toggleRecord()}>
        {isRecording ? 'Stop' : 'Record'}
      </button>
    </>
  );
};

export default Recorder;
