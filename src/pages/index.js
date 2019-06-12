import React from 'react'
// import { graphql } from 'gatsby'
import styled from 'styled-components'
import axios from 'axios'

import ui from '../styles/global-style-variables'
import '../styles/style.global.css'

import Header from '../components/header'
import GetMealButton from '../components/getMealButton'
import Footer from '../components/footer'
import CategoryFilter from '../components/categoryFilter'
import OriginFilter from '../components/originFilter'

const Wrapper = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    align-items: stretch;
`
const Main = styled.main`
    flex-grow: 1;
    flex-shrink: 0;
    margin: 0 auto;
    padding: 5px;
    width: 100%;
    box-sizing: border-box; 
    max-width: 1025px;
`

const initialState = {
    screenStyle: 'mobile',
    filteredCategories: [],
    filteredOrigins: [],
    result: {
        loading: false,
        error: false,
        loaded: false,
        meal: {
            name: '',
            description: ''
        }
    }
}
class Index extends React.Component {

    constructor(props) {
        super(props)
        this.state = initialState
    }

    processScreenSize = () => {
        if (window.innerWidth <= ui.screenSize.mobile) {
            this.setState({ screenStyle: 'mobile' })
        } else if (window.innerWidth <= ui.screenSize.desktop ) {
            this.setState({ screenStyle: 'tablet' })
        } else {
            this.setState({ screenStyle: 'desktop' })
        }
    }

    componentDidMount() {
        // window resizing
        window.addEventListener('resize', this.processScreenSize)
        this.processScreenSize()

        // retrieve meal from stc API
        //this.fetchMeal()
    }

    toggleFilteredCategory = (ev) => {
        // ev.target.classList.toggle('active')
        const name = ev.target.value
        const tempArray = this.state.filteredCategories.slice()
        const activeIndex = tempArray.indexOf(name)
        if (activeIndex !== -1) {
            tempArray.splice(activeIndex, 1)
        } else {
            tempArray.push(name)
        }

        // TODO {{ setTimeout works to fix CSS transitions but causes issues when changing filters quickly. Need another
        // solution but in the meantime this works and just skips the smooth looking transitions
        // }}
        // setTimeout(() => {
            this.setState({
                filteredCategories: tempArray
            })
        // }, 250)
        
    }

    toggleFilteredOrigin= (ev) => {
        // ev.target.classList.toggle('active')
        const name = ev.target.value
        const tempArray = this.state.filteredOrigins.slice()
        const activeIndex = tempArray.indexOf(name)
        if (activeIndex !== -1) {
            tempArray.splice(activeIndex, 1)
        } else {
            tempArray.push(name)
        }

        // TODO {{ setTimeout works to fix CSS transitions but causes issues when changing filters quickly. Need another
        // solution but in the meantime this works and just skips the smooth looking transitions
        // }}
        // setTimeout(() => {
            this.setState({
                filteredOrigins: tempArray
            })
        // }, 250)
    }

    render() {
        const { screenStyle } = this.state
        return (
            <Wrapper>
                <Header screenStyle={this.state.screenStyle} getMealFunction={this.fetchMeal}/>
                <Main>                    
                    <div id="filters">
                        <CategoryFilter screenStyle={this.state.screenStyle} filteredCategories={this.state.filteredCategories} onClickFunction={this.toggleFilteredCategory}/>
                        <OriginFilter screenStyle={this.state.screenStyle} filteredOrigins={this.state.filteredOrigins} onClickFunction={this.toggleFilteredOrigin}/>
                    </div>
                    { (screenStyle === 'desktop')?<GetMealButton getMealFunction={this.fetchMeal} />:null }
                    <div id="results">
                        {
                            this.state.result.loading
                            ?
                            <p>Loading Meal...</p> 
                            : this.state.result.error
                                ?
                                <p>Could not load a meal with those parameters. Try something less specific.</p>
                                : this.state.result.loaded 
                                    ?
                                    <>
                                        <h3>Result</h3> 
                                        <p>Name: {this.state.result.meal.name}</p>
                                        <p>Description: {this.state.result.meal.description}</p>
                                    </>
                                    :
                                    null
                        }                        
                    </div>
                </Main>
                { (screenStyle === 'desktop')?<Footer />:null }
            </Wrapper>
        )
    }

    fetchMeal = () => {
        this.setState({ result: { loading: true }})
        
        // build query string
        let firstParam = true
        const queryStringCategories = this.state.filteredCategories.map((cat) => {
            if (firstParam) {
                firstParam = false
                console.log("returning", `?categories[]=${cat}`)
                return `?categories[]=${cat}`
            } else {
                console.log("returning", `&categories[]=${cat}`)
                return `&categories[]=${cat}`
            }
            
        }).join('')
        const queryStringOrigins = this.state.filteredOrigins.map((ori) => {
            if (firstParam) {
                firstParam = false
                return `?origins[]=${ori}`
            } else {
                return `&origins[]=${ori}`
            }
            
        }).join('')
        const queryStringDetails = (firstParam)?`?limit=1&order=RANDOM`:`&limit=1&order=RANDOM`
        const queryString = `${queryStringCategories}${queryStringOrigins}${queryStringDetails}`

        axios
            .get(`http://localhost:3000/meals${queryString}`)
            .then(meal => {
                const mealName = meal.data[0].name
                const mealDescription = meal.data[0].description
                this.setState({ result: { 
                    loading: false,
                    error: false,
                    loaded: true, 
                    meal: {
                        name: mealName,
                        description: mealDescription
                    }
                }})
            })
            .catch(err => {
                this.setState({ result: { 
                    loading: false, 
                    loaded: false, 
                    error: true 
                }})
            })
    }
}

export default Index