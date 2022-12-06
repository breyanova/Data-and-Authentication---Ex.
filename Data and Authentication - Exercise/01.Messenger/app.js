function attachEvents() {

    let sendButton = document.getElementById('submit');
    let refreshButton = document.getElementById('refresh');
    let baseUrl = 'http://localhost:3030/jsonstore/messenger';
    let textArea = document.getElementById('messages');

    sendButton.addEventListener('click', () => {
        let author = document.querySelector('[name="author"]').value;
        let content = document.querySelector('[name="content"]').value;

        fetch(baseUrl, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                author,
                content
              })
              
        })
        .then(res => res.json())
        .then(data => console.log(data))
        

    });

    refreshButton.addEventListener('click', () => {

        fetch(baseUrl)
        .then(res => res.json())
        .then(messages => {

            let arr = [];

            
            for (const key in messages) {

               let object =  messages[key];



               arr.push(`${object.author}: ${object.content}`)
   
            }
            textArea.textContent = arr.join('\n');

            
        })

    });


    
}

attachEvents();