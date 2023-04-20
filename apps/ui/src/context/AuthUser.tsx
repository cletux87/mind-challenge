import React, { createContext, useContext, useReducer } from 'react';

type State = {
  user: User | null;
  isAuth: boolean;
};

type User = {
  id?: number;
  role?: string;
  username: string;
  jwt: string;
};

const initialState: State = {
  user: null,
  isAuth: false,
};

const AuthUserStateContext = createContext<State | null>(null);
AuthUserStateContext.displayName = 'AuthUserStateContext';

const AuthUserUpdateContext = createContext<React.Dispatch<Action>>(() => null);
AuthUserUpdateContext.displayName = 'AuthUserUpdateContext';

type ActionType =
  | 'GET_USER.SUCCESS'
  | 'SET_USERNAME.SUCCESS'
  | 'LOGOUT_USER.SUCCESS';

type BaseAction<
  Type extends ActionType,
  Payload = undefined
> = Payload extends undefined
  ? { type: Type }
  : { type: Type; payload: Payload };

type Action =
  | BaseAction<'GET_USER.SUCCESS', User>
  | BaseAction<
      'SET_USERNAME.SUCCESS',
      { email: string; role: string; id: number }
    >
  | BaseAction<'LOGOUT_USER.SUCCESS'>;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'GET_USER.SUCCESS':
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    case 'SET_USERNAME.SUCCESS':
      return {
        ...state,
        isAuth: true,
        user: {
          ...state.user,
          jwt: state.user?.jwt || '',
          username: action.payload.email,
          id: action.payload.id,
        },
      };
    case 'LOGOUT_USER.SUCCESS':
      return {
        ...state,
        user: null,
        isAuth: false,
      };
    default:
      throw new Error('Unexpected action: ' + action);
  }
};

interface Props {
  children: React.ReactNode;
}

function AuthUserProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthUserStateContext.Provider value={state}>
      <AuthUserUpdateContext.Provider value={dispatch}>
        {children}
      </AuthUserUpdateContext.Provider>
    </AuthUserStateContext.Provider>
  );
}

function useAuthUserState() {
  const context = useContext(AuthUserStateContext);
  if (!context) {
    throw new Error('useAuthUserState hook must be within an AuthUserProvider');
  }
  return context;
}

function useAuthUserUpdater() {
  const context = useContext(AuthUserUpdateContext);
  if (!context) {
    throw Error('useAuthUserUpdater hook must be within an AuthUserProvider');
  }
  return context;
}

function useAuthUserContext() {
  return { state: useAuthUserState(), dispatch: useAuthUserUpdater() };
}

export { AuthUserProvider, useAuthUserContext };
