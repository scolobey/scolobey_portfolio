// @flow
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
// import type { Edges } from '../../types';
import styles from './Sandbox.module.scss';

// type Props = {
//   edges: Edges
// };

const Sandbox = () => (
  <div className={styles['sandbox__render']}>
    This is just a sandbox for me to work on whatever I'm currently interested in.

    <div className={styles['sandbox__container']}>
    </div>
  </div>
);

export default Sandbox;
