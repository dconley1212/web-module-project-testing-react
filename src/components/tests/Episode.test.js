import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Episode from "./../Episode";

const exampleData = {
  id: 1,
  image: "./stranger_things.png",
  name: "The Beginning",
  season: 1,
  number: 1,
  summary: "The stage is set.",
  runtime: "50 minutes",
};

const exDataTwo = {
  id: 2,
  image: null,
  name: "The Weirdo on Maple Street",
  season: 1,
  number: 2,
  summary:
    "While the search for the missing Will continues, Joyce tells Jim about a call she apparently received from her son.",
  runtime: "50 minutes",
};

test("renders without error", () => {
  render(<Episode episode={exampleData} />);
});

test("renders the summary test passed as prop", () => {
  render(<Episode episode={exampleData} />);
  const summary = screen.queryByText(/the stage is set./i);
  expect(summary).toBeInTheDocument();
  expect(summary).toBeTruthy();
  expect(summary).toHaveTextContent("The stage is set.");
});

test("renders default image when image is not defined", () => {
  render(<Episode episode={exDataTwo} />);
  const image = screen.queryByAltText(
    "https://i.ibb.co/2FsfXqM/stranger-things.png"
  );
  expect(image).toBeTruthy();
});
