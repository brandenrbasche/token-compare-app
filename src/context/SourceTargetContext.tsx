import React, { createContext, useReducer, useContext, Dispatch, ReactNode } from 'react';
import {Token} from "@/types/tokenTypes";
import {Source} from "postcss";

interface SourceTargetState {
    sourceSelection: Token | null;
    targetSelection: Token | null;
    nextClickSets: 'source' | 'target';
}

const initialState: SourceTargetState = {
    sourceSelection: null,
    targetSelection: null,
    nextClickSets: 'source'
}

// action definition
type Action = { type: 'SELECT_TOKEN', payload: { token: Token }};
// TODO: add more actions later (ex/ reset selections)

/* Reducer Function: */
function sourceTargetReducer(state: SourceTargetState, action: Action): SourceTargetState {
    switch (action.type) {
        case 'SELECT_TOKEN': {
            const { token } = action.payload;
            if (state.nextClickSets === 'source') {
                return {
                    ...state,
                    sourceSelection: token,
                    nextClickSets: 'target' // toggle for next selection
                };
            } else {
                return {
                    ...state,
                    targetSelection: token,
                    nextClickSets: 'source'
                };
            }
        } default: {
            return state;
        }
    }
}

/* Context Creation */
interface SourceTargetContextProps {
    state: SourceTargetState;
    dispatch: Dispatch<Action>;
}

const SourceTargetContext = createContext<SourceTargetContextProps | undefined>(undefined);

// Provider:
interface SourceTargetProvderProps {
    children: ReactNode;
}

export function SourceTargetProvider({ children }: SourceTargetProvderProps) {
    const [state, dispatch] = useReducer(sourceTargetReducer, initialState);
    const value = { state, dispatch };

    return (
        <SourceTargetContext.Provider value={value}>
            {children}
        </SourceTargetContext.Provider>
    )
}

// Custom hooks:
export function useSourceTargetState(): SourceTargetState {
    const context = useContext(SourceTargetContext);
    if (context === undefined) throw new Error('useSourceTargetState must be used within a SourceTargetProvider');
    return context.state;
}

export function useSourceTargetDispatch(): Dispatch<Action> {
    const context = useContext(SourceTargetContext);
    if (context === undefined) throw new Error('useSourceTargetDispatch must be used within a SourceTargetProvider');
    return context.dispatch;
}