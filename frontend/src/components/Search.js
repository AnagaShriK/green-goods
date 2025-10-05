import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import plantImg1 from '../aloe.jpg';
import plantImg2 from '../snake.jpg';
import plantImg3 from '../peace.jpg';

const placeholderImages = [plantImg1, plantImg2, plantImg3];

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
              {/* use plant.image when provided, otherwise pick one of the three local images */}
              <img
                src={plant.image || placeholderImages[idx % placeholderImages.length]}
                alt={plant.name}
                className="card-img-top"
                style={{height: '180px', objectFit: 'cover'}}
              />
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
