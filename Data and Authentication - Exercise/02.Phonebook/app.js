function attachEvents() {
    let proneBookUl = document.getElementById('phonebook');
    let buttonLoad = document.getElementById('btnLoad');
    let createButton = document.getElementById('btnCreate');

    let baseUrl = 'http://localhost:3030/jsonstore/phonebook';

    buttonLoad.addEventListener('click', () => {

        fetch(baseUrl)
            .then(res => res.json())
            .then(phoneBook => {

                for (const key in phoneBook) {
                    let current = phoneBook[key];

                    let li = document.createElement('li');
                    let buttonDelete = document.createElement('button');
                    buttonDelete.textContent = 'Delete';
                    let id = current._id;

                    buttonDelete.addEventListener('click', (e) => {
                        e.currentTarget.parentNode.remove();

                        fetch(`${baseUrl}/${id}`, {
                            method: 'DELETE',

                        });

                    });

                    li.textContent = `${current.person}: ${current.phone}`;
                    li.appendChild(buttonDelete);
                    proneBookUl.appendChild(li);

                }

            });

    });

    createButton.addEventListener('click', () => {
        let person = document.getElementById('person').value;
        let phone = document.getElementById('phone').value;

        if(person && phone ){

        fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    person,
                    phone
                })
            });

            
            

            fetch(baseUrl)
            .then(res => res.json())
            .then(phoneBook => {
                proneBookUl.innerHTML = '';

                for (const key in phoneBook) {
                    let current = phoneBook[key];

                    let li = document.createElement('li');
                    let buttonDelete = document.createElement('button');
                    buttonDelete.textContent = 'Delete';
                    let id = current._id;

                    buttonDelete.addEventListener('click', (e) => {
                        e.currentTarget.parentNode.remove();

                        fetch(`${baseUrl}/${id}`, {
                            method: 'DELETE',

                        });

                    });

                    li.textContent = `${current.person}: ${current.phone}`;
                    li.appendChild(buttonDelete);
                    proneBookUl.appendChild(li);

                }

            });


        }

        document.getElementById('person').value = '';
        document.getElementById('phone').value = '';

            

    });




}

attachEvents();