
const SERVER_URL = "http://localhost:3000/contacts"
window.onload = () => {
    //feedback
    const feedback = document.querySelector('#formFeedback')
    const titleFeedback = document.querySelector("#formFeedback .htextMedium")
    const textFeedback = document.querySelector("#formFeedback .bodyRegular")

    //form succesfully sent
    function _formSucceeded() {
        feedback.classList.remove("invisible");
        feedback.classList.remove("formError");
        feedback.classList.add("formSuccess") 
        titleFeedback.innerHTML = "&#128232;Message on the way!"
        textFeedback.innerHTML = "Your information was successfully submitted -- We'll get back to you as soon as possible!"
        
    }

    //form error
    function _formFailed() {
        feedback.classList.remove("invisible");
        feedback.classList.remove("formSuccess");
        feedback.classList.add("formError");
        titleFeedback.innerHTML = "&#129300; Oops... Looks like you missed something"
        textFeedback.innerHTML = "Please, check the content of the fields marked in red below"
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
        .catch(formFailed())
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
            return true
        } else {
            return false
        }
    }

    function _validatePhone(phone) {
        if(phone.length === 9) {
            return true
        } else {
            return false
        } 
    }

    function _validateString(str) {
        if (str) {
            return true
        } else {
            return false;
        }
    }

    function _printValues(arrBoolean, arrDOM) {
        for (let i = 0; i<arrBoolean.length; i++) {
            if (arrBoolean[i] === true) {
                arrDOM[i].style.backgroundColor = "rgba(107, 112, 141, 0.1)"
            } else {
                arrDOM[i].style.backgroundColor = "#f9d1ca"
            }
        }
    }


    function _validateAndPost() {
        const contact = _getContact();
        const email = document.querySelector('#email')
        const phone = document.querySelector('#phone')
        const fullName = document.querySelector('#name')
        const message = document.querySelector('#message')

        const arrValidate = [_validateString(contact.fullName), _validateEmail(contact.email), _validatePhone(contact.phone), _validateString(contact.message)]
        const arrElements = [fullName, email, phone, message]

        if (!arrValidate.includes(false)) {
            _saveContactData(contact)
            _formSucceeded()
            arrElements.forEach((element) => {
                element.style.backgroundColor = "rgba(107, 112, 141, 0.1)"
            });
        } else {
            _formFailed();
            _printValues(arrValidate, arrElements)
        }
        
    }

    function _bindEvents() {
        const submitButton = document.querySelector('button');
        submitButton.addEventListener('click', _validateAndPost);
    }

    _bindEvents();

}