import { FC } from "react";
import { exportAsImage } from "@/utils/exportRepositories";
import { ExportOptions } from "@/utils/exportOptions";

const ExportDropdown: FC = () => {
  return (
    <div className="dropdown">
      <button
        tabIndex={0}
        className="block w-fit btn btn-primary m-1 p-2 rounded"
      >
        Export as image
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button
            className="btn-ghost"
            onClick={() =>
              exportAsImage(".grid", ExportOptions.Download, "stats")
            }
          >
            Download as PNG
          </button>
        </li>
        <li>
          <button
            className="btn-ghost"
            onClick={() => exportAsImage(".grid", ExportOptions.Clipboard)}
          >
            Copy to Clipboard
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ExportDropdown;
