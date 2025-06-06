import React, {useEffect} from 'react';
import useMenuStore from "@/pages/core/Menu/store/menuStore";
import {Select} from "@mantine/core";
import useLocationsStore from "@/store/main/LocationsStore";

function LocationsMenu({label, placeholder, formParams = {}}: {label?: string;formParams?:any; placeholder?: string}) {
  const { fetchData, loading, locations } = useLocationsStore()

  useEffect(() => {
    fetchData()
  }, []);

  const selectData = locations.map(item => ({
    value: '' + item.id,   // Use id as the value
    label: '' + item.id  // Use name as the label
  }));

  return (
    <div>
      <Select
        {...formParams}
        disabled={loading}
        label={label || "Choose location"}
        placeholder={placeholder || "Choose location"}
        data={selectData}
      />
    </div>
  );
}

export default LocationsMenu;