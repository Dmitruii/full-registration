import $api from '../http'
import {AxiosResponse} from 'axios'
import {IUser} from "../models/IUser";

export default class UserService {
    static async fetchUsers (): Promise<AxiosResponse<Array<IUser>>> {
        return $api.get<Array<IUser>>('/users')
    }
}
