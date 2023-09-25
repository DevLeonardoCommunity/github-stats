import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { DarkModeDropdown } from "./DarkModeDropdown";

describe("DarkModeDropdown", () => {
  test("should change light Icon if click Dark mode", () => {
    render(<DarkModeDropdown />);

    const button = screen.getByTestId("button");
    fireEvent.click(button);

    const darkModeItem = screen.getByTestId("dark-mode-option");
    fireEvent.click(darkModeItem);

    const buttonEdited = screen.getByTestId("button");
    const darkModeSvg = buttonEdited.firstElementChild as SVGElement;
    const testidValue = darkModeSvg.dataset.testid;

    expect(testidValue).equal("dark-mode");
    const theme = localStorage.getItem("theme");
    expect(theme).equal("custom-dark");

    const isDark = document.documentElement.classList.contains("dark");
    expect(isDark).toBeTruthy();
  });
});
