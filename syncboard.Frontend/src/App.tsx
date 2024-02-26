import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const cards = [
  {
    id: "card-1",
    content: "Take out the trash",
  },
  { id: "card-2", content: "Watch my favorite show" },
  { id: "card-3", content: "Charge my phone" },
  { id: "card-4", content: "Cook dinner" },
];
const cards2 = [
  {
    id: "card-2-1",
    content: "Buy fruits",
  },
  { id: "card-2-2", content: "Do dishes" },
];

export default function App() {
  const onDragEnd = () => {
    console.log("drag drop event occured");
  };
  return (
    <>
      <h1 className="text-5xl font-semibold text-center mt-8 mb-14">
        SyncBoard
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-center items-start gap-10">
          <Droppable droppableId="column-1">
            {(provided, snapshot) => (
              <div
                className="w-64 p-2 rounded-lg shadow-lg border-none"
                ref={provided.innerRef}
                style={{
                  backgroundColor: snapshot.isDraggingOver
                    ? "pink"
                    : "cornflowerblue",
                }}
                {...provided.droppableProps}
              >
                <h2 className="text-2xl font-semibold mb-5">To do</h2>
                <CardList />
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="column-2">
            {(provided, snapshot) => (
              <div
                className="w-64 p-2 rounded-lg shadow-lg border-none"
                ref={provided.innerRef}
                style={{
                  backgroundColor: snapshot.isDraggingOver
                    ? "pink"
                    : "cornflowerblue",
                }}
                {...provided.droppableProps}
              >
                <h2 className="text-2xl font-semibold mb-5">In Progress</h2>
                <CardList2 />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
}

function CardList() {
  return cards.map((card, index) => (
    <Card key={card.id} card={card} index={index} />
  ));
}
function CardList2() {
  return cards2.map((card, index) => (
    <Card key={card.id} card={card} index={index} />
  ));
}

function Card({
  card,
  index,
}: {
  card: { id: string; content: string };
  index: number;
}) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className="w-full border-none rounded-lg mb-2 break-words bg-slate-50 p-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.content}
        </div>
      )}
    </Draggable>
  );
}
