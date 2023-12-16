import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { ThemeSelector } from "./ThemeSelector";

describe("ThemeSelector", () => {
  test("should change light Icon if click Dark mode", () => {
    render(<ThemeSelector />);

    const button = screen.getByTestId("themeSelectorButton");
    fireEvent.click(button);

    const darkModeItem = screen.getByTestId("dark-mode-option");
    fireEvent.click(darkModeItem);

    const buttonEdited = screen.getByTestId("themeSelectorButton");
    const darkModeSvg = buttonEdited.firstElementChild as SVGElement;
    const testidValue = darkModeSvg.dataset.testid;

    expect(testidValue).equal("dark-mode");
    const theme = localStorage.getItem("theme");
    expect(theme).equal("custom-dark");

    const isDark = document.documentElement.classList.contains("dark");
    expect(isDark).toBeTruthy();
  });

  test("should change to System Preference", () => {
    render(<ThemeSelector />);

    const button = screen.getByTestId("themeSelectorButton");
    fireEvent.click(button);
    const systemItem = screen.getByTestId("system-mode-option");
    fireEvent.click(systemItem);

    const buttonEdited = screen.getByTestId("themeSelectorButton");
    const systemSvg = buttonEdited.firstElementChild as SVGAElement;
    const testidValue = systemSvg.dataset.testid;

    expect(testidValue).equal("system-mode");
    const theme = localStorage.getItem("theme");
    expect(theme).toBeNull();
  });
});
