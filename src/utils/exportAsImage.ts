import { toPng } from "html-to-image";

export const exportAsImage = async (
  selector: string,
  option: "download" | "clipboard",
  filename?: string
) => {
  const dataURI = await toPng(document.querySelector(selector) as HTMLElement, {
    includeQueryParams: true,
    cacheBust: true,
  });
  const image = new Image();
  image.src = dataURI;
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context?.drawImage(image, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) {
        if (option === "download") {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${filename}.png`;
          a.click();
          URL.revokeObjectURL(url);
          a.remove();
        }
        if (option === "clipboard")
          navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      }
    });
    canvas.remove();
  };
};
