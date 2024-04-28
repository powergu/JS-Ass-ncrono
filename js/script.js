const botao = document.getElementById('botao');

botao.addEventListener('click', (e) => {   //(event) = (e)
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    if (nome && email) {
        e.preventDefault(); //cancela a submissão do form pelo botão
        const dados = {
            nome: nome,
            email: email
        };

        //manter chaves do jeito que estão, chaves fixas
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        //executar a chamada à API post do servidor
        fetch('http://localhost:3000/adicionar', options).then(resposta => {
            return resposta.json()
        }).then(respostaJson => {
            console.log(respostaJson)
            listar(); //para atualizar os dados da tabela pós inserção
            document.getElementById('limpar').click;
        });
    }
});

function listar() {
    //consultar os dados da api do servidor
    fetch('http://localhost:3000/listar').then(resposta => { return resposta.json() }).then(lista => {
        const corpoTabela = document.getElementById('tbl-corpo');
        corpoTabela.innerHTML = ''; // iniciando corpo da tabela vazio ''
        document.getElementById('tbl-rodape').innerHTML = `${lista.length} Registros Cadastrados`;
        let index = 0;
        for (item of lista) {
            let linha = `<tr>
            <td>${item.nome}</td>
            <td>${item.email}</td>
            <td><i class="bi bi-trash" data-index="${index}"></i></td>
            </tr>`;
            corpoTabela.innerHTML += linha; //adicionando linhas //+= mantenha linhas anteriores e coloque as novas
            index++;
        }
        montaLinks();
    });
}

function montaLinks(){
    const iconesRemocao = document.getElementsByClassName('bi-trash');
    for(let i=0; i<iconesRemocao.length; i++){
        iconesRemocao[i].addEventListener('click',(event)=>{
            //recebo o valor do data-index do bi-trash clicado
            const index = event.target.getAttribute('data-index');
            fetch(`http://localhost:3000/remover/${index}`,{method: 'DELETE'}).then(resposta =>{
                return resposta.json()
            }).then(respostaJson => {
                alert(respostaJson.mensagem);
                listar();
            });
        });
    }
}



listar();