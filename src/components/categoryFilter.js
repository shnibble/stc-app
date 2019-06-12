import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import FilterLayout from './filterLayout'

export default ({ screenStyle, filteredCategories, onClickFunction }) => (
    <StaticQuery 
        query={graphql`
        query {
            allCategories {
              nodes {
                alternative_id
                name
              }
            }
          }          
        `}
        render={data => (
            <FilterLayout screenStyle={screenStyle} title={`Categories`} description={`What the dish is really focused on or primarily centered around.`}>
                {data.allCategories.nodes.map(( category , index) => (
                    (category.name)
                    ?
                    <button 
                        key={index} 
                        value={category.name} 
                        onClick={onClickFunction}
                        className={(filteredCategories.includes(category.name))?'active':null}
                        >
                        {category.name}
                    </button>
                    :
                    null                        
                ))}
            </FilterLayout> 
        )}
    />
)