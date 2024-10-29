const listBook = document.querySelector('#student-list')

function formatDate(dateString) {
    let date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

function renderList(doc){

    let li = document.createElement('li');
    
    let cpf = document.createElement('span');
    let data_nascimento = document.createElement('span');
    let email = document.createElement('span');
    let nome = document.createElement('span');
    let rg = document.createElement('span');
    let telefone_aluno = document.createElement('span');
    let telefone_responsavel = document.createElement('span');

    let excluir = document.createElement('div');

    docData = doc.data();

    cpf.textContent = "CPF: " + docData.cpf;
    data_nascimento.textContent = "Data de Nascimento: " + formatDate(docData.data_nascimento);
    email.textContent = "Email: " + docData.email;
    nome.textContent = docData.nome;
    rg.textContent = "RG: " + docData.rg;
    telefone_aluno.textContent = "Telefone do Responsável: " + docData.telefone_aluno;
    telefone_responsavel.textContent = "Telefone do Aluno: " + docData.telefone_responsavel;

    excluir.textContent = 'X';

    li.setAttribute('data-id', doc.id);

    li.appendChild(nome);
    li.appendChild(data_nascimento);
    li.appendChild(email);
    li.appendChild(cpf);
    li.appendChild(rg);
    li.appendChild(telefone_aluno);
    li.appendChild(telefone_responsavel);

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

const form = document.querySelector('#add-form')

form.addEventListener('submit', (event)=>{
    event.preventDefault();

    db.collection("BD3-NoSQL-Firestore").add({
        cpf: form.cpf.value,
        data_nascimento: form.data_nascimento.value,
        email: form.email.value,
        nome: form.nome.value,
        rg: form.rg.value,
        telefone_aluno: form.telefone_aluno.value,
        telefone_responsavel: form.telefone_responsavel.value
    }).then(()=>{
        form.cpf.value = '';
        form.data_nascimento.value = '';
        form.email.value = '';
        form.nome.value = '';
        form.rg.value = '';
        form.telefone_aluno.value = '';
        form.telefone_responsavel.value = '';
        window.location.reload();
    });
});

//Validação para telefone
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
    }
    input.value = value;
}

function emailCheck() {
    
}

document.querySelector('input[name="telefone_aluno"]').addEventListener('input', function(event) {
    formatPhoneNumber(event.target);
});

document.querySelector('input[name="telefone_responsavel"]').addEventListener('input', function(event) {
    formatPhoneNumber(event.target);
});

document.querySelector('input[name="email"]').addEventListener('input', function(event){
    
});

