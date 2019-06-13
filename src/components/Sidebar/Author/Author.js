// @flow
import React from 'react';
import { withPrefix, Link } from 'gatsby';
import styles from './Author.module.scss';

type Props = {
  author: {
    name: string,
    bio: string,
    photo: string
  },
  isIndex: ?boolean
};

const Author = ({ author, isIndex }: Props) => (
  <div className={styles['author']}>
    <svg className={styles['mountains']} width="198" height="50">
      <defs>
        <radialGradient id="RadialGradient1">
          <stop offset="0%" stop-color="#e8d3a3"/>
          <stop offset="100%" stop-color="#ffa633"/>
        </radialGradient>
      </defs>

      <circle cx="125" cy="26" r="10" fill="url(#RadialGradient1)"/>

      <polyline className={styles['lineA']} points="0,45 110,45 110,45 125,27 135,37 155,12 175,37 185,27 202,49"/>
      <polyline className={styles['lineB']} points="0,47 110,47 110,47 125,30 135,40 155,15 175,40 185,30 202,52"/>

    </svg>

    { isIndex ? (
      <h1 className={styles['author__title']}>
        <Link className={styles['author__title-link']} to="/">{author.name}</Link>
      </h1>
    ) : (
      <h2 className={styles['author__title']}>
        <Link className={styles['author__title-link']} to="/">{author.name}</Link>
      </h2>
    )}

    <p className={styles['author__subtitle']}>{author.bio}</p>

  </div>
);

export default Author;
