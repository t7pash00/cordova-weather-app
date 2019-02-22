import React, { Component } from 'react'


class Header extends Component {
    render () {
        return (
	<div className = "Weather">
		<h1 className="title-container__title">Weather Finder</h1>
		<h3 className="title-container__subtitle">Find out temperature, conditions and more...</h3>
	</div>
        )
    }
}

export default Header;