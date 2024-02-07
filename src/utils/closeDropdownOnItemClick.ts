export const closeDropdownOnItemClick = (): void => {
  const activeElement = document.activeElement as HTMLElement | null;
  if (activeElement && activeElement instanceof HTMLElement) {
    activeElement.blur();
  }
};
