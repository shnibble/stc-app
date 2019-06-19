import React from 'react'
import styled from 'styled-components'
import global from '../variables.global'

const Button = styled.button`
    flex-basis: 50px;
    margin: 15px 5px;
    height: 50px;
    width: 50px;
    background: none;
    border: none;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    & > div {
        position: absolute;
        width: 50px;
        height: 10px;
        background-color: ${global.colors.offWhite};
        transition: right .25s ease-in-out;
    }
    & > div:nth-child(1) {
        top: 0;
        right: 0;
    }
    & > div:nth-child(2) {
        top: 20px;
        right: -9px;
    }
    & > div:nth-child(3) {
        top 40px;
        right: -18px;
    }

    &:hover > div {
        right: 0;
    }
`
const Container = styled.div`
    position: fixed;
    top: 0;
    left: -100%;
    height: 100%;
    width: 100%;
    box-sizing: border-box; 
    border: 2px solid ${global.colors.blue};
    background-color: rgba(255,255,255,0.95);
    transition: left .25s ease-out;
    z-index: 2;

    &.active {
        left: 0;
    }

    & div {
        position: relative;
        background-color: ${global.colors.blue};
        height: 80px;
        padding: 7px;

        h2 {
            font-size: 48px;
            line-height: 80px;
        }

        button {
            position: absolute;
            top: 20px;
            right: 15px;
            width: 50px;
            height: 50px;
            color: ${global.colors.offWhite};
            background: none;
            border: none;
            cursor: pointer;

            & > div {
                position: absolute;
                width: 50px;
                height: 10px;
                background-color: ${global.colors.offWhite};
                transition: right .25s ease-in-out, transform .25s ease-in-out, opacity .1s;
                padding: 0;
            }
            & > div:nth-child(1) {
                top: 20px;
                right 0;
                transform: rotate(45deg);
            }
            & > div:nth-child(2) {
                top: 20px;
                right 0;
                transform: rotate(-45deg);
            }
            & > div:nth-child(3) {
                background: none;
                width: 0; 
                height: 0;
                top: 11px;
                right: 4px;
                border-top: 14px solid transparent;
                border-bottom: 14px solid transparent;                 
                border-right: 14px solid ${global.colors.offWhite};
                opacity: 0;
            }
            &:hover > div:nth-child(1) {
                transform: rotate(90deg);
            }
            &:hover > div:nth-child(2) {
                transform: rotate(-90deg);
                right: -10px;
            }
            &:hover > div:nth-child(3) {
                opacity: 1;
                right: 32px;
            }
        }
    }
    & p {        
        color: #000;
        font-size: 24px;
        padding: 10px;
    }
`
const Anchor = styled.a`
    display: block;
    background: ${global.colors.orange};
    color: #000;
    padding: 10px;
    margin: 10px;
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

class MenuModule extends React.Component {
    constructor() {
        super()
        this.state = {
            active: false
        }
    }

    toggleMenu = () => {
        this.setState({ active: !this.state.active })
    }

    render() {
        return (
            <>
                <Button onClick={this.toggleMenu}>
                    <div/>
                    <div/>
                    <div/>
                </Button>

                <Container className={(this.state.active)?'active':null}>
                    <div>
                        <h2>About</h2>
                        <button onClick={this.toggleMenu}>
                            <div/>
                            <div/>
                            <div/>
                        </button>
                    </div>
                    <p>A simple interface to help cooks find things to make using the STC API database.</p>
                    <Anchor href='https://github.com/shnibble/stc-api' target='_BLANK'>Explore the API</Anchor>
                    <Anchor href='https://github.com/shnibble/stc-app' target='_BLANK'>View on Github</Anchor>
                </Container>
            </>
        )
    }
}

export default MenuModule