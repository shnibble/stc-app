import React from 'react'

class FilterButton extends React.Component {
    constructor(props) {
        super(props)
        this.onClickFunction = this.props.onClickFunction
        this.state = {
            text: this.props.text,
            value: this.props.value,
            active: this.props.isActive
        }

    }

    click = (event) => {
        this.setState({ active: !this.state.active })
        this.onClickFunction(event)
    }

    render() {
        return (
            <button 
                value={this.state.value} 
                onClick={this.click}
                className={(this.state.active?'active':null)}
            >{this.state.text}</button>
        )
    }
}

export default FilterButton