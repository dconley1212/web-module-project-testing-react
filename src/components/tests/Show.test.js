import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Show from "./../Show";

const exampleShowData = {
  name: "Stranger Things",
  summary:
    "A love letter to the '80s classics that captivated a generation, Stranger Things is set in 1983 Indiana, where a young boy vanishes into thin air. ",
  seasons: [
    { id: 0, name: "Season 1", episodes: [] },
    { id: 1, name: "Season 2", episodes: [] },
    { id: 2, name: "Season 3", episodes: [] },
    { id: 3, name: "Season 4", episodes: [] },
  ],
};

test("renders without errors", () => {
  const selectedSeason = "none";
  render(<Show show={exampleShowData} selectedSeason={selectedSeason} />);
});

test("renders Loading component when prop show is null", () => {
  render(<Show show={null} />);
  const loading = screen.queryByTestId(/loading-container/i);
  expect(loading).toBeInTheDocument();
});

test("renders same number of options seasons are passed in", () => {
  render(<Show show={exampleShowData} selectedSeason={"none"} />);
  const selectSeason = screen.getByLabelText(/select a season/i);
  userEvent.click(selectSeason);
  const selectedAllSeasons = screen.getAllByTestId("season-option");
  expect(selectedAllSeasons).toHaveLength(4);
});

test("handleSelect is called when an season is selected", () => {
  const mockHandleSelect = jest.fn();
  render(
    <Show
      show={exampleShowData}
      handleSelect={mockHandleSelect}
      selectedSeason={1}
    />
  );
  const selectElement = screen.queryByRole("combobox");
  expect(selectElement).toBeInTheDocument();
  const options = screen.getAllByTestId("season-option");

  userEvent.selectOptions(selectElement, options[0]);
  expect(mockHandleSelect).toHaveBeenCalled();
});

test("component renders when no seasons are selected and when rerenders with a season passed in", () => {
  const { rerender } = render(
    <Show show={exampleShowData} selectedSeason={"none"} />
  );

  let episodes = screen.queryByTestId("episodes-container");
  expect(episodes).not.toBeInTheDocument;

  rerender(<Show show={exampleShowData} selectedSeason={1} />);

  episodes = screen.queryByTestId("episodes-container");
  expect(episodes).toBeInTheDocument();
});
