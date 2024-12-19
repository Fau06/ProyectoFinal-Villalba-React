import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import ItemList from './ItemList';

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { categoryId } = useParams();

    const fetchProducts = useCallback(async () => {
        console.log("Category ID:", categoryId);
        try {
            const productsRef = collection(db, 'products');
            const q = categoryId 
                ? query(productsRef, where('category', '==', categoryId))
                : productsRef;

            const snapshot = await getDocs(q);
            
            console.log("Snapshot:", snapshot.docs);
            
            if (snapshot.empty) {
                throw new Error('No hay productos disponibles');
            }
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            throw error;
        }
    }, [categoryId]);

    useEffect(() => {
        let isSubscribed = true;

        const loadProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const productsData = await fetchProducts();
                if (isSubscribed) {
                    setProducts(productsData);
                }
            } catch (error) {
                if (isSubscribed) {
                    console.error("Error:", error);
                    setError(error.message || 'Error al cargar los productos');
                }
            } finally {
                if (isSubscribed) {
                    setLoading(false);
                }
            }
        };

        loadProducts();

        return () => {
            isSubscribed = false;
            setProducts([]);
            setError(null);
        };
    }, [fetchProducts]);

    if (loading) return <div className="text-white text-center">Cargando productos...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl text-white mb-4">
                {categoryId ? `Categoría: ${categoryId}` : 'Todos los productos'}
            </h2>
            <ItemList products={products} />
        </div>
    );
};

export default ItemListContainer;