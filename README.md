# Little Library

A tiny, static ebook website for experimenting with AI reading features. It uses plain HTML, CSS, and JavaScript, so there is no build step or dependency install.

## Run locally

Open `index.html` in a browser, or serve this folder with any static file server. A local server is recommended so the PDF viewer behaves consistently. Select a title to open that book's dedicated reading page.

## Add a book

1. Put a PDF in `books/`.
2. Add its details to the `books` array in `app.js`.

The browser's built-in PDF viewer displays the selected file. Each sample book is three pages long. On a book page, select the sparkle icon on the right to open the AI tools menu. Its summary, read-aloud, and quiz entries are interface placeholders for a future Gemini integration. Keep any eventual Gemini API key in a server-side environment; do not commit secrets to this static site.

## Publish

Push the folder to a GitHub repository and enable GitHub Pages from the repository's Pages settings. No framework or build configuration is required.
