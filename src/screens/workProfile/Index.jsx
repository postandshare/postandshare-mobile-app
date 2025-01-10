import React from 'react';
import Fallback from '../../components/fallback/Fallback';

const SelectWorkProfile = React.lazy(() => import('./SelectWorkProfile'));
const WorkProfileList = React.lazy(() => import('./WorkProfileList'));

const AddEditBusinessStep1 = React.lazy(() =>
  import('./business/AddEditBusinessStep1'),
);
const AddEditBusinessStep2 = React.lazy(() =>
  import('./business/AddEditBusinessStep2'),
);
const AddPoliticalProfile = React.lazy(() =>
  import('./political/AddPoliticalProfile'),
);
const AddLeaderInProfile = React.lazy(() =>
  import('./political/AddLeaderInProfile'),
);
const EditPoliticalProfile = React.lazy(() =>
  import('./political/EditPoliticalProfile'),
);
const EditAddressPoliticalProfile = React.lazy(() =>
  import('./political/EditAddressPoliticalProfile'),
);
const EditLeaderInPoliticalProfile = React.lazy(() =>
  import('./political/EditLeaderInPoliticalProfile'),
);
const EditVolunteer = React.lazy(() => import('./political/EditVolunteer'));

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
export const AddPoliticalProfileScreen = props => (
  <React.Suspense fallback={<Fallback />}>
    <AddPoliticalProfile {...props} />
  </React.Suspense>
);
export const AddLeaderInProfileScreen = props => (
  <React.Suspense fallback={<Fallback />}>
    <AddLeaderInProfile {...props} />
  </React.Suspense>
);
export const EditPoliticalProfileScreen = props => (
  <React.Suspense fallback={<Fallback />}>
    <EditPoliticalProfile {...props} />
  </React.Suspense>
);
export const EditAddressPoliticalProfileScreen = props => (
  <React.Suspense fallback={<Fallback />}>
    <EditAddressPoliticalProfile {...props} />
  </React.Suspense>
);
export const EditLeaderInPoliticalProfileScreen = props => (
  <React.Suspense fallback={<Fallback />}>
    <EditLeaderInPoliticalProfile {...props} />
  </React.Suspense>
);
export const EditVolunteerScreen = props => (
  <React.Suspense fallback={<Fallback />}>
    <EditVolunteer {...props} />
  </React.Suspense>
);
