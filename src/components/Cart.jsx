import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import CheckoutForm from './CheckoutForm';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, total, clear, removeItem } = useCart();
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        return () => {
            setOrderId(null);
            setLoading(false);
            setError(null);
        };
    }, []);

    const createOrder = async (userData) => {
        setLoading(true);
        setError(null);
        
        try {
            if (!userData.email || !userData.name || !userData.phone) {
                throw new Error('Todos los campos son obligatorios');
            }

            if (cart.length === 0) {
                throw new Error('El carrito está vacío');
            }

            const order = {
                buyer: userData,
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                total: total,
                date: serverTimestamp(),
                status: 'pending'
            };

            const orderRef = collection(db, 'orders');
            const docRef = await addDoc(orderRef, order);
            setOrderId(docRef.id);
            clear();
        } catch (error) {
            console.error("Error creating order:", error);
            setError(error.message || "Error al crear la orden");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-white text-center">Procesando orden...</div>
    }

    if (orderId) {
        return (
            <div className="text-white text-center p-4">
                <h2 className="text-2xl mb-4">¡Gracias por tu compra!</h2>
                <p className="mb-4">Tu número de orden es: {orderId}</p>
                <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    Volver al inicio
                </Link>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="text-white text-center p-4">
                <p className="mb-4">No hay items en el carrito</p>
                <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    Ir a comprar
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-white text-2xl mb-4">Tu Carrito</h2>
                    {cart.map(item => (
                        <div key={item.id} className="bg-gray-800 p-4 rounded mb-4">
                            <h3 className="text-white">{item.name}</h3>
                            <p className="text-gray-400">Cantidad: {item.quantity}</p>
                            <p className="text-gray-400">Precio: ${item.price}</p>
                            <button 
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                    <p className="text-white text-xl mt-4">Total: ${total}</p>
                </div>
                <div>
                    <h2 className="text-white text-2xl mb-4">Finalizar Compra</h2>
                    <CheckoutForm onSubmit={createOrder} />
                </div>
            </div>
        </div>
    );
}

export default Cart;