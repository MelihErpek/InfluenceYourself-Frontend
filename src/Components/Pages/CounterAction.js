import React from 'react'
import {increment,decrement, incrementByAmount} from "../../Redux/stores/CounterSlice"
import { useDispatch } from 'react-redux'

export default function CounterAction() {
    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={()=>dispatch(decrement())}>Azalt</button>
            <button onClick={()=>dispatch(increment())}>Artır</button>
            <button onClick={()=>dispatch(incrementByAmount(4))}>4 Artır</button>
        </div>
    )
}
