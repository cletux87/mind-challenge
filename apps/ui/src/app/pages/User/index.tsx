import React from 'react';
import { AppPageLayout } from '../../components/AppPageLayout';
import { useParams } from 'react-router-dom';
import { Main } from './components/Main';

export const User = () => {
  const { id } = useParams();
  return (
    <AppPageLayout>
      <Main userId={id} />
    </AppPageLayout>
  );
};
