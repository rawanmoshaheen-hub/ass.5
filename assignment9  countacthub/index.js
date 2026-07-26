var cachedFormElements = {
  contactImage:"",
  contactName:"",
  contactPhone:"",
  contactEmail:"",
  contactAddress:"",
  contactGroup:"",
  contactNotes:"",
  favoritecheckbox:"",
  emergencycheckbox:""
}
var formIsValid = true
var currentInput = undefined
var currentImage= ''

var formFields = {
  name: {
    title: "Name",
    value: "name",
    msgError: "Name is required."
  },
  phone: {
    title: "Phone",
    value: "phone",
    msgError: "Please enter a valid phone number."
  },
  email: {
    title: "Email",
    value: "email",
    msgError: "Please enter a valid email."
  },
  address: {
    title: "Address",
    value: "address",
    msgError: "Address is required."
  }
};

var contactList = getFromLocalStorage()
if (contactList == null) {
    contactList = []
}

function $(id) {
    return document.getElementById(id)
}

    function toggleModal () {
    $('wrapperForm').classList.toggle('d-none')
    $('overlay').classList.toggle('show') 
}


function sweetAlert (title,text,icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon
    });
}

function getFromLocalStorage() {
   return JSON.parse(localStorage.getItem('contactList'))
}

function setFromLocalStorage(data) {
    localStorage.setItem("contactList",JSON.stringify(data))
}

function convertObjToArray () {
  return Object.keys(cachedFormElements)
}

function clear () {
    var formElements = convertObjToArray()
    for (var i =0; i<formElements.length ; i++) {
        var key = formElements[i]
        if(key == 'contactImage') {
            cachedFormElements[key].value = ''
            currentImage = ''
            $('userImage').src = ''
        } else if(key == 'favoritecheckbox' || key == 'emergencycheckbox') {
            cachedFormElements[key].checked = false
        } else {
            cachedFormElements[key].value = ''
        }
    }
}

function isMatch() {
    for(var i = 0; i < contactList.length; i++) {
        if(contactList[i].contactPhone == cachedFormElements.contactPhone.value) {
            return true
        }
    }
    return false
}

function inlineValidations (el,key) {
    var regex ;
    var inputIsValid =false ;
    if (key =='contactName' ) {
         regex = /^[a-zA-Z0-9 _-]{3,30}$/
         currentInput = 'name'
         inputIsValid = regex.test(el.value)
    } else if (key =='contactEmail') {
        if(el.value == '') { inputIsValid = true }
        else {
            regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            currentInput = 'email'
            inputIsValid = regex.test(el.value)
        }
     } else if (key == 'contactPhone') {
        regex = /^01[0-9]{9}$/
         currentInput = 'phone'
       inputIsValid = regex.test(el.value)
    }

    if (inputIsValid) {
        el.nextElementSibling.classList.add('d-none')
    } else {
        el.nextElementSibling.classList.remove('d-none')
    }
    formIsValid = inputIsValid
}

function initFormElements() {
    var formElements = convertObjToArray()
    for(var i =0 ; i<formElements.length;i++) {
        var key = formElements[i]
        cachedFormElements[key] = $(key)
    }
}

function addNewContact () {
    if (formIsValid && currentInput!= undefined &&!isMatch()) {
        var formDate = {}
        formDate['contactName'] = cachedFormElements.contactName.value
        formDate['contactPhone'] = cachedFormElements.contactPhone.value
        formDate['contactEmail'] = cachedFormElements.contactEmail.value
        formDate['contactAddress'] = cachedFormElements.contactAddress.value
        formDate['contactGroup'] = cachedFormElements.contactGroup.value
        formDate['contactNotes'] = cachedFormElements.contactNotes.value
        formDate['favorite'] = cachedFormElements.favoritecheckbox.checked
        formDate['emergency'] = cachedFormElements.emergencycheckbox.checked
        formDate['contactImage'] = currentImage
        formDate['id'] = Date.now()

        contactList.push(formDate)
        setFromLocalStorage(contactList)
        render()
        clear()
        toggleModal()
        sweetAlert('Success', 'Contact added successfully', 'success')
    } else if (isMatch()) {
        sweetAlert('Error', 'This phone number already exists', 'error')
    } else if (!formIsValid && currentInput!= undefined) {
        sweetAlert(`${formFields[currentInput].title}`, `${formFields[currentInput].msgError}`, 'error')
    } else {
        sweetAlert('Error', 'Please fill required fields', 'error')
    }
}

