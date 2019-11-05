import React, { Component } from 'react'
import axios from 'axios';
import { categories } from '../utils/Constants.js';


class PriceCheckForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            postcode: "",
            selectedCategory: "",
            searchString: "",
            supplierIds: []
        }

    }

    getListOfSupplierIds = async (postcode) => {
        const response = await axios.get(`https://www.foodbomb.com.au/supplier-service/postcode/${postcode}/suppliers`);
        return response.data;
    }

    getProductsFromCategoryForSearchQuery = async (supplierIds, category, searchString) => {
        const payload = {
            category: category,
            "function": "findProductsBySupplierIds",
            searchString: searchString,
            supplierIds: supplierIds
        }
        const response = await axios.post(`https://www.foodbomb.com.au/shop/findProductsBySupplierIds.php`, payload);
        return response.data
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { postcode, selectedCategory, searchString } = this.state;
        const supplierIds = this.getListOfSupplierIds(postcode);
 
        const products = this.getProductsFromCategoryForSearchQuery(supplierIds, selectedCategory, searchString);
    }


    handlePostcodeChange = (e) => {
        this.setState({postcode: e.target.value});   
    }

    handleCategoryChange = (e) => {
        this.setState({selectedCategory: categories[e.target.id-1].value})
    }

    handleSearchStringChange = (e) => {
        this.setState({searchString: e.target.value});
    }


    render() {
        const categoryRadioSelectors = categories.map( category => 
            <div key={category.catId} onChange={this.handleCategoryChange}>
                <input type="radio" id={category.catId} name="category" value={category.value}/>
                <label for={category.catId}>{category.displayName}</label>
            </div>
        ) 
        return (
            <div className="PriceCheckForm">
                <form onSubmit={this.handleSubmit}>
                    Enter your Postcode:
                    <input type="text" value={this.state.postcode} onChange={this.handlePostcodeChange}/>
                    <input type="submit" value="Check your Postcode"/>
                    <div className="categorySelection">
                        Select a product category to compare prices.
                        {categoryRadioSelectors}
                    </div>
                    <div className="productSearch">
                        Search prices on {this.state.selectedCategory} products.
                        <input type="text" name="searchString" placeholder="Search a product" onChange={this.handleSearchStringChange}/>
                    </div>
                </form>
            </div>
        )
    }

}

export default PriceCheckForm