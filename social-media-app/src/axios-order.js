import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://us-central1-socialmediaapp-dc205.cloudfunctions.net/api"
});

instance.defaults.headers.common["Authorisation"] = "AUTH TOKEN FROM INSTANCE";

export default instance;
