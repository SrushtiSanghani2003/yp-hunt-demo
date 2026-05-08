import { useEffect, useMemo, useState } from "react";
import ContentHeader from "../Subnavbar";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import { useDebounce } from "../../hooks/useDebounce";
import api from "../../lib/api";
import Pagination from "../ui/pagination";
import { formatDate } from "../../config/function";
// import ComingSoon from "../ui/ComingSoon/ComingSoon";

const Contactus = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [allContactus, setAllContactus] = useState<any[]>([]);

  const debouncedSearch = useDebounce(searchInput, 300);

  const columns = [
    { title: "No.", minWidth: "min-w-8 w-8" },
    { title: "Email", minWidth: "min-w-48 w-48" },
    { title: "Name", minWidth: "min-w-48 w-48" },
    { title: "Organization Name", minWidth: "min-w-80 w-80" },
    { title: "Created At", minWidth: "min-w-28 w-28" },
  ];

  const getNewsLetters = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string?]>) => {
    const [, currentPage, debouncedSearch] = queryKey;

    const params: Record<string, any> = {
      page: currentPage,
      limit: 8,
    };

    if (debouncedSearch?.trim()) {
      params.search = debouncedSearch;
    }
    return await api.get("/newsletter_subscriptions/contact_us", { params });
  };

  const { data: contactusData, isFetching } = useQuery({
    queryKey: ["contactus", page, debouncedSearch],
    queryFn: getNewsLetters,
    placeholderData: (prevData: any) => prevData,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });

  const totalPages = useMemo(() => {
    return contactusData?.totalPages || 1;
  }, [contactusData?.totalPages]);

  useEffect(() => {
    if (contactusData) {
      setAllContactus(contactusData?.contactedUsers || []);
    }
  }, [contactusData]);

  const breadCrumbsItem = [
    { id: null, name: "Home" },
    { id: "users", name: "Users" },
    { id: "contactus", name: "Contact Us" },
  ];

  return (
    <>
      {/* <ComingSoon /> */}
      <div className="mt-10">
        <ContentHeader
          title="Contact Us"
          breadCrumbsItem={breadCrumbsItem}
          // onTempelate={() => console.log("From Template")}
          // onCreate={() => {}}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        /** PROPS FOR FILTER VIEW **/
        // showDropdown={showDropdown}
        // toggleDropdown={toggleDropdown}
        // closeDropdown={closeDropdown}
        // columns={columns}
        // tempVisibleColumns={tempVisibleColumns}
        // handleTempToggle={handleTempToggle}
        // applyColumnChanges={applyColumnChanges}
        // defaultVisibleColumns={defaultVisibleColumns}
        />

        <div className="overflow-x-auto my-3">
          <table className="min-w-full table-fixed border-separate border-spacing-y-2 pb-16">
            <thead className="text-left">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.title}
                    className={`p-2 text-black font-normal ps-0  ${col.minWidth}`}
                  >
                    <span
                      className={`text-left
                       opacity-40 break-words whitespace-normal block`}
                    >
                      {col.title}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isFetching ? (
                <>
                  {[...Array(8)].map((_, i) => (
                    <tr key={i}>
                      <td colSpan={columns.length}>
                        <div className="animate-pulse bg-white border border-primary rounded-2xl p-4">
                          <div className="flex w-full gap-4">
                            {columns.map((col, j) => (
                              <div
                                key={j}
                                className={`${col.minWidth} h-5 bg-gray-200 rounded`}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : allContactus.length === 0 ? (
                <tr>
                  <td colSpan={columns.length}>
                    <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                      No data available.
                    </div>
                  </td>
                </tr>
              ) : (
                (allContactus as any[])?.map((newsletter, index) => {
                  return (
                    <tr key={newsletter?.id} className="">
                      <td colSpan={columns.length}>
                        <div className="hover:bg-gray-100 transition bg-white border border-primary rounded-xl py-2">
                          <table className="w-full">
                            <thead>
                              <tr>
                                {columns.map((col) => (
                                  <th
                                    key={col.title}
                                    className={`${col.minWidth}`}
                                  ></th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-base text-left ps-3">
                                  {index + 1}
                                </td>
                                <td className="text-base text-left">
                                  {newsletter?.email}
                                </td>
                                <td className="text-base text-left">
                                  {newsletter?.username}
                                </td> <td className="text-base text-left">
                                  {newsletter?.organisation_name}
                                </td>
                                <td className="text-base text-left">
                                  {formatDate(newsletter?.created_at || "")}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {allContactus.length !== 0 && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </>
  );
};

export default Contactus;
