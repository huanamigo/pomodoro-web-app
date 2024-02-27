import './reset.css';
import styles from './App.module.scss';

import Timer from './components/Timer/Timer';

function App() {
  return (
    <div className={styles.container}>
      <Timer />
    </div>
  );
}

export default App;
