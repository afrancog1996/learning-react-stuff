import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import * as React from "react";
import { lazy } from "react";
import { useTranslation } from "react-i18next";
import { getSpotifyToken, spotifySearch } from "./api.js";

function Spotify() {
  // lazy component
  const Card = lazy(() => import("./card/card-spotify.component"));

  // useEffect
  const [data, setData] = React.useState<any>([]);
  const [searchType, setSearchType] = React.useState("");
  const [searchText, setSearchText] = React.useState("");
  const { t } = useTranslation();
  let input = React.useRef<any>(null);
  const ariaLabel = { "aria-label": "description" };

  const handleSelectChange = async (event: SelectChangeEvent) => {
    await setSearchType(event?.target?.value);
  };

  const handleSubmit = async (event: any) => {
    if (input?.current?.value !== undefined && input?.current?.value !== "") {
      const fetchData = async () => {
        let response = await spotifySearch(searchType, searchText);
        await setData(response);
      };
      fetchData().catch((e) => console.log(e));
    }
  };

  const handleInputChange = async (event: any) => {
    await setSearchText(event.target.value);
  };

  React.useEffect(() => {
    setSearchType("all");
    getSpotifyToken();
  }, []);

  return (
    <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={1}>
      <Box gridRow={3}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={searchType}
            onChange={handleSelectChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            placeholder={t("select_placeholder_s")}
          >
            <MenuItem value={"all"}>
              <em>{t("empty_option")}</em>
            </MenuItem>
            <MenuItem value={"artist"}>{t("spotify_artist_s")}</MenuItem>
            <MenuItem value={"album"}>{t("spotify_songs_s")}</MenuItem>
            <MenuItem value={"track"}>{t("spotify_albums_s")}</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <Input
            inputRef={input}
            placeholder={t("input_placeholder_s")}
            inputProps={ariaLabel}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <Button variant="contained" onClick={handleSubmit}>
            {t("button_name_s")}
          </Button>
        </FormControl>
      </Box>
      <Box gridRow={12} sx={{ display: "flex", flexDirection: "row" }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            padding={10}
          >
            {data?.tracks &&
              data?.tracks?.items?.map((track, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Card
                    name={track.name}
                    artist={track.artists[0].name}
                    image={track.album?.images[0]?.url}
                    url={track.external_urls?.spotify}
                  />
                </Grid>
              ))}
            {data?.artists &&
              data?.artists?.items?.map((artist, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <img
                    style={{ width: 150, height: 150 }}
                    src={
                      artist.images[0]?.url ??
                      "https://www.wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png"
                    }
                    alt="Albums"
                  />
                  <p>Nombre del Artista:</p>
                  <p>{artist.name}</p>
                  <p>Followers: {artist.followers.total}</p>
                  {/* <Card
                                name={album.name}
                                artist={album.artists[0].name}
                                image={album.images[0]?.url}
                            />*/}
                </Grid>
              ))}
            {data?.albums &&
              data?.albums?.items?.map((album, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <p>Nombre del Album:</p>
                  <p>{album.name}</p>
                  <img
                    style={{ width: 150, height: 150 }}
                    src={
                      album.images[0]?.url ??
                      "https://www.wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png"
                    }
                    alt="Albums"
                  />
                  <p>Nombre del Artista uwu:</p>
                  <p>{album.artists[0].name}</p>
                  {/* <Card
                                name={album.name}
                                artist={album.artists[0].name}
                                image={album.images[0]?.url}
                            />*/}
                </Grid>
              ))}
          </Grid>
        </React.Suspense>
      </Box>
    </Box>
  );
}

export default Spotify;
