
let currentStep = 0; // Track current step
const steps = document.getElementsByClassName("step");
const stepNumbers = document.getElementsByClassName("step-number");

function showStep(n) {
    // Hide all steps
    for (let i = 0; i < steps.length; i++) {
        steps[i].classList.remove("active");
    }
    // Show the current step
    steps[n].classList.add("active");

    // Update step indicators
    for (let i = 0; i < stepNumbers.length; i++) {
        stepNumbers[i].classList.remove("active");
    }
    stepNumbers[n].classList.add("active");

    // Update button visibility
    document.getElementById("prevBtn").disabled = n === 0;
    document.getElementById("nextBtn").innerHTML = n === steps.length - 1 ? "Submit" : "Next";
}

function nextStep() {
    // console.log(validateForm());
    // Validate the current step before moving to the next one
    if (!validateForm()) return;

    currentStep++;
    if (currentStep >= steps.length) {
        document.getElementById("multiStepForm").submit();
        return;
    }
    showStep(currentStep);
}

function prevStep() {
    currentStep--;
    showStep(currentStep);
}

function validateForm() {
    let valid = true;

    // Clear all previous error messages
    // document.querySelectorAll('.error').forEach(error => error.innerHTML = '');

    if (currentStep === 0) {
        let vn = validateName();
        let ve = validateEmail();
        let vdob = validateDate();
        let vgen = validateGender();
        let vparent_name = validateParent();
        let vpin = validatePincode();
        let vadd = validateAddress();
        let vCon = validatedCountryDropdowns();
        let vmob = validateMobile();

        if (vn && ve && vdob && vgen && vparent_name && vpin && vadd && vCon && vmob) {
            valid = true
        }
        else {
            valid = false
        }


    } else if (currentStep === 1) {
        let vs = validateSchName();
        let v_10_m = validate_10th_mark();
        let v_12_m = validate_12th_mark();
        let v_reg = validateRegNum();
        let vDrop = validatedDropdowns();
        let vdate= validate_10_12_yop();
        if (vs && v_10_m && v_12_m && v_reg && vDrop && vdate) {
            valid = true
        }
        else {
            valid = false
        }

    }

    return valid;
}

function validateName() {
    let success = true
    const fullname = document.querySelector('#fullname');
    const fullnameVal = fullname.value.trim();
    if (fullnameVal === '') {
        success = false;
        setError(fullname, 'full name is required')
    }
    else { setSuccess(fullname); success = true; }

    return success;
}

function validateEmail() {
    let success = true
    const email = document.querySelector('#email')
    const emailVal = email.value.trim();
    if (emailVal === '') {
        success = false;
        setError(email, 'Email is required')
    }
    else if (!validateEmail2(emailVal)) {
        success = false;
        setError(email, "Please enter a vaild email")
    }
    else {
        setSuccess(email);
        success = true;

    }

    return success;
}

document.getElementById("birthdate").addEventListener("change", () => {
    const birthdate = document.getElementById("birthdate");
    const bvalue = new Date(birthdate.value);
    const today = new Date();
    const age = today.getFullYear() - bvalue.getFullYear();
    document.getElementById("age").value = age;
})


function validateDate() {
    let success = true
    const birthdate = document.getElementById("birthdate");
    const bvalue = new Date(birthdate.value);
    const dob = birthdate.value;
    const today = new Date();

    // Calculate age
    const age = today.getFullYear() - bvalue.getFullYear();
    // const monthDiff = today.getMonth() - birthdate.getMonth();
    // const dayDiff = today.getDate() - birthdate.getDate();
    // document.getElementById("age").value = age;


    if (!dob) {
        success = false
        setError(birthdate, "age is required")
    }
    else if (age < 18) {
        setError(birthdate, "minimum age should be 18");
        success = false;
    }
    else {
        setSuccess(birthdate);
        success = true;
    }
    return success
}

function validateGender() {
    let success = true
    const gender = document.getElementById("gender");
    const gen = gender.value;
    if (gen === "") {
        success = false
        setError(gender, "please select your gender")
    }
    else {
        success = true
        setSuccess(gender)
    }
    return success
}
function validateParent() {
    let success = true
    const fullname = document.querySelector('#parent_name');
    const fullnameVal = fullname.value.trim();
    if (fullnameVal === '') {
        success = false;
        setError(fullname, 'full name is required')
    }
    else { setSuccess(fullname); success = true; }

    return success;
}
function validateMobile() {
    let success = true
    const mobile = document.querySelector('#mobile')
    const mobileVal = mobile.value.trim();

    if (mobileVal === '') {
        success = false;
        setError(mobile, 'mobile number is required')
    }
    else if (!/^[0-9]{10}$/.test(mobileVal)) {
        success = false;
        setError(mobile, 'mobile number is invalid')
    }
    else {
        setSuccess(mobile);
        success = true;
    }
    return success
}

