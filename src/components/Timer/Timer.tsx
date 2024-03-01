import { useEffect, useState } from 'react';
import styles from './Timer.module.scss';

interface IProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const Timer = ({ color, setColor }: IProps) => {
  const [miliseconds, setMiliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(20);
  const [isTicking, setIsTicking] = useState(false);
  const [startDate, setStartDate] = useState(new Date().getTime());

  const startTimer = () => {
    setStartDate(new Date().getTime());
    setIsTicking(true);
  };
  const stopTimer = () => {
    setIsTicking(false);
  };

  const resetTimer = () => {
    setMiliseconds(0);
    setSeconds(60);
    setMinutes(20);
  };

  useEffect(() => {
    const timer = setTimeout(
      () => isTicking && setMiliseconds(new Date().getTime() - startDate),
      1
    );
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (miliseconds >= 1000) {
      console.log(miliseconds);
      console.log('reset');
      setStartDate(new Date().getTime());
      setMiliseconds(0);
    }
  }, [miliseconds]);

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
        {String('0' + minutes).slice(-2)}:{String('0' + seconds).slice(-2)}:
        {miliseconds}
      </p>
    </div>
  );
};

export default Timer;
