import React, {useEffect} from 'react';
import useMenuStore from "@/pages/core/Menu/store/menuStore";
import {Select} from "@mantine/core";

function SelectMenu({label, placeholder, formParams = {}}: {label?: string;formParams?:any; placeholder?: string}) {
  const { fetchData, loading, menuList } = useMenuStore()

  useEffect(() => {
    fetchData()
  }, []);

  const selectData = menuList.map(menuItem => ({
    value: menuItem.id,   // Use id as the value
    label: menuItem.name  // Use name as the label
  }));

  return (
    <div>
      <Select
        {...formParams}
        disabled={loading}
        label={label || "Choose menu"}
        placeholder={placeholder || "Choose placeholder"}
        data={selectData}
      />
    </div>
  );
}

export default SelectMenu;