import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    border: 1px solid lightgray;
    border-radius: 2px;
    padding: 8px;
    display: block;
    margin-bottom: 10px;
`

export default class Task extends React.Component {
    render() {
        return (
            <Container>{this.props.task.content}</Container>
        )
    }
}

