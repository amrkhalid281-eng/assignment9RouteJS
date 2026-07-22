var contactNameInput = document.getElementById("fullName");
var contactNumberInput = document.getElementById("phoneNumber");
var contactEmailInput = document.getElementById("emailAddress");
var contactAddressInput = document.getElementById("Address");
var contactGroupInput = document.getElementById("Group");
var contactNotesInput = document.getElementById("Notes");
var contactImageInput = document.getElementById("change-photo");
var contactFavInput = document.getElementById("fav");
var contactEmargInput = document.getElementById("emarg");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var prodeuctSearch = document.getElementById("searcInput");
var allProduct = [];

if(localStorage.getItem("all") != null) {
    allProduct = JSON.parse(localStorage.getItem("all"))
    disblay()
}

function validName() {
    var nameRegax = /^[\D]{3,50}$/;
    if (nameRegax.test(contactNameInput.value)) {
        document.getElementById("perag-fullName").classList.replace("d-block","d-none")
        document.getElementById("fullName").classList.remove("border-danger");
        return true;
    }
    document.getElementById("fullName").classList.add("border-danger");
    document.getElementById("perag-fullName").classList.replace("d-none","d-block")
    return false;
}

function validPhone() {
    var phoneRegax = /^01(0|1|2|5)[0-9]{8}$/;
    if (phoneRegax.test(contactNumberInput.value)) {
        return true;
    }
    return false;
}

function isPhoneDuplicate() {
    for (var i = 0; i < allProduct.length; i++) {
        if (allProduct[i].phoneNumber === contactNumberInput.value) {
            return true;
        }
    }
    return false;
}

function addproduct(){

    if(validName() == true && validPhone() == true && isPhoneDuplicate() == false) {
        var product = {
            fullname : contactNameInput.value ,
            phoneNumber : contactNumberInput.value ,
            email : contactEmailInput.value ,
            address : contactAddressInput.value ,
            selectGroup : contactGroupInput.value ,
            notes : contactNotesInput.value ,
            img : contactImageInput.files[0]?.name ,
            fav : contactFavInput.checked ,
            emarg : contactEmargInput.checked ,
        }

        allProduct.push(product);
        localStorage.setItem("all",JSON.stringify(allProduct))

        disblay()
        clearInput()
        var modalElement = document.getElementById("staticBackdrop");
        var modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "added!",
            text: "contact has been added sucssefule",
            showConfirmButton: false,
            timer: 1500
        });
    }else if(validName() == false) {
        Swal.fire({
            icon: "error",
            title: "Missing Name",
            text: "plase enter a name for the contact!",
        });
    }else if(validPhone() == false) {
        Swal.fire({
            icon: "error",
            title: "Missing Phone",
            text: "plase enter a phone number!",
        });
    }else if(isPhoneDuplicate() == true) {
        Swal.fire({
            icon: "error",
            title: "Duplicate Phone",
            text: "this phone number is already registered!",
        });
    }

}

function clearInput(){
    contactNameInput.value = "";
    contactNumberInput.value = "";
    contactEmailInput.value = "";
    contactAddressInput.value  = "";
    contactGroupInput.value = "";
    contactNotesInput.value = "";
    contactImageInput.files[0] = "";
    contactFavInput.checked = false;
    contactEmargInput.checked = false;
}

