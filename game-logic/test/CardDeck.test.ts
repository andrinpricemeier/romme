import { expect, test } from "@jest/globals";
import { CardDeck } from "../src/CardDeck";

test("has no cards", () => {
  expect(new CardDeck(4).hasCards()).toBe(true);
});
