
const SERVER_URL = "http://localhost:3000/contacts"
window.onload = () => {
    //delete values
    function clearForm() {
        let fullName = document.querySelector('#name')
        let email = document.querySelector('#email')
        let phone = document.querySelector('#phone')
        let message = document.querySelector('#message')

        fullName.value = ""
        email.value = ""
        phone.value = ""
        message.value = "Write your message here..."
        email.style.backgroundColor = "rgba(107, 112, 141, 0.1)"
        phone.style.backgroundColor = "rgba(107, 112, 141, 0.1)"
    }

    //feedback
    const feedback = document.querySelector('#formFeedback')
    const titleFeedback = document.querySelector("#formFeedback .htextMedium")
    const textFeedback = document.querySelector("#formFeedback .bodyRegular")

    //form succesfully sent
    function formSucceeded() {
        feedback.classList.remove("invisible");
        feedback.classList.remove("formError");
        feedback.classList.add("formSuccess") 
        titleFeedback.innerHTML = "&#128232;Message on the way!"
        textFeedback.innerHTML = "Your information was successfully submitted -- We'll get back to you as soon as possible!"
        clearForm();
    }

    //feedback - form error
    function formFailed() {
        feedback.classList.remove("invisible");
        feedback.classList.remove("formSuccess");
        feedback.classList.add("formError");
        titleFeedback.innerHTML = "&#129300; Oops... Looks like you missed something"
        textFeedback.innerHTML = "Please, check the content and format of the fields marked in red below"
    }

    //fetch contact
    function _saveContactData(contact) {
        fetch(SERVER_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact)
        })
        
        .catch((err)=> console.error(err))
    }

    function _getContact() {
        
        const fullName = document.querySelector('#name').value
        const email = document.querySelector('#email').value
        const phone = document.querySelector('#phone').value
        const message = document.querySelector('#message').value
        return {
            fullName,
            email,
            phone,
            message
        }
    }

    //validate and post
    function _validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        } else {
            return (false)
        }
    }

    function _validatePhone(phone) {
        if(phone.length === 9) {
            return true
        } else {
            return false
        } 
    }


    function _validateAndPost() {
        const contact = _getContact();
        const email = document.querySelector('#email')
        const phone = document.querySelector('#phone')
        
        if(_validateEmail(contact.email) && _validatePhone(contact.phone)) {
            _saveContactData(contact);
            formSucceeded()
        } else if (!_validateEmail(contact.email) && _validatePhone(contact.phone)) {
            formFailed();
            email.style.backgroundColor = "#f9d1ca"
            phone.style.backgroundColor = "rgba(107, 112, 141, 0.1)"
        } else if (!_validatePhone(contact.phone) && _validateEmail(contact.email)) {
            formFailed();
            phone.style.backgroundColor = "#f9d1ca"
            email.style.backgroundColor = "rgba(107, 112, 141, 0.1)"
        } else if (!_validatePhone(contact.phone) && !_validateEmail(contact.email)){
            formFailed();
            email.style.backgroundColor = "#f9d1ca";
            phone.style.backgroundColor = "#f9d1ca"
        }
    }

    function bindEvents() {
        const submitButton = document.querySelector('button');
        submitButton.addEventListener('click', _validateAndPost);
    }

    bindEvents();

}
    /*

    
    

    
    

    
    */