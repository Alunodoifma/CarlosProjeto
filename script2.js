//VOCÊ DEVE SUBSTITUIR A URL ABAIXO PELA URL DO IMPORT SEU PROJETO NO FIREBASE (CONFIGURAÇÕES CDN DO SEU PROJETO)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

//VOCÊ DEVE SUBSTITUIR OS CÓDIGOS ABAIXOS CÓDIGOS DO SEU PROJETO NO FIREBASE (FIREBASE CONFIGURATION)
const firebaseConfig = {
    apiKey: "AIzaSyAP5M26U3xOHH4Bpx4JNUs-Ms89SffJZ4A",
    authDomain: "loja-tech-18f79.firebaseapp.com",
    databaseURL: "https://loja-tech-18f79-default-rtdb.firebaseio.com",
    projectId: "loja-tech-18f79",
    storageBucket: "loja-tech-18f79.firebasestorage.app",
    messagingSenderId: "1025682518328",
    appId: "1:1025682518328:web:02ff4ae9565848d8cf11cd",
    measurementId: "G-858C4ZJ21C"
  };

 // Initialize Firebase
const app = initializeApp(firebaseConfig);

 //VOCÊ DEVE SUBSTITUIR AO FINAL DA URL AS PALAVRAS FIREBASE-APP POR FIREBASE-DATABASE
import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";


const db = getDatabase();

//  CAMPOS DE ENTRADAS DOS VALORES DO CADASTRO DE PRODUTOS
let codigo = document.getElementById('codigo');
let produto =document.getElementById('produto');
let categoria =document.getElementById('categoria');
let quantidade =document.getElementById('quantidade');
let valor =document.getElementById('valor');

//CAMPO DE PESQUISA E ATUALIZAÇÃO DOS PRODUTOS
let idProduto = document.getElementById('idProduto');

//RESULTADOS DAS PESQUISAS
let dadoProduto = document.getElementById('dadoProduto');
let dadoCategoria = document.getElementById('dadoCategoria');
let dadoQuantidade = document.getElementById('dadoQuantidade');
let dadoValor = document.getElementById('dadoValor');

//BOTÕES DOS CAMPOS DE PESQUISA
let cadastrarProduto = document.getElementById('cadastrarProduto');
let buscarProduto = document.getElementById('buscarProduto');
let atualizarProduto = document.getElementById('atualizarProduto');
let deletarProduto = document.getElementById('deletarProduto');

//ADICIONAR PRODUTO
 function AddProduto(){
    set(ref(db,'Produto/'+codigo.value),{
        codigo: codigo.value,
        produto: produto.value,
        categoria: categoria.value,
        quantidade: quantidade.value,
        valor: valor.value
    }).then(()=>{
        codigo.value = ''
        produto.value=''
        categoria.value=''
        quantidade.value=''
        valor.value=''
        alert("Produto Cadastrado!");
    }).catch((error)=>{
        console.log(error);
        alert('Produto Não Cadastrado!');
    })

 }

 //FUNCÃO PARA PESQUISA DE PRODUTOS COM BASE NO CÓDIGO DO PRODUTO => idProduto
 function PesquisarProduto(){
    const dbRef = ref(db);
    get(child(dbRef,'Produto/'+idProduto.value)).then((snapshot)=>{
        if(snapshot.exists()){
            dadoProduto.value = snapshot.val().produto;
            dadoCategoria.value = snapshot.val().categoria;
            dadoQuantidade.value = snapshot.val().quantidade;
            dadoValor.value = ('R$ ')+parseFloat (snapshot.val().valor).toFixed(2);
            alert('Produto Localizado!')
        }else{
            alert("O produto não existe");
        }
    }).then(()=>{
        alert('Leitura Realizada!')
    }).catch((e)=>{
        alert('Algo deu errado!')
        console.log(e)
    })
 }

 //FUNÇÃO PARA ATUALIZAÇÃO DAS INFORMAÇÕES ACERCA DO PRODUTO
function AtualizarProdutos(){
    update(ref(db,'Produto/'+idProduto.value),{
        produto:dadoProduto.value,
        categoria:dadoCategoria.value,
        quantidade:dadoQuantidade.value,
        valor:dadoValor.value
    }).then(()=>{
        alert('Produto Atualizado!');
    }).catch((e)=>{
        alert('Algo deu errado!')
        console.log(e)
    })
}

//FUNÇÃO PARA DELETAR PRODUTO
function DeletarProdutos(){
    remove(ref(db,'Produto/'+idProduto.value)).
    then(()=>{
        idProduto.value=''
        dadoProduto.value=''
        dadoCategoria.value=''
        dadoQuantidade.value=''
        dadoValor.value=''
        alert('Produto Deletado!')
    })
}

//MÉTODOS PARA UTILIZAÇÃO DAS FUNÇÕES COM BASE NAS AÇÕES DOS BOTÕES
cadastrarProduto.addEventListener('click',AddProduto);
buscarProduto.addEventListener('click',PesquisarProduto);
atualizarProduto.addEventListener('click',AtualizarProdutos);
deletarProduto.addEventListener('click',DeletarProdutos);