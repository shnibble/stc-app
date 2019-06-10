import React from 'react'
import styled from 'styled-components'
import ui from '../styles/global-style-variables'

const Button = styled.button`
    color: ${ui.globalStyles.offWhite};
    background: ${ui.globalStyles.orange};
    border: none;
    border-radius: 4px;
    width: 100%;
    padding: 10px;
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;
    transition: box-shadow .25s ease-out;
    
    &:focus {
        box-shadow: 0 0 5px 3px rgba(0,0,0,0.2);
        outline: none;
    }
    &:hover {
        box-shadow: 0 0 5px 3px rgba(0,0,0,0.4);
    }
`

const GetMealButton = ({ type }) => {
    return ( 
        <Button value='TEST'>GET MEAL</Button>
    ) 
}
export default GetMealButton