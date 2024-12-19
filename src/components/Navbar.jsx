import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import CartWidget from './CartWidget';

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-bold">
                    Mi Tienda
                </Link>
                <div className="space-x-4">
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-white font-bold" : "text-gray-300"}>
                        Inicio
                    </NavLink>
                    <NavLink to="/category/Laptops" className={({ isActive }) => isActive ? "text-white font-bold" : "text-gray-300"}>
                        Laptops
                    </NavLink>
                    <NavLink to="/category/Celulares" className={({ isActive }) => isActive ? "text-white font-bold" : "text-gray-300"}>
                        Celulares
                    </NavLink>
                    <NavLink to="/category/Tablets" className={({ isActive }) => isActive ? "text-white font-bold" : "text-gray-300"}>
                        Tablets
                    </NavLink>
                    <NavLink to="/cart" className={({ isActive }) => isActive ? "text-white font-bold" : "text-gray-300"}>
                        Carrito
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;