const form = document.querySelector('form');
const usernameErr = document.querySelector('.username.error');
const passwordErr = document.querySelector('.password.error');
const confirmPasswordErr = document.querySelector('.confirm_password.error');
const keyErr = document.querySelector('.key.error');
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

// ------------------------ CONFIRM PASSWORD VALIDATION ------------


const validateConfirmPassword = (value) => {
    confirmPasswordErr.textContent = '';
    let errors = [];

    if(value !== form.password.value)  errors.push('Does not match Password field');

    if(errors)  confirmPasswordErr.textContent = errors[0];

    return errors;
}

const validateConfirmPasswordAggresive = (e) => {
    let { value } = e.target;
    value = value.trim();
    validateConfirmPassword(value);
}

const validateConfirmPasswordLazy = (e) => {
    let { value } = e.target;
    value = value.trim();

    const errors = validateConfirmPassword(value);

    if(errors.length !== 0){
        form.confirm_password.addEventListener('input', validateConfirmPasswordAggresive);
    }else{
        form.confirm_password.removeEventListener('input', validateConfirmPasswordAggresive);
    }
}

form.confirm_password.addEventListener('blur', validateConfirmPasswordLazy);


// -------------------------  HANDLE SUBMISSION --------------------



const handleSubmit = async (e) => {
    e.preventDefault();
    const username = form.username.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirm_password.value.trim();
    const key = form.key.value.trim();

    usernameErr.textContent = passwordErr.textContent = confirmPasswordErr.textContent = keyErr.textContent =  '';

    let errors = [
        ...validateUsername(form.username.value),
        ...validatePassword(form.password.value),
        ...validateConfirmPassword(form.confirm_password.value)
    ];
    if(errors.length === 0){
        log('Form Submitted');

        try {
            const res = await fetch('/signup', {
                method: 'POST',
                body: JSON.stringify( {username, password, confirmPassword, key} ),
                headers:{'Content-Type': 'application/json'}
            });
    
            const data = await res.json();
            log(data);
            if(data.error){
                log(data.error)
               usernameErr.textContent = data.error.username || '';
               passwordErr.textContent = data.error.password || '';
               confirmPasswordErr.textContent = data.error.confirmPassword || '';
               keyErr.textContent = data.error.key || '';
               return
            }

            // if(data.auth){
            //     location.assign('/');
            // }
        } catch (error) {
            log(error)
        }

    }
}

form.addEventListener('submit', handleSubmit);