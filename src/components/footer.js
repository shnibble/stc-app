import React from 'react'
import styled from 'styled-components'

const Container = styled.footer`
    flex-shrink: 0;
    background: #0094FF;
    color: #F2F2F2;
    padding: 5px;
    text-align: center;
`

const Footer = () => {
    return (
        <Container>
            <span>SomethingToCook.com &copy;</span>
            |
            <span>Explore the <a href="https://google.com">STC API</a></span>
            |
            <span>View on <a href="https://google.com">Github</a></span>
        </Container>
    )
}

export default Footer