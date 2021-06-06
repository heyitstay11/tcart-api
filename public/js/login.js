const form = document.querySelector('form');
const usernameErr = document.querySelector('.username.error');
const passwordErr = document.querySelector('.password.error');
const { log } = console;


//  ----------------- USERNAME VALIDATION -------------------

const validateUsername = (value) => {
    usernameErr.textContent = '';
    let errors = [];

    if(!value)  errors.push('Username cannot be blank'); 
    
    if(value.length < 6)  errors.push('Username should at least have 6 characters');
    
    if(!isNaN(+value))  errors.push('Username cannot be a number');
    
    if(errors)  usernameErr.textContent = errors[0];

    return errors;
}

const validateUsernameAggresive = (e) => {
    let { value } = e.target;
    value = value.trim();
    validateUsername(value);
}

const validateUsernameLazy = (e) => {
    let { value } = e.target;
    value = value.trim();

    const errors = validateUsername(value);

    if(errors.length !== 0){
        form.username.addEventListener('input', validateUsernameAggresive);
    }else{
        form.username.removeEventListener('input', validateUsernameAggresive);
    }
}

form.username.addEventListener('blur', validateUsernameLazy);


// ----------------------- PASSWORD VALIDATION ---------------------


const validatePassword = (value) => {
    passwordErr.textContent = '';
    let errors = [];

    if(!value)  errors.push('Password cannot be blank'); 
    
    if(value.length < 8)  errors.push('Password should at least have 8 characters');

    if(errors)  passwordErr.textContent = errors[0];

    return errors;
}

const validatePasswordAggresive = (e) => {
    let { value } = e.target;
    value = value.trim();
    validatePassword(value);
}

const validatePasswordLazy = (e) => {
    let { value } = e.target;
    value = value.trim();

    const errors = validatePassword(value);

    if(errors.length !== 0){
        form.password.addEventListener('input', validatePasswordAggresive);
    }else{
        form.password.removeEventListener('input', validatePasswordAggresive);
    }
}

form.password.addEventListener('blur', validatePasswordLazy);

// -------------------------  HANDLE SUBMISSION --------------------


const handleSubmit = async (e) => {
    e.preventDefault();
    const username = form.username.value.trim();
    const password = form.password.value.trim();

    usernameErr.textContent = passwordErr.textContent = '';
    let errors = [
        ...validateUsername(username),
        ...validatePassword(password)
    ];
    if(errors.length === 0){
        log('Form Submitted');
        try {
            const res = await fetch('/login', {
                method: 'POST',
                body: JSON.stringify( {username, password} ),
                headers:{'Content-Type': 'application/json'}
            });
    
            const data = await res.json();
            if(data.error){
                log(data.error)
               usernameErr.textContent = data.error.username || '';
               passwordErr.textContent = data.error.password || '';
               return
            }
            if(data.auth){
                location.assign('/');
            }
        } catch (error) {
            log(error)
        }
    }
}

form.addEventListener('submit', handleSubmit);