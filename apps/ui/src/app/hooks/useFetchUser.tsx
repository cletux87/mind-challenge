import React, { useState, useEffect } from 'react';
import { UserDTO } from '@mind-challenge4/share-types';
import { client } from '../../services/index';
import { END_POINT_ME, END_POINT_USER } from '../../constants/url';

interface Props {
  userId: string;
  skip: boolean;
}

export const useFetchUser = ({ userId, skip }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forceRefetchCount, setForceRefetchCount] = useState(0);
  const [data, setData] = useState<UserDTO | null>(null);

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
      .get(userId === 'me' ? END_POINT_ME : `${END_POINT_USER}/${userId}`)
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
  }, [skip, userId, forceRefetchCount]);

  return {
    data,
    isLoading,
    isError,
    error,
    forceRefetch,
  };
};
