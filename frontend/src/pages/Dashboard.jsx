import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MemoryForm from "../components/MemoryForm";
import MemoryItem from "../components/MemoryItem";
import Spinner from "../components/Spinner";
import { getMemories, reset } from "../features/memories/memorySlice";
import "../styles/Dashboard.scss";
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { memories, isLoading, isError, message } = useSelector(
    (state) => state.memories
  );

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (!user) {
      navigate("/login");
      return;
    }

    dispatch(getMemories());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Your Magical Moments!</p>
      </section>

      <MemoryForm />

      <section className="content">
        {memories.length > 0 ? (
          <div className="memories">
            {memories.map((memory) => (
              <MemoryItem key={memory._id} memory={memory} />
            ))}
          </div>
        ) : (
          <h3>You have not set any memories</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
