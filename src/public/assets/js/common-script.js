// Navigate to contact - Dẫn đến trang booking
function navigateToBooking() {
    window.location.href = '/booking'; 
}

// Toast function
function toast({
    title = "",
    message = "",
    type = "info    ",
    duration = 1000,
    delay = 3000,
}) {
    const main = document.getElementById("message");

    if (main) {
        const toast = document.createElement("div");

        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, duration + delay);

        // Remove toast when click
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                // clearTimeout - không thực hiện function autoRemoveId
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: "fas fa-check-circle",
            warning: 'fa-sharp fa-solid fa-circle-exclamation',
            error: 'fa-sharp fa-solid fa-circle-xmark',
        };

        const icon = icons[type];
        const timeDelay = (delay / 1000).toFixed(2);
        const timeDuration = (duration / 1000).toFixed(2);
        toast.classList.add("toast", `toast--${type}`);

        /* forwards - stop at the end. */
        toast.style.animation = `slideInLeft ease .5s, fadeOut linear ${timeDuration}s ${timeDelay}s forwards`;

        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <div class="toast__title">${title}</div>
                <div class="toast__mgs">${message}</div>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        `;

        main.appendChild(toast);
    }
}

function showSuccessToast(title, info) {
    toast({
        title: title,
        message: info,
        type: "success",
        duration: 1000,
        delay: 3000,
    });
}

function showWarningToast(infoWarning) {
    toast ({
    title: 'Note',
    message: infoWarning,
    type: 'warning',
    duration: 1000,
    delay: 3000
})
}

function showErrorToast(title, infoError) {
    toast({
        title: title,
        message: infoError,
        type: 'error',
        duration: 1000,
        delay: 3000
    })
}

function isEmptyForm(form) {
    var formElement = document.getElementById(form);
    var elements = formElement.elements;
    var isEmpty = true;

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type !== "button" && elements[i].value.trim() !== "") {
            console.log(elements[i])
            isEmpty = false;
            break;
        }
    }
    return isEmpty;
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('signup') && urlParams.get('signup') === 'true') {
        showSuccessToast("Registered successfully!", "Congratulations, you have successfully registered an account!")
    }
    else if (urlParams.has('signup') && urlParams.get('signup') === 'false') {
        showErrorToast("Account creation failed!", "Username already exists, please check your registration information again!");
    }
    
    else if (urlParams.has('login') && urlParams.get('login') === 'true') {
        showSuccessToast("Log in successfully.", "Welcome to Tourest.")
    }
    else if (urlParams.has('login') && urlParams.get('login') === 'false') {
        showErrorToast("Login failed!", "Username or password is incorrect.");
    }
    
    else if (urlParams.has('booking') && urlParams.get('booking') === 'true') {
        showSuccessToast("Booking successfully.", "Thank you for your booking.")
    }
    else if (urlParams.has('booking') && urlParams.get('booking') === 'false') {
        showWarningToast("Please login before booking tour!");
    }
    
    else if (urlParams.has('send-request') && urlParams.get('send-request') === 'true') {
        showSuccessToast("Thank you!","We will contact you soon.");
    }

  });