function render () {
    var contactsDate = getFromLocalStorage()
    if (contactsDate == null) {
        contactsDate = []
    }
    var container =''
    for(var i =0; i<contactsDate.length ;i ++) {
        var favoriteBadge = contactsDate[i].favorite? `<span class="contact-badge favorites-color" title="Favorite"><i class="fa-solid fa-star"></i></span>` : ''
        var emergencyBadge = contactsDate[i].emergency? `<span class="contact-badge contact-badge-bottom emergency-color" title="Emergency"><i class="fa-solid fa-heart-pulse"></i></span>` : ''

        var favoriteTag = contactsDate[i].favorite? `<span class="contact-tag favorites-bgcolor text-warning"><i class="fa-solid fa-star"></i> Favorite</span>` : ''
        var emergencyTag = contactsDate[i].emergency? `<span class="contact-tag contact-tag-emergency"><i class="fa-solid fa-heart-pulse"></i> Emergency</span>` : ''
        var groupTag = contactsDate[i].contactGroup? `<span class="contact-tag friends-bgcolor text-success">${contactsDate[i].contactGroup}</span>` : ''

        container += `
        <div class="col-12 col-sm-6">
            <article class="contact-card card-main h-100">
              <div class="contact-card-body">
                <div class="d-flex align-items-center gap-3">
                  <div class="contact-avatar-wrap">
                    <img src="${contactsDate[i].contactImage || 'https://ui-avatars.com/api/?name='+encodeURIComponent(contactsDate[i].contactName)+'&background=6366f1&color=fff'}" alt="Avatar" class="contact-avatar" />
                    ${favoriteBadge}
                    ${emergencyBadge}
                  </div>
                  <div class="min-w-0 flex-grow-1">
                    <h3 class="contact-name text-truncate">${contactsDate[i].contactName}</h3>
                    <div class="contact-meta">
                      <span class="contact-meta-icon text-primary bg-primary-subtle"><i class="fa-solid fa-phone"></i></span>
                      <p class="text-secondary m-0 text-truncate">${contactsDate[i].contactPhone}</p>
                    </div>
                  </div>
                </div>

                <div class="contact-info-list">
                  ${contactsDate[i].contactEmail? `<div class="contact-meta"><span class="contact-meta-icon email-color email-bgColor"><i class="fa-solid fa-envelope"></i></span><p class="text-secondary m-0 text-truncate">${contactsDate[i].contactEmail}</p></div>` : ''}
                  ${contactsDate[i].contactAddress? `<div class="contact-meta"><span class="contact-meta-icon text-success friends-bgcolor"><i class="fa-solid fa-location-dot"></i></span><p class="text-secondary m-0 text-truncate">${contactsDate[i].contactAddress}</p></div>` : ''}
                </div>

                <div class="contact-tags">
                  ${groupTag}
                  ${favoriteTag}
                  ${emergencyTag}
                </div>
              </div>

              <div class="contact-card-actions bg-card-btm">
                <div class="contact-actions-left">
                  <a href="tel:${contactsDate[i].contactPhone}" class="contact-action-btn card-call-bg" title="Call"><i class="fa-solid fa-phone"></i></a>
                  ${contactsDate[i].contactEmail? `<a href="mailto:${contactsDate[i].contactEmail}" class="contact-action-btn card-mail-bg" title="Email"><i class="fa-solid fa-envelope"></i></a>` : ''}
                </div>
                <div class="contact-actions-right">
                  <button type="button" class="contact-action-btn btn pen-btn" onclick="editContact(${contactsDate[i].id})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                  <button type="button" class="contact-action-btn btn delete-btn" onclick="deleteContact(${contactsDate[i].id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
              </div>
            </article>
          </div> `
    }
    $('contactRow').innerHTML = container
}

function converToBase64() {
    var file = cachedFormElements.contactImage.files[0]
    if(!file) return
    $('icon').classList.remove('d-none')
    $('userImage').classList.add('d-none')

    var fileReader = new FileReader()
    fileReader.onload = function () {
        currentImage = fileReader.result
        $('icon').classList.add('d-none')
        $('userImage').classList.remove('d-none')
        $('userImage').src = currentImage
    }
    fileReader.readAsDataURL(file)
}

function deleteContact(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "This contact will be deleted permanently",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6366f1',
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            var contactsListAfterDelete = []
            for (var i = 0 ; i<contactList.length; i++) {
                if (contactList[i].id!= id) {
                    contactsListAfterDelete.push(contactList[i])
                }
            }
            contactList = contactsListAfterDelete
            setFromLocalStorage(contactList)
            render()
            Swal.fire('Deleted!', 'Contact deleted successfully', 'success')
        }
    })
}

function editContact(id) {
  
    sweetAlert('Info', 'Edit feature coming soon', 'info')
}

window.onload = function () {
    initFormElements()
    render()
}