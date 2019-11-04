import React, { Component } from 'react'

class PriceCheckForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            postcode: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
       
    }

    handleSubmit(e) {
        console.log(`Submitted the postcode ${this.state.postcode} for query`)
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