import React from 'react'
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import global from '../variables.global'

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    border-bottom: 2px solid #f2f2f2;
`
    const InfoContainer = styled.div`
    
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
    const InputContainer = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: center;
        
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

    const ActiveTagsContainer = styled.div`
        margin: 5px 0;

        & > div > button {
            display: inline-block;
            max-width: 200px;
            position: relative;
            background-color: ${global.colors.orange};
            color: #fff;
            padding: 5px;
            margin: 2px;
            font-weight: bold;
            font-size: 14px;
            line-height: 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all .25s;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &.active-tag-enter {
                opacity: 0;
                max-width: 0;
                padding: 0;
            }
            &.active-tag-enter-active {
                opacity: 1;
                max-width: 200px;
                padding: 5px;
            }
            &.active-tag-exit {
                opacity: 0;
                max-width: 0;
                padding: 0;
            }

            &::after {
                content: 'x';
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                border-radius: 4px;
                background: rgba(0,0,0,0.6);
                font-size: 18px;
                line-height: 25px;
                color: #fff;
                opacity: 0;
                transition: opacity .25s ease;
            }
            &:focus {
                outline: none;
            }
            &:focus::after {
                opacity: 0.2;
            }
            &:hover::after {
                opacity: 1;
            }
        }
    `
    const TagsContainer = styled.div`
        margin: 5px 0;

        & > div > button {
            display: inline-block;
            max-width: 200px;
            position: relative;
            background-color: ${global.colors.lightBlue};
            color: #fff;
            padding: 5px;
            margin: 2px;
            font-weight: bold;
            font-size: 14px;
            line-height: 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all .25s;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &.tag-enter {
                opacity: 0;
                max-width: 0;
                padding: 0;
            }
            &.tag-enter-active {
                opacity: 1;
                max-width: 200px;
                padding: 5px;
            }
            &.tag-exit {
                opacity: 0;
                max-width: 0;
                padding: 0;
            }

            &::after {
                content: '+';
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                border-radius: 4px;
                background: rgba(0,0,0,0.6);
                font-size: 18px;
                line-height: 25px;
                color: #fff;
                opacity: 0;
                transition: opacity .25s ease;
            }
            &:focus {
                outline: none;
            }
            &:hover::after, &:focus::after {
                opacity: 1;
            }
        }
    `
class TagsLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            description: this.props.description,
            tags: this.props.tags,
            filter: this.props.filter,
            onClickFunction: this.props.onClickFunction,
            searchString: ''
        }
    } 
    
    componentWillReceiveProps = (nextProps) => {
        this.setState({
            tags: nextProps.tags,
            filter: nextProps.filter
        })
    }
    
    updateSearchString = (ev) => {
        this.setState({ searchString: ev.target.value })
    }

    clearSearchString = () => {
        this.setState({ searchString: '' })
    }

    render = () => {
        const { title, description, tags, filter, onClickFunction, searchString } = this.state
        const { updateSearchString, clearSearchString } = this
        return (
            <Layout>
                <InfoContainer>
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                </InfoContainer>

                <ActiveTagsContainer>
                    <TransitionGroup>
                        {filter.map((tag, index) => {
                            return (
                                <CSSTransition key={index}  timeout={250} classNames={`active-tag`}>
                                    <button value={tag} onClick={onClickFunction}>{tag}</button>
                                </CSSTransition>
                            )
                        })}
                    </TransitionGroup>                
                </ActiveTagsContainer>

                <InputContainer>
                    <input onChange={updateSearchString} value={searchString} placeholder={`Search for tags`} />
                    <button onClick={clearSearchString}>&times;</button>
                </InputContainer>

                <TagsContainer>
                    <TransitionGroup>
                        {tags.map((tag, index) => {
                            if (tag.name.toLowerCase().includes(searchString.toLowerCase()) && !filter.includes(tag.name)) {
                                return (
                                    <CSSTransition key={index}  timeout={250} classNames={`tag`}>
                                        <button value={tag.name} onClick={onClickFunction}>{tag.name}</button>
                                    </CSSTransition>
                                )
                            } else {
                                return false
                            }
                        })}
                    </TransitionGroup>
                </TagsContainer>

            </Layout>
        )
    }
}

export default TagsLayout