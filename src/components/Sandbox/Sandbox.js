// @flow
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
// import type { Edges } from '../../types';
import styles from './Sandbox.module.scss';
import Alien from "../Alien/alien";

// type Props = {
//   edges: Edges
// };

const Sandbox = () => (
  <div className={styles['sandbox__render']}>
    This is just a sandbox where I can work on whatever I'm currently interested in.

    Currently, that would be telephones apparently.

    <div className={styles['sandbox__container']}>

      <Alien
        width={450}
        fill="#fff"
        className="ufo"
      />

    </div>

  </div>
);

export default Sandbox;
