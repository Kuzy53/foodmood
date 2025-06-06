import { Server, Response } from 'miragejs';

export default function menuFakeApi(server: Server, apiPrefix: string) {
  server.post(`${apiPrefix}/v1/menus/menu`, (schema, { requestBody }) => {
    const { menu } = JSON.parse(requestBody);
    console.log('Received menu data:', menu);

    // Пример проверки данных
    if (menu && menu.name && menu.description) {
      // Имитация успешного ответа
      return {
        menu: {
          id: Math.random().toString(36).substr(2, 9), // Генерация случайного ID
          ...menu,
        }
      };
    }

    // Возврат ошибки при некорректных данных
    return new Response(
      400,
      { some: 'header' },
      { message: 'Invalid menu data!' }
    );
  });
}