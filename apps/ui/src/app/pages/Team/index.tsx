import React from 'react';
import { AppPageLayout } from '../../components/AppPageLayout';
import { useParams } from 'react-router-dom';
import { Main } from './components/Main';

export const Team = () => {
  const { id } = useParams();
  return (
    <AppPageLayout>
      <Main teamId={id} />
    </AppPageLayout>
  );
};
