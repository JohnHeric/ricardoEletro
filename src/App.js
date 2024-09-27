import GradeProdutos from "./componentes/GradeProdutos";
import BarraBusca from "./templates/BarraBusca";
import Cabecalho from "./templates/Cabecalho";
import { useEffect, useState } from "react";
import PaginaCarrinho from "./templates/PaginaCarrinho";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState(informacoesDoCarrinho());
  const [open, setOpen] = useState(false)

  function ativar(){  
    setOpen(true)
  }
  function desativar(){  
    setOpen(false)
  }

  function addItemToCart(produto) {
    // Pega as informacoes do carrinho
    const carrinhoAtual = localStorage.getItem('carrinho')

    // Formata o carrinho em STRING para OBJETO JSON (Caso nao tenha nada no carrinho vai ser uma array vazia)
    const formatarCarrinho = carrinhoAtual ? JSON.parse(carrinhoAtual) : []

    let novoCarrinho = []

    const produtoJaExiste = formatarCarrinho.find((p) => p.id === produto.id)

    if(produtoJaExiste) {
      novoCarrinho = formatarCarrinho.map((p) => {
        if (p.id === produto.id) {
          return {
            ...p,
            quantidade: parseInt(p.quantidade) + parseInt(produto.quantidade)
  
          }
        } else {
          return p
        }
      }) 
    } else {
      // Vou pegar o carrinho atual e despejar dentro dessa nova listagem, formando um novo carrinho
      novoCarrinho = [...formatarCarrinho, produto]
    }


    // Atualiza no useState principal
    setCarrinho(novoCarrinho)
    
    // Atualiza a informacao do carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho))

    // alert('Produto adicionado ao carrinho!');
  }

  function removeItemInCart(produto) {
    const carrinhoAtualizado = carrinho.filter((p) => p.id !== produto.id) 

    setCarrinho(carrinhoAtualizado)
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado))
  }

  function atualizarQuantidadeDoItem(produto) {
    const carrinhoAtualizado = carrinho.map((p) => {
      if (p.id === produto.id) {
        return produto
      } else {
        return p
      }
    }) 

    setCarrinho(carrinhoAtualizado)
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado))
  }

  useEffect(() =>
  {
    fetch("https://fakestoreapi.com/products")
    .then((resposta) => resposta.json())
    .then((produtos) => {setProdutos(produtos);});  
  },[]);


  function informacoesDoCarrinho(){
    // Pega as informacoes do carrinho
    const carrinhoAtual = localStorage.getItem('carrinho')
  
    // Formata o carrinho em STRING para OBJETO JSON (Caso nao tenha nada no carrinho vai ser uma array vazia)
    const formatarCarrinho = carrinhoAtual ? JSON.parse(carrinhoAtual) : []
  
    return formatarCarrinho
  }

  return (
    <div className="App">
      {open && 
        <PaginaCarrinho carrinho={carrinho} atualizarQuantidadeDoItem={atualizarQuantidadeDoItem} removeItemInCart={removeItemInCart} desativar={desativar}/>
      }
      <Cabecalho/>
      <BarraBusca carrinho={carrinho} ativar={ativar}/>
      <GradeProdutos listaProdutos={produtos} addItemToCart={addItemToCart}/>
    </div>
  );
}

export default App;
