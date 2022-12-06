// @flow
import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import Services from '../components/Services';
import { useSiteMetadata } from '../hooks';

const ServicesTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Layout title={`Services - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Services">
        <Services />
      </Page>
    </Layout>
  );
};

export default ServicesTemplate;
