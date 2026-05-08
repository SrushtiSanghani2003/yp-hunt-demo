import { deleteIcon, penIcon } from "../../icons";
import Button from "../ui/button";
import ToggleSwitch from "../ui/switch/ToggleSwitch";

type Props = {
  categoryChild: any;
  childIndex: any;
  setDeleteShow: any;
  setStatusModalShow: any;
  setCurrentStatus: any;
  setSelectedCategoryId: any;
  setEditCategoryData: any;
  setShow: any;
  handleOrderClick: any;
  totalDocs: any;
};

const ChildCategory = ({
  categoryChild,
  childIndex,
  setDeleteShow,
  setStatusModalShow,
  setCurrentStatus,
  setSelectedCategoryId,
  setEditCategoryData,
  handleOrderClick,
  totalDocs,
  setShow,
}: Props) => {
  const isActive = categoryChild?.status == "published";
  return (
    <div
      key={categoryChild.id}
      className="bg-white border border-primary rounded-[15px] p-2 mt-2"
    >
      <table className="w-full">
        <tbody>
          <tr>
            <td className="text-base text-left ps-3 min-w-6 w-6">
              {childIndex + 1}
            </td>
            <td className="text-base text-left min-w-[300px] w-[300px]">
              <div className="flex items-center justify-between gap-4 cursor-pointer">
                <p className="">{categoryChild?.translation?.title}</p>
              </div>
            </td>
            <td className="text-base text-left min-w-24 w-24">
              <div className="">
                <ToggleSwitch
                  checked={isActive}
                  onClick={() => {
                    setStatusModalShow(true);
                    setCurrentStatus(categoryChild?.status);
                    setSelectedCategoryId(String(categoryChild?.id));
                  }}
                />
              </div>
            </td>
            <td className="text-base text-left min-w-24 w-24">
              <p className="px-4">
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    handleOrderClick(
                      categoryChild?.id,
                      categoryChild?.order,
                      totalDocs
                    )
                  }
                >
                  {categoryChild?.order || "-"}
                </span>
              </p>
            </td>
            <td className="text-base text-left min-w-24 w-24">
              <div className="flex gap-2 items-center justify-center">
                <Button
                  icon={penIcon}
                  backgroundColor="transparent"
                  className="md:py-0"
                  onClick={() => {
                    setEditCategoryData({
                      id: categoryChild?.id,
                      title: categoryChild?.translation?.title,
                      parentId: categoryChild?.parent_id,
                    });
                    setShow(true);
                  }}
                />
                <Button
                  icon={deleteIcon}
                  backgroundColor="transparent"
                  className="md:py-0"
                  onClick={() => {
                    setDeleteShow(true);
                    setSelectedCategoryId(String(categoryChild?.id));
                  }}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChildCategory;
