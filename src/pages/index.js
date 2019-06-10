import React from 'react'
import styled from 'styled-components'

import ui from '../styles/global-style-variables'
import '../styles/style.global.css'

import Header from '../components/header'
import GetMealButton from '../components/getMealButton'
import Footer from '../components/footer'

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
    max-width: 900px;
`
const Filter = styled.div`
    & h2 {
        color: #0094FF;
    }
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
                        <Filter>
                            <h2>Categories</h2>
                            <p>What the dish is really focused on or primarily centered around.</p>
                        </Filter>
                        <Filter>
                            <h2>Origins</h2>
                            <p>From what part of the world the dish originated or became popular.</p>
                        </Filter>
                        <Filter>
                            <h2>Tags</h2>
                            <p>Further refine meals based on the following tags.</p>
                        </Filter>
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