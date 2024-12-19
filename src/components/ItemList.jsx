import { Link } from 'react-router-dom';
import Item from './Item';

const ItemList = ({ products }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(product => (
                <Item key={product.id} {...product} />
            ))}
        </div>
    );
}

export default ItemList;
