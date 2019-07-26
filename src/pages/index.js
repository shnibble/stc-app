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
import TagFilter from '../components/tagFilter'
import Result from '../components/result'
import LoadingAnimation from '../components/loadingAnimation';
import { scrollMainToTop } from '../functions'

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
    allCategories: [],
    allOrigins: [],
    allTags: [],
    loadingMeta: false,
    metaError: false,
    metaErrorMessage: '',
    filteredCategories: [],
    filteredOrigins: [],
    filteredTags: [],
    loadingResult: false,
    resultError: false,
    resultErrorMessage: '',
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
        const array_3 = [...this.state.filteredTags]
        localStorage.setItem('filteredCategories', JSON.stringify(array_1))
        localStorage.setItem('filteredOrigins', JSON.stringify(array_2))
        localStorage.setItem('filteredTags', JSON.stringify(array_3))
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
        if (localStorage.hasOwnProperty('filteredTags')) {
            let value = localStorage.getItem('filteredTags')
            try {
                value = JSON.parse(value)
                this.setState({ filteredTags: value })
            } catch(e) {
                this.SetState({ filteredTags: value })
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

    loadMetaData = async () => {
        this.setState({ loadingMeta: true })
        let categories = false
        let origins = false
        let tags = false
        
        await axios
            .get(`https://api.somethingtocook.com/meta/categories`)
            .then(result => categories = result.data)
            .catch(err => {
                this.setState({
                    loadingMeta: false,          
                    metaError: true,
                    metaErrorMessage: 'Failed to load categories from the API.',
                })
                return false
            })
        await axios
            .get(`https://api.somethingtocook.com/meta/origins`)
            .then(result => origins = result.data)
            .catch(err => {
                this.setState({
                    loadingMeta: false,
                    metaError: true,
                    metaErrorMessage: 'Failed to load origins from the API.',
                })
                return false
            })
        await axios
            .get(`https://api.somethingtocook.com/meta/tags`)
            .then(result => tags = result.data)
            .catch(err => {
                this.setState({
                    loadingMeta: false,
                    metaError: true,
                    metaErrorMessage: 'Failed to load tags from the API.',
                })
                return false
            })

        if (categories.length > 0 && origins.length > 0 && tags.length > 0) {
            await this.setState({
                loadingMeta: false,
                metaError: false,
                allCategories: categories,
                allOrigins: origins,
                allTags: tags
            })
            return true
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

    toggleFilteredTag = async (ev) => {
        const name = ev.target.value
        const tempArray = this.state.filteredTags.slice()
        const activeIndex = tempArray.indexOf(name)
        if (activeIndex !== -1) {
            tempArray.splice(activeIndex, 1)
        } else {
            tempArray.push(name)
        }
        await this.setState({
            filteredTags: tempArray
        })
        this.saveStateToLocalStorage()
    }

    fetchMeal = () => {
        this.setState({ loadingResult: true, resultError: false })
        
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
        const queryStringTags = this.state.filteredTags.map((tag) => {
            if (firstParam) {
                firstParam = false
                return `?tags[]=${tag}`
            } else {
                return `&tags[]=${tag}`
            }
            
        }).join('')
        const queryStringDetails = (firstParam)?`?limit=1&order=RANDOM`:`&limit=1&order=RANDOM`
        const queryString = `${queryStringCategories}${queryStringOrigins}${queryStringTags}${queryStringDetails}`

        axios
            .get(`https://api.somethingtocook.com/meals${queryString}`)
            .then(result => {
                // the first element of result.data array will be meta data, subsequent elements are potentially results
                const { error, errorMessage, resultsFound } = result.data[0]

                if (error) {
                    // the server responded but returned an error
                    this.setState({
                        loadingResult: false,
                        resultError: true,
                        resultErrorMessage: errorMessage,
                    })
                } else if (resultsFound === 0) {
                    // the server responded with zero results from the query
                    this.setState({
                        loadingResult: false,
                        resultError: true,
                        resultErrorMessage: 'No results found using those parameters. Try searching for something less specific.',
                    })
                } else if (resultsFound > 1) {
                    // the server responded with more than one result from the query
                    this.setState({
                        loadingResult: false,
                        resultError: true,
                        resultErrorMessage: 'The API server returned multiple results. Try searching for something else.',
                    })
                } else {
                    // good response
                    const { name, description, image, categories, origins, tags } = result.data[1]
                    this.setState({  
                        loadingResult: false,
                        resultError: false,
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
                    loadingResult: false,
                    resultError: true,
                    resultErrorMessage: 'The API server returned an error or could not be reached. Try your search again in a moment.'
                })
            })
            if (this.state.screenStyle !== 'desktop') {
                scrollMainToTop()
            }
    }

    componentWillMount = async () => {
        this.pullStateFromLocalStorage()
        await this.loadMetaData()
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
        const { screenStyle, loadingMeta, metaError, loadingResult, resultError, resultErrorMessage, allCategories, allOrigins, allTags, filteredCategories, filteredOrigins, filteredTags, meal } = this.state
        return (
            <Wrapper>
                <Header screenStyle={screenStyle} loading={loadingMeta} error={metaError} getMealFunction={this.fetchMeal}/>
                <Main>
                    {(loadingMeta)
                       ?<LoadingAnimation />
                       :(metaError)
                           ?<div>
                               <h3>Could Not Load Meta Data</h3>
                               <p>Something went wrong while attempting to load meta data from the API server. Either it is offline or we broke something on our end. Please refresh the page in a moment.</p>
                            </div>
                           :<>
                                {(screenStyle === 'mobile' || screenStyle === 'tablet')
                                    ?<Result screenStyle={screenStyle} error={resultError} errorMessage={resultErrorMessage} loading={loadingResult} meal={meal} />
                                    :null
                                }
                                <div id="filters">
                                    <CategoryFilter screenStyle={screenStyle} allCategories={allCategories} filter={filteredCategories} onClickFunction={this.toggleFilteredCategory} />
                                    <OriginFilter screenStyle={screenStyle} allOrigins={allOrigins} filter={filteredOrigins} onClickFunction={this.toggleFilteredOrigin} />
                                    <TagFilter screenStyle={screenStyle} allTags={allTags} filter={filteredTags} onClickFunction={this.toggleFilteredTag} />                 
                                </div>
                                {(screenStyle === 'desktop')
                                    ?<GetMealButton getMealFunction={this.fetchMeal} />
                                    :null
                                }
                                {(screenStyle === 'desktop')
                                    ?<Result screenStyle={screenStyle} error={resultError} errorMessage={resultErrorMessage} loading={loadingResult} meal={meal} />
                                    :null
                                }                        
                            </>
                    }
                </Main>
                {(screenStyle === 'desktop')
                    ?<Footer />
                    :null 
                }
            </Wrapper>
        )
    }
}

export default Index