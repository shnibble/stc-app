import React from 'react'
import styled from 'styled-components'
import global from '../variables.global'

const Container= styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid #f2f2f2;
    margin: 10px auto;
    padding: 5px;

    &.tablet {
        flex-direction: row;
        padding: 15px;
    }
    &.desktop {
        padding: 15px;
    }
`
const DetailsContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &.tablet {
        flex: 0 0 40%;
    }
    & > .tag-container {
        flex: 1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 2px;
    }
    &.desktop > .tag-container, &.tablet > .tag-container {
        display: block;
    }
`
const Title = styled.h2`
    color: ${global.colors.blue};
    padding: 5px;
    font-size: 38px;

    &.tablet {
        text-align: left;
        font-size: 34px;
    }
    &.desktop {
        padding: 2px;
        font-size: 24px;
    }
`
const Description = styled.p`
    display: none;
    color: #000;
    padding: 2px;
    font-size: 16px;

    &.tablet {
        display: block;
        text-align: left;
        padding: 5px;
        font-size: 24px;
    }
    &.desktop {
        display: block;
    }
`
const RadioContainer = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5px;
        
    &.tablet {
        flex: 0 0 60%;
    }
    &.tablet {
        grid-template-columns: repeat( auto-fit, minmax(120px, 1fr) );

        & > label {
            height: 89px;
        }
    }
    &.desktop {
        grid-template-columns: repeat( auto-fit, minmax(60px, 1fr) );
    }
`
const Label = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 15px 13px 15px;
    border-bottom: 3px solid transparent;
    font-weight: bold;
    font-size: 18px;
    overflow: hidden;    
    background-color: #ccc;
    color: #999;
    cursor: pointer;
    transition: background .25s ease;

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
`
const Radio = styled.input`
    display: none;
`
const Span = styled.span`
    font-weight: bold;
    text-overflow: ellipsis;
`

const TimeFilter = ({ screenStyle, allTimes, filter, onClickFunction }) => {
    const parsedFilter = Number(filter)

    return (
            <Container className={screenStyle}>
                <DetailsContainer className={screenStyle}>
                    <Title className={screenStyle}>Preparation Time</Title>
                    <Description className={screenStyle}>Approximately how long the meal takes to prepare.</Description>
                </DetailsContainer>
                <RadioContainer className={screenStyle}>
                    <Label className={(parsedFilter === 0)?'active':null}>
                        <Radio type="radio" name="time" value={0} checked={parsedFilter === 0} onChange={onClickFunction} />
                        <Span>Any</Span>
                    </Label>
                    {allTimes.map(time => (
                        <Label key={`time_radio_label_${time.id}`} className={(time.id === parsedFilter)?'active':null}>
                            <Radio key={`time_radio_${time.id}`} type="radio" name="time" value={time.id} checked={time.id === parsedFilter} onChange={onClickFunction} />
                            <Span>{time.value}</Span>
                        </Label>
                    ))}
                </RadioContainer>
            </Container>
    )
} 

export default TimeFilter