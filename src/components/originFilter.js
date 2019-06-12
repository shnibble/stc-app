import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import FilterLayout from './filterLayout'
import FilterContainer from './filterContainer'

export default ({ screenStyle, filter, onClickFunction }) => (
    <StaticQuery 
        query={graphql`
        query {
            allOrigins {
              nodes {
                alternative_id
                name
              }
            }
          }          
        `}
        render={data => (
            <FilterLayout screenStyle={screenStyle} title={`Origins`} description={`From what part of the world the dish originated or became popular.`}>
                <FilterContainer data={data.allOrigins.nodes} filter={filter} onClickFunction={onClickFunction} />
            </FilterLayout> 
        )}
    />
)