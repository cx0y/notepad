const pad = document.getElementById("pad");
pad.placeholder = `Quantum computing is a type of computation whose operations can ....`;


const saveTextAsFile = () => {
  const textToWrite = document.getElementById("pad").value;
  const textFileAsBlob = new Blob([textToWrite], { type: "text/plain" });
  const fileNameToSaveAs = "file.txt"; //filename.extension
  const downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null) {
    // Chrome
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  } else {
    //Firefox
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }
  downloadLink.click();
};

document.onkeydown = (e) => {
  if (e.ctrlKey && e.key === "q") {
    saveTextAsFile();
  }
};
