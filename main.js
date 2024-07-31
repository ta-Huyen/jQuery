let isEdit = false;

document.addEventListener('DOMContentLoaded', function () {
    fetch("data.json")
    .then (function (response) {
        return response.json();
    })
    .then (function (students){
        const tableData = students;
        for (let student of students) {
            addRowToTable(student.name, student.birthday, student.phone, student.hometown);
        }
    });
});

document.getElementById("savebtn").addEventListener("click", (e)=>{
    e.preventDefault();
    saveData();
})

function saveData() {
    let name = document.getElementById("name").value.trim(),
        birthday = document.getElementById("birthday").value,
        phone = document.getElementById("phone").value.trim(),
        hometown = document.getElementById("hometown").value.trim();

    if (validationData()) {
        if (isEdit) {
            let checkboxes = document.querySelectorAll('.student-checkbox');
            let checkedCheckboxes = Array.from(checkboxes).filter(cb => cb.checked);

            if (checkedCheckboxes.length > 0) {
                checkedCheckboxes[0].parentNode.parentNode.cells[1].innerHTML = name;
                checkedCheckboxes[0].parentNode.parentNode.cells[2].innerHTML = birthday;
                checkedCheckboxes[0].parentNode.parentNode.cells[3].innerHTML = phone;
                checkedCheckboxes[0].parentNode.parentNode.cells[4].innerHTML = hometown;
            }
            
            isEdit = false;
        } else {
            addRowToTable(name, birthday, phone, hometown);
        }
        // writeJson(tableToJson);
        resetData();
    }
};

function resetData() {  
    document.getElementById("formSubmission").reset();  
}   

function deleteData() {
    let checkboxes = document.querySelectorAll('.student-checkbox');
    let checkedCheckboxes = Array.from(checkboxes).filter(cb => cb.checked);

    if (checkedCheckboxes.length > 0) {
        document.getElementById('deletebtn').disabled = false;
        let result = confirm("Bạn có chắc chắn muốn xóa sinh viên đang chọn?");
        if (result) {
            for (let i of checkedCheckboxes) {
                i.parentNode.parentNode.parentNode.removeChild(i.parentNode.parentNode);
            }
        }
    }
};

function editData() {
    let checkboxes = document.querySelectorAll('.student-checkbox');
    let checkedCheckboxes = Array.from(checkboxes).filter(cb => cb.checked);
    
    document.getElementById('editbtn').disabled = (checkedCheckboxes.length < 0);

    if (checkedCheckboxes.length > 1) {
        alert("Bạn chỉ được sửa thông tin của 1 sinh viên");
    } else {
        document.getElementById("name").value = checkedCheckboxes[0].parentNode.parentNode.cells[1].innerHTML;
        document.getElementById("birthday").value = checkedCheckboxes[0].parentNode.parentNode.cells[2].innerHTML;
        document.getElementById("phone").value = checkedCheckboxes[0].parentNode.parentNode.cells[3].innerHTML;
        document.getElementById("hometown").value = checkedCheckboxes[0].parentNode.parentNode.cells[4].innerHTML;

        isEdit = true;
    }     
};

function addRowToTable(name, birthday, phone, hometown) {
    let out = "";
    out += `
            <tr>
                <td><input type="checkbox" id="cb" class="student-checkbox" onclick="enableBtn()"/></td>
                <td>${name}</td>
                <td>${birthday}</td>
                <td>${phone}</td>
                <td>${hometown}</td>
            </tr>
        `;
    $('#data-table > tbody:last-child').append(out)
}

function enableBtn() {
    let checkboxes = document.querySelectorAll('.student-checkbox');
    let checkedCheckboxes = Array.from(checkboxes).filter(cb => cb.checked);
    
    if (checkedCheckboxes.length > 0) {
        $('#deletebtn').removeAttr('disabled');
        $('#editbtn').removeAttr('disabled');
    } else {
        $('#deletebtn').attr('disabled','disabled');
        $('#editbtn').attr('disabled','disabled');
    }
}

function validationData() {
    let isValid = true;
    let name = document.getElementById("name").value.trim(),
        birthday = document.getElementById("birthday").value,
        phone = document.getElementById("phone").value.trim(),
        hometown = document.getElementById("hometown").value.trim();

    if (name === "" || name.length > 50) {
        $('#text-validationName').removeClass('nodisplay').show();
        isValid = false;
    } else {
        $('#text-validationName').addClass('nodisplay').hide();
    }
    const age = calculateAge(birthday);
    if (birthday === "" || age < 0 || age > 100) {
        $('#text-validationBirthday').removeClass('nodisplay').show();
        isValid = false;
    } else {
        $('#text-validationBirthday').addClass('nodisplay').hide();
    }
    if (phone === "" || !/^\d{10}$/.test(phone)) {
        $('#text-validationMobilePhone').removeClass('nodisplay').show();
        isValid = false;
    } else {
        $('#text-validationMobilePhone').addClass('nodisplay').hide();
    }
    if (hometown === ""){
        $('#text-validationHomeTown').removeClass('nodisplay').show();
        isValid = false;
    } else {
        $('#text-validationHomeTown').addClass('nodisplay').hide();
    }

    return isValid;
}

function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
