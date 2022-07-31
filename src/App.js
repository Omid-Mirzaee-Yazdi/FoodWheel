import { useState } from 'react';
import styles from './App.module.css';
import Coordinator from './components/ParticleCoordinator';

const App = () => {
  const [step, setstep] = useState('ready');

  const onClickHandler = () => {
    setstep((prev) =>
      prev === 'ready' ? 'waiting' : prev === 'waiting' ? 'done' : 'ready',
    );
  };

  return (
    <div className='App'>
      <div className={styles.scene}>
        <Coordinator duration={3} step={step} />
        <Coordinator duration={5} step={step} />
        <Coordinator duration={7} step={step} />
        <Coordinator duration={10} step={step} />

        <p onClick={onClickHandler} className={styles.startButton}>
          Start
        </p>
      </div>
    </div>
  );
};

export default App;
