import { memo } from 'react';
import { Link } from 'react-router-dom';

const Item = memo(({ id, name, image, price, description }) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img 
                src={image} 
                alt={name} 
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
                <p className="text-gray-400 mb-4 truncate">{description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-green-500 font-bold">${price}</span>
                    <Link 
                        to={`/item/${id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Ver detalles
                    </Link>
                </div>
            </div>
        </div>
    );
});

export default Item;
