import React,{useState, useEffect} from "react";
import './TodoList.css'
import Icone from './assets/icon.png'

export default function TodoList(){

    const listaStorage = localStorage.getItem('Lista');

    const[lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []); //lista de itens

    const[novoItem, setNovoItem] = useState(""); //itens a serem adicionados

    //funcao que toda vez que a lista for mudada chama a funcao
    
    useEffect(()=>{
        localStorage.setItem('Lista', JSON.stringify(lista));
    }, [lista])
    
    function adicionaItem(form){
        form.preventDefault(); // nao reiniciar a pagina
        if(!novoItem){ // vazio
            return;
        }
        setLista([...lista, {text:novoItem, isCompleted:false}]);
        // pegar os valores que ja tem na lista e acrescentar os novos
        setNovoItem("");
        document.getElementById('input1').focus();
    }

    function clicou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deletar(index){
        const listaAux = [...lista];
        listaAux.splice(index,1); //funcao que remove o item na posicao index
        setLista(listaAux);
    }

    function deletarTudo(){
        setLista([]);
    }

    return(
        <div>
            <h1 id="titulo">Lista de tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input id="input1" type="text"
                value={novoItem} onChange={(e)=>{setNovoItem(e.target.value)}}
                placeholder="Adicione uma tarefa"
                />
                <button className="adicionar" type="submit" > Adicionar </button>
            </form>
            <div className="listaTarefas">
                <div>
                    {
                        lista.length < 1
                            ?
                            <img className="icone" src={Icone}/>
                            :
                            lista.map((item,index)=>(
                                <div 
                                key={index}
                                className={item.isCompleted ? "item-riscado" : "item"}>
                                    <span 
                                    onClick={()=>{clicou(index)}}>{item.text}
                                    </span>
                                    <button
                                    onClick={()=>{deletar(index)}}
                                    className="deletar">Deletar</button>
                                </div>
                            ))
                    }
                    {
                        lista.length > 0 &&
                        <button
                        onClick={()=>{deletarTudo()}}
                        className="deletar-todos">Deletar todas as terefas</button>
                    }
                </div>
            </div>
        </div>
    )
}