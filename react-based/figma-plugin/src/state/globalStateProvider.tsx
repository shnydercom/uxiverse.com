import { InterpreterFrom } from 'xstate';
import { useInterpret } from '@xstate/react';
import React, { createContext } from 'react';
import { mainMachine } from './mainMachine';

export const GlobalStateContext = createContext({ mainService: {} as InterpreterFrom<typeof mainMachine> })

export const GlobalStateProvider = (props) => {
  const mainService = useInterpret(mainMachine);

  return (
    <GlobalStateContext.Provider value={{ mainService }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};
