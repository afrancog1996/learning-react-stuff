import axios from "axios";
import qs from "qs";
import { Buffer } from "buffer";

//const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
//const SECRET_ID = process.env.REACT_APP_SPOTIFY_SECRET_ID;
const AUTH_TOKEN =  Buffer(`${"fce3553cb5594895b2a64d4177f63f67"}:${"2e62d600f8844b2a862271daf94bed78"}`, "utf-8").toString(
    "base64"
);

export const getSpotifyToken = async() => {
    try {

        const token_url = "https://accounts.spotify.com/api/token";
        const data = qs.stringify({ grant_type: "client_credentials" });

        const response = await axios.post(token_url, data, {
            headers: {
                Authorization: `Basic ${AUTH_TOKEN}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        localStorage.setItem("token", response.data.access_token, { path: "/" });
    } catch (error) {
        console.log(error);
    }
};

export const spotifySearch = async(type = "artist", query = "The Beatles") => {
    console.log('type ' + type);
    const access_token = localStorage.getItem("token");
    if (type === "all") {
        type = ["album", "artist", "track"];
    }
    const api_url = `https://api.spotify.com/v1/search?type=${type}&q=${query}&include_external=audio`;
    console.log(api_url)
    try {
        const response = await axios.get(api_url, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};