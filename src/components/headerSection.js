import React from 'react'
import styled from 'styled-components'

const HeaderSection = ({ flex, children }) => {    
    const Section = styled.div`
        flex: ${flex};
        padding: 5px 10px;
    `
    return(
        <Section>
            {children}
        </Section>
    )
}

export default HeaderSection