import { useState } from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {
    const [count, setCount] = useState(initial);

    const increment = () => {
        if (count < stock) setCount(count + 1);
    };

    const decrement = () => {
        if (count > 1) setCount(count - 1);
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
                <button 
                    onClick={decrement}
                    className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded"
                >
                    -
                </button>
                <span className="text-white text-xl">{count}</span>
                <button 
                    onClick={increment}
                    className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded"
                >
                    +
                </button>
            </div>
            <button 
                onClick={() => onAdd(count)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                disabled={stock === 0}
            >
                Agregar al carrito
            </button>
        </div>
    );
}

export default ItemCount;
