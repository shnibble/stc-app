import React from 'react'
import styled from 'styled-components'
import global from '../variables.global'

const Container = styled.footer`
    flex-shrink: 0;
    background: ${global.colors.blue};
    color: ${global.colors.offWhite};
    padding: 5px;
    text-align: center;

    & p span {
        margin: 0 10px;

        a {
            color: ${global.colors.offWhite};
            transition: color .25s ease-out;
        }
        a:focus {
            color: ${global.colors.lightOrange};
            outline: none;
        }
        a:hover {
            color: ${global.colors.orange};
        }
    }
`
const Footer = () => {
    return (
        <Container>
            <p>
                <span>SomethingToCook.com &copy;</span>
                | 
                <span>Explore the <a href='https://api.somethingtocook.com'>STC API</a></span>
                | 
                <span>View on <a href='https://github.com/shnibble/stc-app'>Github</a></span>
            </p>
        </Container>
    )
}

export default Footer