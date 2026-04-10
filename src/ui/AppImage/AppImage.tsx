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
      width={300}
      height={150}
      style={{
        objectFit: "cover",
      }}
      alt={alt}
    />
  );
};
