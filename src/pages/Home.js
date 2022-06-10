import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {filterCategory, filterHeadLine, getProducts } from '../store/slices/products.slice'
import '../styles/home.css'

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState()
    const [ showModal, setShowModal ] = useState(false);

    const products = useSelector(state => state.products)

    useEffect(()=>{
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
        .then(res => setCategories(res.data.data.categories))
    },[])

    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])

    const filterProducts = () => {
        dispatch(filterHeadLine(search))
    }

    const selectCategory = (id) => {
        dispatch(filterCategory(id))
    }

    const closeModal = () => setShowModal(false);


    return (
        <div className='home'>
            {
                showModal && <div onClick={closeModal} className="filters-container"> 
                <button onClick={closeModal} className='btn-close-modal'> <p>X</p> </button>
                <ul>
                    <p>Category</p>
                    {
                        categories?.map(category => (
                            <li onClick={() => selectCategory(category.id)} key={category.id}>
                                {category.name}
                            </li>
                        ))
                    }
                </ul>
            </div>  
            }
   
            <div className="products-container">
                <div className="input-container">
                    <input className='search-input'
                    type="text"
                    placeholder='What are you looking for?'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    />
                    <button className='btn-search' onClick={filterProducts}>
                        <i className='bx bx-search'></i>
                    </button>
                </div>

                <div className="filter-opener" onClick={() => setShowModal(true)}>
                    <i className='bx bx-filter-alt'></i>
                    <p>Filter</p>
                </div>
                
                <div className="cards-container">
                    {
                        products.map(product => (
                            <div className='card' key={product.id} onClick={()=> navigate(`/product/${product.id}`)}>
                                <div className="img-container">
                                    <img className='card-img' src={product.productImgs} alt="" />
                                </div>

                                <div className="description-container">
                                    <p className='product-title'>{product.title}</p>
                                    <div className="price-cart-container">
                                        <p>${product.price}</p>
                                    </div>
                                </div>

                                <button className='btn-cart'>
                                    <i className='bx bx-cart'></i>
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>  
        </div>
    );
};

export default Home;