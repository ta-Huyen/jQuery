fetch("../data.json")
.then (function (response) {
   return response.json();
})
.then (function (students){
    for (let student of students) {
        addRowToTable(student.name, student.birthday, student.phone, student.hometown);
    }
});
// const { writeJson } = require("./jsonFunction")

// function addJson() {
    // let formData = new FormData(document.querySelector('form'))
    // let data = Object.fromEntries(formData);
    // writeJson(data);
// }

// function updateJson() {

// }

// function deleteJson() {

// }

document.getElementById("savebtn").addEventListener("click", (e)=>{
    e.preventDefault();
    saveData();
})

function saveData() {
    let formData = new FormData();
    let name = document.getElementById("name").value,
        birthday = document.getElementById("birthday").value,
        phone = document.getElementById("phone").value,
        hometown = document.getElementById("hometown").value;

    let isValid = true;
    if (name === ""){
        $('#text-validationName').removeClass('nodisplay').show();
        isValid = false;
    } else {
        formData.append("name", name);
        $('#text-validationName').addClass('nodisplay').hide();
    }
    if (birthday === ""){
        $('#text-validationBirthday').removeClass('nodisplay').show();
        isValid = false;
    } else {
        formData.append("birthday", birthday);
        $('#text-validationBirthday').addClass('nodisplay').hide();
    }
    if (phone === ""){
        $('#text-validationMobilePhone').removeClass('nodisplay').show();
        isValid = false;
    } else {
        formData.append("phone", phone);
        $('#text-validationMobilePhone').addClass('nodisplay').hide();
    }
    if (hometown === ""){
        $('#text-validationHomeTown').removeClass('nodisplay').show();
        isValid = false;
    } else {
        formData.append("hometown", hometown);
        $('#text-validationHomeTown').addClass('nodisplay').hide();
    }

    if (isValid) {
        addRowToTable(name, birthday, phone, hometown);
        // addJson();
        // writeJson(formData);
        resetData();
    }
};

function addRowToTable(name, birthday, phone, hometown) {
    let out = "";
    out += `
            <tr>
                <td><input type="checkbox" name="select"/></td>
                <td>${name}</td>
                <td>${birthday}</td>
                <td>${phone}</td>
                <td>${hometown}</td>
            </tr>
        `;
    $('#data-table > tbody:last-child').append(out)
}

function resetData() {  
    document.getElementById("formSubmission").reset();  
}   

function deleteData() {
    let arrDelete = [];

    let c = document.getElementsByName("select");
    for (let i=c.length-1; i>=0; i--) {
        if (c[i].checked) {
            arrDelete.push(c[i]);
        }	 		
    }

    if (Array.isArray(arrDelete) && arrDelete.length) {
        let result = confirm("Bạn có chắc chắn muốn xóa sinh viên đang chọn?");
        if (result) {
            for (let i of arrDelete) {
                i.parentNode.parentNode.parentNode.removeChild(i.parentNode.parentNode);
            }
        }
    }
};

function editData() {
    let arrEdit = [];

    let c = document.getElementsByName("select");
    for (let i=c.length-1; i>=0; i--) {
        if (c[i].checked) {
            arrEdit.push(c[i]);
        }	 		
    }

    if (Array.isArray(arrEdit) && arrEdit.length) {
        if (arrEdit.length > 1) {
            alert("Bạn chỉ được sửa thông tin của 1 sinh viên");
        } else {
            document.getElementById("name").value = arrEdit[0].parentNode.parentNode.cells[1].innerHTML;
            document.getElementById("birthday").value = arrEdit[0].parentNode.parentNode.cells[2].innerHTML;
            document.getElementById("phone").value = arrEdit[0].parentNode.parentNode.cells[3].innerHTML;
            document.getElementById("hometown").value = arrEdit[0].parentNode.parentNode.cells[4].innerHTML;
        }
    }
};


function writeInJSON() {
    // var formData = JSON.stringify($("#formSubmission").serializeArray());
    // let filename = 'data.json'

    // var blob = new Blob([formData], {type: 'text/json'}),
    //     e    = document.createEvent('MouseEvents'),
    //     a    = document.createElement('a')

    // a.download = filename
    // a.href = window.URL.createObjectURL(blob)
    // a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    // var e = new Event('click');
    // a.dispatchEvent(e);
    
        //foo is now loaded.
    
    // var fs = require('fs').promises;
    // var formData = new FormData(document.querySelector('form'))
    // fs.writeFileSync('data.json', JSON.stringify(formData), 'utf-8', (err) => {
    //     if (err) throw err;
    //     console.log('Data added to file');
    // });

}
