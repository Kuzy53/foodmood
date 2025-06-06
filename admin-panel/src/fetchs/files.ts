import ApiService from "@/services/ApiService";
import {notifications} from "@mantine/notifications";

export const uploadFile = async (file: any): Promise<any> => {
  let data = new FormData();
  data.append('body', file);
  data.append('mimeType', 'image/png');

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'storage/upload/',
    data : data
  };

  try {
    const res = await ApiService.fetchData(config)

    if(res?.data?.payload?.filePath){
      return res.data.payload.filePath
    }
    notifications.show({message: "Error uploading file"})
    return null
  }catch (err){
    notifications.show({message: "Server Error"})
  }

}