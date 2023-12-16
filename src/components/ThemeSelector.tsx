import { useEffect, useState } from "react";

type ThemeOptions = "custom-dark" | "light" | "system";

export function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeOptions | undefined>(
    undefined
  );

  useEffect(() => {
    const theme = localStorage.getItem("theme") as ThemeOptions;
    if (theme) {
      setSelectedTheme(theme);
    }
  }, []);

  function onClick($event: React.MouseEvent<HTMLLIElement>) {
    $event.stopPropagation();
    const li = $event.currentTarget as HTMLLIElement;
    setDocumentElement(li.id as ThemeOptions);
  }

  const setDocumentElement = (theme: ThemeOptions) => {
    setSelectedTheme(theme);
    theme === "system" ? setSystemPreferenceTheme() : setTheme(theme);
  };

  const buttonIcon = getButtonIconByOption(selectedTheme);

  return (
    <>
      <div className="dropdown dropdown-bottom dropdown-end">
        <label
          tabIndex={0}
          className="btn btn-circle btn-ghost m-1"
          data-testid="themeSelectorButton"
        >
          {buttonIcon}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-3"
        >
          <li id="light" onClick={onClick}>
            <a data-testid="light-mode-option">
              <LightMode /> Light Mode
            </a>
          </li>
          <li id="custom-dark" onClick={onClick}>
            <a data-testid="dark-mode-option">
              <DarkMode /> Dark Mode
            </a>
          </li>
          <li id="system" onClick={onClick}>
            <a data-testid="system-mode-option">
              <SystemPreference /> System Preference
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

const LightMode = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    viewBox="0 -960 960 960"
    data-testid="light-mode"
  >
    <path
      d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 
    58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h80q17 
    0 28.5 11.5T200-480q0 17-11.5 28.5T160-440H80Zm720 0q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520h80q17 0 28.5 11.5T920-480q0 
    17-11.5 28.5T880-440h-80ZM480-760q-17 0-28.5-11.5T440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760Zm0 
    720q-17 0-28.5-11.5T440-80v-80q0-17 11.5-28.5T480-200q17 0 28.5 11.5T520-160v80q0 17-11.5 
    28.5T480-40ZM226-678l-43-42q-12-11-11.5-28t11.5-29q12-12 29-12t28 12l42 43q11 12 11 28t-11 28q-11 12-27.5 11.5T226-678Zm494 
    495-42-43q-11-12-11-28.5t11-27.5q11-12 27.5-11.5T734-282l43 42q12 11 11.5 28T777-183q-12 
    12-29 12t-28-12Zm-42-495q-12-11-11.5-27.5T678-734l42-43q11-12 28-11.5t29 11.5q12 12 12 29t-12 
    28l-43 42q-12 11-28 11t-28-11ZM183-183q-12-12-12-29t12-28l43-42q12-11 28.5-11t27.5 11q12 11 11.5 27.5T282-226l-42 
    43q-11 12-28 11.5T183-183Zm297-297Z"
    />
  </svg>
);

const DarkMode = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    viewBox="0 -960 960 960"
    data-testid="dark-mode"
  >
    <path
      d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 
    153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 
    8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"
    />
  </svg>
);

const SystemPreference = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    className="h-6 w-6"
    data-testid="system-mode"
  >
    <path
      d="M320-120v-80h80v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 
      56.5T800-280H560v80h80v80H320ZM160-360h640v-400H160v400Zm0 0v-400 400Z"
    />
  </svg>
);

const getButtonIconByOption = (option: ThemeOptions | undefined) => {
  switch (option) {
    case "light":
      return <LightMode />;

    case "custom-dark":
      return <DarkMode />;

    default:
      return <SystemPreference />;
  }
};

const setSystemPreferenceTheme = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(isDark ? "custom-dark" : "light");
  localStorage.removeItem("theme");
};

const setTheme = (theme: "custom-dark" | "light") => {
  localStorage.theme = theme;
  document.documentElement.dataset.theme = theme;
  theme === "custom-dark"
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");
};
