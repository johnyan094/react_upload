import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./App.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { api_uploadFiles, api_uploadGetStatus } from "./apis/index";

function App() {
  const [taskId, setTaskId] = useState("");
  const [pollingStatus, setPollingStatus] = useState("");
  const [intervalStatus, setIntervalStatus] = useState<number>();
  const [open, setOpen] = useState(false);

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
      setOpen(true);
      const interval = setInterval(() => pollStatus(taskId), 2000);
      setIntervalStatus(interval);
    }

    if (pollingStatus == "done") {
      setOpen(false);
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
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default App;
