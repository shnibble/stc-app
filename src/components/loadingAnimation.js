import React from 'react'
import styled from 'styled-components'
import globals from '../variables.global'

const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255,255,255,0.95);
    z-index: 1;
`

const Loading = styled.div`
    position: relative;
    width: 60px;
    height: 60px;
    margin: auto;
    background-color: transparent;
    border-radius: 30px;
    box-shadow: 0 0 7px 6px rgba(255, 106, 0, 0.1);

    > div {
        position: absolute;
    }

    > div > div {
        position: absolute;
        top: 26px;
        right: -5px;
        width: 4px;
        height: 8px;
        border-radius: 2px;
        background-color: ${globals.colors.orange};
    }

    > div:nth-child(1) {
        top: 5px;
        right: 5px;
        bottom: 5px;
        left: 5px;
        text-align: center;
        line-height: 50px;
        font-size: 10px;
        color: #737373;
    }

    > div:not(:first-child) {
        top: 0;
        left: 0;
        width: 60px;
        height: 60px;
        border-radius: 30px;
        animation-name: rotate;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }

    > div:nth-child(3) {
        animation-delay: 0.25s;
    }

    > div:nth-child(4) {
        animation-delay: 0.5s;
    }

    > div:nth-child(5) {
        animation-delay: 0.75s;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

const LoadingAnimation = () => {
    return (
        <Container>
            <Loading>
                <div>Loading</div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
            </Loading>
        </Container>
    )
}

export default LoadingAnimation