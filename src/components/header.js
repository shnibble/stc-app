import React from 'react'
import styled from 'styled-components'
import global from '../variables.global'
import logoImage from '../images/logo.png'
import HeaderSection from './headerSection'
import GetMealButton from './getMealButton'
import About from './about'
import Menu from './menu'

const Header = ({ screenStyle, getMealFunction }) => {
    const Container = styled.header`
        flex-shrink: 0;
        display: flex;
        background-color: ${global.colors.blue};
        color: ${global.colors.offWhite};
        min-height: 80px;
        text-align: center;
        align-items: center;
        `
    if (screenStyle === 'mobile') {
        const Title = styled.h1`
            text-align: center;
            font-size: 24px;
            padding: 5px;
        `
        return (
            <Container>
                <HeaderSection flex='0 1 50px'>
                    <Menu />
                </HeaderSection>
                <HeaderSection flex='1 1 auto'>
                    <Title>Something to Cook</Title>
                    <GetMealButton getMealFunction={getMealFunction} />
                </HeaderSection>
            </Container>
        )
    } else if (screenStyle === 'tablet') { 
        const Logo = styled.img`
            display: block;
            width: 50px;
            height: 50px;
        `
        const Title = styled.h1`
            text-align: left;
            margin: 5px;
        `
        const Subtitle = styled.p`
            text-align: left;
            font-style: italic;
        `
        return (
            <Container>
                <HeaderSection flex='0 0 50px'>
                    <Logo src={logoImage} />
                </HeaderSection>
                <HeaderSection flex='1 1 auto'>
                    <Title>Something to Cook</Title>
                    <Subtitle>Pick some options below and let's help you decide on something to cook.</Subtitle>
                </HeaderSection>
                <HeaderSection flex='1 0 80px'>
                    <About />
                </HeaderSection>
                <HeaderSection flex='0 0 140px'>
                <GetMealButton getMealFunction={getMealFunction} />
                </HeaderSection>
            </Container>
        )
    } else {
        const Title = styled.h1`
            text-align: center;
        `
        const Subtitle = styled.p`
            text-align: center;
            font-style: italic;
        `
        return (
            <Container>
                <HeaderSection flex='1 1 auto'>
                    <Title>Something to Cook</Title>
                    <Subtitle>Pick some options below and let's help you decide on something to cook.</Subtitle>
                </HeaderSection>
            </Container>
        )
    }
}

export default Header