import { verifyJWT } from "~/utils/jwt";

export async function useAuthorization(header: string): Promise<boolean> {
    if (!header) {
        return false;
    } else {
        const { payload } = await verifyJWT(header);
        if (!payload) {
            return false;
        } else {
            return true;
        }
    }
}