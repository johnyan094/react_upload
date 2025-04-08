import { useState } from "react";
import Button from "@mui/material/Button";
import "./App.css";
import { api_uploadFiles } from "./apis/index";

function App() {
  const [count, setCount] = useState(0);

  const upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    var files = event.target.files;

    var result = await api_uploadFiles(files);
    console.log("result", result);
  };

  return (
    <>
      <h1>React Upload</h1>
      <div className="card">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
        >
          Upload files
          <input hidden={true} type="file" onChange={upload} multiple />
        </Button>
      </div>
    </>
  );
}

export default App;
