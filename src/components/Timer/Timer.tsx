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
  const [stoppedMiliseconds, setStoppedMiliseconds] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [defaultMinutes, setDefaultMinutes] = useState(20);

  const startTimer = () => {
    setStartDate(new Date().getTime());
    setIsTicking(true);
    setMiliseconds(miliseconds);
  };
  const stopTimer = () => {
    setIsTicking(false);
    setStoppedMiliseconds(miliseconds);
  };

  const resetTimer = (resetMinutes: number) => {
    stopTimer();
    setMiliseconds(0);
    setSeconds(0);
    setMinutes(resetMinutes);
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

      if (seconds === 0) {
        if (minutes === 0) {
          if (isBreak) {
            setIsBreak(false);
            setColor('yellow');
            console.log('koniec przerwy');
            resetTimer(20);
            startTimer();
          } else if (!isBreak) {
            setIsBreak(true);
            setColor('red');
            console.log('przerwa');
            resetTimer(5);
            startTimer();
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [miliseconds, seconds, minutes]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--progress',
      `${((minutes * 60 + seconds) / (defaultMinutes * 60)) * 100}%`
    );
    console.log(`${((minutes * 60 + seconds) / (defaultMinutes * 60)) * 100}%`);
  }, [defaultMinutes, seconds]);

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
      <button
        onClick={() => {
          resetTimer(defaultMinutes);
          setIsBreak(false);
        }}
        className={styles.resetBtn}
      >
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
      <input
        type="number"
        onChange={(e) => {
          setDefaultMinutes(Number(e.target.value));
          resetTimer(Number(e.target.value));
          if (!isTicking) {
            setMinutes(Number(e.target.value));
          }
        }}
      />
      <p className={styles.time}>
        {String('0' + minutes).slice(-2)}:{String('0' + seconds).slice(-2)}
      </p>
      <p className={styles.time}>{String('00' + miliseconds).slice(-3)}</p>
      <div className={styles.progressBar}>
        <div className={styles.progressBarInside}></div>
      </div>
    </div>
  );
};

export default Timer;
