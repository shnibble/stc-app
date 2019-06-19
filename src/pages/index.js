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
import Result from '../components/result'

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
        margin: 10px auto;
    }
`
const initialState = {
    screenStyle: 'mobile',
    filteredCategories: [],
    filteredOrigins: [],
    loading: false,
    error: false,
    errorMessage: '',
    meal: {
        name: '',
        description: '',
        image: '',
        categories: [],
        origins: [],
        tags: []
    }
}

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = initialState
        this.windowResizeTimeout = false
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

    windowListener = () => {
        clearTimeout(this.windowResizeTimeout)
        this.windowResizeTimeout = setTimeout(this.processScreenSize, 250)
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

    shouldComponentUpdate = (nextProps, nextState) => {
        if  (
                nextState.screenStyle !== this.state.screenStyle ||
                nextState.loading !== this.state.loading ||
                nextState.error !== this.state.error 
            ) {
                return true
            } else {
                return false
        }
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
        this.setState({ loading: true, error: false })
        
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
            .then(result => {
                // the first element of result.data array will be meta data, subsequent elements are potentially results
                const { error, errorMessage, resultsFound } = result.data[0]

                if (error) {
                    // the server responded but returned an error
                    this.setState({
                        loading: false,
                        error: true,
                        errorMessage: errorMessage,
                    })
                } else if (resultsFound === 0) {
                    // the server responded with zero results from the query
                    this.setState({
                        loading: false,
                        error: true,
                        errorMessage: 'No results found using those parameters. Try searching for something less specific.',
                    })
                } else if (resultsFound > 1) {
                    // the server responded with more than one result from the query
                    this.setState({
                        loading: false,
                        error: true,
                        errorMessage: 'The API server returned multiple results. Try searching for something else.',
                    })
                } else {
                    // good response
                    const { name, description, image, categories, origins, tags } = result.data[1]
                    this.setState({  
                        loading: false,
                        error: false,
                        meal: {
                            name: name,
                            description: description,
                            image: image,
                            categories: categories,
                            origins: origins,
                            tags: tags
                        }
                    })
                }
                
            })
            .catch(err => {
                this.setState({ 
                    loading: false,
                    error: true,
                    errorMessage: 'The API server returned an error or could not be reached. Try your search again in a moment.'
                })
            })
    }

    componentWillMount = () => {
        this.pullStateFromLocalStorage()
    }

    componentDidMount = () => {
        // window resizing
        window.addEventListener('resize', this.windowListener)
        this.processScreenSize()
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.windowListener)
        clearTimeout(this.windowResizeTimeout)
    }
    
    render = () => {
        const { screenStyle, filteredCategories, filteredOrigins } = this.state
        return (
            <Wrapper>
                <Header screenStyle={screenStyle} getMealFunction={this.fetchMeal}/>
                <Main>       
                    { (screenStyle === 'mobile' || screenStyle === 'tablet')?<Result data={this.state} />:null } 
                    <div id="filters">
                        <CategoryFilter screenStyle={screenStyle} filter={filteredCategories} onClickFunction={this.toggleFilteredCategory} />
                        <OriginFilter screenStyle={screenStyle} filter={filteredOrigins} onClickFunction={this.toggleFilteredOrigin} />
                    </div>
                    { (screenStyle === 'desktop')?<GetMealButton getMealFunction={this.fetchMeal} />:null }
                    { (screenStyle === 'desktop')?<Result data={this.state} />:null } 
                </Main>
                { (screenStyle === 'desktop')?<Footer />:null }
            </Wrapper>
        )
    }
}

export default Index