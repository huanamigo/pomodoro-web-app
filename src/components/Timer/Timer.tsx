import { useEffect, useState } from 'react';
import styles from './Timer.module.scss';

interface IProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const Timer = ({ color, setColor }: IProps) => {
  const [seconds, setSeconds] = useState(10);
  const [minutes, setMinutes] = useState(0);
  const [isTicking, setIsTicking] = useState(false);

  const startTimer = () => {
    setIsTicking(true);
  };
  const stopTimer = () => {
    setIsTicking(false);
  };

  const resetTimer = () => {
    setSeconds(60);
    setMinutes(20);
  };

  useEffect(() => {
    const timer = setTimeout(() => isTicking && setSeconds(seconds - 1), 1e3);
    return () => clearTimeout(timer);
  });

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          if (color === 'red') {
            setColor('cyan');
          } else {
            setColor('red');
          }
        }}
        className={styles.colorBtn}
      >
        COLOR
      </button>
      <button onClick={() => resetTimer()} className={styles.resetBtn}>
        RESET
      </button>
      <button onClick={() => startTimer()} className={styles.startBtn}>
        START
      </button>
      <button onClick={() => stopTimer()} className={styles.startBtn}>
        STOP
      </button>
      <p className={styles.time}>
        {String('0' + minutes).slice(-2)}:{String('0' + seconds).slice(-2)}
      </p>
    </div>
  );
};

export default Timer;
