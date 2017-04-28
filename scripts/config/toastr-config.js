let toastrSettings = (function() {
    toastr.options = {
        tapToDismiss: true,
        toastClass: "toast",
        containerId: "toast-container",
        debug: false,
        fadeIn: 300,
        fadeOut: 500,
        extendedTimeOut: 1000,
        iconClass: "toast-info",
        positionClass: "toast-top-center",
        timeOut: 1300, // Set timeOut to 0 to make it sticky
        titleClass: "toast-title",
        messageClass: "toast-message"
    }

    return toastr.options;
})();

export { toastrSettings };