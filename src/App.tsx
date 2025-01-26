import { useMemo } from "react";
import BudgetForm from "./componets/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import BudgetTraker from "./componets/BudgetTraker";
import ExpenseModal from "./componets/ExpenseModal";
import ExpenseList from "./componets/ExpenseList";

function App() {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => {
    return state.budget > 0
  }, [state.budget])

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Panificador de gastos
        </h1>

      </header>


      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? (
          <BudgetTraker />
        ) : (
          <BudgetForm />
        )}

      </div>
      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <ExpenseList/>

          <ExpenseModal />

        </main>
      )}

    </>
  )
}

export default App
