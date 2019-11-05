import React, { Component } from 'react'
import axios from 'axios';
import { categories } from '../utils/Constants.js';


class PriceCheckForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            postcode: "",
            selectedCategory: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostcodeChange = this.handlePostcodeChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.fetchSuppliers = this.fetchSuppliers.bind(this)
    }

    fetchSuppliers = (postcode) => {
        return axios.get(`https://www.foodbomb.com.au/supplier-service/postcode/${postcode}/suppliers`)
          .then(resp => resp.data)
    }

    handleSubmit(e) {
        const supplierResponse = this.fetchSuppliers(this.state.postcode)
        e.preventDefault()
    }


    handlePostcodeChange(e) {
        this.setState({postcode: e.target.value})   
    }

    handleCategoryChange(e) {
        this.setState({selectedCategory: categories[e.target.id-1].value})
        console.log(`${this.state.selectedCategory}`)
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
                        <input type="text" name="searchString" placeholder="Search a product"/>
                    </div>
                </form>
            </div>
        )
    }

}

export default PriceCheckForm