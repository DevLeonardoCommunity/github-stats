import { FC, HTMLProps, ReactElement } from "react";

export type DropdownProps = {
  position?:
    | "dropdown-top"
    | "dropdown-bottom"
    | "dropdown-left"
    | "dropdown-right";
  align?: "dropdown-end";
  renderButton: ReactElement;
  items: (HTMLProps<HTMLLIElement> & {
    "data-testid"?: string;
    onClick?: () => void;
    renderItem: ReactElement;
  })[];
};

export const closeDropdownOnItemClick = (): void => {
  const activeElement = document.activeElement as HTMLElement | null;
  if (activeElement && activeElement instanceof HTMLElement) {
    activeElement.blur();
  }
};

export const Dropdown: FC<DropdownProps> = ({
  renderButton,
  items,
  position = "dropdown-bottom",
  align,
}) => {
  return (
    <div className={`dropdown ${position} ${align ?? ""}`}>
      <div
        tabIndex={0}
        role="button"
        className="btn border-0 p-0 bg-transparent hover:bg-transparent"
      >
        {renderButton}
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        {items.map(({ onClick, renderItem, ...liProps }, index) => {
          return (
            <li
              {...liProps}
              key={index}
              onClick={() => {
                onClick?.();
                closeDropdownOnItemClick();
              }}
            >
              <p>{renderItem}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
