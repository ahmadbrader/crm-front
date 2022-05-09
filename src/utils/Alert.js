import Swal from 'sweetalert2'

export function showAlertLoader(params={}){
    let defaultOptions = {
        iconHtml: '<img src="/loader.svg" class="icon-loader" />',
        title: 'Loading',
        text: 'Please wait, proccessing data',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        customClass: {
            container: 'enotif-alert enotif-loader'
        }
    };

    return Swal.fire({...defaultOptions, ...params})

}

export function showAlert(params={}, containerClass="center", customClass={}){
    let defaultCustomClass = { container: `enotif-alert ${containerClass}` }
    let defaultOptions = {
        title: 'Success',
        text: 'text',
        showConfirmButton: 'true',
        confirmButtonColor: '#15b8a6',
        reverseButtons: true,
        customClass: { ...defaultCustomClass, ...customClass}
    };

    return Swal.fire({...defaultOptions, ...params})

}

export function showErrorAlert(params={}){
    let defaultOptions = {
        'icon': 'error',
        title: 'Error',
        text: 'Opps, Something went wrong',
        showConfirmButton: 'true',
        confirmButtonColor: '#15b8a6',
        customClass: {
            container: 'enotif-alert'
        }
    };

    return Swal.fire({...defaultOptions, ...params})

}

export function closeAlert() {
    Swal.close()
}
