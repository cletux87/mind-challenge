import { LogDTO } from '@mind-challenge4/share-types';
import React from 'react';

import { LogsTable } from '../../../components/LogsTable';

interface Props {
  logs: LogDTO[];
  isLoading: boolean;
}

export const Content = ({ logs, isLoading }: Props) => {
  return <LogsTable logs={logs} isLoading={isLoading} />;
};
