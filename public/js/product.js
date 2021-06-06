const form = document.querySelector('form');
const nameErr = document.querySelector('.name.error');
const imgLinkErr = document.querySelector('.imgLink.error');
const priceErr = document.querySelector('.price.error');
const descriptionErr = document.querySelector('.description.error');
const { log } = console;

//  ----------------- NAME VALIDATION -------------------

const validateName = (value) => {
    nameErr.textContent = '';
    let errors = [];

    if(!value)  errors.push('Name cannot be blank'); 
    
    if(!isNaN(+value))  errors.push('Name cannot be a number');
    
    if(errors)  nameErr.textContent = errors[0];

    return errors;
}

const validateNameAggresive = (e) => {
    let { value } = e.target;
    value = value.trim();
    validateName(value);
}

const validateNameLazy = (e) => {
    let { value } = e.target;
    value = value.trim();

    const errors = validateName(value);

    if(errors.length !== 0){
        form.name.addEventListener('input', validateNameAggresive);
    }else{
        form.name.removeEventListener('input', validateNameAggresive);
    }
}

form.name.addEventListener('blur', validateNameLazy);

//  ----------------- IMAGE LINK VALIDATION -------------------

const validateImgLink = (value) => {
    imgLinkErr.textContent = '';
    let errors = [];

    if(!value)  errors.push('Image Link cannot be blank');
        
    if(errors)  imgLinkErr.textContent = errors[0];

    return errors;
}

const validateImgLinkAggresive = (e) => {
    let { value } = e.target;
    value = value.trim();
    validateImgLink(value);
}

const validateImgLinkLazy = (e) => {
    let { value } = e.target;
    value = value.trim();

    const errors = validateImgLink(value);

    if(errors.length !== 0){
        form.imgLink.addEventListener('input', validateImgLink);
    }else{
        form.imgLink.removeEventListener('input', validateImgLink);
    }
}

form.imgLink.addEventListener('blur', validateImgLinkLazy)


//  ----------------- PRICE VALIDATION -------------------

const validatePrice = (value) => {
    priceErr.textContent = '';
    let errors = [];

    if(!value)  errors.push('Price cannot be blank'); 
    
    if(isNaN(+value))  errors.push('Price should be a valid number');
    
    if(errors)  priceErr.textContent = errors[0];

    return errors;
}

const validatePriceAggresive = (e) => {
    let { value } = e.target;
    value = value.trim();
    validatePrice(value);
}

const validatePriceLazy = (e) => {
    let { value } = e.target;
    value = value.trim();

    const errors = validatePrice(value);

    if(errors.length !== 0){
        form.price.addEventListener('input', validatePriceAggresive);
    }else{
        form.price.removeEventListener('input', validatePriceAggresive);
    }
}

form.price.addEventListener('blur', validatePriceLazy);


//  ----------------- DESCRIPTION VALIDATION -------------------

const validateDescription = (value) => {
    descriptionErr.textContent = '';
    let errors = [];

    if(!value)  errors.push('Description cannot be blank'); 
    
    if(!isNaN(+value))  errors.push('Description cannot be a number');
    
    if(errors)  descriptionErr.textContent = errors[0];

    return errors;
}

const validateDescriptionAggresive = (e) => {
    let { value } = e.target;
    value = value.trim();
    validateDescription(value);
}

const validateDescriptionLazy = (e) => {
    let { value } = e.target;
    value = value.trim();

    const errors = validateDescription(value);

    if(errors.length !== 0){
        form.description.addEventListener('input', validateDescriptionAggresive);
    }else{
        form.description.removeEventListener('input', validateDescriptionAggresive);
    }
}

form.description.addEventListener('blur', validateDescriptionLazy);