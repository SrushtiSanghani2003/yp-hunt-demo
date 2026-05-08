"use client";
import { useState } from "react";
import TreeNode from "./TreeNode";

export default function NestedTree({
  data,
  parentPath,
  onUpdateChildren,
}: {
  data: any;
  parentPath: number[];
  onUpdateChildren: (parentPath: number[], newChildren: any[]) => void;
}) {
  const [openState, setOpenState] = useState(new Map());

  return (
    <div className="bg-white border border-primary rounded-xl my-2 shadow-sm w-full mx-auto">
      <div className="divide-gray-100">
        <TreeNode
          node={data}
          level={0}
          parentPath={parentPath}
          onUpdateChildren={onUpdateChildren}
          openState={openState}
          setOpenState={setOpenState}
        />
      </div>
    </div>
  );
}
