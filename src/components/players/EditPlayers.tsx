import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import { paths } from "../../config/paths";
import Input from "../ui/input/Input";
import {
  selectPlayer,
  setFullPlayer,
  setPlayerField,
  setPlayerName,
  setPlayerSocials,
  updatePlayerTranslationField,
} from "../../redux-toolkit/playersSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePlayersById, useUpdatePlayers } from "../../hooks/usePlayers";
import { concatImgURL } from "../../config/function";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import { useEffect, useState } from "react";
import ContentLibrary from "../contentPanel/ContentLibrary";
import { normalizePlayerResponse } from "./normalizer/normalizerTournament";
import { useScroll } from "../../hooks/ScrollContext";

const EditPlayers = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const languageCode = searchParams.get("lang");
  const player = useSelector(selectPlayer);
  const [activeMediaField, setActiveMediaField] = useState<
    | "background_img"
    | "profile_image_url"
    | "next_previous_img"
    | "match_center_img"
    | null
  >(null);
  const updatePlayersMutation = useUpdatePlayers(player);
  const { data: playersDataById } = usePlayersById(id, languageCode);
  const handlePlayersSubmit = (id: string | number | any) => {
    if (isEditMode && id) {
      updatePlayersMutation.mutate(id);
    }
  };
  useEffect(() => {
    if (isEditMode && playersDataById) {
      const normalizedPlayers = normalizePlayerResponse(
        playersDataById?.data,
        languageCode,
      );
      dispatch(setFullPlayer(normalizedPlayers));
    }
  }, [playersDataById]);
  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Player Builder"
          onSaveTemplate={() => navigate(paths.players.path)}
          onSaveTemplateTitle="Cancel"
          onSubmit={() => handlePlayersSubmit(String(id))}
          onSubmitLoading={updatePlayersMutation.isPending}
          isEditMode={isEditMode}
        />
      </div>
      <div className="container grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-11 md:col-span-10 col-span-10">
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-f6f6f6  border-0.5 border-primary rounded-15  p-3 flex justify-center items-center gap-2">
                <h1 className="font-bold">Player Name :</h1>
                <h1 className="font-medium">{player?.display_name || "-"}</h1>
              </div>{" "}
              <div className="bg-f6f6f6  border-0.5 border-primary rounded-15  p-3 flex justify-center items-center gap-2">
                <h1 className="font-bold">External Player ID :</h1>
                <h1 className="font-medium">
                  {player?.external_player_id || "-"}
                </h1>
              </div>{" "}
            </div>
          </div>
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3">
            <div className="p-4 mb-4 bg-gray-100 border-0.5 border-primary rounded-2xl ">
              <h2 className="lg:text-xl/4 text-xl font-extrabold mb-6">
                Basic Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="Enter First Name"
                  value={player.first_name}
                  onChange={(e) => {
                    const first = e.target.value;
                    dispatch(
                      setPlayerName({
                        first_name: first,
                        last_name: player.last_name,
                        display_name: `${first} ${player.last_name}`.trim(),
                      }),
                    );
                  }}
                />
                <Input
                  label="Last Name"
                  placeholder="Enter Last Name"
                  value={player.last_name}
                  onChange={(e) => {
                    const last = e.target.value;
                    dispatch(
                      setPlayerName({
                        first_name: player.first_name,
                        last_name: last,
                        display_name: `${player.first_name} ${last}`.trim(),
                      }),
                    );
                  }}
                />
                <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 ">
                  <div className="md:w-sp170 w-20 h-full">
                    {player.profile_image_url ? (
                      <img
                        src={concatImgURL(player.profile_image_url)}
                        alt="Uploaded"
                        className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary block align-middle"
                      />
                    ) : (
                      <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                        <img src={mediaIcon} alt="Placeholder" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Profile Image URL"
                      placeholder="https://www.example.com"
                      className="m-0"
                      value={concatImgURL(player.profile_image_url)}
                      readOnly
                    />
                    <div>
                      {player.profile_image_url ? (
                        <Button
                          text="Remove Image"
                          icon={closeIcon}
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() =>
                            dispatch(
                              setPlayerField({
                                field: "profile_image_url",
                                value: null,
                              }),
                            )
                          }
                        />
                      ) : (
                        <Button
                          icon={plusIcon}
                          text="Add Image"
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() =>
                            setActiveMediaField("profile_image_url")
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 ">
                  <div className="md:w-sp170 w-20 h-full">
                    {player.background_img ? (
                      <img
                        src={concatImgURL(player.background_img)}
                        alt="Uploaded"
                        className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary block align-middle"
                      />
                    ) : (
                      <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                        <img src={mediaIcon} alt="Placeholder" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Background Image URL"
                      placeholder="https://www.example.com"
                      className="m-0"
                      value={concatImgURL(player.background_img)}
                      readOnly
                    />
                    <div>
                      {player.background_img ? (
                        <Button
                          text="Remove Image"
                          icon={closeIcon}
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() =>
                            dispatch(
                              setPlayerField({
                                field: "background_img",
                                value: null,
                              }),
                            )
                          }
                        />
                      ) : (
                        <Button
                          icon={plusIcon}
                          text="Add Image"
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() => setActiveMediaField("background_img")}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 mt-4">
                  <div className="md:w-sp170 w-20 h-full">
                    {player.next_previous_img ? (
                      <img
                        src={concatImgURL(player.next_previous_img)}
                        alt="Uploaded"
                        className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary block align-middle"
                      />
                    ) : (
                      <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                        <img src={mediaIcon} alt="Placeholder" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Next Previous Image URL"
                      placeholder="https://www.example.com"
                      className="m-0"
                      value={concatImgURL(player.next_previous_img)}
                      readOnly
                    />
                    <div>
                      {player.next_previous_img ? (
                        <Button
                          text="Remove Image"
                          icon={closeIcon}
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() =>
                            dispatch(
                              setPlayerField({
                                field: "next_previous_img",
                                value: null,
                              }),
                            )
                          }
                        />
                      ) : (
                        <Button
                          icon={plusIcon}
                          text="Add Image"
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() =>
                            setActiveMediaField("next_previous_img")
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 mt-4">
                  <div className="md:w-sp170 w-20 h-full">
                    {player.match_center_img ? (
                      <img
                        src={concatImgURL(player.match_center_img)}
                        alt="Uploaded"
                        className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary block align-middle"
                      />
                    ) : (
                      <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                        <img src={mediaIcon} alt="Placeholder" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Match Center Image URL"
                      placeholder="https://www.example.com"
                      className="m-0"
                      value={concatImgURL(player.match_center_img)}
                      readOnly
                    />
                    <div>
                      {player.match_center_img ? (
                        <Button
                          text="Remove Image"
                          icon={closeIcon}
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() =>
                            dispatch(
                              setPlayerField({
                                field: "match_center_img",
                                value: null,
                              }),
                            )
                          }
                        />
                      ) : (
                        <Button
                          icon={plusIcon}
                          text="Add Image"
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() =>
                            setActiveMediaField("match_center_img")
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block  font-medium md:text-base/4 text-sm">
                    Quote
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter Quote ..."
                    value={player.translation.translated_name || ""}
                    onChange={(e) =>
                      dispatch(
                        updatePlayerTranslationField({
                          field: "translated_name",
                          value: e.target.value || "",
                        }),
                      )
                    }
                    className="w-full p-3 border-0.5 border-primary rounded-2xl resize-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block  font-medium md:text-base/4 text-sm">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter Bio ..."
                    value={player.translation.biography || ""}
                    onChange={(e) =>
                      dispatch(
                        updatePlayerTranslationField({
                          field: "biography",
                          value: e.target.value || "",
                        }),
                      )
                    }
                    className="w-full p-3 border-0.5 border-primary rounded-2xl resize-none"
                  />
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-100 border-0.5 border-primary rounded-2xl">
              <h2 className="lg:text-xl/4 text-xl font-extrabold mb-6">
                Social Links
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Facebook Url"
                  placeholder="https://www.facebook.com/"
                  value={player.social_facebook || ""}
                  onChange={(e) =>
                    dispatch(
                      setPlayerSocials({
                        facebook: e.target.value || null,
                      }),
                    )
                  }
                />
                <Input
                  label="Instagram Url"
                  placeholder="https://www.instagram.com/"
                  value={player.social_instagram || ""}
                  onChange={(e) =>
                    dispatch(
                      setPlayerSocials({
                        instagram: e.target.value || null,
                      }),
                    )
                  }
                />
                <Input
                  label="Youtube Url"
                  placeholder="https://www.youtube.com/"
                  value={player.social_youtube || ""}
                  onChange={(e) =>
                    dispatch(
                      setPlayerSocials({
                        youtube: e.target.value || null,
                      }),
                    )
                  }
                />
                <Input
                  label="Twitter Url"
                  placeholder="https://www.twitter.com/"
                  value={player.social_twitter || ""}
                  onChange={(e) =>
                    dispatch(
                      setPlayerSocials({
                        twitter: e.target.value || null,
                      }),
                    )
                  }
                />

                <Input
                  label="FIP Website Url"
                  placeholder="https://www.example.com/"
                  value={player.fip_website_url || ""}
                  onChange={(e) =>
                    dispatch(
                      setPlayerSocials({
                        FIPWebsite: e.target.value || null,
                      }),
                    )
                  }
                />
              </div>
            </div>
           
          </div>
        </div>
      </div>
      {activeMediaField && (
        <ContentLibrary
          open={Boolean(activeMediaField)}
          onClose={() => setActiveMediaField(null)}
          uploadType="player"
          mediaFilter="image"
          onSelect={(value: string) => {
            if (!activeMediaField) return; // safety check
            dispatch(
              setPlayerField({
                field: activeMediaField,
                value,
              }),
            );

            setActiveMediaField(null);
          }}
          withoutThumbnail={true}
        />
      )}
    </div>
  );
};

export default EditPlayers;
