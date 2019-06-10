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
const Overlay = styled.div`
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.2);

    &.active {
        display: block;
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

    constructor(props) {
        super(props)
    }

    toggleContainer() {
        document.getElementById('tablet-about-container').classList.toggle('active')
    }

    render() {
        return (
            <>
                <Button onClick={this.toggleContainer}>About
                    <Container id='tablet-about-container'>
                        <div className='carrot'></div>
                        <p>A simple interface to help cooks find things to make using the STC API database.</p>                    
                        <Anchor href='https://github.com/shnibble/stc-api' target='_BLANK'>Explore the API</Anchor>
                        <Anchor href='https://github.com/shnibble/stc-app' target='_BLANK'>View on Github</Anchor>
                    </Container>
                </Button>
            </>
        )
    }
}

export default AboutModule