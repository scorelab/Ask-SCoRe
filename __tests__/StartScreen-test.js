import React from "react";
import StartScreen from "../src/screens/StartScreen/StartScreen";
import renderer from "react-test-renderer";

jest.useFakeTimers();

test("renders Login Component correctly", async () => {
  const tree = renderer.create(<StartScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
