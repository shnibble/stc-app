import React from 'react'
import styled from 'styled-components'
import ui from '../styles/global-style-variables'

const Container = styled.footer`
    flex-shrink: 0;
    background: ${ui.globalStyles.blue};
    color: ${ui.globalStyles.offWhite};
    padding: 5px;
    text-align: center;

    & p span {
        margin: 0 10px;

        a {
            color: ${ui.globalStyles.offWhite};
            transition: color .25s ease-out;
        }
        a:focus {
            color: ${ui.globalStyles.lightOrange};
            outline: none;
        }
        a:hover {
            color: ${ui.globalStyles.orange};
        }
    }
`

const Footer = () => {
    return (
        <Container>
            <p>
                <span>SomethingToCook.com &copy;</span>
                | 
                <span>Explore the <a href='https://github.com/shnibble/stc-api' target='_BLANK'>STC API</a></span>
                | 
                <span>View on <a href='https://github.com/shnibble/stc-app' target='_BLANK'>Github</a></span>
            </p>
        </Container>
    )
}

export default Footer