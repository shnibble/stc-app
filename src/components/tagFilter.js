import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import TagsLayout from './tagsLayout'

class TagFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            screenStyle: this.props.screenStyle,
            filter: this.props.filter,
            onClickFunction:this.props.onClickFunction
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            screenStyle: nextProps.screenStyle,
            filter: nextProps.filter,
        })
    }

    render = () => {
        const { screenStyle, filter, onClickFunction } = this.state

        return (
            <StaticQuery
                query={graphql`
                query {
                    allTags {
                        nodes {
                            alternative_id
                            name
                        }
                    }
                }
                `}
                render={data => (
                    <TagsLayout 
                        screenStyle={screenStyle} 
                        title={`Tags`} 
                        description={`Find meals with these tags:`}
                        filter={filter}
                        tags={data.allTags.nodes}
                        onClickFunction={onClickFunction}
                    />
                )}
                
            />
        )
    }   
}

export default TagFilter