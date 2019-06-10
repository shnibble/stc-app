import React from 'react'
import styled from 'styled-components'
import ui from '../styles/global-style-variables'

const Button = styled.button`
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

const AboutModule = () => {
    return (
        <Button>About</Button>
    )
}

export default AboutModule