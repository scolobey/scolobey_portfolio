// @flow
import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import Gallery from '../components/Gallery';
import { useSiteMetadata } from '../hooks';

const GalleryTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Layout title={`Gallery - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Gallery">
        <Gallery />
      </Page>
    </Layout>
  );
};

export default GalleryTemplate;
