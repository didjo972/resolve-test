import React from 'react';

import { GenerateNewObject } from './GenerateNewObject';
import { ObjectGenerated } from './ObjectGenerated.jsx';

export const App = () => (
  <div>
    <h1>Welcome to my first Meteor App !</h1>
    <h2>Let's start building a random object</h2>
    <div style={{ display: 'flex' }}>
      <ObjectGenerated />
      <GenerateNewObject />
    </div>
  </div>
);
