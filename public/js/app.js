const requestModal = document.querySelector('.new-request');
const reuqestLink = document.querySelector('.add-request');
const requestForm = document.querySelector('.new-request form');


reuqestLink.addEventListener('click', () => {
    requestModal.classList.add('open');
});

requestModal.addEventListener('click', (e)=>{
    if(e.target.classList.contains('new-request')){
        requestModal.classList.remove('open');
    }
});

// add a new request
requestForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const addRequest = firebase.functions().httpsCallable('addRequest');
    addRequest({
        text: requestForm.request.value,
    }).then(()=>{
        requestForm.reset();
        requestModal.classList.remove('open');
        registerForm.querySelector('.error').textContent = '';
    }).catch(error => {
        registerForm.querySelector('.error').textContent = error.message;
    });

});

//notification
const notification = document.querySelector('.notification');

const showNotification = (message)=>{
    notification.textContent = message;
    notification.classList.add('active');
    setTimeout(()=>{
        notification.classList.remove('active');
        notification.textContent = '';
    }, 2000);
}