import './reset.css';
import styles from './App.module.scss';

import Timer from './components/Timer/Timer';
import { useEffect, useState } from 'react';

function App() {
  const [color, setColor] = useState('red');

  useEffect(() => {
    document.documentElement.style.setProperty('--main-color', `${color}`);
  }, [color]);

  return (
    <div className={styles.container}>
      <Timer color={color} setColor={setColor} />
    </div>
  );
}

export default App;
