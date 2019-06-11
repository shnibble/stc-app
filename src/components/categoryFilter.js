import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import FilterLayout from './filterLayout'

function toggleActive(ev){
    ev.target.classList.toggle('active')
}

export default ({ screenStyle }) => (
    <StaticQuery 
        query={graphql`
        query HeadingQuery {
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
                        value={category.alternative_id} 
                        onClick={toggleActive}
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