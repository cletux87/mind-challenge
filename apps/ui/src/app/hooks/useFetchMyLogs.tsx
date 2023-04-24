import React, { useState, useEffect } from 'react';
import { LogDTOWithPagination } from '@mind-challenge4/share-types';
import { client } from '../../services/index';
import { END_POINT_OWN_LOGS } from '../../constants/url';

interface Props {
  skip?: boolean;
}

export const useFetchMyLogs = ({ skip }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forceRefetchCount, setForceRefetchCount] = useState(0);
  const [data, setData] = useState<LogDTOWithPagination | null>(null);

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
      .get(`${END_POINT_OWN_LOGS}`)
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
