import type { Block } from "../../redux-toolkit/articleSlice";

export interface TypeOption {
  type: string;
  label: string;
  icon: string;
}

export interface BlockTypeProps {
  // currentBlock: {
  //   block_type: string;
  //   sort_order: number;
  //   content: Record<string, any>;
  // };
  currentBlock: Block;
  onChangeType: (newType: string) => void;
  onChangeBlock?: (updatedBlock: any) => void;
  types: TypeOption[];
}
