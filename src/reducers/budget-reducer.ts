import { Category, DraftExpense, Expense } from "../interfaces"
import { v4 as uuidv4 } from "uuid";

export type BudgetActions =
    { type: 'ADD_BUDGET', payload: { budget: number } } |
    { type: 'SHOW_MODAL' } |
    { type: 'HIDE_MODAL' } |
    { type: 'ADD_EXPENSE', payload: { expense: DraftExpense } } |
    { type: 'DELETE_EXPENSE', payload: { id: Expense['id'] } } |
    { type: 'GET_EXPENSE_BY_ID', payload: { id: Expense['id'] } } |
    { type: 'UPDATE_EXPENSE', payload: { expense: Expense } } |
    { type: 'RESET_APP' } |
    { type: 'ADD_FILTER_CATEGORY', payload: { id: Category['id'] } }

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId: Expense['id'],
    currentCategory: Category['id'],
}
const initialBudget = (): number => {
    const localStoregeBudget = localStorage.getItem('budget');
    return localStoregeBudget ? +localStoregeBudget : 0;
}
const localStorageExpenses = (): Expense[] => {
    const localStoregeExpenses = localStorage.getItem('expenses');
    return localStoregeExpenses ? JSON.parse(localStoregeExpenses) : [];
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory: '',
}

const createExpense = (expense: DraftExpense): Expense => {
    return {
        ...expense,
        id: uuidv4()
    }
}
export const budgetReducer = (
    state: BudgetState,
    action: BudgetActions
) => {
    if (action.type === 'ADD_BUDGET') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }
    if (action.type === 'SHOW_MODAL') {
        return {
            ...state,
            modal: true,
        }
    }
    if (action.type === 'HIDE_MODAL') {
        return {
            ...state,
            modal: false,
            editingId: '',
        }
    }
    if (action.type === 'ADD_EXPENSE') {
        const expense = createExpense(action.payload.expense);
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false,
        }
    }
    if (action.type === 'DELETE_EXPENSE') {
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }
    if (action.type === 'GET_EXPENSE_BY_ID') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true,
        }
    }
    if (action.type === 'UPDATE_EXPENSE') {
        const updatedExpenses = state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense);
        return {
            ...state,
            expenses: updatedExpenses,
            modal: false,
            editingId: '',
        }
    }
    if (action.type === 'RESET_APP') {
        return {
            ...state,
            budget: 0,
            expenses: [],
        }
    }
    if (action.type === 'ADD_FILTER_CATEGORY') {
        return {
            ...state,
            currentCategory: action.payload.id,
        }
    }
    return state;
}

