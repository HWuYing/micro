import React from 'react';
import { Switch } from 'react-router-dom';
import { renderRoute } from '@applyComponent';
import '../pages';

export default () => (
  <Switch>
    {renderRoute()}
  </Switch>
);
