import React from 'react'
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
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
const TagDetailsSection = styled.div`
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
const TagFilterSection = styled.div`
    flex: 1;
    
    &.tablet {
        flex: 0 0 60%;
    }
    & > .tag-container {
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
const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 10px 0;

    &.tablet {
        margin: 0 0 10px 0;
    }
    
    & > input {
        min-width: 200px;
        max-width: 500px;
        flex-grow: 1;
        margin: 1px;
        height: 30px;
        padding: 10px;
        font-size: 16px;
        line-height: 30px;
        border: 2px solid ${global.colors.blue};
        background-color: #f2f2f2;
        text-align: center;

        &:hover, &:focus {
            outline: none;
        }
    }

    & > button {
        margin: 1px;
        background: ${global.colors.blue};
        height: 54px;
        width: 54px;
        border: none;
        font-size: 40px;
        line-height: 54px;
        cursor: pointer;
        transition: color .25s;

        &:hover, &:focus {
            color: #fff;
            outline: none;
        }
    }
`
const TagButton = styled.button`
    display: inline-block;
    position: relative;
    background-color: ${global.colors.lightBlue};
    color: #fff;
    padding: 10px 10px 7px 10px;
    max-height: 80px;
    max-width: 500px;
    font-weight: bold;
    font-size: 18px;
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all .25s ease;

    &.active {
        background-color: ${global.colors.orange};
    }
    &.active {
        background-color: ${global.colors.orange};
        color: #000;
    }
    &:focus {
        border-color: ${global.colors.lightOrange};
        outline: none;
    }
    &:hover {
        border-color: ${global.colors.orange};
        outline: none;
    }
    &.active:focus {
        border-color: ${global.colors.lightBlue};
        outline: none;
    }
    &.active:hover {
        border-color: ${global.colors.blue};
        outline: none;
    }

    &.tablet {
        font-size: 16px;
        border-radius: 4px;
        margin: 2px;
    } 
    &.desktop {
        font-size: 14px;
        border-radius: 4px;
        margin: 2px;
    }
    &.tag-enter {
        opacity: 0;
        max-width: 0;
        padding: 0;
    }
    &.tag-enter-active {
        opacity: 1;
        max-width: 500px;
        padding: 10px 10px 7px 10px;
    }
    &.tag-exit {
        opacity: 1;
        padding: 10px 10px 7px 10px;
    }
    &.tag-exit-active {
        opacity: 0;
        padding: 0;
        max-width: 0;
    }
`
class TagFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            screenStyle: this.props.screenStyle,
            allTags: this.props.allTags || [{id: 1, name: 'test1'}, {id: 2, name: 'test2'}],
            filter: this.props.filter,
            searchQuery: '',
            onClickFunction: this.props.onClickFunction
        }
    }

    updateSearchQuery = (ev) => {
        this.setState({ searchQuery: ev.target.value })
    }
    
    clearSearchQuery = () => {
        this.setState({ searchQuery: '' })
    }

    toggleFilteredTag = (ev) => {
        const name = ev.target.value
        const tempArray = this.state.filter.slice()
        const activeIndex = tempArray.indexOf(name)
        if (activeIndex !== -1) {
            tempArray.splice(activeIndex, 1)
        } else {
            tempArray.push(name)
        }
        this.setState({
            filter: tempArray
        })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            screenStyle: nextProps.screenStyle,
            filter: nextProps.filter,
            allTags: nextProps.allTags
        })
    }

    render = () => {
        const { screenStyle, filter, allTags, searchQuery, onClickFunction } = this.state
        return (
            <Container className={screenStyle}>
                <TagDetailsSection className={screenStyle}>
                    {(screenStyle === 'tablet')
                    ?<TransitionGroup className='tag-container'>
                        {filter.map((tag) => {
                            return (
                                <CSSTransition key={`active_${tag}`} timeout={250} classNames={`tag`}>
                                    <TagButton value={tag} onClick={onClickFunction} className={`${screenStyle} active`}>{tag}</TagButton>
                                </CSSTransition>
                            )
                        })}
                    </TransitionGroup>
                    :null}
                    <Title className={screenStyle}>Tags</Title>
                    <Description className={screenStyle}>Specify tags to search by.</Description>
                </TagDetailsSection>
                <TagFilterSection className={screenStyle}>
                    {(screenStyle !== 'tablet')
                    ?<TransitionGroup className='tag-container'>
                        {filter.map((tag) => {
                            return (
                                <CSSTransition key={`active_${tag}`} timeout={250} classNames={`tag`}>
                                    <TagButton value={tag} onClick={onClickFunction} className={`${screenStyle} active`}>{tag}</TagButton>
                                </CSSTransition>
                            )
                        })}
                    </TransitionGroup>
                    :null}
                    <InputContainer className={screenStyle}>
                        <input onChange={this.updateSearchQuery} value={searchQuery} placeholder={`Search for tags`} />
                        <button onClick={this.clearSearchQuery}>&times;</button>
                    </InputContainer>
                    <TransitionGroup className='tag-container'>
                        {allTags.map((tag) => {
                            if (tag.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                                return (
                                    <CSSTransition key={`all_${tag.id}`} timeout={250} classNames={`tag`}>
                                        <TagButton value={tag.name} onClick={onClickFunction} className={screenStyle}>{tag.name}</TagButton>
                                    </CSSTransition>
                                ) 
                            } else {
                                return false
                            }
                        })}
                    </TransitionGroup>
                </TagFilterSection>
            </Container>
        )
    }   
}

export default TagFilter