import React from 'react'
import FilterLayout from './filterLayout'
import FilterContainer from './filterContainer'

export default ({ screenStyle, allCategories, filter, onClickFunction }) => (
    <FilterLayout screenStyle={screenStyle} title={`Categories`} description={`What the dish is primarily focused on.`}>
        <FilterContainer data={allCategories} filter={filter} onClickFunction={onClickFunction} />
    </FilterLayout> 
)