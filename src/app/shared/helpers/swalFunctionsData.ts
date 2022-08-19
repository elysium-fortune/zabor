export const SwalSuccessToast: any = (title) => {
    return {
        icon: 'success',
        position: 'top-end',
        title: title,
        showConfirmButton: false,
        timer: 5000,
        toast: true,
        timerProgressBar: true,
    }
};

export const SwalErrorToast: any = (title) => {
    return {
        icon: 'error',
        position: 'top-end',
        title: "Oops",
        text: title,
        showConfirmButton: false,
        timer: 5000,
        toast: true,
        timerProgressBar: true,
    }
};

export const SwalConfirm: any = (text) => {
    return {
        title: 'Are you sure?',
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }
}