const listBook = document.querySelector('#book-list')

function renderList(doc){

    let li = document.createElement('li');
    let autor = document.createElement('span');
    let titulo = document.createElement('span');
    let excluir = document.createElement('div'); 

    data = doc.data();

    autor.textContent = data.autor;
    titulo.textContent = data.titulo;
    excluir.textContent = 'X';

    li.setAttribute('data-id', doc.titulo);

    li.appendChild(titulo);
    li.appendChild(autor);

    listBook.appendChild(li);

    li.appendChild(excluir);

    excluir.addEventListener('click', (event)=>{
        event.stopPropagation();

        let id = event.target.parentElement.getAttribute('data-id');

        db.collection("BD3-NoSQL-Firestore").doc(id).delete()
            .then(()=>{window.location.reload()})

    });
}

db.collection("BD3-NoSQL-Firestore")
    .get()
    .then((snapshot) => {
        snapshot.docs.forEach(
            doc => {
                renderList(doc)
            }
        )
    })

const form = document.querySelector('#add-book-form')

form.addEventListener('submit', (event)=>{
    event.preventDefault();

    db.collection("BD3-NoSQL-Firestore").add({
        autor: form.autor.value,
        titulo: form.titulo.value
    }).then(()=>{
        form.autor.value = '';
        form.titulo.value = '';
        window.location.reload();
    });
});

