import React from 'react';
import { storiesOf } from '@storybook/react';
import NewListing from '../pages/listings/new-listing'

storiesOf('Seller Onboarding', module)
  .add('intro', () => (
    <NewListing />
  ))
