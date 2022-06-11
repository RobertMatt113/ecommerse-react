import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { buy, getCart, removeFromCart } from '../store/slices/cart.slice';
import '../styles/cart.css'

const Cart = () => {

    const myCart = useSelector(state => state.cart);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getCart());
    },[dispatch]);

    let total = 0;

    if(myCart?.length > 0){
        if(myCart?.length > 1){
            total = myCart?.reduce((initial, current) => {
                if(typeof initial === 'number'){
                    return initial + (current.price * current.productsInCart?.quantity)
                } else {
                    return (initial.price * initial.productsInCart?.quantity)  +  (current.price * current.productsInCart?.quantity)
                }
            });
        } else {
            total = myCart?.[0].price * myCart?.[0].productsInCart?.quantity
        }
    }

    return (
        <div className='cart'>
            <div className="top-details">
                <p className='p-back-home' onClick={()=>navigate("/")} >Home</p> 
                <div className='circle'> </div> 
                <p className='product-title'>Cart</p>
            </div>
            <h3>Shopping cart</h3>
            <div className="cart-container">
                {
                    myCart.map(cartProduct => (
                        <div className='cart-card-container' key={cartProduct.id}>
                            <div className="type-delete-container">
                                <p className='cart-p-brand'>{cartProduct.brand}</p>
                                <i onClick={() => dispatch(removeFromCart(cartProduct.id))} id='btn-cart-trash' className='bx bx-trash'></i>
                            </div>
                            <div className="cart-card-top-content">
                                <p onClick={()=>navigate(`/product/${cartProduct.id}`)}>{cartProduct.title}</p>
                                <p>{cartProduct.productsInCart.quantity}</p>
                            </div>
                            <div className="cart-card-bottom-content">
                                <p><span>Total: </span>${cartProduct.price * cartProduct.productsInCart?.quantity}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="card-total-container">
                    <p>Total: <span>${total}</span></p>
                    <button onClick={()=>dispatch(buy())}>
                        Checkout
                    </button>
            </div>
        </div>
    );
};

export default Cart;