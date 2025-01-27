import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import AmountDisplay from './AmountDisplay';
import { useBudget } from '../hooks/useBudget';

export default function BudgetTraker() {
    const {state, remainingBudget, totalExpenses, dispatch} = useBudget();
    const porcentage = +((totalExpenses/ state.budget) * 100).toFixed(2) ;
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className='flex justify-center'>
                <CircularProgressbar
                    value={porcentage}
                    styles={buildStyles(
                        {
                            pathColor: porcentage  === 100 ? '#DC2626':'#3b82f6',
                            trailColor: '#f5f5f5',
                            textSize: 8,
                            textColor: porcentage  === 100 ? '#DC2626':'#3b82f6',
                        }
                    )}
                    text={`${porcentage}% Gastado`}
                />
            </div>

            <div className='flex flex-col justify-center items-center gap-8'>
                <button
                    type='button'
                    className='bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg'
                    onClick={() => {
                        dispatch({type: 'RESET_APP'})
                    }}
                >
                    Resetear App
                </button>

                <AmountDisplay
                    label='Presupuesto'
                    amount={state.budget}
                />
                <AmountDisplay
                    label='Disponible'
                    amount={remainingBudget}
                />
                <AmountDisplay
                    label='Gastado'
                    amount={totalExpenses}
                />

            </div>
        </div>
    )
}
