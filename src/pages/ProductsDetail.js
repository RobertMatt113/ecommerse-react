import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../store/slices/cart.slice';
import { filterCategory } from '../store/slices/products.slice';
import '../styles/products-detail.css'

const ProductsDetail = () => {

    const [product, setProduct] = useState({});
    const [detailQuantity, setDetailQuantity] = useState(1);

    const {id} = useParams();
    const dispatch = useDispatch();
    const productsList = useSelector(state => state.products);

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/")
        .then(res => {
            const productsSearched = res.data.data.products.find(productsItem => productsItem.id === Number(id));
            setProduct(productsSearched);
            dispatch(filterCategory(productsSearched.category.id));
        })
    },[id, dispatch]);

    const addCart = () => {
        const productAdded = {
            "id": id,
            "quantity": detailQuantity
        }        
        dispatch(addToCart(productAdded));
    }

    const increment = () => {
        setDetailQuantity(detailQuantity + 1);
    }

    const decrement = () => {
        if(detailQuantity > 1){
            setDetailQuantity(detailQuantity - 1);
        }
    }

    return (
        <div className='products-detail'>
            <div className="top-details">
                <p className='p-back-home' onClick={()=>navigate("/")} >Home</p> 
                <div className='circle'> </div> 
                <p className='product-title'>{product.title}</p>
            </div>

            <div className="product-selected-container">
                <div className="img-details-container">
                    <img className='img-detail' src={product.productImgs} alt="" />
                </div>
                <div className="description-details-container">
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <div className="price-quantity-container">
                        <div className="price-container">
                            Price
                            <p>${product.price}</p>
                        </div>
                        <div className="quantity-container">
                            Quantity
                            <div className="price-contador">
                                <button disabled={detailQuantity === 1} onClick={decrement}>-</button>
                                <input 
                                type="text" 
                                value={detailQuantity}
                                onChange={e => setDetailQuantity(e.target.value)}
                                />
                                <button disabled={detailQuantity === 6} onClick={increment}>+</button>
                            </div>
                        </div>
                    </div>
                    <button onClick={addCart} className='details-btn-add-cart'>Add to cart <i className='bx bx-cart'></i></button>
                </div>
            </div>
            
            <h3 className='h3-similar-items'>Discover similar items</h3>
            <div className="sugerencies">
                <h3>Discover similar items</h3>
                {
                    productsList?.map(productItem => (
                        <div className='card' onClick={()=>navigate(`/product/${productItem.id}`)} key={productItem.id}>
                            <div className="img-container">
                                <img className='card-img' src={productItem.productImgs} alt="" />
                            </div>

                            <div className="description-container">
                                <p className='product-title'>{productItem.title}</p>
                                <div className="price-cart-container">
                                    <p>${productItem.price}</p>
                                </div>
                            </div>

                            <button onClick={addCart} className='btn-cart'>
                                <i className='bx bx-cart'></i>
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ProductsDetail;