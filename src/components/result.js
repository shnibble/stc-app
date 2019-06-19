import React from 'react'
import styled from 'styled-components'
import { scrollMainToTop } from '../functions'
import CardTab from '../components/cardTab'
import ExpandableArea from '../components/expandableArea'

const Container = styled.div`
    position: relative;
    padding: 15px;
    min-height: 70px;
    overflow: hidden;
    box-sizing: border-box; 
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
    z-index: 1;
`
const Card = styled.div`
    display: flex;
    flex-direction: row;
    height: 240px;
    box-shadow: 0 0 3px 1px rgba(0,0,0,0.2);
    transition: height .25s;
`
const CardSectionLeft = styled.div`
    flex: 1;
    padding: 10px;
    overflow-y: hidden;
`
const CardSectionRight = styled.div`
    width: 210px;
    padding: 10px;
    overflow-y: hidden;
`
const CardTitle = styled.h3`
    text-align: left;
    font-size: 38px;
    font-weight: normal;
    font-family: 'Quicksand', sans-serif;
`
const TabsContainer = styled.div`
    text-align: left;
`

const CardDescription = styled.p`
    text-align: left;
    font-family: 'Quicksand', sans-serif;
    padding: 5px;
`
const CardImage = styled.div`
    position: relative;
    height: 210px;
    width: 210px;
    margin: auto;

    & > img {
        width: 100%;
    }
    
`

class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.data
    }

    expandCard = (newHeight) => {
        const el = document.getElementById('card')
        el.style.height = newHeight + 'px'
    }

    collapseCard = () => {
        const el = document.getElementById('card')
        el.style.removeProperty('height')
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            screenStyle: nextProps.data.screenStyle,
            error: nextProps.data.error,
            errorMessage: nextProps.data.errorMessage,
            loading: nextProps.data.loading,
            meal: nextProps.data.meal
        })
        const el = document.getElementById('card')
        if (el !== null) {
            el.style.removeProperty('height')
        }

        if (this.state.screenStyle !== 'desktop') {
            scrollMainToTop()
        }        
    }

    render = () => {
        const { screenStyle, error, errorMessage, loading, meal } = this.state
        const categories = (meal.categories[0] !== null)?meal.categories.map((category) => category ):[]
        const origins = (meal.origins[0] !== null)?meal.origins.map((origin) => origin ):[]
        const tags = (meal.tags[0] !== null)?meal.tags.map((tag) => tag ):[]

        let content = null
        if (error) {
            // 1. check for error
            content =   <Alert><p style={{color: 'red'}}>{errorMessage}</p></Alert>
        } else if (loading) {
            // 2. check if loading
            content =   <Alert><p>Looking up meals...</p></Alert>
        } else if (meal.name) {
            // 3. check for result
            content =   <Card id='card'>
                            <CardSectionLeft>
                                <ExpandableArea collapsedHeight={210} expandFunction={this.expandCard} collapseFunction={this.collapseCard}>
                                    <CardTitle>{meal.name}</CardTitle>
                                    <TabsContainer>
                                        <CardTab title='Categories' items={categories} />
                                        <CardTab title='Origins' items={origins} />
                                        <CardTab title='Tags' items={tags} />
                                    </TabsContainer>
                                    <CardDescription>{meal.description}</CardDescription>
                                </ExpandableArea>
                            </CardSectionLeft>
                            {(screenStyle !== 'mobile' && meal.image !== null)
                            ?<CardSectionRight>
                                <CardImage>
                                    <img src={meal.image} alt={meal.name} />
                                </CardImage>                                        
                            </CardSectionRight>
                            :null}
                        </Card>        
        } else {
            // 4. display prompt
            content =   <Alert><h3>Click the "GET MEAL" button to find a meal.</h3></Alert>        
        }

        return(
            <Container id='result-container'>
                {content}
            </Container>
        )
    }
}

export default Result