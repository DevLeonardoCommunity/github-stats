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
        <button className="btn btn-primary rounded cursor-pointer">
          Export as image
        </button>
      }
      items={[
        {
          renderItem: <span>Download as PNG</span>,
          onClick: () => {
            exportAsImage(selector, "download", filename);
          },
        },
        {
          renderItem: <span>Copy to Clipboard</span>,
          onClick: () => {
            exportAsImage(selector, "clipboard", filename);
          },
        },
      ]}
    />
  );
};
