import React, {useEffect} from 'react';
import useMenuStore from "@/pages/core/Menu/store/menuStore";
import {Select} from "@mantine/core";
import useRestStore from "@/pages/core/Restaurant/store/restaurantStore";

function SelectRestuarant({label, placeholder, formParams = {}}: {label?: string;formParams?:any; placeholder?: string}) {
  const { fetchData, loading, restaurants } = useRestStore()

  useEffect(() => {
    fetchData()
  }, []);

  const selectData = restaurants.map(menuItem => ({
    value: menuItem.id,   // Use id as the value
    label: menuItem.name  // Use name as the label
  }));

  return (
    <div>
      <Select
        {...formParams}
        disabled={loading}
        label={label || "Choose restaurant"}
        placeholder={placeholder || "Choose restaurant"}
        data={selectData}
      />
    </div>
  );
}

export default SelectRestuarant;