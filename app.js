function getBase() {
  const id = document.getElementById("idInstance").value;
  const token = document.getElementById("apiToken").value;
  return `https://api.green-api.com/waInstance${id}`;
}

function output(data) {
  document.getElementById("response").value =
    JSON.stringify(data, null, 2);
}

async function callApi(url, options = {}) {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    output(data);
  } catch (e) {
    output({ error: e.message });
  }
}

function getSettings() {
  const token = apiToken.value;
  callApi(`${getBase()}/getSettings/${token}`);
}

function getState() {
  const token = apiToken.value;
  callApi(`${getBase()}/getStateInstance/${token}`);
}

function sendMessage() {
  const token = apiToken.value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  callApi(`${getBase()}/sendMessage/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chatId: phone + "@c.us",
      message
    })
  });
}

function sendFile() {
  const token = apiToken.value;
  const phone = document.getElementById("filePhone").value;
  const url = document.getElementById("fileUrl").value;

  callApi(`${getBase()}/sendFileByUrl/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chatId: phone + "@c.us",
      urlFile: url,
      fileName: "file"
    })
  });
}