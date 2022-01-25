import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Display from "./../Display";
import mockFetchShow from "./../../api/fetchShow";
jest.mock("./../../api/fetchShow");

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

test("renders without errors with no props", () => {
  render(<Display />);
});

test("renders Show component when the button is clicked ", async () => {
  mockFetchShow.mockResolvedValueOnce(exampleShowData);

  render(<Display />);
  const button = screen.getByRole("button");
  userEvent.click(button);
  const show = await screen.findByTestId("show-container");
  expect(show).toBeInTheDocument();
});

test("renders show season options matching your data when the button is clicked", async () => {
  mockFetchShow.mockResolvedValueOnce(exampleShowData);
  render(<Display />);
  const button = screen.getByRole("button");
  userEvent.click(button);
  await waitFor(() => {
    const seasonOptions = screen.getAllByTestId("season-option");
    expect(seasonOptions).toHaveLength(4);
  });
});

test("displayFunc is called when the fetch button is pressed", async () => {
  mockFetchShow.mockResolvedValueOnce(exampleShowData);
  const displayFunc = jest.fn();
  render(<Display displayFunc={displayFunc} />);
  const button = screen.getByRole("button");
  userEvent.click(button);
  await waitFor(() => {
    expect(displayFunc).toHaveBeenCalled();
  });
});
