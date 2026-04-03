"use client";

import React, { createContext, useContext, useReducer } from "react";

export type MODAL_VIEWS = "DELETE_FEEDBACK";

interface State {
  isOpen: boolean;
  view?: MODAL_VIEWS;
  data?: any;
}

type Action =
  | { type: "OPEN"; view: MODAL_VIEWS; payload?: any }
  | { type: "CLOSE" };

const initialState: State = {
  isOpen: false,
  view: undefined,
  data: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN":
      return {
        isOpen: true,
        view: action.view,
        data: action.payload,
      };

    case "CLOSE":
      return {
        isOpen: false,
        view: undefined,
        data: null,
      };

    default:
      return state;
  }
}

const ModalStateContext = createContext<State | null>(null);
const ModalActionContext = createContext<any>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalActionContext.Provider
        value={{
          openModal: (view: MODAL_VIEWS, payload?: any) =>
            dispatch({ type: "OPEN", view, payload }),
          closeModal: () => dispatch({ type: "CLOSE" }),
        }}
      >
        {children}
      </ModalActionContext.Provider>
    </ModalStateContext.Provider>
  );
}

export const useModalState = () => {
  const context = useContext(ModalStateContext);
  if (!context)
    throw new Error("useModalState must be used inside ModalProvider");
  return context;
};

export const useModalAction = () => {
  const context = useContext(ModalActionContext);
  if (!context)
    throw new Error("useModalAction must be used inside ModalProvider");
  return context;
};
