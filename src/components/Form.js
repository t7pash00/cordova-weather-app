import React, { Component } from 'react'

class Form extends Component {
    render () {
        return (
			<form className="form-inline" onSubmit={this.props.getWeather}>
				<div className="form-group mb-2">
					<label htmlFor="city" className="sr-only">City</label>
					<input type="text" className="form-control" id="city" name="city" placeholder="City....." />
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<label htmlFor="country" className="sr-only">Country</label>
					<input type="text" className="form-control" id="country" name="country" placeholder="Country....." />
				</div>
				<button className="btn btn-primary mb-2">Get Weather</button>
			</form>
        )
    }
}

export default Form;