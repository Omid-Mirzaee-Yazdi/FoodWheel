import gsap from 'gsap';
import React, { memo, useEffect, useRef } from 'react';
import styles from './Coordinator.module.css';
const PARTICLES_COUNT = 40;

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};
const angleDelta = 360 / PARTICLES_COUNT;

const startRotation = (particlesParent, duration) => {
  gsap
    .timeline({ repeatDelay: 0, repeat: -1, yoyo: false })
    .to(particlesParent, {
      duration: duration,
      rotation: 360,
      ease: 'power0',
    });
};

const positionInACircle = (particles) => {
  particles.forEach((particle, i) => {
    const angle = angleDelta * i;
    gsap.to(particle, {
      duration: 0,
      rotate: angle + getRandom(-angle, angle),
    });
  });
};

const formCircle = ({ radius, particles }) => {
  const animationDuration = 1;
  particles.forEach((particle, i) => {
    gsap.to(particle, {
      duration:
        animationDuration + getRandom(animationDuration / 4, animationDuration),
      ease: 'elastic.out(0.5, 0.3)',
      width: radius + getRandom(radius * 0.1, radius * 0.3),
    });
  });
};

const Coordinator = ({ step, duration }) => {
  const particles = useRef([]);
  const particleParent = useRef(null);

  useEffect(() => {
    if (step === 'waiting') {
      formCircle({
        radius: 400,
        particles: particles.current,
      });
    } else if (step === 'ready') {
      formCircle({
        radius: 150,
        particles: particles.current,
      });
      gsap.to(particleParent.current, {
        duration: 0.2,
        opacity: 1,
      });
    } else if (step === 'done') {
      formCircle({
        radius: 700,
        particles: particles.current,
      });
      gsap.to(particleParent.current, {
        duration: 0.2,
        opacity: 0,
      });
    }
  }, [step]);

  useEffect(() => {
    positionInACircle(particles.current);
    startRotation(particleParent.current, duration);
  }, [duration]);

  return (
    <div ref={particleParent} className={styles.particlesParent}>
      {Array.from({ length: PARTICLES_COUNT }).map((_, i) => {
        const size = `${Math.floor(getRandom(2, 6))}px`;
        return (
          <div
            ref={(ref) => (particles.current[i] = ref)}
            key={i}
            className={styles.particleContainer}
          >
            <div
              style={{ width: size, height: size }}
              className={styles.particle}
            />
          </div>
        );
      })}
    </div>
  );
};

export default memo(Coordinator);
