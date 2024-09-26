import GradeProdutos from "./componentes/GradeProdutos";
import BarraBusca from "./templates/BarraBusca";
import Cabecalho from "./templates/Cabecalho";
import { useEffect, useState } from "react";

function informacoesDoCarrinho(){
  // Pega as informacoes do carrinho
  const carrinhoAtual = localStorage.getItem('carrinho')

  // Formata o carrinho em STRING para OBJETO JSON (Caso nao tenha nada no carrinho vai ser uma array vazia)
  const formatarCarrinho = carrinhoAtual ? JSON.parse(carrinhoAtual) : []

  return formatarCarrinho
}

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState(informacoesDoCarrinho());

  function addItemToCart(produto) {
    // Pega as informacoes do carrinho
    const carrinhoAtual = localStorage.getItem('carrinho')

    // Formata o carrinho em STRING para OBJETO JSON (Caso nao tenha nada no carrinho vai ser uma array vazia)
    const formatarCarrinho = carrinhoAtual ? JSON.parse(carrinhoAtual) : []

    // Vou pegar o carrinho atual e despejar dentro dessa nova listagem, formando um novo carrinho
    const novoCarrinho = [...formatarCarrinho, produto]

    // Atualiza no useState principal
    setCarrinho(novoCarrinho)
    
    // Atualiza a informacao do carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho))

    alert('Produto adicionado ao carrinho!');
  }

  useEffect(() =>
  {
    fetch("https://fakestoreapi.com/products")
    .then((resposta) => resposta.json())
    .then((produtos) => {setProdutos(produtos);});  
  },[]);

  return (
    <div className="App">
      <Cabecalho/>
      <BarraBusca carrinho={carrinho}/>
      <GradeProdutos listaProdutos={produtos} addItemToCart={addItemToCart}/>
    </div>
  );
}

export default App;
