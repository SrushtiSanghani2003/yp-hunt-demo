type ButtonBlockPreviewProps = {
  data: any;
};

const ButtonBlockPreview = ({ data }: ButtonBlockPreviewProps) => {
  const buttonText = data?.content?.button_label;
  const buttonLink = data?.content?.button_link;
  const targetBlank = data?.content?.isnewtab;

  return (
    <>
      <div className="my-4">
        <a
          href={buttonLink}
          target={targetBlank ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="px-6 py-2 border-0.5 rounded-full border-primary transition-all hover:bg-red-500 hover:text-white text-black font-semibold text-lg inline-block"
        >
          {buttonText}
        </a>
      </div>
    </>
  );
};

export default ButtonBlockPreview;
