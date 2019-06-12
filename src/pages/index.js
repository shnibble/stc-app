import React from 'react'
// import { graphql } from 'gatsby'
import styled from 'styled-components'

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
    filteredCategories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    filteredOrigins: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
        window.addEventListener('resize', this.processScreenSize)
        this.processScreenSize()
    }

    toggleFilteredCategory = (ev) => {
        ev.target.classList.toggle('active')
        const id = Number(ev.target.value)
        const tempArray = this.state.filteredCategories.slice()
        const activeIndex = tempArray.indexOf(id)
        if (activeIndex !== -1) {
            tempArray.splice(activeIndex, 1)
        } else {
            tempArray.push(id)
        }
        
        setTimeout(() => {
            this.setState({
                filteredCategories: tempArray
            })
        }, 250)
        
    }

    toggleFilteredOrigin= (ev) => {
        ev.target.classList.toggle('active')
        const id = Number(ev.target.value)
        const tempArray = this.state.filteredOrigins.slice()
        const activeIndex = tempArray.indexOf(id)
        if (activeIndex !== -1) {
            tempArray.splice(activeIndex, 1)
        } else {
            tempArray.push(id)
        }
        setTimeout(() => {
            this.setState({
                filteredOrigins: tempArray
            })
        }, 250)
    }

    render() {
        const { screenStyle } = this.state
        return (
            <Wrapper>
                <Header screenStyle={this.state.screenStyle}/>
                <Main>                    
                    <div id="filters">
                        <CategoryFilter screenStyle={this.state.screenStyle} filteredCategories={this.state.filteredCategories} onClickFunction={this.toggleFilteredCategory}/>
                        <OriginFilter screenStyle={this.state.screenStyle} filteredOrigins={this.state.filteredOrigins} onClickFunction={this.toggleFilteredOrigin}/>
                    </div>
                    { (screenStyle === 'desktop')?<GetMealButton />:null }
                    <div id="results">
                        RESULT
                    </div>
                </Main>
                { (screenStyle === 'desktop')?<Footer />:null }
            </Wrapper>
        )
    }
}

export default Index