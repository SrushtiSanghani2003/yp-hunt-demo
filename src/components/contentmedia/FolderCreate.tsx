import { useEffect, useRef, useState } from "react";
import Input from "../ui/input/Input";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";
import api from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../utils/toastUtils";
import { useParams } from "react-router-dom";

type FolderCreateProps = {
  show: boolean;
  onClose: () => void;
  data?: Record<string, string> | null;
};

const FolderCreate = ({ show, onClose, data }: FolderCreateProps) => {
  const [folderName, setFolderName] = useState("");
  const queryClient = useQueryClient();
  const { folderId } = useParams();

  const inputRef = useRef<HTMLInputElement>(null);
  // const isSubmitDisabled = folderName.trim().length < 2;

  const createFolder = async () => {
    const params: Record<string, any> = {
      name: folderName,
    };
    if (folderId) {
      params.parent_id = folderId;
    }

    return await api.post("/content-library/folders", params);
  };

  const createFolderMutation = useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      showToast("Folder Created", "success");
      queryClient.invalidateQueries({
        queryKey: ["sub-contents"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["all-content-media"],
        exact: false,
      });
      onClose();
    },
    onError: () => {
      showToast("Failed to create folder", "error");
    },
  });

  const updateFolder = async () => {
    const params: Record<string, any> = {
      name: folderName,
    };
    if (folderId) {
      params.parent_id = folderId;
    }

    return await api.put(`/content-library/folders/${data?.id}`, params);
  };

  const updateFolderMutation = useMutation({
    mutationFn: updateFolder,
    onSuccess: () => {
      showToast("Folder Updated", "success");
      queryClient.invalidateQueries({
        queryKey: ["sub-contents"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["all-content-media"],
        exact: false,
      });
      onClose();
    },
    onError: () => {
      showToast("Failed to update folder", "error");
    },
  });

  const handleSubmit = () => {
    if (!folderName.trim()) {
      showToast("Folder name is required", "error");
      return;
    }
    if (data && Object.keys(data).length > 0) {
      updateFolderMutation.mutate();
    } else {
      createFolderMutation.mutate();
    }
  };

  useEffect(() => {
    if (data) {
      setFolderName(data.name);
    }
  }, [data]);

  useEffect(() => {
    if (!show) {
      setFolderName("");
    }
  }, [show]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [show]);

  return (
    <>
      <SidebarDialog
        open={show}
        onClose={onClose}
        title={`${data ? "Edit" : "Create"} Folder`}
        onSubmit={handleSubmit}
        disableSubmit={folderName.trim().length < 2}
        isLoading={
          createFolderMutation.isPending || updateFolderMutation.isPending
        }
      >
        <Input
          ref={inputRef}
          label="Folder Name"
          value={folderName}
          placeholder="Enter folder name"
          onChange={(e) => setFolderName(e.target.value)}
        />
      </SidebarDialog>
    </>
  );
};

export default FolderCreate;
