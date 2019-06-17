import React from 'react'
import styled from 'styled-components'
// import global from '../variables.global'

const Container = styled.div`
    position: relative;
    background: #f2f2f2;
    padding: 15px;
    min-height: 50px;
    overflow: hidden;
    box-shadow: 0 0 3px 1px rgba(0,0,0,0.2);
    transition: height .25s;
`
const Alert = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background: rgba(255,255,255,0.95);
    font-size: 20px;
    line-height: 20px;
`

class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: this.props.data.error || false,
            loading: this.props.data.loading || false,
            meal: this.props.data.meal || null
        }
    }

    componentWillReceiveProps = async (nextProps) => {
        const el = document.getElementById('result-container')
        el.style.removeProperty('height')
        const elStyle = window.getComputedStyle(el, null)
        const oldHeight = elStyle.getPropertyValue('height')

        await this.setState({
            error: nextProps.data.error,
            loading: nextProps.data.loading,
            meal: nextProps.data.meal
        })
        const newHeight = elStyle.getPropertyValue('height')
        el.style.height = oldHeight
        setTimeout(() => {
            el.style.height = newHeight
        }, 1)
    }

    render() {
        const { error, loading, meal } = this.state
        return(
            <Container id='result-container'>
                {
                    <>
                    {(error)
                        ?<Alert><p style={{color: 'red'}}>Error fetching meals. Try searching for something less specific.</p></Alert>
                        :null}
                    {(loading)
                        ?<Alert><p>Loading Meal...</p></Alert>
                        :null}
                    {(meal.name)
                        ?<div>
                            <h3>{meal.name}</h3>
                            <p>{meal.description}</p>
                            <hr/>
                            <p><strong>Categories:</strong> {meal.categories.join(', ')}</p>
                            <p><strong>Origins:</strong> {meal.origins.join(', ')}</p>
                            {(meal.tags[0] !== null)?<p><strong>Tags:</strong> {meal.tags.join(', ')}</p>:null}
                            {(meal.variations[0] !== null)?<p><strong>Variations:</strong> {meal.variations.join(', ')}</p>:null}
                        </div>
                        :(!error)
                            ?<Alert>
                                <h3>Click the "GET MEAL" button to find a meal.</h3>
                            </Alert>
                        :null}
                    </>
                }
            </Container>
        )
    }
}

export default Result