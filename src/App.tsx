import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./App.css";
import { api_uploadFiles, api_uploadGetStatus } from "./apis/index";

function App() {
  const [taskId, setTaskId] = useState("");
  const [pollingStatus, setPollingStatus] = useState("");
  const [intervalStatus, setIntervalStatus] = useState<number>();

  const upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    const { task_id } = await api_uploadFiles(files);
    console.log("task_id", task_id);

    setTaskId(task_id);
    setPollingStatus("start");
  };

  const pollStatus = async (taskId: string) => {
    const { isSuccess } = await api_uploadGetStatus(taskId);
    console.log("isSuccess", isSuccess);

    if (isSuccess) {
      setTaskId("");
      setPollingStatus("done");
    }
  };

  useEffect(() => {
    if (taskId) {
      const interval = setInterval(() => pollStatus(taskId), 2000);
      setIntervalStatus(interval);
    }

    if (pollingStatus == "done") {
      clearInterval(intervalStatus);
    }

    return () => clearInterval(intervalStatus);
  }, [taskId]);

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
