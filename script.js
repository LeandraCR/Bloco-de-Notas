// Obtém o botão com o id 'adicionar'
const adicionarBtn = document.getElementById('adicionar');
// Obtém o container de notas
const notasContainer = document.getElementById('notas-container');
// Recupera e converte de volta ao formato original as notas armazenadas no localStorage
const notas = JSON.parse(localStorage.getItem("notas"));

// Se houver notas armazenadas, adiciona cada uma delas à página
if (notas) {
    notas.forEach(nota => adicionarNovaNota(nota));
}

// Adiciona um evento de clique ao botão 'adicionar', que cria uma nova nota vazia
adicionarBtn.addEventListener('click', () => adicionarNovaNota());

// Função para adicionar uma nova nota
function adicionarNovaNota(text = '') {
    // Cria uma nova div para a nota e adiciona a classe 'nota'
    const nota = document.createElement('div');
    nota.classList.add('nota');

    // Define o conteúdo HTML da nota
    nota.innerHTML = `
        <div class="configuracao">
            <button class="editar">
                <i class="fas fa-edit"></i>
            </button>
            <button class="deletar">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
    `;

    // Seleciona os elementos '.editar', '.deletar', '.main', e 'textarea' da nota criada
    const btnEditar = nota.querySelector('.editar');
    const btnDeletar = nota.querySelector('.deletar');
    const main = nota.querySelector('.main');
    const textarea = nota.querySelector('textarea');

    // Define o valor do 'textarea' e o conteúdo HTML da 'main'
    textarea.value = text;
    main.innerHTML = marked(text);

    // Adiciona evento de clique ao botão de deletar para remover a nota e atualizar o localStorage
    btnDeletar.addEventListener('click', () => {
        nota.remove();
        storage();
    });

    // Adiciona evento de clique ao botão de editar para alternar a visibilidade entre 'main' e 'textarea'
    btnEditar.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    });

    // Adiciona evento de input ao 'textarea' para atualizar o conteúdo da 'main' e o localStorage
    textarea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        storage();
    });

    // Adiciona a nova nota ao container de notas
    notasContainer.appendChild(nota);
}

// Função para armazenar as notas no localStorage
function storage() {
    // Seleciona todos os elementos 'textarea'
    const notasTexto = document.querySelectorAll('textarea');
    const notas = [];
    // Coleta os valores dos 'textarea' e adiciona ao array 'notas'
    notasTexto.forEach(nota => notas.push(nota.value));
    // Converte o array 'notas' em uma string JSON e armazena no localStorage
    localStorage.setItem('notas', JSON.stringify(notas));
}
