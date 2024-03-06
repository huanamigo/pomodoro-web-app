import { useEffect, useState } from 'react';
import styles from './Timer.module.scss';

interface IProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const Timer = ({ color, setColor }: IProps) => {
  const [miliseconds, setMiliseconds] = useState(0);
  const [isTicking, setIsTicking] = useState(false);
  const [startDate, setStartDate] = useState(new Date().getTime());
  const [stoppedMiliseconds, setStoppedMiliseconds] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [defaultMinutes, setDefaultMinutes] = useState(2);
  const [defaultBreakMinutes, setDefaultBreakMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(defaultMinutes);

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
    if (isBreak) {
      setMinutes(defaultBreakMinutes);
    } else {
      setMinutes(defaultMinutes);
    }
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
            resetTimer();
            setMinutes(defaultMinutes);
            setColor('yellow');
            console.log('koniec przerwy');
            console.log(isBreak);
            console.log(defaultMinutes);
            startTimer();
          } else if (!isBreak) {
            setIsBreak(true);
            resetTimer();
            setMinutes(defaultBreakMinutes);
            setColor('red');
            console.log('przerwa');
            console.log(isBreak);
            console.log(defaultBreakMinutes);
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
    if (isBreak) {
      document.documentElement.style.setProperty(
        '--progress',
        `${((minutes * 60 + seconds) / (defaultBreakMinutes * 60)) * 100}%`
      );
    } else {
      document.documentElement.style.setProperty(
        '--progress',
        `${((minutes * 60 + seconds) / (defaultMinutes * 60)) * 100}%`
      );
    }
    // console.log(`${((minutes * 60 + seconds) / (defaultMinutes * 60)) * 100}%`);
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
          resetTimer();
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
        name="minutes"
        max={99}
        min={1}
        maxLength={2}
        value={defaultMinutes}
        onChange={(e) => {
          if (e.target.value.length === 2) {
            if (e.target.value[0] === '0') {
              e.target.value = e.target.value.slice(1, 2);
            }
          }
          if (e.target.value.length > 2) {
            e.target.value = e.target.value.slice(0, 2);
          }
          if (!isBreak) {
            resetTimer();
          }
          if (!isTicking) {
            setDefaultMinutes(Number(e.target.value));
          }
        }}
      />
      <input
        type="number"
        name="breakMinutes"
        max={99}
        min={1}
        maxLength={2}
        value={defaultBreakMinutes}
        onChange={(e) => {
          if (e.target.value.length === 2) {
            if (e.target.value[0] === '0') {
              e.target.value = e.target.value.slice(1, 2);
            }
          }
          if (e.target.value.length > 2) {
            e.target.value = e.target.value.slice(0, 2);
          }
          if (isBreak) {
            resetTimer();
          }
          if (!isTicking) {
            setDefaultBreakMinutes(Number(e.target.value));
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
