import "react-native";
import React from "react";
import GithubActivity from "../src/screens/GithubActivity/GithubActivity";
import renderer from "react-test-renderer";

jest.useFakeTimers();

test("renders Notification Screen correctly", () => {
  const tree = renderer.create(<GithubActivity />).toJSON();
  expect(tree).toMatchSnapshot();
});
