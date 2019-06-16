import React from 'react'
import styled from 'styled-components'
// import global from '../variables.global'

const Container = styled.div`
    min-height: 200px;
    background: #f2f2f2;
    padding: 15px;
    box-sizing: border-box; 
    box-shadow: 0 0 3px 1px rgba(0,0,0,0.2);
`

class Result extends React.Component {
    constructor(props) {
        super(props)
        console.log('result.js constructing')
        this.state = {
            error: this.props.data.error || false,
            loading: this.props.data.loading || false,
            loaded: this.props.data.loaded || false,
            meal: this.props.data.meal || null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            error: nextProps.data.error,
            loading: nextProps.data.loading,
            loaded: nextProps.data.loaded,
            meal: nextProps.data.meal
        })
    }

    render() {
        const { error, loading, loaded, meal } = this.state
        return(
            <Container>
                {
                    (error)
                        ?<p>Error fetching meals. Try searching for something less specific.</p>
                        :(loading)
                            ?<p>Loading Meal...</p>
                            :(loaded)
                                ?   <div>
                                        <h3>{meal.name}</h3>
                                        <p>{meal.description}</p>
                                        <hr/>
                                        <p><strong>Categories:</strong> {meal.categories.join(', ')}</p>
                                        <p><strong>Origins:</strong> {meal.origins.join(', ')}</p>
                                        <p><strong>Tags:</strong> {meal.tags.join(', ')}</p>
                                    </div>
                                :null
                }
            </Container>
        )
    }
}

export default Result