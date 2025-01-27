import { createContext, Dispatch, useMemo, useReducer } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

interface BudgetContextProps {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>,
    totalExpenses: number,
    remainingBudget: number,
}
interface BudgetProviderProps{
    children: React.ReactNode  // los componentes hijos pueden usar este contexto
}


export const BudgetContext= createContext<BudgetContextProps>(null!)
export const BudgetProvider = ({ children }: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    const totalExpenses = useMemo(() => {
        return state.expenses.reduce((total, expense) => total + expense.amount, 0)
    }, [state.expenses])
    const remainingBudget = state.budget - totalExpenses;

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget,
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}