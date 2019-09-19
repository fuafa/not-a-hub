import React from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';

const LoadableComponent = Loadable({
  loader: () => import('./FAQ'),
  loading: Loading
});

const LoadableFAQ: React.SFC = () => {
  return <LoadableComponent />;
};

export default LoadableFAQ;
