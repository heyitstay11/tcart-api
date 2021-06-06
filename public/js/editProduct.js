// -------------------- HANDLE SUBMISSION ---------------------

const id = document.querySelector('.id').textContent.trim();
const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const handleSubmit = async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const imgLink = form.imgLink.value.trim();
    const price = form.price.value.trim();
    const description = form.description.value.trim();

    nameErr.textContent = imgLinkErr.textContent = 
    priceErr.textContent = descriptionErr.textContent = '';

    let errors = [
        ...validateName(name),
        ...validateDescription(description),
        ...validatePrice(price),
        ...validateImgLink(imgLink),
    ];

    if(errors.length === 0){
        log('Form Submitted');
        try {
            const res = await fetch(`/products/${id}/edit`, {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify( { name, description, price, imgLink } ),
                headers:{
                    'Content-Type': 'application/json',
                    'CSRF-TOKEN': token
                }
            });
            const data = await res.json();
            if(data.error){
                log(data.error)
                nameErr.textContent = data.error.name || '';
                imgLinkErr.textContent = data.error.imgLink || '';
                priceErr.textContent = data.error.price || '';
                descriptionErr.textContent = data.error.descripiton || '';
               return
            }else{
                log(data);
                location.assign('/products/');
            }
        }catch(error){
            log(error)
        }
    }
}

form.addEventListener('submit', handleSubmit);