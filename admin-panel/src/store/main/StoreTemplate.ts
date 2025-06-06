import { create } from 'zustand';
import ApiService from "@/services/ApiService";
import validateApi from "@/utils/validateApi";
import {a} from "vitest/dist/suite-IbNSsUWN";

interface Store {
  dataList: any[];
  loading: boolean;
  createItem: (url:string, data: any) => Promise<any>;
  updateItem: (url:string, data: any) => Promise<any>;
  fetchOne: (url: string) => Promise<any>;
  removeItem: (url:string) => Promise<any>; // Return type of async function should be Promise
  fetchData: (url: string) => Promise<any>; // Return type of async function should be Promise
}


const useStore = create<Store>((set) => ({
  dataList: [],
  loading: false,

  // Универсальная функция для получения данных
  fetchData: async (url: string) => {
    set({ loading: true });
    try {
      const res = await ApiService.fetchData({ url, method: 'GET' });

      if(res?.status !== 200){
        return
      }

      if (res.data?.payload) {
        set({ dataList: findArrayInObject(res.data.payload)});
      }

      return res;
    } finally {
      set({ loading: false });
    }
  },

  // Универсальная функция для создания
  createItem: async (url: string, data: any) => {
    set({ loading: true });
    try {
      const res = await ApiService.fetchData({ url, method: 'POST', data });
      return res;
    } finally {
      set({ loading: false });
    }
  },

  // Универсальная функция для удаления
  removeItem: async (url: string) => {
    set({ loading: true });
    try {
      const res = await ApiService.fetchData({ url, method: 'DELETE' });
      return res;
    } finally {
      set({ loading: false });
    }
  },

  // Универсальная функция для обновления
  updateItem: async (url: string, data: any) => {
    set({ loading: true });
    try {
      const res = await ApiService.fetchData({ url, method: 'PUT', data });
      return res;
    } finally {
      set({ loading: false });
    }
  },

  fetchOne: async (url) => {
    set({ loading: true });
    try {
      const res = await ApiService.fetchData({ url, method: 'get' });
      return res;
    } finally {
      set({ loading: false });
    }
  }
}));

function findArrayInObject(obj) {
  if (Array.isArray(obj)) {
    return obj;
  }

  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Рекурсивно проверяем каждый ключ
        const result = findArrayInObject(obj[key]);
        if (result) {
          return result; // Возвращаем массив, если найден
        }
      }
    }
  }

  // Возвращаем null, если массив не найден
  return null;
}

export default useStore;
