import React, { Fragment,  useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'

import Loader from '../Layout/Loader'
import MetaData from '../Layout/Metadata'

// import { useAlert} from '@blaumaus/react-alert'
import axios from 'axios'



const ProductDetails = ({ match }) => { 

    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({})
    const [error, setError] = useState('')
    
    
    let { id } = useParams()
	// const alert = useAlert();

    const productDetails = async (id) => {
        let link = `http://localhost:4001/api/v1/product/${id}`
        console.log(link)
        let res = await axios.get(link)
        console.log(res)
        if(!res)
            setError('Product not found')
        setProduct(res.data.product)
        setLoading(false)
    }
    
    useEffect(() => {
        productDetails(id)
        
        // if (error) {
        //     alert.error(error);
           
        // }
    }, [id,]);

     return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause='hover'>
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-100" src={image.url} alt={product.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product # {product._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                            <hr />

                            <p id="product_price">${product.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" >-</span>

                                {/* <input type="number" className="form-control count d-inline" value={quantity} readOnly /> */}
                                <span className="btn btn-primary plus"> +</span>
                                {/* <span className="btn btn-primary plus" onClick={increaseQty}+</span> */}
                            </div>
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4"  >Add to Cart</button>

                            <hr />

                            <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                            {/* {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" >
                                Submit Your Review
                            </button> 
                                :*/}
                                <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" >
                                Submit Your Review
                            </button> 
                                <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>
                            {/* } */}


                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea
                                                        name="review"
                                                        id="review" className="form-control mt-3"
                                                        >

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-white"  data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )

}
export default ProductDetails