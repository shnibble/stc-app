import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { CSSTransition } from 'react-transition-group'

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
                    <CSSTransition
                        timeout={300}
                        classNames='active'
                        >
                        <button 
                            key={index} 
                            value={origin.alternative_id} 
                            onClick={onClickFunction}
                            className={(filteredOrigins.includes(origin.alternative_id))?'active':null}
                            >
                            {origin.name}
                        </button>
                    </CSSTransition>
                    :
                    null                        
                ))}
            </FilterLayout> 
        )}
    />
)