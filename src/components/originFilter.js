import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import FilterLayout from './filterLayout'

export default ({ screenStyle, filteredOrigins, onClickFunction }) => (
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
                {data.allOrigins.nodes.map(( origin , index) => (
                    (origin.name)
                    ?
                    <button 
                        key={index} 
                        value={origin.name} 
                        onClick={onClickFunction}
                        className={(filteredOrigins.includes(origin.name))?'active':null}
                        >
                        {origin.name}
                    </button>
                    :
                    null                        
                ))}
            </FilterLayout> 
        )}
    />
)