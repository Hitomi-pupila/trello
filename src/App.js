import { DndContext } from '@dnd-kit/core';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';

function App() {
  return (
    <div>
      <DndContext>
        <Droppable id="droppable">
          <Draggable id="draggable">
            Go ahead, drag me.
          </Draggable>
        </Droppable>
      </DndContext>
    </div>
  );
}

export default App;
