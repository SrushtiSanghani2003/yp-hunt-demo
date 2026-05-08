import { sepratorIcon } from "../../../icons";

export type Crumb = {
  id: string | null;
  name: string;
};

type BreadCrumpProps = {
  items?: Crumb[];
  separator?: string;
  className?: string;
  onItemClick?: (id: string | null, index: number) => void;
};

const BreadCrump = ({
  items = [],
  separator = sepratorIcon,
  className,
  onItemClick,
}: BreadCrumpProps) => {
  return (
    <nav className={className} aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-y-3 items-center lg:text-base/4 text-sm text-black">
        {/* {items &&
          items.map((item, index) => (
            <li key={index} className="flex items-center">
              <span>{item}</span>
              {index < items.length - 1 && (
                <span className="mx-sp6 text-gray-400">
                  <img src={separator} />
                </span>
              )}
            </li>
          ))} */}
        {items?.map((item, index) => (
          <li key={item.id ?? index} className="flex items-center">
            {index !== items.length - 1 ? (
              <span
                className="cursor-pointer hover:underline"
                onClick={() => onItemClick?.(item.id, index)}
              >
                {item.name}
              </span>
            ) : (
              <span className="font-semibold">{item.name}</span>
            )}
            {index < items.length - 1 && (
              <span className="lg:mx-2 mx-1 text-gray-400">
                <img src={separator} className="w-4 h-4" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrump;
