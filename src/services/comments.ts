import client from "./client";

const addComment = (comment: string) => client.post("/comments", { comment });

export default { addComment };
