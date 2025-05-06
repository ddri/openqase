import React from 'react';
import { Redirect } from '@docusaurus/router';

export default function Home(): React.ReactNode {
  // Redirect users from the base URL (/docs/) to the first doc page
  return <Redirect to="/docs/admin-cms-guide" />;
}
