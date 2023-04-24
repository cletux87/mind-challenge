import React, { useState, useEffect } from 'react';
import { TeamDTO } from '@mind-challenge4/share-types';
import { client } from '../../services/index';
import { END_POINT_ACCOUNT_TEAMS } from '../../constants/url';

interface Props {
  accountId?: number;
  skip?: boolean;
}

export const useFetchAccountTeams = ({ accountId, skip }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forceRefetchCount, setForceRefetchCount] = useState(0);
  const [data, setData] = useState<TeamDTO[] | null>(null);

  const forceRefetch = () => {
    setForceRefetchCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (!!skip || accountId === undefined) {
      return;
    }
    setIsLoading(true);
    setIsError(false);
    setError(null);
    client
      .get(`${END_POINT_ACCOUNT_TEAMS}/${accountId}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        setIsError(true);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [skip, accountId, forceRefetchCount]);

  return {
    data,
    isLoading,
    isError,
    error,
    forceRefetch,
  };
};