function disblay() {
    var cartoone = "";
    var cartoonaFav = "";
    var cartoonaemarg = "";
    var total = 0;
    var favCount = 0;
    var emarCount = 0;

    for(var i = 0 ; i < allProduct.length ; i++) {
        total++;
        cartoone += `
            <div class="contact-card col-12 col-sm-6 p-2">
                <div class="inner d-flex flex-column justify-content-between h-100 shadow border border-2 border-secondary border-opacity-25  rounded-4 bg-white">
                    <div class="p-3">
                        <div class="d-flex gap-3 align-items-start">
                        ${
                            allProduct[i].img !== ""
                            ? `
                                <div class="rounded-4 bg-img d-flex justify-content-center align-items-center position-relative" style="width: 60px;height: 60px;">
                                    ${
                                        allProduct[i].fav == true
                                        ?`
                                            <div class="d-flex justify-content-center align-items-center position-absolute translate-middle rounded-circle bg-warning
                                                border border-2"
                                                style="left: 88%; top: 10%;width: 25px;height: 25px;">
                                                <i class="fas fa-star text-white" style="font-size: .55rem;"></i>
                                            </div>
                                        `
                                        :``
                                    }
                                    <p class="m-0 text-white h5 fw-bolder">${allProduct[i].fullname.split(' ').splice(0,2).map(word => word[0]).join('')}</p>
                                    ${
                                        allProduct[i].emarg == true
                                        ?`
                                            <div class="d-flex justify-content-center align-items-center position-absolute translate-middle rounded-circle bg-danger
                                                border border-2"
                                                style="left: 88%; top: 85%;width: 25px;height: 25px;">
                                                <i class="fas fa-heart-pulse text-white" style="font-size: .60rem;"></i>
                                            </div>
                                        `
                                        :``
                                    }
                                </div>
                            `
                            : `
                                <img src="images/${allProduct[i].img}" alt="contact image"
                                    class="rounded-4 col-12">
                            `
                        }
                            <div>
                                <h3 class="fs-5">${allProduct[i].fullname}</h3>
                                <div class="d-flex align-items-center gap-2">
                                    <div class="bg-primary bg-opacity-10 py-1 px-2 fit-content rounded-3">
                                        <i class="fa-solid fa-phone text-primary small"></i>
                                    </div>
                                    <span class="text-secondary fw-medium small">${allProduct[i].phoneNumber}</span>
                                </div>
                            </div>
                        </div>
                        ${
                            allProduct[i].email !== "" 
                            ? `
                            <div class="pt-2 d-flex align-items-center gap-2">
                                <div class="bg-main p-1 px-2 rounded-2 fit-content">
                                    <i class="fa-solid fa-envelope text-purple small"></i>
                                </div>
                                <span class="text-secondary">${allProduct[i].email}</span>
                            </div>
                            `
                            : ``
                        }
                        ${
                            allProduct[i].address !== "" 
                            ? `
                            <div class="py-1 d-flex align-items-center gap-2">
                                <div class="bg-success bg-opacity-10 p-1 px-2 rounded-2 fit-content">
                                    <i class="fa-solid fa-location-dot text-success small"></i>
                                </div>
                                <span class="text-secondary">${allProduct[i].address}</span>
                            </div>
                            `
                            : ``
                        }
                        ${
                            allProduct[i].selectGroup !== "select-group"
                            ? `
                            <div class="py-1">
                                <div class="bg-main p-1 px-2 rounded-2 fit-content">
                                    <span class="small text-purple fw-semibold">${allProduct[i].selectGroup}</span>
                                </div>
                            </div>
                            `
                            : ``
                        }
                        ${
                            allProduct[i].emarg == true
                            ? `
                            <div class="py-1">
                                <div class="bg-danger bg-opacity-10  px-2 rounded-2 fit-content">
                                    <span class="small text-danger fw-semibold">Emergency</span>
                                </div>
                            </div>
                            `
                            : ``
                        }
                    </div>
                    <div class="border-top mt-3 p-3 border-1 border-secondary border-opacity-10 pt-2 bg-body-tertiary bg-opacity-25">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex gap-3">
                                <a href="tel:${allProduct[i].phoneNumber}" class="d-inline-block bg-success bg-opacity-10 py-1 px-2 rounded-2 fit-content">
                                    <i class="fa-solid fa-phone text-success small"></i>
                                </a>
                                ${
                                    allProduct[i].email !== ""
                                    ? `
                                        <a href="mailto:${allProduct[i].email}" class="bg-main bg-opacity-10 py-1 px-2 rounded-2 fit-content d-inline-block">
                                            <i class="fa-solid fa-envelope text-purple small"></i>
                                        </a>
                                    `
                                    : `
                                        <div class="bg-main bg-opacity-10 py-1 px-2 rounded-2 fit-content opacity-50">
                                            <i class="fa-solid fa-envelope text-purple small"></i>
                                        </div>
                                    `
                                }
                            </div>
                            <div class="d-flex gap-3 align-items-center">
                                <button onclick="disblayfav(${i})" class="star-icon border-0 py-1 rounded-2 bg-transparent">
                                    ${
                                        allProduct[i].fav
                                        ? `<i class="fa-solid fa-star text-warning"></i>`
                                        : `<i class="fa-regular fa-star text-secondary"></i>`
                                    }
                                </button>
                                <button onclick="disblayEmerg(${i})" class="heart-icon border-0 py-1 rounded-2 bg-transparent">
                                    ${
                                        allProduct[i].emarg
                                        ? `<i class="fa-solid fa-heart-pulse text-danger"></i>`
                                        : `<i class="fa-regular fa-heart text-secondary"></i>`
                                    }
                                    
                                </button>
                                <button onclick="perupdate(${i})" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="pen-icon border-0 py-1 rounded-2 bg-transparent">
                                    <i class="fa-solid fa-pen text-secondary"></i>
                                </button>
                                <button onclick="deleteContact(${i})" class="trash-icon border-0 py-1 rounded-2 bg-transparent">
                                    <i class="fa-solid fa-trash text-secondary"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        if(allProduct[i].fav == true) {
            favCount++;
            cartoonaFav += `
                <div class="p-2 col-6 col-xl-12">
                    <div
                        class="contact p-2 d-flex align-items-center justify-content-between gap-2 rounded-3">
                        ${
                            allProduct[i].img !== ""
                            ? `
                                <div class="rounded-3 bg-img1 d-flex justify-content-center align-items-center" style="width: 40px;height: 40px;">
                                    <p class="m-0 text-white fs-6 fw-bolder">${allProduct[i].fullname.split(' ').splice(0,2).map(word => word[0]).join('')}</p>
                                </div>
                            `
                            : `
                                <img src="images/${allProduct[i].img}" alt="contact image"
                                    class="rounded-4 col-12">
                            `
                        }
                        <div class="contact-info me-auto">
                            <h6 class="small fw-medium m-0">${allProduct[i].fullname}</h6>
                            <p class="text-secondary m-0">${allProduct[i].phoneNumber}</p>
                        </div>
                        <a  href="tel:${allProduct[i].phoneNumber}"
                            class="call-bg bg-success bg-opacity-25 rounded-2 d-flex align-items-center justify-content-center d-inline-block text-decoration-none">
                            <i class="fa-solid fa-phone text-success"></i>
                        </a>
                    </div>
                </div>
            `
        }else {
            document.getElementById("p-fav").classList.replace("d-none","d-flex")
        }
        if(allProduct[i].emarg == true) {
            emarCount++;
            cartoonaemarg += `
                <div class="p-2 col-6 col-xl-12">
                    <div
                        class="contact p-2 d-flex align-items-center justify-content-between gap-2 rounded-3">
                        ${
                            allProduct[i].img !== ""
                            ? `
                                <div class="rounded-3 bg-img3 d-flex justify-content-center align-items-center" style="width: 40px;height: 40px;">
                                    <p class="m-0 text-white fs-6 fw-bolder">${allProduct[i].fullname.split(' ').splice(0,2).map(word => word[0]).join('')}</p>
                                </div>
                            `
                            : `
                                <img src="images/${allProduct[i].img}" alt="contact image"
                                    class="rounded-4 col-12">
                            `
                        }
                        <div class="contact-info me-auto">
                            <h6 class="small fw-medium m-0">${allProduct[i].fullname}</h6>
                            <p class="text-secondary m-0">${allProduct[i].phoneNumber}</p>
                        </div>
                        <a  href="tel:${allProduct[i].phoneNumber}"
                            class="call-bg bg-success bg-opacity-25 rounded-2 d-flex align-items-center justify-content-center text-decoration-none">
                            <i class="fa-solid fa-phone text-success"></i>
                        </a>
                    </div>
                </div>
            `
        }else {
            document.getElementById("p-emarg").classList.replace("d-none","d-flex")
        }
    }

    if (favCount > 0) {
        document.getElementById("p-fav").classList.remove("d-flex");
        document.getElementById("p-fav").classList.add("d-none");
    } else {
        document.getElementById("p-fav").classList.remove("d-none");
        document.getElementById("p-fav").classList.add("d-flex");
    }
    if (emarCount > 0) {
        document.getElementById("p-emarg").classList.remove("d-flex");
        document.getElementById("p-emarg").classList.add("d-none");
    } else {
        document.getElementById("p-emarg").classList.remove("d-none");
        document.getElementById("p-emarg").classList.add("d-flex");
    }

    document.getElementById("favorite").innerHTML = cartoonaFav;
    document.getElementById("emarj").innerHTML = cartoonaemarg;
    document.getElementById("contacts").innerHTML = cartoone;
    document.getElementById("total").innerHTML = total;
    document.getElementById("favorite-count").innerHTML = favCount;
    document.getElementById("Emar-count").innerHTML = emarCount;
}

function disblayfav(cuerntfav) {
    allProduct[cuerntfav].fav = !allProduct[cuerntfav].fav
    localStorage.setItem("all",JSON.stringify(allProduct))
    disblay();
}

function disblayEmerg(cuerntEmerg) {
    allProduct[cuerntEmerg].emarg = !allProduct[cuerntEmerg].emarg
    localStorage.setItem("all",JSON.stringify(allProduct))
    disblay();
}

function deleteContact(index) {
    
    Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${allProduct[index].fullname}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
                allProduct.splice(index , 1)
                localStorage.setItem("all",JSON.stringify(allProduct))
                disblay()
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
}

var curentIndex ;
function perupdate(index) {
    curentIndex = index;
    contactNameInput.value = allProduct[index].fullname;
    contactNumberInput.value = allProduct[index].phoneNumber;
    contactEmailInput.value = allProduct[index].email;
    contactAddressInput.value = allProduct[index].address;
    contactGroupInput.value = allProduct[index].selectGroup;
    contactNotesInput.value = allProduct[index].notes;
    contactImageInput.files = allProduct[index].img;
    contactFavInput.checked = allProduct[index].fav;
    contactEmargInput.checked = allProduct[index].emarg;

    addBtn.classList.replace("d-block","d-none")
    updateBtn.classList.replace("d-none","d-block")
}

function updateContact() {

        if(validName() == true && validPhone() == true && isPhoneDuplicate() == false) {
            var product = {
            fullname : contactNameInput.value ,
            phoneNumber : contactNumberInput.value ,
            email : contactEmailInput.value ,
            address : contactAddressInput.value ,
            selectGroup : contactGroupInput.value ,
            notes : contactNotesInput.value ,
            img : contactImageInput.files[0]?.name ,
            fav : contactFavInput.checked ,
            emarg : contactEmargInput.checked ,
        }
        allProduct.splice(curentIndex , 1 , product);
        localStorage.setItem("all",JSON.stringify(allProduct))
        disblay()
        clearInput()
        updateBtn.classList.replace("d-block","d-none")
        addBtn.classList.replace("d-none","d-block")
        var modalElement = document.getElementById("staticBackdrop");
        var modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Ubdated!",
            text: "contact has been added sucssefule",
            showConfirmButton: false,
            timer: 1500
        });
    }else if(validName() == false) {
        Swal.fire({
            icon: "error",
            title: "Missing Name",
            text: "plase enter a name for the contact!",
        });
    }else if(validPhone() == false) {
        Swal.fire({
            icon: "error",
            title: "Missing Phone",
            text: "plase enter a phone number!",
        });
    }else if(isPhoneDuplicate() == true) {
        Swal.fire({
            icon: "error",
            title: "Duplicate Phone",
            text: "this phone number is already registered!",
        });
    }
}

function searchByName(term) {
    var cartoona = ""
    var cartoonaFav = "";
    var cartoonaemarg = "";
    var total = 0;
    var favCount = 0;
    var emarCount = 0;
    for (var i = 0; i < allProduct.length; i++) {
        if(allProduct[i].fullname.toLowerCase().includes(term.toLowerCase()) || allProduct[i].email.toLowerCase().includes(term.toLowerCase()) || allProduct[i].phoneNumber.toLowerCase().includes(term.toLowerCase()) ){
            total++;
            cartoona += `
                <div class="contact-card col-12 col-sm-6 p-2">
                    <div class="inner d-flex flex-column justify-content-between h-100 shadow border border-2 border-secondary border-opacity-25  rounded-4 bg-white">
                        <div class="p-3">
                            <div class="d-flex gap-3 align-items-start">
                            ${
                                allProduct[i].img !== ""
                                ? `
                                    <div class="rounded-4 bg-img d-flex justify-content-center align-items-center" style="width: 60px;height: 60px;">
                                        <p class="m-0 text-white h5 fw-bolder">${allProduct[i].fullname.split(' ').map(word => word[0]).join('')}</p>
                                    </div>
                                `
                                : `
                                    <img src="images/${allProduct[i].img}" alt="contact image"
                                        class="rounded-4 col-12">
                                `
                            }
                                <div>
                                    <h3 class="fs-5">${allProduct[i].fullname}</h3>
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="bg-primary bg-opacity-10 py-1 px-2 fit-content rounded-3">
                                            <i class="fa-solid fa-phone text-primary small"></i>
                                        </div>
                                        <span class="text-secondary fw-medium small">${allProduct[i].phoneNumber}</span>
                                    </div>
                                </div>
                            </div>
                            ${
                                allProduct[i].email !== "" 
                                ? `
                                <div class="pt-2 d-flex align-items-center gap-2">
                                    <div class="bg-main p-1 px-2 rounded-2 fit-content">
                                        <i class="fa-solid fa-envelope text-purple small"></i>
                                    </div>
                                    <span class="text-secondary">${allProduct[i].email}</span>
                                </div>
                                `
                                : ``
                            }
                            ${
                                allProduct[i].address !== "" 
                                ? `
                                <div class="py-1 d-flex align-items-center gap-2">
                                    <div class="bg-success bg-opacity-10 p-1 px-2 rounded-2 fit-content">
                                        <i class="fa-solid fa-location-dot text-success small"></i>
                                    </div>
                                    <span class="text-secondary">${allProduct[i].address}</span>
                                </div>
                                `
                                : ``
                            }
                            ${
                                allProduct[i].selectGroup !== "select-group"
                                ? `
                                <div class="py-2">
                                    <div class="bg-main p-1 px-2 rounded-2 fit-content">
                                        <span class="small text-purple fw-semibold">${allProduct[i].selectGroup}</span>
                                    </div>
                                </div>
                                `
                                : ``
                            }
                        </div>
                        <div class="border-top mt-3 p-3 border-1 border-secondary border-opacity-10 pt-2 bg-body-tertiary bg-opacity-25">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex gap-3">
                                    <div class="bg-success bg-opacity-10 py-1 px-2 rounded-2 fit-content">
                                        <i class="fa-solid fa-phone text-success small"></i>
                                    </div>
                                    <div class="bg-main bg-opacity-10 py-1 px-2 rounded-2 fit-content">
                                        <i class="fa-solid fa-envelope text-purple small"></i>
                                    </div>
                                </div>
                                <div class="d-flex gap-3 align-items-center">
                                    <button onclick="disblayfav(${i})" class="star-icon border-0 py-1 rounded-2 bg-transparent">
                                        ${
                                            allProduct[i].fav
                                            ? `<i class="fa-solid fa-star text-warning"></i>`
                                            : `<i class="fa-regular fa-star text-secondary"></i>`
                                        }
                                    </button>
                                    <button onclick="disblayEmerg(${i})" class="heart-icon border-0 py-1 rounded-2 bg-transparent">
                                        ${
                                            allProduct[i].emarg
                                            ? `<i class="fa-solid fa-heart text-danger"></i>`
                                            : `<i class="fa-regular fa-heart text-secondary"></i>`
                                        }
                                        
                                    </button>
                                    <button onclick="perupdate(${i})" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="pen-icon border-0 py-1 rounded-2 bg-transparent">
                                        <i class="fa-solid fa-pen text-secondary"></i>
                                    </button>
                                    <button onclick="deleteContact(${i})" class="trash-icon border-0 py-1 rounded-2 bg-transparent">
                                        <i class="fa-solid fa-trash text-secondary"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            if(allProduct[i].fav == true) {
                favCount++;
                document.getElementById("p-fav").classList.replace("d-flex","d-none")
                cartoonaFav += `
                    <div class="p-2 col-6 col-xl-12">
                        <div
                            class="contact p-2 d-flex align-items-center justify-content-between gap-2 rounded-3">
                            ${
                                allProduct[i].img !== ""
                                ? `
                                    <div class="rounded-3 bg-img1 d-flex justify-content-center align-items-center" style="width: 40px;height: 40px;">
                                        <p class="m-0 text-white fs-6 fw-bolder">${allProduct[i].fullname.split(' ').map(word => word[0]).join('')}</p>
                                    </div>
                                `
                                : `
                                    <img src="images/${allProduct[i].img}" alt="contact image"
                                        class="rounded-4 col-12">
                                `
                            }
                            <div class="contact-info me-auto">
                                <h6 class="small fw-medium m-0">${allProduct[i].fullname}</h6>
                                <p class="text-secondary m-0">${allProduct[i].phoneNumber}</p>
                            </div>
                            <div
                                class="call-bg bg-success bg-opacity-25 rounded-2 d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-phone text-success"></i>
                            </div>
                        </div>
                    </div>
                `
            }else {
                document.getElementById("p-fav").classList.replace("d-none","d-flex")
            }
            if(allProduct[i].emarg == true) {
                emarCount++;
                document.getElementById("p-emarg").classList.replace("d-flex","d-none")
                cartoonaemarg += `
                    <div class="p-2 col-6 col-xl-12">
                        <div
                            class="contact p-2 d-flex align-items-center justify-content-between gap-2 rounded-3">
                            ${
                                allProduct[i].img !== ""
                                ? `
                                    <div class="rounded-3 bg-img3 d-flex justify-content-center align-items-center" style="width: 40px;height: 40px;">
                                        <p class="m-0 text-white fs-6 fw-bolder">${allProduct[i].fullname.split(' ').map(word => word[0]).join('')}</p>
                                    </div>
                                `
                                : `
                                    <img src="images/${allProduct[i].img}" alt="contact image"
                                        class="rounded-4 col-12">
                                `
                            }
                            <div class="contact-info me-auto">
                                <h6 class="small fw-medium m-0">${allProduct[i].fullname}</h6>
                                <p class="text-secondary m-0">${allProduct[i].phoneNumber}</p>
                            </div>
                            <div
                                class="call-bg bg-success bg-opacity-25 rounded-2 d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-phone text-success"></i>
                            </div>
                        </div>
                    </div>
                `
            }else {
                document.getElementById("p-emarg").classList.replace("d-none","d-flex")
            }
        }
    }

    document.getElementById("favorite").innerHTML = cartoonaFav;
    document.getElementById("emarj").innerHTML = cartoonaemarg;
    document.getElementById("contacts").innerHTML = cartoona;
    document.getElementById("total").innerHTML = total;
}