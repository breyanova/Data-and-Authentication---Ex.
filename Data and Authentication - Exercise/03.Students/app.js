let url = 'http://localhost:3030/jsonstore/collections/students';
let tableBody = document.querySelector('#results tbody');
let formElement = document.getElementById('form');
let submitButton = document.getElementById('submit');




window.addEventListener('load', () => {

    fetch(url)
        .then(res => res.json())
        .then(result => {

            let students = Object.values(result);

            students.forEach(student => {

                let tr = document.createElement('tr');
                tr.innerHTML = `
            <th>${student.firstName}</th>
            <th>${student.lastName}</th>
            <th>${student.facultyNumber}</th>
            <th>${student.grade}</th>`

                tableBody.appendChild(tr);


            });

        })

});

formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let firstName = formData.get('firstName');
    let lastName = formData.get('lastName');
    let facultyNumber = formData.get('facultyNumber');
    let grade = formData.get('grade');

    if(firstName !== '' && lastName !== '' && facultyNumber !== '' && grade > 0){

    

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            firstName,
            lastName,
            facultyNumber,
            grade
        })
    })
    .then(res => res.json())
    .then(student => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
    <th>${student.firstName}</th>
    <th>${student.lastName}</th>
    <th>${student.facultyNumber}</th>
    <th>${student.grade}</th>`

        tableBody.appendChild(tr);

    });

    }



});