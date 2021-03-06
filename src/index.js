/**=============== EGGHEAD TUTORIAL ===============
 * https://egghead.io/lessons/react-conditionally-allow-movement-using-react-beautiful-dnd-draggable-and-droppable-props
 * Performance :: https://egghead.io/lessons/react-optimize-performance-in-react-beautiful-dnd-with-shouldcomponentupdate-and-purecomponent
 *=================================*/

import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { initialData } from './initial-data'
import Column from './column'
import './index.css'


const Container = styled.div`
    /* border: 1px solid lightgray; */
    /* border-radius: 2px; */
    padding: 8px;
    display: flex;
    margin-bottom: 8px;
    /* background-color: ${props => props.isDragging ? 'lightgreen' : 'white'} */
`


class App extends React.Component {
  state = initialData;

  onDragEnd = result => {
    console.log(result)
    const { destination, source, draggableId } = result;

    // check if user dumped outside dragContext
    if (!destination) {
      return
    }

    // also check if the user dumped the item at the index where they got it from 
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }


    // create variables start and finish column that we can reference in the state
    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    // We check a condition where the start and finish are the same, then we take no new action and manager order within that column
    if (start === finish) {

      //declare column from state based on droppableId
      const column = this.state.columns[source.droppableId]

      // create new TasksId Array based on states column
      const newTaskIds = Array.from(column.taskIds)

      // remove our source index and insert our new destination 
      // index using array splice append the new id in second statement
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)
      console.log("NEW TASK IDS", newTaskIds)

      // declare a new column based on the new column array and mutate our new taskIds. object spread
      const newColumn = {
        ...column,
        taskIds: newTaskIds
      }

      // crete a new state based on newly derived results
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }
      // call react setState with newState Object
      this.setState(newState)
    }

    if (start !== finish) {


      // We now need to handle the case where the start and finish column contains the different properties

      const newStartArray = Array.from(start.taskIds)
      newStartArray.splice(source.index, 1)


      // declare newStartColumn
      const newStartColumn = {
        ...start,
        taskIds: newStartArray
      }


      const newFinishArray = Array.from(finish.taskIds)
      newFinishArray.splice(destination.index, 0, draggableId)


      // declare newFinishColumn
      const newFinishColumn = {
        ...finish,
        taskIds: newFinishArray
      }

      const finishState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [start.id]: newStartColumn,
          [finish.id]: newFinishColumn
        }
      }
      console.log("THIS IS THE IFNI", finishState)

      // Update state with newStart and finish Column
      this.setState(finishState)
    }




  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>

          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

            return <Column key={column.id} column={column} tasks={tasks} />
          })}
        </Container>
      </DragDropContext>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
