import axios from "axios";

export const dogApi = axios.create({
  baseURL: "https://api.thedogapi.com/v1",
});

export const catApi = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
});
