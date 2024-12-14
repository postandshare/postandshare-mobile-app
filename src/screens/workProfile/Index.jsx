import React from 'react';
import Fallback from '../../components/fallback/Fallback';

const SelectWorkProfile = React.lazy(() => import('./SelectWorkProfile'));
const WorkProfileList = React.lazy(() => import('./WorkProfileList'));
const AddEditBusiness = React.lazy(() => import('./AddEditBusiness'));
const AddEditBusinessStep1 = React.lazy(() => import('./AddEditBusinessStep1'));
const AddEditBusinessStep2 = React.lazy(() => import('./AddEditBusinessStep2'));

export const SelectWorkProfileScreen = props => (
  <React.Suspense fallback={<Fallback />}>
    <SelectWorkProfile {...props} />
  </React.Suspense>
);
export const WorkProfileListScreen = props => (
  <React.Suspense fallback={<Fallback />}>
    <WorkProfileList {...props} />
  </React.Suspense>
);
export const AddEditBusinessScreen = props => (
  <React.Suspense fallback={<Fallback />}>
    <AddEditBusiness {...props} />
  </React.Suspense>
);
export const AddEditBusinessStep1Screen = props => (
  <React.Suspense fallback={<Fallback />}>
    <AddEditBusinessStep1 {...props} />
  </React.Suspense>
);
export const AddEditBusinessStep2Screen = props => (
  <React.Suspense fallback={<Fallback />}>
    <AddEditBusinessStep2 {...props} />
  </React.Suspense>
);
