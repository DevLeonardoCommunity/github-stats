import { toPng } from "html-to-image";
import { toast } from "react-toastify";
import { PullRequestContributionsByRepository } from "@/types/github";
import { ExportOptions } from "@/types/export";
import { downloadBlob } from "./downloadBlob";

export const exportAsJSON = (data: PullRequestContributionsByRepository[]) => {
  const jsonStringData = JSON.stringify(data, null, 2);
  downloadBlob(
    new Blob([jsonStringData], { type: "application/json" }),
    "data.json"
  );
};

export const exportAsText = (text: string) => {
  downloadBlob(new Blob([text], { type: "text/plain" }), "data.txt");
};

export const exportAsImage = async (
  selector: string,
  option: ExportOptions,
  filename?: string
) => {
  try {
    const dataURI = await toPng(
      document.querySelector(selector) as HTMLElement,
      {
        includeQueryParams: true,
        cacheBust: true,
      }
    );

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
          switch (option) {
            case "download":
              downloadBlob(blob, filename ? `${filename}.png` : "image.png");
              break;
            case "clipboard":
              navigator.clipboard
                .write([new ClipboardItem({ "image/png": blob })])
                .then(() => toast.success("Image copied to clipboard"))
                .catch(() => toast.error("Failed to copy image to clipboard"));
              break;
            default:
              break;
          }
        }
      });
      canvas.remove();
    };
  } catch (error) {
    toast.error("Failed to export image");
  }
};
