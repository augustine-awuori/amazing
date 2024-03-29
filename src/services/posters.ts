import { Poster } from "../Pages/PostersPage";
import client from "./client";

export const endpoint = "/posters";

const savePoster = (poster: Poster) => client.post(endpoint, poster);

const getPosters = () => client.get(endpoint);

export default { getPosters, savePoster };
