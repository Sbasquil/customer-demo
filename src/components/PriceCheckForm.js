import React, { Component } from 'react'
import axios from 'axios';
import { categories } from '../utils/Constants.js';
import PriceCheckQueryResponses from './PriceCheckQueryResponses'


class PriceCheckForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            postcode: "2000",
            selectedCategory: "",
            searchString: "", 
            fetching: false,
            searchComplete: false,
            numOfSuppliers: 0,
            searchResults: [],
            count: 0  
        }
    }

    getListOfSupplierIds = async (postcode) => {
        const response = await axios.get(`https://www.foodbomb.com.au/supplier-service/postcode/${postcode}/suppliers`)
        return response.data;
    }

    getProductsFromCategoryForSearchQuery = async (supplierIds, category, searchString) => {
        const payload = {
            category: category,
            "function": "findProductsBySupplierIds",
            searchString: searchString,
            supplierIds: supplierIds
        }
        let products = [];
        try {
            const response = await axios.post(`/shop/findProductsBySupplierIds.php`, payload);
            products = response.data;
        } catch (e) {
            console.err(e)
            debugger
            // update state with error message
        }
        this.handleRecievedResponse()
        return products;
    }

    handleSubmit = e => {
        e.preventDefault();
        const { postcode, selectedCategory, searchString } = this.state;
        this.setState({fetching: true})
        
        axios.get(`/supplier-service/postcode/${postcode}/suppliers`)
            .then(response => {
                this.setState({numOfSuppliers: response.data.length})
                this.getProductsFromCategoryForSearchQuery(response.data, selectedCategory, searchString).then(response => {
                    console.log(response)
                    const results = response.result;
                    const searchResults = results.map(product => ({ name: product.pname, portion: `${product.size}${product.sizeUnit}`, productId: product.product_id, price: `$${product.price}`}))
                    this.setState({searchResults, count: response.count})
                }).catch(err => {
                    debugger
                    console.err(err)
                })
            }).catch(err => {debugger})
            .finally(() => {
                this.handleRecievedResponse()
            })
    }


    handlePostcodeChange = (e) => {
        this.setState({postcode: e.target.value});   
    }

    handleCategoryChange = cat => {
        this.setState({selectedCategory: cat})
    }

    handleSearchStringChange = (e) => {
        this.setState({searchString: e.target.value});
    }

    handleRecievedResponse = () => {
        this.setState({
            searchComplete: true,
            fetching: false
        })
    }


    render() {
        const { selectedCategory, fetching, searchComplete, numOfSuppliers, searchResults, count } = this.state;
        return (
            <div className="PriceCheckForm">
                <form onSubmit={this.handleSubmit}>
                    Enter your Postcode:
                    <input type="number" value={this.state.postcode} min="200" max="9730" onChange={this.handlePostcodeChange}/>
                    
                    <div className="categorySelectionContainer">
                        Select a product category to compare prices.
                        <div className="categorySelectionButtonContainer">
                            {categories.map( category => 
                                <div className={selectedCategory === category.value ? "categoryButton selected" : "categoryButton"} key={category.catId} onClick={() => this.handleCategoryChange(category.value)}>
                                {category.displayName}
                                </div>
                            )}
                        </div> 
                    </div>
                    <div className="productSearch">
                        Search prices on {selectedCategory} products.
                        <input type="text" name="searchString" placeholder="Search a product" onChange={this.handleSearchStringChange}/>
                    </div>
                    <input type="submit" value="Check for products!"/>
                </form>
                <PriceCheckQueryResponses 
                    fetching={fetching}
                    searchComplete={searchComplete}
                    numOfSuppliers={numOfSuppliers}
                    searchResults={searchResults}
                    count={count} />
            </div>
        )
    }

}

export default PriceCheckForm