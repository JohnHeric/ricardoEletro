
export default function PaginaCarrinho(props){
    console.log(props)

    return(
        <div>
            {props.carrinho.map((produto) => (
                <>
                <div>
                    <p>
                        {produto.title} 
                        - <b>Quantidade:</b> 
                        
                        &nbsp; 

                        <button
                            disabled={produto.quantidade === 1}
                            onClick={()=>
                                    produto.quantidade > 1 &&
                                    props.atualizarQuantidadeDoItem({
                                        ...produto,
                                        quantidade: parseInt(produto.quantidade) - 1
                            })}
                        >-</button>
                        &nbsp; {produto.quantidade} &nbsp; 
                        <button onClick={()=> props.atualizarQuantidadeDoItem({
                            ...produto,
                            quantidade: parseInt(produto.quantidade) + 1
                        })}>+</button>

                        &nbsp;
                        <button onClick={()=> props.removeItemInCart(produto)}>Excluir</button>
                    </p>
                </div>
                <div>
                    <button onClick={()=>
                        props.desativar()
                    }
                    >Fechar carrinho</button>
                </div>
                </>
            ))}
        </div>
    )
}
    
