import React from 'react'
import styled from 'styled-components'
import ui from '../styles/global-style-variables'

const Button = styled.button`
    position: relative;
    background: none;
    border: none;
    text-decoration: underline;
    color: ${ui.globalStyles.offWhite};
    font-size: 24px;
    padding: 10px;
    cursor: pointer;
    transition: color .25s ease-out;

    &:focus {
        color: ${ui.globalStyles.lightOrange};
        outline: none;
    }
    &:hover {
        color: ${ui.globalStyles.orange};
    }
`
const Container = styled.div`
    display: none;
    position: absolute;
    width: 300px;
    height: 200px;
    top: 60px;
    right: 20px;
    padding: 10px;
    background-color: #f2f2f2;
    box-shadow: 2px 3px 4px 1px rgba(0,0,0,0.2);
    transition: height .25s, padding .25s, box-shadow .25s;
    opacity: 0;

    &.active {
        display: block;
        opacity: 1;
        animation-name: fadeInOpacity;
        animation-oteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: .25s;
    
        @keyframes fadeInOpacity {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    }

    & .carrot {
        position: absolute;
        top: -20px;
        right: 0px;
        width: 0; 
        height: 0; 
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;        
        border-bottom: 20px solid #f2f2f2;
    }

    & p {
        display: block;
        text-align: justify;
        height: 110px;
        font-size: 20px;
        color: #000;
    }
`
const Anchor = styled.a`
    display: inline-block;
    background: ${ui.globalStyles.orange};
    color: #000;
    padding: 10px;
    width: 135px;
    margin: 5px;
    border-radius: 4px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    box-sizing: border-box; 
    text-decoration: none;transition: box-shadow .25s ease-out;
    
    &:focus {
        box-shadow: 0 0 5px 3px rgba(0,0,0,0.2);
        outline: none;
    }
    &:hover {
        box-shadow: 0 0 5px 3px rgba(0,0,0,0.4);
    }
`

class AboutModule extends React.Component {
    constructor() {
        super()
        this.state = {
            active: false
        }
    }

    toggleContainer = () => {
        this.setState({ active: !this.state.active })
    }

    render() {
        return (
            <>
                <Button onClick={this.toggleContainer}>About
                    <Container className={(this.state.active)?'active':null}>
                        <div className='carrot'></div>
                        <p>A simple interface to help cooks find things to make using the STC API database.</p>                    
                        <Anchor href='https://github.com/shnibble/stc-api'>Explore the API</Anchor>
                        <Anchor href='https://github.com/shnibble/stc-app'>View on Github</Anchor>
                    </Container>
                </Button>
            </>
        )
    }
}

export default AboutModule