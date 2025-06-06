import { Button, Group, rem, Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { ChangeEventHandler } from "react";

interface TableFilterProps {
  filterBySearch?: boolean;
  search?: string;
  handleSearchChange?: ChangeEventHandler;
  filterByStatus?: boolean;
  filterByCategories?: boolean;
  handleClearAll?: () => void;
  handleStatusChange?: (value: string | null) => void; // Новый пропс для изменения статуса
  status?: string | null; // Новый пропс для отображения текущего статуса
}

function TableFilter({
                       filterByStatus,
                       filterBySearch,
                       filterByCategories,
                       search,
                       handleSearchChange,
                       handleClearAll,
                       handleStatusChange, // Получаем функцию изменения статуса
                       status, // Получаем текущий статус
                     }: TableFilterProps) {
  return (
    <div>
      <Group align={"flex-end"} mt={'md'} mb={'md'}>
        {filterBySearch && (
          <TextInput
            placeholder="Search"
            radius="md"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
          />
        )}

        {filterByStatus && (
          <Select
            label="Status"
            radius="md"
            clearable={true}
            placeholder="Filter by status"
            data={['Active', 'Not active']}
            onChange={handleStatusChange} // Обрабатываем изменение статуса
            value={status} // Отображаем текущий статус
          />
        )}

        {filterByCategories && (
          <Select
            label="Categories"
            radius="md"
            placeholder="Filter by categories"
            data={['Restaurant connected', 'Restaurant not connected']}
          />
        )}
        <Button onClick={handleClearAll} variant={'transparent'}>
          Clean
        </Button>
      </Group>
    </div>
  );
}

export default TableFilter;
