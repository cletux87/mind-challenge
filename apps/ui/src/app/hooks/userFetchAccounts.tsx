import React, { useState, useEffect } from 'react';
import { AccountsDTO } from '@mind-challenge4/share-types';
import { client } from '../../services/index';
import { END_POINT_ACCOUNTS } from '../../constants/url';

interface Props {
  skip?: boolean;
}

export const useFetchAccounts = ({ skip }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forceRefetchCount, setForceRefetchCount] = useState(0);
  const [data, setData] = useState<AccountsDTO[] | null>(null);

  const forceRefetch = () => {
    setForceRefetchCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (skip) {
      return;
    }
    setIsLoading(true);
    setIsError(false);
    setError(null);
    client
      .get(`${END_POINT_ACCOUNTS}`)
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
  }, [skip, forceRefetchCount]);

  return {
    data,
    isLoading,
    isError,
    error,
    forceRefetch,
  };
};
