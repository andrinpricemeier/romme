import { expect, test } from "@jest/globals";
import { GameCreatedResponse } from "../src/GameCreatedResponse";

test("game created response test", () => {
    expect(new GameCreatedResponse().gameId).toBe(undefined);
});
