import { useState } from "react";
import { useDispatch } from "react-redux";
import { createMemory } from "../features/memories/memorySlice";
import axios from "axios";

function MemoryForm() {
  const [text, setText] = useState("");
  const [userFile, setUserFile] = useState({
    file: [],
    filePreview: null,
  });

  const handleImageLoading = (e) => {
    const binaryData = [];
    binaryData.push(e.target.files[0]);

    setUserFile({
      ...userFile,
      file: e.target.files[0],
      filePreview: URL.createObjectURL(new Blob(binaryData)),
    });
  };

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", userFile.file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dpsw4eoiu/image/upload",
        data
      );

      const { url } = uploadRes.data;
      dispatch(
        createMemory({
          memoryData: {
            text,
            image: url,
          },
        })
      );
    } catch (err) {
      throw new Error();
    }
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Memory</label>
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
          />
          <label htmlFor="file">Image</label>
          <input type="file" name="file" onChange={handleImageLoading} />
          {userFile.filePreview !== null ? (
            <img className="image-preview" src={userFile.filePreview} alt="" />
          ) : null}
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Memory
          </button>
        </div>
      </form>
    </section>
  );
}

export default MemoryForm;
