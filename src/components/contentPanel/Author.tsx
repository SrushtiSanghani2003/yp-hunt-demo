import { chevronDown, closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";
import { useEffect, useState } from "react";
import ContentLibrary from "./ContentLibrary";
import { concatImgURL } from "../../config/function";

type SocialLink = {
  platform: string;
  url: string;
};

type AuthorProps = {
  open: boolean;
  onClose: () => void;
  data: any;
  onSave?: (payload: {
    name: string;
    title: string;
    imgUrl: string;
    socialUrls: Record<string, string>;
  }) => void;
};

const Author = ({ open, onClose, data, onSave }: AuthorProps) => {
  const [show, setShow] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [author, setAuthor] = useState({
    name: "",
    title: "",
    imgUrl: "",
  });

  const handleAuthorChange = (field: keyof typeof author, value: string) => {
    setAuthor((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialChange = (
    index: number,
    field: keyof SocialLink,
    value: string
  ) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);
  };

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "", url: "" }]);
  };

  const handleRemoveSocialLinks = (index: number) => {
    const updated = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updated);
  };

  const handleSubmit = () => {
    const socialUrls: Record<string, string> = {};
    socialLinks.forEach(({ platform, url }) => {
      if (platform && url) {
        socialUrls[platform] = url;
      }
    });

    onSave?.({
      name: author.name,
      title: author.title,
      imgUrl: author.imgUrl,
      socialUrls,
    });

    onClose();
  };

  useEffect(() => {
    if (data) {
      setAuthor({
        name: data.translation.author_name,
        title: data.translation.author_title,
        imgUrl: data.translation.author_image_url,
      });

      const socialUrls: SocialLink = data.translation.author_social_urls || {};
      const mappedLinks = Object.entries(socialUrls).map(([platform, url]) => ({
        platform,
        url,
      }));

      if (mappedLinks.length > 0) {
        setSocialLinks(mappedLinks);
      } else {
        setSocialLinks([]);
      }
    }
  }, [data]);

  return (
    <>
      <SidebarDialog
        open={open}
        onClose={onClose}
        title="Author"
        onSubmit={handleSubmit}
      >
        <div>
          <Input
            label="Name*"
            value={author.name}
            className="md:mb-4 mb-3"
            onChange={(e) => handleAuthorChange("name", e.target.value)}
          />
          <Input
            label="Job Title"
            value={author.title}
            className="md:mb-5 mb-3"
            onChange={(e) => handleAuthorChange("title", e.target.value)}
          />
          <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 md:mb-8 mb-6">
            <div className="md:w-sp170 w-20 h-full">
              {author.imgUrl ? (
                <img
                  src={concatImgURL(author.imgUrl)}
                  alt="Uploaded"
                  className="w-full h-full rounded-2xl object-contain p-2 border-0.5 border-primary block align-middle"
                />
              ) : (
                <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                  <img src={mediaIcon} alt="Placeholder" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <Input
                label="Image URL"
                placeholder="https://www.example.com"
                className="m-0"
                value={concatImgURL(author.imgUrl)}
                onChange={(e) => handleAuthorChange("imgUrl", e.target.value)}
              />
              <div>
                {author.imgUrl ? (
                  <Button
                    text="Remove Image"
                    icon={closeIcon}
                    backgroundColor="transparent"
                    className="pb-0 pt-0"
                    imageclassName="md:w-5 w-3 md:h-5 h-3"
                    onClick={() => handleAuthorChange("imgUrl", "")}
                  />
                ) : (
                  <Button
                    icon={plusIcon}
                    text="Add Image"
                    backgroundColor="transparent"
                    imageclassName="md:w-5 w-3 md:h-5 h-3"
                    className="pb-0 pt-0"
                    onClick={() => setShow(true)}
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            {socialLinks.length > 0 &&
              socialLinks.map((social, index) => {
                return (
                  <div key={index} className="mb-6 relative">
                    <div
                      className={`${social.platform === "" ? "mb-0" : "mb-5"}`}
                    >
                      <label
                        htmlFor={`platform-${index}`}
                        className="block md:mb-2 mb-1 md:text-base text-sm font-medium"
                      >
                        Platform*
                      </label>
                      <div className="relative">
                        <select
                          id={`platform-${index}`}
                          value={social.platform}
                          onChange={(e) =>
                            handleSocialChange(
                              index,
                              "platform",
                              e.target.value
                            )
                          }
                          className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary md:rounded-2xl rounded-lg"
                        >
                          <option value="" disabled>
                            Select Social Platform From The List
                          </option>
                          <option value="youtube">Youtube</option>
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="twitter">X</option>
                        </select>
                        <div className="absolute md:right-4 right-2 top-1/2 -translate-y-1/2">
                          <img src={chevronDown} />
                        </div>
                      </div>
                    </div>

                    <div className="md:mt-4 mt-2">
                      <Input
                        label="Add Handle URL"
                        value={social.url}
                        placeholder="https://www.example.com"
                        onChange={(e) =>
                          handleSocialChange(index, "url", e.target.value)
                        }
                      />
                    </div>
                    {socialLinks.length > 0 && (
                      <Button
                        icon={closeIcon}
                        backgroundColor="transparent"
                        className="p-0 absolute top-0 right-0"
                        onClick={() => handleRemoveSocialLinks(index)}
                      />
                    )}
                  </div>
                );
              })}
          </div>

          <Button
            text="Add Social Media Link"
            icon={plusIcon}
            backgroundColor="transparent"
            className="relative addSideBarBtn"
            onClick={handleAddSocialLink}
          />
        </div>
      </SidebarDialog>
      {show && (
        <ContentLibrary
          open={show}
          onClose={() => setShow(false)}
          uploadType="author"
          onSelect={(url: string) => handleAuthorChange("imgUrl", url)}
          mediaFilter="image"
        />
      )}
    </>
  );
};

export default Author;
