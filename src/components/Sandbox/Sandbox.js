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

      <Alien width={30} />
      <Alien width={100} fill="#49c" />
      <Alien width={200} fill="#fa2" />
      <Alien
        fill="#fff"
        width={350}
        className="telephone"
        style={{ background: "#333", padding: "16px" }}
      />

    </div>

  </div>
);

export default Sandbox;
