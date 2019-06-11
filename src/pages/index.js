import React from 'react'
// import { graphql } from 'gatsby'
import styled from 'styled-components'

import ui from '../styles/global-style-variables'
import '../styles/style.global.css'

import Header from '../components/header'
import GetMealButton from '../components/getMealButton'
import Footer from '../components/footer'
import CategoryFilter from '../components/categoryFilter'

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
class Index extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            screenStyle: 'mobile'
        }
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

    render() {
        const { screenStyle } = this.state
        return (
            <Wrapper>
                <Header screenStyle={this.state.screenStyle}/>
                <Main>                    
                    <div id="filters">
                        <CategoryFilter screenStyle={this.state.screenStyle}/>
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