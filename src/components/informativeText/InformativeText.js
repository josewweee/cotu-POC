import styles from './informativeText.module.css';
import { useEffect, useState } from 'react';

const InformativeText = () => {
  const [text, setText] = useState('');
  useEffect(() => {
    setText('Listening audio...');
    setTimeout(() => {
      setText('Processing audio...');
    }, 7000);
  }, []);
  return <p className={styles.text}>{text}</p>;
};

export default InformativeText;
