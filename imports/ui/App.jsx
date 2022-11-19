import React from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { ObjectGenerated } from './ObjectGenerated.jsx';

export const App = () => (
  <div>
    <h1>Welcome to my first Meteor App !</h1>
    <h2>Let's start building a random object</h2>
    <ObjectGenerated />
  </div>
);
