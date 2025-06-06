import {notifications} from "@mantine/notifications";

interface IValidateApi {}

interface IValidateApi {
  payload: any,
  response: {
    status: number
  }
}

export default function validateApi(data: IValidateApi) {
  if(data.response.status === 200){
    // notifications.show({ message: '', color: 'red' });
    return true
  }

  return false
}