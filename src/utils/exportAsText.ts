import { downloadBlob } from ".";

export const exportAsText = (text: string) => {
  downloadBlob(new Blob([text], { type: "text/plain" }), "data.txt");
};
