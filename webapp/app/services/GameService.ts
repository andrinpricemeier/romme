import axios from "axios";

export class GameService {
    async createGame(): Promise<string> {
        const url = (window as any).ENV.API_URL!;
        const response = await axios.post(url + "/games");
        return response.data.gameId;
    }
}
