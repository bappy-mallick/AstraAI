import Tesseract from "tesseract.js";

export async function extractText(files: File[]) {
  let extracted = "";

  for (const file of files) {
    // OCR only for images
    if (file.type.startsWith("image/")) {
      const {
        data: { text },
      } = await Tesseract.recognize(file, "eng");

      extracted += text + "\n\n";
    }

    // PDFs are accepted but not parsed on frontend
    else if (file.type === "application/pdf") {
      extracted += `[PDF Uploaded: ${file.name}]\n\n`;
    }
  }

  return extracted.trim();
}