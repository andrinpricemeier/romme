import axios from "axios";
import { UserInfo } from "./UserInfo";
import jwt_decode from "jwt-decode";

export class AuthenticationService {
    private userInfo?: UserInfo;

    isAuthenticated(): boolean {
        this.loadExistingToken();
        return this.userInfo !== undefined;
    }

    getUserInfo(): UserInfo | undefined {
        this.loadExistingToken();
        return this.userInfo;
    }

    getToken(): string | null {
        return localStorage.getItem("token");
    }

    async authenticate(username: string): Promise<void> {
        const url = (window as any).ENV.API_URL!;
        const response = await axios.post(url + "/players", {
            username: username
        });
        const token = response.data.token;
        this.userInfo = this.parseToken(token);
        this.storeToken(token);
    }

    private storeToken(token: string) {
        localStorage.setItem("token", token);
    }

    private parseToken(token: string): UserInfo | undefined {
        try {
            const payload = jwt_decode(token) as any;
            return new UserInfo(payload.userId, payload.username);
        } catch {
            // We can't do anything in this case anyway.
            return undefined;
        }
    }

    private loadExistingToken() {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        if (!this.userInfo) {
            this.userInfo = this.parseToken(token);
        }
    }
}
