import useQueryParams from "@/hooks/useQueryParams";
import { SearchIcon } from "@/svg/SearchIcon";
import { StyledBox } from "@/ui/Box";
import { Input } from "@/ui/Input";

export const MapSearch = () => {
  const { updateFilter, filter } = useQueryParams();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await updateFilter({ name: e.currentTarget.value, page: 1 });
  };

  return (
    <StyledBox align={"center"} gap={15}>
      <Input
        inputPrepend={<SearchIcon/>}
        width={240}
        value={filter.name}
        onChange={onChange}
        placeholder={"Поиск по номеру карты "}
      />
    </StyledBox>
  );
};

