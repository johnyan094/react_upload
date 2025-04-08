const url = "https://localhost";

export const api_uploadFiles = async (files: any) => {
  try {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const bodyContent = JSON.stringify({
      files: files,
    });

    const response = await fetch(`${url}/files`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const api_uploadGetStatus = async (taskId: string) => {
  try {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const response = await fetch(`${url}/status/${taskId}`, {
      method: "GET",
      headers: headersList,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
