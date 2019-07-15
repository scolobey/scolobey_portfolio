// @flow
import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import Sandbox from '../components/Sandbox';
import { useSiteMetadata } from '../hooks';

const SandboxTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Layout title={title} description={subtitle}>
      <Sidebar />
      <Page title="Sandbox">
        <Sandbox />
      </Page>
    </Layout>
  );
};

export default SandboxTemplate;
