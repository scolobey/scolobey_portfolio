// @flow
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
// import type { Edges } from '../../types';
import styles from './Gallery.module.scss';

// type Props = {
//   edges: Edges
// };

const Gallery = ({ edges }: Props) => (
  <div className={styles['gallery']}>
    <img className={styles['gallery__item']} src="/media/sunset.png" alt="Sunset" />
    <img className={styles['gallery__item']} src="/media/kitchen.png" alt="Pepper mill" />
    <img className={styles['gallery__item']} src="/media/radish.png" alt="Funky Radish logo" />
    <img className={styles['gallery__item']} src="/media/tiber_blue.jpg" alt="Crossing the Tiber river at dusk in Rome." />
    <img className={styles['gallery__item']} src="/media/wall_climber.jpg" alt="A lizard, live at Pompeii. Just hanging out on the outside wall of the Pompeii ampitheatre." />
    <img className={styles['gallery__item']} src="/media/wispy_lofty.jpg" alt="Some old architecture in rome, but not that old really by comparison." />
  </div>
);

export default Gallery;
