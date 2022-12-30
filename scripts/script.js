const form = document.getElementById('form');
const hamburger = document.querySelector('.menu__hamburger');
const menu = document.querySelector('.menu');
const closeButton = document.querySelector('.menu__close');
const menuPopup = document.querySelector('#menu-popup');
const showVideo = document.querySelector('.button__about');
const showMenuPopup = document.querySelector('#about-popup');

form.addEventListener('submit', formSend);
async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);
    let formData = new FormData(form);
    let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
        });
        if(response.ok) {
            let result = await response.json();
            alert(result.message);
            formPreview.innerHTML = '';
            form.reset();
        } else {
            alert("Ошибка");
        }
};

function formValidate(form) {
    let error = 0;
    let formReq = document.querySelector('._req');
    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        formRemoveError(input);

        if(input.classList.contains('_email')){
            if (emailTest(input)){
                formAddError(input);
                error++;
            }
        }
        else if(input.getAttribute("type") === "checkbox" && input.checked === false){
            formAddError(input);
            error++;
        }
        else {
            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }
    }
};

function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}

function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
};

function closeMenu (elem) {
    elem.classList.remove("menu__popup_opened");
  };
function openPopup (elem) {
    elem.classList.add("menu__popup_opened");
  };
function openVideoPopup (elem) {
    elem.classList.add("about__popup_opened");
};
function closeVideoPopup (elem) {
    elem.classList.remove("about__popup_opened");
}

closeButton.addEventListener('click', () => {
    closeMenu(menuPopup);
    closeVideoPopup(showMenuPopup);
    document.body.classList.remove('page__lock');
    });
hamburger.addEventListener('click', () => {
    openPopup(menuPopup);
    });
menuPopup.addEventListener('click', () => {
    closeMenu(menuPopup);
    });
showVideo.addEventListener('click', () => {
    openVideoPopup(showMenuPopup);
    document.body.classList.add('page__lock');
    });