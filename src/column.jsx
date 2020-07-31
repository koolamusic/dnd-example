import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import Task from './task'


const Container = styled.div`
    margin: 8px;
    border: 1px solid #ddd;
    border-radius: 2px
`

const Title = styled.h3`
    padding: 8px;
`

const TaskList = styled.div`
    padding: 8px;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1) .2s;
    background-color: ${props => props.isDraggingOver ? 'lightblue' : 'white'}

`


export default class Column extends React.Component {
    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >

                            {this.props.tasks.map((task, index) =>
                                <Task key={task.id} index={index} task={task} />
                            )}
                            {provided.placeholder}
                        </TaskList>

                    )}

                </Droppable>
            </Container>
        )
    }
}