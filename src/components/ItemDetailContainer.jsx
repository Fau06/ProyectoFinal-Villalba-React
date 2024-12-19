import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchProduct = useCallback(async () => {
        try {
            const productRef = doc(db, 'products', id);
            const snapshot = await getDoc(productRef);

            if (!snapshot.exists()) {
                throw new Error('Producto no encontrado');
            }

            return { id: snapshot.id, ...snapshot.data() };
        } catch (error) {
            throw error;
        }
    }, [id]);

    useEffect(() => {
        let isSubscribed = true;

        const loadProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const productData = await fetchProduct();
                if (isSubscribed) {
                    setProduct(productData);
                }
            } catch (error) {
                if (isSubscribed) {
                    console.error("Error:", error);
                    setError(error.message || 'Error al cargar el producto');
                    if (error.message === 'Producto no encontrado') {
                        setTimeout(() => navigate('/'), 2000);
                    }
                }
            } finally {
                if (isSubscribed) {
                    setLoading(false);
                }
            }
        };

        loadProduct();

        return () => {
            isSubscribed = false;
            setProduct(null);
            setError(null);
        };
    }, [fetchProduct, navigate]);

    if (loading) return <div className="text-white text-center">Cargando producto...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            {product && <ItemDetail {...product} />}
        </div>
    );
};

export default ItemDetailContainer;