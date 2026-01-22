/* Enhanced notepad script:
 - Save button + filename input
 - Ctrl+S support (and Ctrl+D still supported but default prevented)
 - Autosave to localStorage
 - Warn on unsaved changes
*/
const pad = document.getElementById("pad");
const saveBtn = document.getElementById("saveBtn");
const filenameInput = document.getElementById("filename");
const STORAGE_KEY = "levelup_notepad_draft_v1";

pad.placeholder = "Start your typing here...";

let isDirty = false;
let autosaveTimer = null;

// Load draft if present
const saved = localStorage.getItem(STORAGE_KEY);
if (saved !== null) {
  pad.value = saved;
  isDirty = false;
}

// Save as file
function saveTextAsFile(fileName) {
  const textToWrite = pad.value;
  const blob = new Blob([textToWrite], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = fileName || "file.txt";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  // cleanup
  setTimeout(() => {
    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(url);
  }, 100);

  // mark as saved
  isDirty = false;
  localStorage.removeItem(STORAGE_KEY);
}

// Save handler (button or keyboard)
function handleSave() {
  const name = (filenameInput.value || "file.txt").trim() || "file.txt";
  saveTextAsFile(name);
}

saveBtn.addEventListener("click", handleSave);

// Autosave to localStorage (debounced)
pad.addEventListener("input", () => {
  isDirty = true;
  if (autosaveTimer) clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, pad.value);
    } catch (e) {
      // ignore quota errors
    }
  }, 800);
});

// Warn on unload if unsaved
window.addEventListener("beforeunload", (e) => {
  if (isDirty) {
    const msg = "You have unsaved changes.";
    e.returnValue = msg; // for some browsers
    return msg;
  }
  return undefined;
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + S
  if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
    e.preventDefault();
    handleSave();
  }

  // Ctrl + D (keep for legacy, but prevent browser bookmark)
  if (e.ctrlKey && (e.key === "d" || e.key === "D")) {
    e.preventDefault();
    handleSave();
  }
});
