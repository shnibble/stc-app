import React from 'react'

const FilterButton = ({ text, value, active, onClickFunction }) => {
    return (
        <button 
            value={value} 
            onClick={onClickFunction}
            className={(active)?'active':'nonet'}
        >{text}</button>
    )
}

export default FilterButton