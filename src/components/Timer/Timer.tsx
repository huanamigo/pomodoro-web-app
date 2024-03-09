import { useEffect, useState } from 'react';
import styles from './Timer.module.scss';

interface IProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const Timer = ({ setColor }: IProps) => {
  const [miliseconds, setMiliseconds] = useState(0);
  const [isTicking, setIsTicking] = useState(false);
  const [startDate, setStartDate] = useState(new Date().getTime());
  const [stoppedMiliseconds, setStoppedMiliseconds] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [defaultMinutes, setDefaultMinutes] = useState(20);
  const [defaultBreakMinutes, setDefaultBreakMinutes] = useState(5);
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
            setColor('rgb(70, 200, 134)');
          } else {
            setIsBreak(true);
            setColor('rgb(210, 60, 60)');
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
    if (!isBreak) {
      setMinutes(defaultMinutes);
    } else {
      setMinutes(defaultBreakMinutes);
    }
    resetTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultBreakMinutes, defaultMinutes, isBreak]);

  // progressbar styling
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
  }, [defaultBreakMinutes, defaultMinutes, isBreak, minutes, seconds]);

  return (
    <div className={styles.container}>
      <div className={styles.mainTimer}>
        <div className={styles.progressBar}>
          <div className={styles.progressBarInside}></div>
        </div>
        <p className={styles.time}>
          {String('0' + minutes).slice(-2)}:{String('0' + seconds).slice(-2)}
        </p>
      </div>
      <div className={styles.buttonContainer}>
        {/* <button
          onClick={() => {
            if (color === 'red') {
              setColor('purple');
            } else {
              setColor('red');
            }
          }}
          className={styles.colorBtn}
        >
          COLOR
        </button> */}
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
          {isTicking ? 'STOP' : 'START'}
        </button>
        <button
          onClick={() => {
            resetTimer();
            stopTimer();
          }}
          className={styles.resetBtn}
        >
          RESET
        </button>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <button
            onClick={() => {
              if (defaultMinutes > 1) {
                setDefaultMinutes(defaultMinutes - 1);
              }
            }}
          >
            -
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
              setDefaultMinutes(Number(e.target.value));
            }}
          />
          <button
            onClick={() => {
              if (defaultMinutes < 99) {
                setDefaultMinutes(defaultMinutes + 1);
              }
            }}
          >
            +
          </button>
        </div>
        <div className={styles.inputWrapper}>
          <button
            onClick={() => {
              if (defaultBreakMinutes > 1) {
                setDefaultBreakMinutes(defaultBreakMinutes - 1);
              }
            }}
          >
            -
          </button>
          <input
            type="number"
            name="minutes"
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
              if (!isBreak) {
                resetTimer();
              }
              setDefaultBreakMinutes(Number(e.target.value));
            }}
          />
          <button
            onClick={() => {
              if (defaultBreakMinutes < 99) {
                setDefaultBreakMinutes(defaultBreakMinutes + 1);
              }
            }}
          >
            +
          </button>
        </div>
      </div>
      <p className={styles.time}>{String('00' + miliseconds).slice(-3)}</p>
    </div>
  );
};

export default Timer;
