type AppImagePropsType = {
  onClick?: (image: string) => void;
  image?: string;
  alt?: string;
};
export const AppImage = (props: AppImagePropsType) => {
  const { image, alt } = props;

  return (
    <img
      src={image}
      width={"100%"}
      height={"100%"}
      style={{
        objectFit: "cover",
      }}
      alt={alt}
    />
  );
};
