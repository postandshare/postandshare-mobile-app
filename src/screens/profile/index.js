import React from 'react';
import Fallback from '../../components/fallback/Fallback';
const ProfileView = React.lazy(() => import('./ProfileView'));
const EditProfile = React.lazy(() => import('./EditProfile'));
export const ProfileViewScreen = props => (
  <React.Suspense fallback={<Fallback />}>
    <ProfileView {...props} />
  </React.Suspense>
);
export const EditProfileScreen = props => (
  <React.Suspense fallback={<Fallback />}>
    <EditProfile {...props} />
  </React.Suspense>
);
