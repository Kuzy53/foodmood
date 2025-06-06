import React, {useEffect, useState} from 'react';
import {
  Table,
  ScrollArea,
  Group,
  Text,
  TextInput,
  rem,
  keys,
  Pagination, Button, Box, LoadingOverlay,
} from '@mantine/core';
import TableFilter from "@/components/ui/TableSort/TableFilter";
import {IconLogout, IconPlus} from "@tabler/icons-react";
import classes from "./TableSort.module.css";


function filterData(data: any[], search: string, status: string | null, filterBy: string) {
  const query = search.toLowerCase().trim();

  return data.filter((item) => {
    // Фильтрация по поисковому запросу только по текстовым полям
    const matchesSearch = keys(data[0]).some((key) => {
      const value = item[key];
      return typeof value === 'string' && value.toLowerCase().includes(query);
    });

    // Фильтрация по статусу
    const matchesStatus =
      status === null ||
      (status === "Active" && item[filterBy]) ||
      (status === "Not active" && !item[filterBy]);

    return matchesSearch && matchesStatus;
  });
}


interface TableSortProps {
  rows: any,
  data: any[],
  loading: boolean,
  onDelete?: Function,
  children?: any,
  filterBy?: string,
  filter?: {
    filterBySearch?: boolean,
    filterByStatus?: boolean,
    filterByCategories?: boolean,
  }
  actionBtn?: { close?: string, open?: string, hideCreate?: boolean },
  notFoundMessage?: string,
  showChildren?: boolean,
  setShowChildren?: (val: boolean) => void;
  headers: { name: string, key: string }[]
}

export function TableSort(
  {data, headers, loading, filterBy, children,filter, actionBtn, rows, notFoundMessage, showChildren, setShowChildren}
    : TableSortProps
) {
  filterBy = filterBy || 'isActive'
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState(data);
  const [activePage, setPage] = useState(1);

  const pageSize = 8; // Количество элементов на странице

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.currentTarget;
    setSearch(value);
    setFilteredData(filterData(data, value, status, filterBy));
    setPage(1); // Сбросить на первую страницу при фильтрации
  };

  useEffect(() => {
    setFilteredData(filterData(data, search, status, filterBy));
  }, [loading, data]);

  const handleStatusChange = (value: string | null) => {
    setStatus(value);
    setFilteredData(filterData(data, search, value, filterBy));
    setPage(1); // Сбросить на первую страницу при изменении статуса
  };

  const handleClearAll = () => {
    setStatus(null)
    setSearch('')
    setFilteredData(filterData(data, '', null, filterBy));
    setPage(1);
  }

  const paginatedData = filteredData.slice(
    (activePage - 1) * pageSize,
    activePage * pageSize
  );

  return (
    <ScrollArea>
      <Group align={"flex-end"} justify={'space-between'} mt={'md'} mb={'md'}>
        <TableFilter
          filterBySearch={typeof filter?.filterBySearch === 'boolean' ? filter.filterBySearch : true}
          filterByStatus={typeof filter?.filterByStatus === 'boolean' ? filter.filterByStatus : true}
          filterByCategories={typeof filter?.filterByCategories === 'boolean' ? filter.filterByCategories : false}
          search={search}
          status={status}
          handleSearchChange={handleSearchChange}
          handleClearAll={handleClearAll}
          handleStatusChange={handleStatusChange}
        />
        {!!actionBtn  &&
          <Button mb={'md'} onClick={() => setShowChildren(!showChildren)}>
            <Box mr={'4px'}>{showChildren ? actionBtn.close : actionBtn.open}</Box>
            {showChildren
              ? <IconLogout/>
              : <IconPlus/>
            }
          </Button>}
      </Group>

      <Box pos="relative">
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>
        <div className={`${classes.table} ${showChildren ? classes.active : ''}`}>

            <div>
              {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
              <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                <Table.Tbody>
                  <Table.Tr>
                    {headers.map((item) => (
                      <Table.Th key={item.key}>
                        <Text fw={500} fz="sm">
                          {item.name}
                        </Text>
                      </Table.Th>
                    ))}
                  </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                  {paginatedData.length > 0 ? (
                    rows(paginatedData) // Передаем только данные текущей страницы
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={Object.keys(data[0]).length}>
                        <Text fw={500} ta="center">
                          {notFoundMessage || 'No data.'}
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
              ) : null}
            </div>
          <div className={`${classes.children} ${showChildren ? classes.active : ''}`}>
            {children}
          </div>
        </div>
        <Group justify={'end'}>
          <Pagination
            total={Math.ceil(filteredData.length / pageSize)} // Количество страниц
            value={activePage}
            onChange={setPage}
            color={'primary'}
            mt="sm"
          />
        </Group>
      </Box>
    </ScrollArea>
  );
}
