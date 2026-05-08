type TextBlockPreviewProps = {
  data?: any;
};

const TextBlockPreview = ({ data }: TextBlockPreviewProps) => {
  const content = data?.content?.text;
  return (
    <div className="my-6">
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default TextBlockPreview;
