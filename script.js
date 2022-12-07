const pad = document.getElementById("pad");
pad.placeholder = `Quantum computing is a type of computation whose operations can
harness the phenomena of quantum mechanics, such as superposition,
interference, and entanglement. Devices that perform quantum
computations are known as quantum computers.[1][2] Though current
quantum computers are too small to outperform usual (classical)
computers for practical applications, larger realizations are
believed to be capable of solving certain computational problems,
such as integer factorization (which underlies RSA encryption),
substantially faster than classical computers. The study of quantum
computing is a subfield of quantum information science.`;

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
    if(e.ctrlKey && e.key === "q"){
        saveTextAsFile();
    }
};


