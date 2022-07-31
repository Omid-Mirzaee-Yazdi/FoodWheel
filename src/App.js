import styles from './App.module.css';
import { Particle } from './components/Particle';
import { Coordinator } from './components/ParticleCoordinator';
const particlesCount = 100;

const App = () => {
  return (
    <div className='App'>
      <div className={styles.scene}>
        <Coordinator count={particlesCount} />
      </div>
    </div>
  );
};

export default App;
