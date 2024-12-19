import { useState } from 'react';

const CheckoutForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-white mb-2">Nombre</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />
            </div>
            <div>
                <label htmlFor="phone" className="block text-white mb-2">Teléfono</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />
            </div>
            <button 
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
                Confirmar Compra
            </button>
        </form>
    );
};

export default CheckoutForm;
