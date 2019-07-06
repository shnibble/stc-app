import React from 'react'
import FilterLayout from './filterLayout'
import FilterContainer from './filterContainer'

export default ({ screenStyle, allOrigins, filter, onClickFunction }) => (
    <FilterLayout screenStyle={screenStyle} title={`Origins`} description={`From what part of the world the dish originated or became popular.`}>
        <FilterContainer data={allOrigins} filter={filter} onClickFunction={onClickFunction} />
    </FilterLayout>
)