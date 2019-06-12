import React from 'react'
import FilterButton from './filterButton'

class FilterContainer extends React.Component {
    constructor(props) {
        super(props)
        this.data = this.props.data
        this.filter = this.props.filter
        this.onClickFunction = this.props.onClickFunction
    }

    render() {
        return (
            this.data.map(( item , index) => (
                (item.name)?<FilterButton 
                                key={index} 
                                text={item.name} 
                                value={item.name} 
                                isActive={(this.filter.includes(item.name))?true:false}
                                onClickFunction={this.onClickFunction}
                              />:null          
            ))
        )
    }
}

export default FilterContainer