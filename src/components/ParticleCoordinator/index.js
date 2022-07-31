import React from 'react';
import { Particle } from '../Particle';
import styles from './Coordinator.module.css';

export const Coordinator = ({ count }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => {
        return <Particle key={i} />;
      })}
    </div>
  );
};
