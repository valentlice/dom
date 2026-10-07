// Elementos DOM
const form = document.querySelector("#form-tarefa");
const inputTarefa = document.querySelector("#tarefa");
const contador = document.querySelector("#contador");
const listaTarefas = document.querySelector("#lista-tarefas");

// Resgate das tarefas no localStorage
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Ouvir o evento clique
form.addEventListener("submit", adicionarTarefa);

// Funções
function adicionarTarefa(event) {
    event.preventDefault();

    let texto = inputTarefa.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        concluido: false
    };

    tarefas.push(novaTarefa);
    salvarTarefa();
    renderizarTarefas();

    inputTarefa.value = "";
    inputTarefa.focus();
}

function salvarTarefa() {
    localStorage.setItem(
        "tarefas", 
        JSON.stringify(tarefas)
    );
}

function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    tarefas.forEach(function (tarefa, indice) {
        const linha = document.createElement("tr");

        const colunaNumero = document.createElement("td");
        colunaNumero.textContent = indice + 1;
        
        const colunaTexto = document.createElement("td");
        colunaTexto.textContent = tarefa.texto;

        if (tarefa.concluido) {
            colunaTexto.classList.add(
                "text-decoration-line-through",
                "text-muted"
            );
        }

        const colunaStatus = document.createElement("td");
        if (tarefa.concluido) {
            colunaStatus.innerHTML = 
            '<span class="badge text-bg-success">Concluída</span>';
        } else {
            colunaStatus.innerHTML = 
            '<span class="badge text-bg-warning">Pendente</span>';
        }

        const colunaAcoes = document.createElement("td");
        colunaAcoes.classList.add("text-center");

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = tarefa.concluido ? "Reabrir" : "Concluir";
        botaoConcluir.classList.add(
            "btn",
            tarefa.concluido ? "btn-warning" : "btn-success",
            "btn-sm",
            "me-2"
        );

        const botaoExcluir = document.createElement("button");
        const botaoEditar = document.createElement("button");

        colunaAcoes.appendChild(botaoConcluir);

        linha.appendChild(colunaNumero);
        linha.appendChild(colunaTexto);
        linha.appendChild(colunaStatus);
        linha.appendChild(colunaAcoes);

        listaTarefas.appendChild(linha);
    });
}

renderizarTarefas();
