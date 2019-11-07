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
        const response = await axios.post(`/shop/findProductsBySupplierIds.php`, payload);
        return response.data
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { postcode, selectedCategory, searchString } = this.state;

        // Placeholder for routing the requests to the custom API
        // axios.get(`http://localhost:3001/search/${postcode}/${selectedCategory}/${searchString}`)
        //     .then(resp => {debugger})
        //     .catch(err => {debugger})

        axios.get(`/supplier-service/postcode/${postcode}/suppliers`)
            .then(supplierIds => 
                this.getProductsFromCategoryForSearchQuery(supplierIds, selectedCategory, searchString))
            .catch(err => {debugger})
        // const supplierIds = await this.getListOfSupplierIds(postcode);
        // console.log(supplierIds)
        // const products = this.getProductsFromCategoryForSearchQuery(supplierIds, selectedCategory, searchString);
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


    render() {
        const { selectedCategory } = this.state;
        return (
            <div className="PriceCheckForm">
                <form onSubmit={this.handleSubmit}>
                    Enter your Postcode:
                    <input type="text" value={this.state.postcode} onChange={this.handlePostcodeChange}/>
                    
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
                        Search prices on {this.state.selectedCategory} products.
                        <input type="text" name="searchString" placeholder="Search a product" onChange={this.handleSearchStringChange}/>
                    </div>
                    <input type="submit" value="Check your Postcode"/>
                </form>
            </div>
        )
    }

}

export default PriceCheckForm