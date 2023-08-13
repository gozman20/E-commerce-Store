"use client";
import qs from "query-string";
import { Color, Size } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}
const Filter: React.FC<FilterProps> = ({ valueKey, data, name }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);
  const onClick = (id: string) => {
    const currentQuery = qs.parse(searchParams.toString());
    const query = {
      ...currentQuery,
      [valueKey]: id,
    };
    // if already in the url, remove it
    if (currentQuery[valueKey] === id) {
      query[valueKey] = null;
    }
    // create new url
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  };
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div key={filter.id} className="flex items-center">
            <Button
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                selectedValue === filter.id && "bg-black text-white"
              )}
              onClick={() => onClick(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
