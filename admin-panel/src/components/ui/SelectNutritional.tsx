import React, {useEffect} from 'react';
import useMenuStore from "@/pages/core/Menu/store/menuStore";
import {Select} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import ApiService from "@/services/ApiService";

function SelectNutritional({label, placeholder, formParams = {}}: {
  label?: string;
  formParams?: any;
  placeholder?: string
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['Nutritionals'],
    initialData: [],
    queryFn: async () => {
      const res = await ApiService.fetchData({
        url: 'nutritional',
        method: 'get',
      });

      // Проверяем, что запрос успешен, и возвращаем массив данных
      if (res?.data?.response?.status === 200) {
        return res.data.payload.nutritionals;
      } else {
        throw new Error('Failed to fetch nutritionals');
      }
    },
  });
  //
  // useEffect(() => {
  //   fetchData()
  // }, []);

  const selectData = data.map(item => ({
    value: item.id + '',   // Используем id в качестве значения
    label: `Calories: ${item.calories}, Proteins: ${item.proteins}, Fats: ${item.fats}, Carbohydrates: ${item.carbohydrates}`  // Форматируем label с нужными данными
  }));

  return (
    <div>
      <Select
        {...formParams}
        disabled={isLoading}
        label={label || "Choose nutritional"}
        placeholder={placeholder || "Choose nutritional"}
        data={selectData}
        size={'sm'}
      />
    </div>
  );
}

export default SelectNutritional;