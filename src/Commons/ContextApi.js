import React, { useState } from 'react';

const initialState = {
  user: {
    name: 'Vito Odone',
    token: null,
  },
};

export const StateContext = React.createContext({
  state: initialState,
  actions: { setUser: () => {} },
});

const setUser = (setState, user) => {
  setState({ user });
};

export const Context = (props) => {
  const [state, setState] = useState(initialState);

  const actions = {
    setUser: setUser.bind(state, setState),
  };

  return (
    <StateContext.Provider value={{ state, actions }}>
      {props.children}
    </StateContext.Provider>
  );
};
