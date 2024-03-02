import { useEffect, useState } from 'react';
import styles from './Timer.module.scss';

interface IProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const Timer = ({ color, setColor }: IProps) => {
  const [miliseconds, setMiliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [isTicking, setIsTicking] = useState(false);
  const [startDate, setStartDate] = useState(new Date().getTime());
  const [stoppedMiliseconds, setStoppedMiliseconds] = useState(0);

  const startTimer = () => {
    setStartDate(new Date().getTime());
    setIsTicking(true);
    setMiliseconds(miliseconds);
  };
  const stopTimer = () => {
    setIsTicking(false);
    setStoppedMiliseconds(miliseconds);
  };

  const resetTimer = () => {
    stopTimer();
    setMiliseconds(0);
    setSeconds(0);
    setMinutes(1);
  };

  useEffect(() => {
    const timer = setTimeout(
      () =>
        isTicking &&
        setMiliseconds(new Date().getTime() - startDate + stoppedMiliseconds),
      1
    );
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (miliseconds >= 1000) {
      setStartDate(new Date().getTime());
      setMiliseconds(0);
      setStoppedMiliseconds(0);
      console.log(miliseconds);

      if (seconds === 0) {
        if (minutes === 0) {
          stopTimer();
          console.log('koniec');
          setMinutes(0);
          setSeconds(0);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }
  }, [miliseconds, seconds, minutes]);

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
      <button
        onClick={() => {
          if (isTicking) {
            stopTimer();
          } else {
            startTimer();
          }
        }}
        className={styles.startBtn}
      >
        START
      </button>
      <button onClick={() => stopTimer()} className={styles.startBtn}>
        STOP
      </button>
      <p className={styles.time}>
        {String('0' + minutes).slice(-2)}:{String('0' + seconds).slice(-2)}
      </p>
      <p className={styles.time}>{String('00' + miliseconds).slice(-3)}</p>
    </div>
  );
};

export default Timer;
