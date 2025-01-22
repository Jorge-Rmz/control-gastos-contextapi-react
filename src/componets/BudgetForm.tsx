import React, { useMemo, useState } from 'react'
import { useBudget } from '../hooks/useBudget';

export default function BudgetForm() {
    const [budget, setBudget] = useState(0)
    const {state, dispatch} = useBudget();

    const handleChange =(e: React.ChangeEvent<HTMLInputElement> ) => {
        console.log(e.target.value);
        
        setBudget(Number(e.target.value));
    }

    const isValid = useMemo(() => {
        return budget > 0 && !isNaN(budget);
    }, [budget]);

    const handleSubmit =(e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'ADD_BUDGET', payload: { budget } });
    }


    return (
        <form className='space-y-5' onSubmit={handleSubmit}>
            <div className='flex flex-col space-y-5'>
                <label htmlFor="budget" className='text-4xl text-blue-600 font-bold text-center'>
                    Ingresa tu presupuesto
                </label>
                <input 
                    id="budget"
                    placeholder="Ingresa tu presupuesto" 
                    name='budget'
                    type="number"  
                    className='w-full bg-white border border-gray-200 p-2'
                    value={budget}
                    onChange={handleChange}
                />
                    
            </div>

            <input 
                disabled={!isValid}  // Se habilita el botón solo si el presupuesto es válido
                type="submit" 
                value={'Definir Presupuesto'} 
                className='bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white uppercase font-black disabled:bg-gray-400'
            />
        </form>

    )
}
