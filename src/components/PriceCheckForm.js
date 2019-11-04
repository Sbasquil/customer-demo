import React, { Component } from 'react'
import axios from 'axios'


class PriceCheckForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            postcode: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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


    handleChange(e) {
        this.setState({postcode: e.target.value})
    }



    render() {
        return (
            <div className="PriceCheckForm">
                <form onSubmit={this.handleSubmit}>
                    Enter your Postcode:
                    <input type="text" value={this.state.postcode} onChange={this.handleChange}/>
                    <input type="submit" value="Check your Postcode"/>
                </form>
            </div>
        )
    }

}

export default PriceCheckForm