function validatePincode1() {
    var pincode = document.getElementById("pincode").value;
    if (!/^\d{0,6}$/.test(pincode)) {
        // Limit input to numbers and remove any extra characters beyond 6 digits
        document.getElementById("pincode").value = pincode.replace(/\D/g, '');
    }
}
function validatePincode() {
    let success = true
    const pincode = document.querySelector('#pincode');
    const pincodeVal = pincode.value.trim();
    if (pincodeVal === '') {
        success = false;
        setError(pincode, 'pincode is required')
    }
    else if (pincodeVal.length < 4 || pincodeVal.length > 6) {
        success = false;
        setError(pincode, 'PIN code must be between 4 to 6 digits')
    }
    else {
        success = true;
        setSuccess(pincode)
    }
    return success
}

function validateAddress() {
    let success = true
    const add_1 = document.querySelector('#add_1');
    const add_1Val = add_1.value.trim();
    const add_2 = document.querySelector('#add_2');
    const add_2Val = add_2.value.trim();
    if (add_1Val === '') {
        success = false
        setError(add_1, 'address is required')
    }
    else {
        success = true
        setSuccess(add_1)
    }
    if (add_2Val === '') {
        success = false
        setError(add_2, 'address is required')
    }
    else {
        success = true
        setSuccess(add_2)
    }
    return success
}

function validateSchName() {
    let success = true
    const school = document.querySelector('#schoolname');
    const sch_10 = school.value.trim();
    const school_12 = document.querySelector('#schoolname_12');
    const sch_12 = school_12.value.trim();
    if (sch_10 === '') {
        success = false
        setError(school, 'School name is required')
    }
    else {
        success = true
        setSuccess(school)
    }
    if (sch_12 === '') {
        success = false
        setError(school_12, 'School name is required')
    }
    else {
        success = true
        setSuccess(school_12)
    }
    return success
}
function validate_10th_mark() {
    let success = true
    const mark_10th = document.querySelector('#mark_10th');
    const mark_10thVal = mark_10th.value.trim();
    if (mark_10thVal === '') {
        success = false
        setError(mark_10th, 'mark is required')

    }
    else if (Number(mark_10thVal) < 200 || Number(mark_10thVal) > 500) {

        success = false
        setError(mark_10th, 'invalid mark or mark is too low')
    }
    else {
        success = true
        setSuccess(mark_10th)
    }

    return success
}
function validate_12th_mark() {
    let success = true
    const mark_12th = document.querySelector('#mark_12th');
    const mark_12thVal = mark_12th.value.trim();
    if (mark_12thVal === '') {
        success = false
        setError(mark_12th, 'mark is required')

    }
    else if (Number(mark_12thVal) < 200 || Number(mark_12thVal) > 600) {

        success = false
        setError(mark_12th, 'invalid mark or mark is too low')
    }
    else {
        success = true
        setSuccess(mark_12th)
    }

    return success
}
function validate_10_12_yop(){
    let success = true
    const _12thdate = document.getElementById("12th_passed");
    const _10thdate = document.getElementById("10th_passed");
    const yop_10 = _10thdate.value;
    const yop_12 = _12thdate.value;
    if (!yop_10) {
        success = false
        setError(_10thdate, "date is required")
    }
    else{
        success=true
        setSuccess(_10thdate)
    }
    if (!yop_12) {
        success = false
        setError(_12thdate, "date is required")
    }
    else{
        success=true
        setSuccess(_12thdate)
    }
    return success
}

