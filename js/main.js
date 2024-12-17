// (function ($) { 
//     var loader = function () {
//         setTimeout(function () {
//             if ($('#loader').length > 0) {
//                 $('#loader').removeClass('show');
//             }
//         }, 2000);
//     };
//     loader(); 
// })(jQuery);
function toggleSubmenu() {
    var submenu = document.querySelector('.submenu');
    var arrow = document.querySelector('.arrow');
    if (submenu.style.display === "block") {
        submenu.style.display = "none";
        arrow.innerHTML = "&#x2192;";
    } else {
        submenu.style.display = "block";
        arrow.innerHTML = "&#x2193;";
    }
}
function toggleSubmenu_2() {
    var submenu_2 = document.querySelector('.submenu_2');
    var arrow_2 = document.querySelector('.arrow_2');
    if (submenu_2.style.display === "block") {
        submenu_2.style.display = "none";
        arrow_2.innerHTML = "&#x2192;";
    } else {
        submenu_2.style.display = "block";
        arrow_2.innerHTML = "&#x2193;";
    }
}
document.querySelector("#btn-menu").onclick = function(){
    (function ($) { 
        $('#menu').addClass('open');
    })(jQuery);
    // console.log('ff')
}
document.querySelector("#close").onclick = function(){
    (function ($) { 
        $('#menu').removeClass('open');
    })(jQuery);
    // console.log('ff')
}
window.onload = function(){
    setTimeout(function () {
        (function ($) { 
            $('#loader').removeClass('show');
            $('.loader').addClass('d-none');
        })(jQuery);
    }, 1250)
}
function ExportToXLSX(type, fn, dl){
	var table = document.getElementById('table');
	var wb = XLSX.utils.table_to_book(table, { sheet: 'sheet1' });
	return dl
		? XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' })
		: XLSX.writeFile(wb, fn || 'perants.' + (type || 'xls'));
}
let dataPro;
if(localStorage.product !=null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}
let first_name = document.querySelector("#first-name");
let phone = document.querySelector("#phone");
let birth_date = document.querySelector("#birth-date");
let email = document.querySelector("#email");
let gender = document.querySelector("#gender");
let governorate = document.querySelector("#governorate");
let submit = document.querySelector("#save");

let mood = 'create';
let tmp;
submit.onclick = function(){
    let newmsg = {
        first_name:first_name.value,
        phone:phone.value,
        birth_date:birth_date.value,
        email:email.value,
        gender:gender.value,
        governorate:governorate.value,
    }   
    if(first_name.value !=''&& phone.value!=''&& birth_date.value !=''&& email.value !=''&& gender.value !=''&& governorate.value !=''){
        if(mood === 'create'){
            if(newmsg.count >0){
                dataPro.push(newmsg);
            }else{
                dataPro.push(newmsg);
            };
        }else{
            dataPro[ tmp ] = newmsg;
            mood = 'create';
            submit.innerHTML = 'تسجيل';
        }
        clearinput();
    }
    localStorage.setItem('product',  JSON.stringify(dataPro));
    showData();
}
function clearinput(){
    first_name.value = '';
    phone.value = '';
    birth_date.value = '';
    email.value = '';
    gender.value = '';
    governorate.value = '';
}
function showData(){
    let table ='';
    for(let i = 0; i < dataPro.length;i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].first_name}</td>
            <td>${dataPro[i].phone}</td>
            <td>${dataPro[i].birth_date}</td>
            <td>${dataPro[i].email}</td>
            <td>${dataPro[i].gender}</td>
            <td>${dataPro[i].governorate}</td>
            <td><button class="btn btn-danger" onclick="deleteData(${i})" id="delete">delete</button></td>
            <td><button class="btn btn-success" onclick="updateData(${i})" id="update">update</button></td>
        </tr>
        `
    }
    
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button class="btn w-75 btn-warning" onclick="deleteAll()">delete All(${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = '';
    }
}
showData();
function deleteData(i)
{
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
    totals.innerHTML = '';
}
function updateData(i){
    first_name.value = dataPro[i].first_name;
    phone.value = dataPro[i].phone;
    birth_date.value = dataPro[i].birth_date;
    email.value = dataPro[i].email;
    gender.value = dataPro[i].gender;
    governorate.value = dataPro[i].governorate;
    submit.innerHTML = 'اعادة تخزين';
    mood = 'update';
    tmp = i; 
    scroll({
        top:0,
        behavior:'smooth',
    });
}
window.onscroll = function(){
    document.getElementById("scrollbtn").style.display = 
    document.documentElement.scrollTop > 100 ? "block" : "none";
};
function scrollToTop(){
    window.scrollToTop({ top:0, behavior: "smooth"});
}