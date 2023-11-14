import client from "./client";

const addComment = (comment: string) => client.post("/opinions", { comment });

export default { addComment };
