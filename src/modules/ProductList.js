import axios from 'axios';
import React from 'react';

class ProductsList extends React.Component {
    state = {
       products: [],
       next:""
    };

    componentDidMount() {
       this.getProducts();
    }

    changeEndpoint = () => {
        axios
           .get("http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com"+this.state.next)
           .then(data => {
                this.setState({ products: data , next:data.data.next} ) 
                }
            )
           .catch(err => {
               console.log(err);
               return null;
           });       
    }

    getProducts = () => {
       axios
           .get("http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/1")
           .then(data => {
                this.setState({ products: data , next:data.data.next} ) 
                }
            )
           .catch(err => {
               console.log(err);
               return null;
           });
    };

    render() {
        const ProductsStateData = this.state.products;
        return (
                <div>
                    <button onClick={this.changeEndpoint} >Next Endpoint</button>
                    <ul>
                    {
                    ProductsStateData.length === 0 ? (
                        <h1>Loading...</h1>
                    ):(
                        ProductsStateData.data.objects.map( (product, i)=>{
                            if(product.category === "Air Conditioners") {
                                var size = product.size;
                                var width = size.width/100;
                                var length = size.length/100;
                                var height = size.height/100;

                                var cubic = (width*length*height)*250;
                                return ( <li key={i} >
                                            <p className="title">Title: {(product.title)}</p>
                                            <p className="mcubic">Average Cubic Weight: {(cubic)} </p>
                                        </li>);        
                            }

                        })
                    )
                    }
                    </ul>            
                </div>

        )
     }
}

export default ProductsList;