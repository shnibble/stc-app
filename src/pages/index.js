import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import '../styles/style.global.css'
import global from '../variables.global'
import Header from '../components/header'
import GetMealButton from '../components/getMealButton'
import Footer from '../components/footer'
import CategoryFilter from '../components/categoryFilter'
import OriginFilter from '../components/originFilter'

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`
const Main = styled.main`
    height: 0px;
    flex-grow: 1;
    flex-shrink: 0;
    margin: 0 auto;
    padding: 5px;
    width: 100%;
    box-sizing: border-box; 
    overflow-y: auto;
    text-align: center;

    & > div, & > button {
        max-width: 1025px;
        margin: 0 auto;
    }
`
const initialState = {
    screenStyle: 'mobile',
    filteredCategories: [],
    filteredOrigins: [],
    loading: false,
    error: false,
    loaded: false,
    meal: {
        name: '',
        description: ''
    }
}

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    saveStateToLocalStorage = () => {
        const array_1 = [...this.state.filteredCategories]
        const array_2 = [...this.state.filteredOrigins]
        localStorage.setItem('filteredCategories', JSON.stringify(array_1))
        localStorage.setItem('filteredOrigins', JSON.stringify(array_2))
    }

    pullStateFromLocalStorage = () => {
        if (localStorage.hasOwnProperty('filteredCategories')) {
            let value = localStorage.getItem('filteredCategories')
            try {
                value = JSON.parse(value)
                this.setState({ filteredCategories: value })
            } catch(e) {
                this.SetState({ filteredCategories: value })
            }
        }
        if (localStorage.hasOwnProperty('filteredOrigins')) {
            let value = localStorage.getItem('filteredOrigins')
            try {
                value = JSON.parse(value)
                this.setState({ filteredOrigins: value })
            } catch(e) {
                this.SetState({ filteredOrigins: value })
            }
        }
    }

    processScreenSize = () => {
        if (window.innerWidth <= global.screenSizes.mobile) {
            if (this.state.screenStyle !== 'mobile') {
                this.setState({ screenStyle: 'mobile' })
            }            
        } else if (window.innerWidth <= global.screenSizes.desktop) {
            if (this.state.screenStyle !== 'tablet') {
                this.setState({ screenStyle: 'tablet' })
            }
            
        } else if (this.state.screenStyle !== 'desktop') {
            this.setState({ screenStyle: 'desktop' })         
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if  (
                nextState.screenStyle !== this.state.screenStyle ||
                nextState.loading !== this.state.loading ||
                nextState.error !== this.state.error ||
                nextState.loaded !== this.state.loaded
            ) {
                return true
            } else {
                return false
        }
    }

    componentWillMount() {
        this.pullStateFromLocalStorage()

        // window resizing
        window.addEventListener('resize', this.processScreenSize)
        this.processScreenSize()
    }

    toggleFilteredCategory = async (ev) => {
        const name = ev.target.value
        const tempArray = this.state.filteredCategories.slice()
        const activeIndex = tempArray.indexOf(name)
        if (activeIndex !== -1) {
            tempArray.splice(activeIndex, 1)
        } else {
            tempArray.push(name)
        }
        await this.setState({
            filteredCategories: tempArray
        })
        this.saveStateToLocalStorage()
    }

    toggleFilteredOrigin = async (ev) => {
        const name = ev.target.value
        const tempArray = this.state.filteredOrigins.slice()
        const activeIndex = tempArray.indexOf(name)
        if (activeIndex !== -1) {
            tempArray.splice(activeIndex, 1)
        } else {
            tempArray.push(name)
        }
        await this.setState({
            filteredOrigins: tempArray
        })
        this.saveStateToLocalStorage()
    }

    fetchMeal = () => {
        this.setState({ loading: true })
        
        // build query string
        let firstParam = true
        const queryStringCategories = this.state.filteredCategories.map((cat) => {
            if (firstParam) {
                firstParam = false
                return `?categories[]=${cat}`
            } else {
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
                this.setState({  
                    loading: false,
                    error: false,
                    loaded: true, 
                    meal: {
                        name: mealName,
                        description: mealDescription
                    }
                })
            })
            .catch(err => {
                this.setState({ 
                    loading: false, 
                    loaded: false, 
                    error: true 
                })
            })
    }
    
    render() {
        const { screenStyle } = this.state
        return (
            <Wrapper>
                <Header screenStyle={this.state.screenStyle} getMealFunction={this.fetchMeal}/>
                <Main>                    
                    <div id="filters">
                        <CategoryFilter screenStyle={this.state.screenStyle} filter={this.state.filteredCategories} onClickFunction={this.toggleFilteredCategory} />
                        <OriginFilter screenStyle={this.state.screenStyle} filter={this.state.filteredOrigins} onClickFunction={this.toggleFilteredOrigin} />
                    </div>
                    { (screenStyle === 'desktop')?<GetMealButton getMealFunction={this.fetchMeal} />:null }
                    <div id="results">
                        {
                            this.state.loading
                            ?
                            <p>Loading Meal...</p> 
                            : this.state.error
                                ?
                                <p>Could not load a meal with those parameters. Try something less specific.</p>
                                : this.state.loaded 
                                    ?
                                    <>
                                        <h3>Result</h3> 
                                        <p>Name: {this.state.meal.name}</p>
                                        <p>Description: {this.state.meal.description}</p>
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
}

export default Index