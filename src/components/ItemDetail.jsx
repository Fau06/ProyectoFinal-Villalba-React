import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ItemCount from './ItemCount';

const ItemDetail = ({ id, name, image, description, price, stock, category, isAvailable, specs }) => {
    const [quantity, setQuantity] = useState(0);
    const { addItem } = useCart();
    const navigate = useNavigate();

    const handleAdd = (count) => {
        setQuantity(count);
        addItem({ id, name, price }, count);
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full rounded-lg"
                />
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">{name}</h2>
                    <p className="text-gray-400 mb-4">{description}</p>
                    <p className="text-green-500 text-2xl font-bold mb-4">
                        ${price}
                    </p>
                    <p className="text-white mb-2">Categoría: {category}</p>
                    <p className="text-white mb-2">Stock disponible: {stock}</p>
                    <p className="text-white mb-2">Disponible: {isAvailable ? 'Sí' : 'No'}</p>
                    <h3 className="text-lg text-white mt-4">Especificaciones:</h3>
                    <ul className="text-gray-400">
                        {Object.entries(specs).map(([key, value]) => (
                            <li key={key}>{key}: {value}</li>
                        ))}
                    </ul>
                    {quantity > 0 ? (
                        <div className="space-y-4">
                            <button 
                                onClick={() => navigate('/cart')}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                            >
                                Terminar compra
                            </button>
                            <button 
                                onClick={() => navigate('/')}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                            >
                                Seguir comprando
                            </button>
                        </div>
                    ) : (
                        <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;
