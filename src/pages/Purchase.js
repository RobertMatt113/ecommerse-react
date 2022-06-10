import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DateComponent } from '../components';
import { getPurchase } from '../store/slices/purchase.slice';
import '../styles/purchase.css'

const Purchase = () => {

    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchase);
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getPurchase())
    }, [dispatch])

    return (
        <div className='purchase'>
            <div className="top-details">
                <p className='p-back-home' onClick={()=>navigate("/")} >Home</p> 
                <div className='circle'> </div> 
                <p className='product-title'>Purchases</p>
            </div>
            <h3>My purchases</h3>
            {
                purchases.map(purchase => (
                   <div key={purchase.id} className='purchase-card-container'>
                       <div className="date-container">
                        <DateComponent datePurchase={purchase.createdAt}/>
                       </div>
                       {purchase.cart.products.map(product => (
                            <div key={product.id} className='purchase-content'>
                                <p className='p-purchase-navigate' onClick={()=>navigate(`/product/${product.id}`)}>{product.title}</p>
                                <div className="quantity-containet">{product.productsInCart.quantity}</div> 
                                <p className='purchase-price'>${product.price}</p>
                            </div>  
                        ))}
                   </div> 
                ))
            }
        </div>
    );
};

export default Purchase;