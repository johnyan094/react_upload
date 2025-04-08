import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./App.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { api_uploadFiles, api_uploadGetStatus } from "./apis/index";

function App() {
  const [taskId, setTaskId] = useState("");
  const [pollingStatus, setPollingStatus] = useState("");
  const [intervalStatus, setIntervalStatus] = useState<number>();
  const [open, setOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);

    if (file!.size > 20000000) {
      setToastOpen(true);
      setToastMessage("file must less than 2MB");
      return;
    }

    const { task_id } = await api_uploadFiles(file);
    console.log("task_id", task_id);

    setTaskId(task_id);
    setPollingStatus("start");
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const handleCancelPolling = () => {
    setPollingStatus("done");
    setToastOpen(true)
    setToastMessage("Polling has been canceled");
  };

  const pollStatus = async (taskId: string) => {
    const { isSuccess } = await api_uploadGetStatus(taskId);
    console.log("isSuccess", isSuccess);

    if (isSuccess) {
      setTaskId("");
      setPollingStatus("done");
      setToastOpen(true);
      setToastMessage("Success");
    }
  };

  useEffect(() => {
    if (taskId && pollingStatus == "start") {
      setOpen(true);
      const interval = setInterval(() => pollStatus(taskId), 2000);
      setIntervalStatus(interval);
    }

    if (pollingStatus == "done") {
      setOpen(false);
      clearInterval(intervalStatus);
    }

    return () => clearInterval(intervalStatus);
  }, [taskId, pollingStatus]);

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
          <input
            hidden={true}
            type="file"
            onChange={upload}
            accept="image/jpeg, image/png, application/pdf"
          />
        </Button>
      </div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleCancelPolling}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={handleToastClose}
        message={toastMessage}
      />
    </>
  );
}

export default App;
