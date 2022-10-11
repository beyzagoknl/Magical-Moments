import { useDispatch } from "react-redux";
import { deleteMemory } from "../features/memories/memorySlice";
import "../styles/MemoryItem.scss";
function MemoryItem({ memory }) {
  const dispatch = useDispatch();

  return (
    <div className="all-memory">
      <button
        className="close"
        onClick={() => dispatch(deleteMemory(memory._id))}
      >
        X
      </button>
      <div>{new Date(memory.createdAt).toLocaleString("en-US")}</div>
      <h2>{memory.text}</h2>
      <img className="memory-image" src={memory.image} alt=" "></img>
    </div>
  );
}

export default MemoryItem;
