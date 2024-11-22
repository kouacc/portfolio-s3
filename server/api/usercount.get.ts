import { userTable } from "~/database/schema";

export default defineEventHandler(async (event) => {
    const userCount = await db.$count(userTable);
    return userCount
});