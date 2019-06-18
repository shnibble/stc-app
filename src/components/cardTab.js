import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: inline-block;
    position: relative;
    min-width: 50px;
    margin: 15px 2px 2px 2px;

    & ul li {
        display: inline-block;
        padding: 4px;
        margin: 1px;
        border-radius: 3px;
        font-size: 12px;
        line-height: 12px;
        color: #a6a6a6;
        background: #f2f2f2;
    }
`
const TabTitle = styled.div`
    position: absolute;
    left: 2px;
    top: -10px;
    height: 10px;
    font-size: 10px;
    line-height: 10px;
    color: #ccc;
    font-style: italic;
`

const CardTab = ({ title = "Tab Title", items = ['Item A', 'Item B'] }) => {
    if (items.length > 0) {
        const lis = items.map((item, index) => <li key={index}>{item}</li> )
        return (
            <Container>
                <TabTitle>{title}</TabTitle>
                <ul>
                    {lis}
                </ul>
            </Container>
        )
    } else {
        return null
    }
}

export default CardTab