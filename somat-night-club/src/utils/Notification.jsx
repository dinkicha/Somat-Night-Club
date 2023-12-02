import toast from "react-hot-toast";

export function SuccessNotify(message) {
    toast.success(message);
}

export function ErrorNotify(message) {
    toast.error(message);
}

