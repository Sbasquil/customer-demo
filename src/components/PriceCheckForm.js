import React, { Component } from 'react'
import axios from 'axios';
import { categories } from '../utils/Constants.js';
import PriceCheckQueryResponses from './PriceCheckQueryResponses'
import MapContainer from './MapContainer'


class PriceCheckForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postcode: "2000",
            postcodeSubmitted: "",
            selectedCategory: "",
            searchString: "",
            fetching: false,
            searchComplete: false,
            numOfSuppliers: 0,
            searchResults: [],
            count: 0,
            requestError: ""
        }
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
            console.error(e)
        }
        return products;
    }

    handleSubmit = e => {
        e.preventDefault();
        const { postcode, selectedCategory, searchString } = this.state;
        this.setState({ fetching: true, searchComplete: false }, () => console.log(this.state));

        axios.get(`http://localhost:3001/searchProducts/${postcode}/${selectedCategory}/${searchString}`)
            .then( response => {
                const searchResults = response.data.shortlist.result.map(product => ({ name: product.pname, portion: `${product.size}${product.sizeUnit}`, productId: product.product_id, price: `$${product.price}`}))
                this.setState(
                {
                    searchResults,
                    numOfSuppliers: response.data.supplierIds.length,
                    count: response.data.shortlist.count
                }, () => this.setState({fetching: false, searchComplete: true, postcodeSubmitted: postcode}))
            })
            .catch( error => {
                console.error(error) 
                this.setState({fetching: false, searchComplete: false, requestError: JSON.stringify(error)})
            })

        // axios.get(`/supplier-service/postcode/${postcode}/suppliers`)
        //     .then(response => {
        //         this.setState({ numOfSuppliers: response.data.length })
        //         this.getProductsFromCategoryForSearchQuery(response.data, selectedCategory, searchString).then(response => {
        //             const results = response.result;
        //             const searchResults = results.map(product => ({ name: product.pname, portion: `${product.size}${product.sizeUnit}`, productId: product.product_id, price: `$${product.price}` }))
        //             this.setState({ searchResults, count: response.count }, () => this.setState({fetching: false, searchComplete: true, postcodeSubmitted: postcode}));
        //         }).catch(err => {
        //             this.setState({fetching: false, searchComplete: false, requestError: JSON.stringify(err)})
        //             console.error(err)
        //         })
        //     }).catch(err => { 
        //         console.error(err) 
        //         this.setState({fetching: false, searchComplete: false, requestError: JSON.stringify(err)})
        //     })
    };


    handlePostcodeChange = (e) => {
        this.setState({ postcode: e.target.value });
    }

    handleCategoryChange = cat => {
        this.setState({ selectedCategory: cat })
    }

    handleSearchStringChange = (e) => {
        this.setState({ searchString: e.target.value });
    }



    render() {
        const { postcode, postcodeSubmitted, selectedCategory, fetching, searchComplete, numOfSuppliers, searchResults, count, requestError } = this.state;
        return (
            <div className="PriceCheckForm">
                <form onSubmit={this.handleSubmit}>
                    Enter your Postcode:
                    <input type="number" value={postcode} min="200" max="9730" pattern="^[0-9]*$" onChange={this.handlePostcodeChange} />

                    <div className="categorySelectionContainer">
                        Select a product category to compare prices.
                        <div className="categorySelectionButtonContainer">
                            {categories.map(category =>
                                <div className={selectedCategory === category.value ? "categoryButton selected" : "categoryButton"} key={category.catId} onClick={() => this.handleCategoryChange(category.value)}>
                                    {category.displayName}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="productSearch">
                        Search prices on {selectedCategory} products.
                        <input type="text" name="searchString" placeholder="Search a product" onChange={this.handleSearchStringChange} minLength="1" required />
                    </div>
                    <input type="submit" value="Check for products!" />
                </form>
                <PriceCheckQueryResponses
                    fetching={fetching}
                    searchComplete={searchComplete}
                    numOfSuppliers={numOfSuppliers}
                    searchResults={searchResults}
                    count={count}
                    requestError={requestError} />
                <MapContainer postcode={postcodeSubmitted}/>
            </div>
        )
    }

}

export default PriceCheckForm