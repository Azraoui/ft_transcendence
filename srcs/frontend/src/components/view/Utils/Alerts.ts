import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const success_alert = (msg:string) => {

    toast.success(msg, {
        position: toast.POSITION.TOP_RIGHT
    });
};
export const error_alert = () => {
    toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT
    });
};

export const error_alert_channel = () => {
    toast.error("Channel Name Already exist", {
        position: toast.POSITION.TOP_RIGHT
    });
};

export const error_alert_channel_password = () => {
    toast.error("password not correct", {
        position: toast.POSITION.TOP_RIGHT
    });
};


export const new_message_alert = (msg:string) => {
    toast.info(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        });
};