function validateRegNum() {
    let success = true
    const reg_num = document.querySelector('#reg_num');
    const reg_numVal = reg_num.value.trim();
    const reg_num_12 = document.querySelector('#reg_num_12');
    const reg_num_12Val = reg_num_12.value.trim();
    if (reg_numVal === '') {
        success = false
        setError(reg_num, 'Register number is required')
    }
    else if (!/^\d{0,6}$/.test(reg_numVal) && (reg_numVal.length < 8 || reg_numVal.length > 10)) {
        success = false
        setError(reg_num, 'invalid register number')
    }
    else {
        success = true
        setSuccess(reg_num)
    }
    if (reg_num_12Val === '') {
        success = false
        setError(reg_num_12, 'Register number is required')
    }
    else if (!/^\d{0,6}$/.test(reg_num_12Val) && (reg_num_12Val.length < 8 || reg_num_12Val.length > 10)) {
        success = false
        setError(reg_num_12, 'invalid register number')
    }
    else {
        success = true
        setSuccess(reg_num_12)
    }
    return success
}

function validatedDropdowns() {
    let success = true
    const degree = document.getElementById("degree");
    const course = document.getElementById("course");
    const branch = document.getElementById("branch");
    const degreeVal = degree.value;
    const courseVal = course.value;
    const branchVal = branch.value;
    if (degreeVal === "") {
        success = false
        setError(degree, "please select your degree")
    }
    else {
        success = true
        setSuccess(degree)
    }
    if (courseVal === "") {
        success = false
        setError(course, "please select your course")
    }
    else {
        success = true
        setSuccess(course)
    }
    if (branchVal === "") {
        success = false
        setError(branch, "please select your branch")
    }
    else {
        success = true
        setSuccess(branch)
    }
    return success
}

function validatedCountryDropdowns() {
    let success = true
    const country = document.getElementById("country");
    const state = document.getElementById("state");
    const countryVal = country.value;
    const stateVal = state.value;
    if (countryVal === "") {
        success = false
        setError(country, "please select your country")
    }
    else {
        success = true
        setSuccess(country)
    }
    if (stateVal === "") {
        success = false
        setError(state, "please select your state")
    }
    else {
        success = true
        setSuccess(state)
    }
    return success
}

function setError(element, message) {
    // console.log(message);
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error');
    errorElement.innerText = message;
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
}
function setSuccess(element) {
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error');
    errorElement.innerText = '';
    inputGroup.classList.add('success');
    inputGroup.classList.remove('error');
}

const validateEmail2 = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
//------------course options------------
function populateCourses() {
    var degreeSelect = document.getElementById("degree");
    var courseSelect = document.getElementById("course");
    var degree = degreeSelect.value;

    // Clear existing options
    courseSelect.innerHTML = '<option value="">--Select Course--</option>';

    // Define course options for each degree
    var courses = {
        bachelor: ['Computer Science', 'Mechanical Engineering', 'Civil Engineering', 'Business Administration'],
        master: ['Data Science', 'MBA', 'Electrical Engineering', 'Cybersecurity'],
        phd: ['Artificial Intelligence', 'Quantum Computing', 'Robotics', 'Biotechnology'],
        arts: ['B.com(general)', 'BBA', 'B.sc(maths)', 'B.sc(chemistry)', 'B.sc(computer science)']
    };

    // If a degree is selected, populate the course dropdown
    if (degree && courses[degree]) {
        courses[degree].forEach(function (course) {
            var option = document.createElement("option");
            option.value = course.toLowerCase().replace(/ /g, "-");
            option.text = course;
            courseSelect.appendChild(option);
        });
    }
}

// Initialize the form by showing the first step
showStep(currentStep);



var config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
}

var countrySelect = document.querySelector('.country'),
    stateSelect = document.querySelector('.state')

function loadCountries() {

    fetch(config.cUrl, { headers: { "X-CSCAPI-KEY": config.ckey } })
        .then(Response => Response.json())
        
        .then(data => {

            data.forEach(country => {
                const option = document.createElement('option')
                option.value = country.iso2
                option.textContent = country.name
                countrySelect.appendChild(option)
            })
        })
        .catch(error => console.error('Error loading countries:', error))
}

/* Ajax Concept for fetching the States of the respective Countries using API */
function loadStates() {
    const selectedCountry = countrySelect.value

    stateSelect.innerHTML = '<option value="" disabled selected>Select the State</option>' // Used this to clear the existing states name

    fetch(`${config.cUrl}/${selectedCountry}/states`, { headers: { "X-CSCAPI-KEY": config.ckey } })
        .then(response => response.json())
        .then(data => {
            data.forEach(state => {
                const option = document.createElement('option')
                option.value = state.iso2
                option.textContent = state.name
                stateSelect.appendChild(option)
            })
        })
        .catch(error => console.error('Error loading countries:', error))
}

window.onload = loadCountries