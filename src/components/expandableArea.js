import React from 'react'
import styled from 'styled-components'

class ExpandableArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            needed: false,
            active: false,
            collapsedHeight: this.props.collapsedHeight
        }
        this.checked = false
        this.expandFunction = this.props.expandFunction
        this.collapseFunction = this.props.collapseFunction
        this.windowResizeCollapseTimeout = false
        this.windowResizeTimeout = false
    }

    windowListener = () => {
        clearTimeout(this.windowResizeCollapseTimeout)
        this.windowResizeCollapseTimeout = setTimeout(() => { this.setState({ active: false}) }, 250)

        clearTimeout(this.windowResizeTimeout)
        this.windowResizeTimeout = setTimeout(this.calculateHeightDifference, 250)
    }

    calculateHeightDifference = () => {
        const container = document.getElementById('result-expandable-container')
        const content = document.getElementById('result-expandable-content')
        const containerHeight = container.offsetHeight
        const contentHeight = content.offsetHeight

        if (contentHeight > containerHeight) {
            this.setState({ needed: true })
            this.checked = true
            this.collapseFunction()
        } else {
            this.setState({ needed: false })
            this.checked = true
        }
    }

    expand = () => {
        const contentHeight = document.getElementById('result-expandable-content').offsetHeight 
        this.expandFunction(contentHeight+30)
        this.setState({ active: true })
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.windowListener)
        this.calculateHeightDifference()
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.windowListener)
        clearTimeout(this.windowResizeTimeout)
    }

    componentWillReceiveProps = async () => {
        await this.setState({ 
            needed: false, 
            active: false,
            collapsedHeight: this.props.collapsedHeight
        })
        this.calculateHeightDifference()
    }

    componentDidUpdate = () => {
        if (!this.checked) {
            this.calculateHeightDifference()
        } else {
            this.checked = false
        }
    }

    render = () => {
        const { collapsedHeight, active } = this.state
        const { children } = this.props
        let Container
        if (active) {
            Container = styled.div`
                position: relative;
            `
        } else {
            Container = styled.div`
                position: relative;
                height: ${collapsedHeight}px;
                overflow: hidden;
            `
        }
        
        const Tab = styled.div`
            position: absolute;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            right: 0;
            bottom: 0;
            left: 0;
            height: 50px;
            background: linear-gradient(transparent, #fff, #fff);

            & span {
                font-weight: bold;
                color: #808080;
                cursor: pointer;
                transition: color .25s;

                &:hover, &:focus {
                    color: #f88000;
                    outline: none;
                }
            }
        `
        const Content = styled.div``

        return (
            <Container id='result-expandable-container'>
                <Content id='result-expandable-content'>
                    {children}
                </Content>
                {(this.state.needed && !active)?<Tab><span tabIndex='0' onClick={this.expand}>View More</span></Tab>:null}
            </Container>
        )
    }
}

export default ExpandableArea