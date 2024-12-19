import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';

const CartWidget = () => {
    const { totalQuantity } = useCart();

    return (
        <Link to="/cart" className="relative flex items-center">
            <BsCart3 className="text-white text-2xl" />
            {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalQuantity}
                </span>
            )}
        </Link>
    );
};

export default CartWidget;
