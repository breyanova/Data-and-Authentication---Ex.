let loadButton = document.getElementById('loadBooks');
let url = 'http://localhost:3030/jsonstore/collections/books';
let tableBody = document.querySelector('tbody');
let formElement = document.querySelector('form');
let inputsForm = document.querySelectorAll('form input');
let h3 = document.querySelector('form h3');
let buttonSubmit = document.querySelector('form button');


loadButton.addEventListener('click', loadBooks);

function loadBooks() {
    fetch(url)
        .then(res => res.json())
        .then(library => {

            let books = Object.values(library);
            books.forEach(book => {
                let tr = document.createElement('tr');

                tr.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>`;
                let buttonEdit = document.createElement('button');
                buttonEdit.textContent = 'Edit';
                buttonEdit.addEventListener('click', () => {
                    formElement[0].value = book.title;
                    formElement[1].value = book.author;
                    h3.textContent = 'Edit FORM';
                    buttonSubmit.textContent = 'Save';

                    buttonSubmit.addEventListener('click', () => {
                        let formData = new FormData(formElement);
                        let author = formData.get('author');
                        let title = formData.get('title');
                        fetch(`${url}/${book._id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                author,
                                title
                            })

                        });
                        inputsForm.forEach(element => element.value = '');




                    })

                });
                let buttonDelete = document.createElement('button');
                buttonDelete.textContent = 'Delete';
                buttonDelete.addEventListener('click', (e)=> {
                    fetch(`${url}/${book._id}`, {
                        method: 'DELETE'

                    });

                    tr.innerHTML = '';


                });
                let td = document.createElement('td');

                td.appendChild(buttonEdit);
                td.appendChild(buttonDelete);


                tr.appendChild(td);
                tableBody.appendChild(tr);


            });

        });
}

formElement.addEventListener('submit', createBook);

function createBook(e) {
    e.preventDefault();
    let formData = new FormData(formElement);
    let author = formData.get('author');
    let title = formData.get('title');

    if (author !== '' && title !== '') {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                author,
                title
            })
        });

        inputsForm.forEach(element => element.value = '');







    }



}