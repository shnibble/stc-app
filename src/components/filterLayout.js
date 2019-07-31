import React from 'react'
import styled from 'styled-components'
import global from '../variables.global'

const FilterLayout = ({screenStyle, title, description, children}) => {    
    if (screenStyle === 'desktop') {
        const Layout = styled.div`
            margin: 10px auto;
            padding: 15px;
            border-bottom: 2px solid #f2f2f2;
        `
        const Title = styled.h2`
            text-align: center;
            color: ${global.colors.blue};
            padding: 2px;
            font-size: 24px;
        `
        const Description = styled.p`
            text-align: center;
            color: #000;
            padding: 2px;
            font-size: 16px;
        `
        const Container = styled.div`
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
            grid-gap: 5px;
            grid-auto-rows: 1fr;
            
            & button {
                background-color: #ccc;
                color: #999;
                padding: 15px 15px 13px 15px;
                border: none;
                border-bottom: 3px solid transparent;
                font-weight: bold;
                font-size: 12px;
                height: 50px;
                cursor: pointer;
                overflow: hidden;
                text-overflow: ellipsis;
                transition: background-color .25s, color .25s, border-color .25s;
                
                &.active {
                    background-color: ${global.colors.orange};
                    color: #000;
                }
                &:focus {
                    border-color: ${global.colors.lightBlue};
                    outline: none;
                }
                &:hover {
                    border-color: ${global.colors.blue};
                    outline: none;
                }
            }
        `
        return (
            <Layout>
                <Title>{title}</Title>
                <Description>{description}</Description>
                <Container>
                    {children}
                </Container>
            </Layout>
        )

    } else if (screenStyle === 'tablet') {

        const Layout = styled.div`
            margin: 10px auto;
            padding: 15px;
            display: flex;
            flex-direction: row;
            border-bottom: 2px solid #f2f2f2;
        `
        const Title = styled.h2`
            text-align: left;
            color: ${global.colors.blue};
            padding: 5px;
            font-size: 34px;
        `
        const Description = styled.p`
            text-align: left;
            color: #000;
            padding: 5px;
            font-size: 24px;
        `
        const InfoContainer = styled.div`
            flex: 0 0 40%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        `
        const ButtonsContainer = styled.div`
            flex: 0 0 60%;         
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(115px, 1fr));
            grid-gap: 5px;
            grid-auto-rows: 1fr;
            
            & button {
                background-color: #ccc;
                color: #999;
                padding: 15px 15px 13px 15px;
                border: none;
                border-bottom: 3px solid transparent;
                font-weight: bold;
                font-size: 18px;
                height: 120px;
                cursor: pointer;
                overflow: hidden;
                text-overflow: ellipsis;
                transition: background-color .25s, color .25s, border-color .25s;
                
                &.active {
                    background-color: ${global.colors.orange};
                    color: #000;
                }
                &:focus {
                    border-color: ${global.colors.lightBlue};
                    outline: none;
                }
                &:hover {
                    border-color: ${global.colors.blue};
                    outline: none;
                }
            }
        `
        return (
            <Layout>
                <InfoContainer>
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                </InfoContainer>                
                <ButtonsContainer>
                    {children}
                </ButtonsContainer>
            </Layout>
        )

    } else {

        const Layout = styled.div`
            margin: 10px auto;
            padding: 5px;          
            border-bottom: 2px solid #f2f2f2;  
        `
        const Title = styled.h2`
            text-align: center;
            color: ${global.colors.blue};
            padding: 5px;
            font-size: 38px;
        `
        const Container = styled.div`
            width: 100%;
            display: grid;
            grid-template-columns: 50% 50%;
            grid-gap: 2px;
            
            & button {
                background-color: #ccc;
                color: #999;
                padding: 15px 15px 13px 15px;
                border: none;
                border-bottom: 3px solid transparent;
                font-weight: bold;
                font-size: 18px;
                overflow: hidden;
                text-overflow: ellipsis;
                cursor: pointer;
                transition: background-color .25s, color .25s, border-color .25s;
                
                &.active {
                    background-color: ${global.colors.orange};
                    color: #000;
                }
                &:focus {
                    border-color: ${global.colors.lightBlue};
                    outline: none;
                }
                &:hover {
                    border-color: ${global.colors.blue};
                    outline: none;
                }
            }
        `
        return (
            <Layout>
                <Title>{title}</Title>
                <Container>
                    {children}
                </Container>
            </Layout>
        )
    }
}

export default FilterLayout