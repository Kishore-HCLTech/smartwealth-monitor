import axios from "axios";
import { API_BASE_URL } from "./constants/appConstants";
import { setLoading } from "./redux/service/loadingSlice";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL
});

export const setupInterceptors = (dispatch: any) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            dispatch(setLoading(true));
            return config;
        },
        (error) => {
            dispatch(setLoading(false));
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            dispatch(setLoading(false));
            return response;
        },
        (error) => {
            dispatch(setLoading(false));
            return Promise.reject(error);
        }
    );
};

export default axiosInstance;
