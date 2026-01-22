# Notepad

Simple in-browser notepad to type and save text files.

Usage:
- Type in the textarea.
- Use the filename box (optional).
- Click "Save" or press Ctrl+S (Cmd+S on macOS) to download a .txt file.
- You can still use Ctrl+D — the app will intercept that to save, but browsers normally use Ctrl+D for bookmarks, so Ctrl+S is recommended.

Notes:
- The app autosaves a draft to localStorage while you type, so drafts survive page reloads.
- For privacy/performance consider replacing the external background image or bundling a local image.
