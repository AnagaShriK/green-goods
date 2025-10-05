import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import plantPlaceholder from '../aloe.jpg';
import aloeImg from '../aloe.jpg';
import snakeImg from '../snake.jpg';
import peaceImg from '../peace.jpg';

// map normalized plant names to bundled images (fallbacks when plant.image is missing)
const plantImageMap = {
  'aloe vera': aloeImg,
  'snake plant': snakeImg,
  'peace lily': peaceImg,
};

function Search() {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') return <p className="mt-5 text-center">Loading plants...</p>;

  return (
    <div className="container mt-5">
      <h3 className="text-center text-success mb-4">Search Plants</h3>
      <div className="row">
        {items.map((plant, idx) => (
          <div key={plant._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              {/* use plant.image when provided, otherwise use a bundled image mapped by name or a generic placeholder */}
              {(() => {
                const nameKey = (plant.name || '').toLowerCase().trim();
                const localImg = plantImageMap[nameKey];
                const imgSrc = plant.image || localImg || plantPlaceholder;
                return (
                  <img
                    src={imgSrc}
                    alt={plant.name}
                    className="card-img-top"
                    style={{height: '180px', objectFit: 'cover'}}
                  />
                );
              })()}
              <div className="card-body text-center">
                <h5>{plant.name}</h5>
                <p>₹{plant.price}</p>
                <button
                  className="btn btn-success"
                  onClick={() => dispatch(addToCart({ plant: plant._id, name: plant.name, qty: 1, price: plant.price }))}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
