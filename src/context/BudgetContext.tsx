import { createContext, Dispatch, useReducer } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

interface BudgetContextProps {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>
}
interface BudgetProviderProps{
    children: React.ReactNode  // los componentes hijos pueden usar este contexto
}


export const BudgetContext= createContext<BudgetContextProps>(null!)
export const BudgetProvider = ({ children }: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}