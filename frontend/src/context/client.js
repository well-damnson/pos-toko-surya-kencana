import React from 'react';
import Client from '@/client';

const ClientStateContext = React.createContext();
const ClientDispatchContext = React.createContext();

let defaultValue = { Client };

function reducer(state, action) {
  switch (action.type) {
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ClientProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, defaultValue);
  return (
    <ClientStateContext.Provider value={state}>
      <ClientDispatchContext.Provider value={dispatch}>
        {children}
      </ClientDispatchContext.Provider>
    </ClientStateContext.Provider>
  );
}

function useClientState() {
  const context = React.useContext(ClientStateContext);
  if (context === undefined) {
    throw new Error('useClientState must be used within a ClientProvider');
  }
  return context;
}
function useClientDispatch() {
  const context = React.useContext(ClientDispatchContext);
  if (context === undefined) {
    throw new Error('useClientDispatch must be used within a ClientProvider');
  }
  return context;
}

function useClient() {
  return [useClientState(), useClientDispatch()];
}

export {
  ClientProvider,
  useClientState,
  useClientDispatch,
  useClient,
  ClientStateContext,
  ClientDispatchContext,
};
