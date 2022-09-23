import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";

const IconList = ({ icons }) => {
  return (
    <Container>
      {icons.length > 0 ? (
        <ImageList sx={{ width: "100%", height: "100%" }} cols={5}>
          {icons.map((icon) => (
            <ImageListItem key={icon.id}>
              <img src={icon.img} alt={icon.name} loading="lazy" />
              <ImageListItemBar
                title={icon.name}
                subtitle={icon.category}
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Typography variant="h6">
          No matching results found...
        </Typography>
      )}
    </Container>
  );
};
export default IconList;
