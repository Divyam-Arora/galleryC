const ImageCard = (props) => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url("${props.url}")`,
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
};

export default ImageCard;
