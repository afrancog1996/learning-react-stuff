import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

export interface Data {
  name: string;
  artist: string;
  image: string;
  url: string;
}

function CardSpotify(data: Data) {

  return (
    <a style={{ textDecoration: "none", color: "black" }} href={data.url}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxHeight: 150,
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="body1">
              {data.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {data.artist}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 1,
              pb: 1,
            }}
          ></Box>
        </Box>
        <CardMedia
          component="img"
          width={150}
          height={150}
          sx={{ width: 151 }}
          image={data.image}
          alt="Live from space album cover"
        />
      </Card>
    </a>
  );
}

export default CardSpotify;
