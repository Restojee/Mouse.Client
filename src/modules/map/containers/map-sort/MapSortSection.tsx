import Dropdown from "@/ui/Dropdown/Dropdown";

const MAP_SORT_VARIANTS = [
  {
    id: 0,
    label: "Все карты",
  },
  {
    id: 1,
    label: "В ожидании",
  },
];

export const MapSortSection = () => {
  return (
    <Dropdown
      dropdownItemsArray={MAP_SORT_VARIANTS}
      width="150px"
    />
  );
};
