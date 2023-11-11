import { Path, POST } from "typescript-rest";
import { v4 as uuidv4, parse as uuidParse } from "uuid";
import { GameCreatedResponse } from "./GameCreatedResponse";
import base32Encode from "./utils/Base32Encode";

@Path("/games")
export class GameService {
    @POST
    createGame(): GameCreatedResponse {
        const response = new GameCreatedResponse();
        const id = uuidParse(uuidv4());
        // Since the game id is part of the URL and thus read by mere mortals, we make them more readable.
        // Crockford seems to be one of the more human readable formats, it is also mentioned in a book by Google.
        const humanReadableId = base32Encode(id, "Crockford");
        response.gameId = humanReadableId;
        return response;
    }
}
