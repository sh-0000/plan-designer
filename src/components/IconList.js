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
      {icons.length > 0 ? ( //Show a no matches msg if icons.length < 1
        <ImageList sx={{ width: "100%", height: "100%" }} cols={5}>
          {icons.map((icon) => (
            <ImageListItem key={icon.id} sx={{ paddingInline: "1rem" }}>
              <img
                style={{
                  border: "1px solid hsl(0 0% 0% / 0.1)",
                  borderRadius: "10px",
                  padding: '10px'
                }}
                src={icon.img}
                alt={icon.name}
                loading="lazy"
              />
              <ImageListItemBar
                title={icon.name}
                subtitle={icon.category}
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Typography variant="h6">No matching results found...</Typography>
      )}
    </Container>
  );
};
export default IconList;
