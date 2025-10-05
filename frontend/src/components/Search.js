import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
// use public images (place these files under frontend/public/images/)
const plantImageMap = {
  'aloe vera': `${process.env.PUBLIC_URL}/aloe.jpg`,
  'snake plant': `${process.env.PUBLIC_URL}/snake.jpg`,
  'peace lily': `${process.env.PUBLIC_URL}/peace.jpg`,
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
        {items.map((plant) => (
          <div key={plant._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              {(() => {
                const nameKey = (plant.name || '').toLowerCase().trim();
                const localImg = plantImageMap[nameKey];
                const imgSrc = plant.image || localImg || `${process.env.PUBLIC_URL}/images/aloe.jpg`;
                return <img src={imgSrc} alt={plant.name} className="card-img-top" style={{height: '180px', objectFit: 'cover'}} />;
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
