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
  <div className={styles['gallery__row']}>
    <div className={styles['gallery__column']}>
      <img className={styles['gallery__item']} src="/media/sunset.png" alt="Sunset" />
      <img className={styles['gallery__item']} src="/media/kitchen.png" alt="Pepper mill" />
      <img className={styles['gallery__item']} src="/media/radish.png" alt="Funky Radish logo" />
      <img className={styles['gallery__item']} src="/media/tree_man.jpg" alt="I can't remember where I found this image, but this is a sketched recreation." />
      <img className={styles['gallery__item']} src="/media/tiber_blue.jpg" alt="Crossing the Tiber river at dusk in Rome." />
    </div>
    <div className={styles['gallery__column']}>
      <img className={styles['gallery__item']} src="/media/wall_climber.jpg" alt="A lizard, live at Pompeii. Just hanging out on the outside wall of the Pompeii ampitheatre." />
      <img className={styles['gallery__item']} src="/media/wispy_lofty.jpg" alt="Some old architecture in rome, but not that old really by comparison." />
      <img className={styles['gallery__item']} src="/media/funny_radish.jpg" alt="my wife suggested a mascot for my recipe app. Somehow it became a radish comedian." />
      <img className={styles['gallery__item']} src="/media/kitchen_tools.jpg" alt="Some old architecture in rome, but not that old really by comparison." />
    </div>
    <div className={styles['gallery__column']}>
      <img className={styles['gallery__item']} src="/media/squid.jpg" alt="I got it in my head that I wanted to draw a squid." />
      <img className={styles['gallery__item']} src="/media/mountain_night.jpg" alt="An initial experiment with delaunay mountains and a starry night." />
      <img className={styles['gallery__item']} src="/media/totem.jpg" alt="Totems are cool. I threw in some leaves and flowers in styles that I had copied while traveling." />
      <img className={styles['gallery__item']} src="/media/gorilla.jpg" alt="I saw a gorilla on a poster in a coffee shop in South Africa. I took a photo and sketched from it later on." />
    </div>
  </div>
);

export default Gallery;
