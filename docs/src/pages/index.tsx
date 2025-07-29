import React from 'react';
import { Redirect } from '@docusaurus/router';

export default function Home(): React.ReactNode {
  // Redirect users from the base URL to the overview page
  return <Redirect to="/overview" />;
}
