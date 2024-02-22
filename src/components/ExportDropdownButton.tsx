import { FC } from "react";
import { Dropdown } from "@/components";
import { exportAsImage } from "@/utils";

type ExportDropdownButtonProps = {
  selector: string;
  filename?: string;
};

export const ExportDropdownButton: FC<ExportDropdownButtonProps> = ({
  selector,
  filename,
}) => {
  return (
    <Dropdown
      renderButton={
        <button className="btn btn-primary p-2 m-1 rounded cursor-pointer">
          Export as image
        </button>
      }
      items={[
        {
          renderItem: "Download as PNG",
          onClick: () => {
            exportAsImage(selector, "download", filename);
          },
        },
        {
          renderItem: "Copy to Clipboard",
          onClick: () => {
            exportAsImage(selector, "clipboard", filename);
          },
        },
      ]}
    />
  );
};
