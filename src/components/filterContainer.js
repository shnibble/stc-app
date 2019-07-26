import React from 'react'
import FilterButton from './filterButton'

const FilterContainer = ({ data, filter, onClickFunction }) => {
    return (
        data.map(( item , index) => (
            (item.name)?<FilterButton 
                            key={index} 
                            text={item.name} 
                            value={item.name} 
                            active={(filter.includes(item.name))?true:false}
                            onClickFunction={onClickFunction}
                            />:null          
        ))
    )
}

export default FilterContainer