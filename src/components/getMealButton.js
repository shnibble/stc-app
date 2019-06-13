import React from 'react'
import styled from 'styled-components'
import global from '../variables.global'

const Button = styled.button`
    color: ${global.colors.offWhite};
    background: ${global.colors.orange};
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
const GetMealButton = ({getMealFunction}) => {    
    return ( 
        <Button value='Get Meal' onClick={getMealFunction}>GET MEAL</Button>
    )
}

export default GetMealButton