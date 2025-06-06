export interface Dish {
  description: string;  // Описание блюда
  isAvailable: boolean; // Наличие блюда
  name: string;         // Название блюда
  id: string;
  nutritionalId: number; // Идентификатор питательной информации
  photo: string;        // URL фото блюда
  price: number;        // Цена блюда
  weight: number;       // Вес блюда
}