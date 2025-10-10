let lista = document.getElementById("lista")

let totalSpan = document.getElementById("total")


document.getElementById("adicionar").addEventListener("click", function(){
    
    let nome = document.getElementById("nome").value;
    let quantidade = parseInt(document.getElementById("quantidade").value);
    let preco = parseFloat(document.getElementById("preco").value);


    if(!nome || isNaN(quantidade) || isNaN(preco)){
        alert("Preencha todos os campos corretamnete")
        return;
    }


    let subtotal = quantidade * preco;

    let li = document.createElement("li");

    li.innerText = `${nome} - ${quantidade} x R$${preco.toFixed(2)} = R$${subtotal.toFixed(2)}`;

    li.style.color = "green";


    li.addEventListener("click", function(){
        lista.removeChild(li)
    })

    lista.appendChild(li);

    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("preco").value = "";

});


document.getElementById("calcular").addEventListener("click", function() {
  let itens = lista.getElementsByTagName("li");
  let total = 0;

  for (let i = 0; i < itens.length; i++) {
    let valorTexto = itens[i].innerText.split("= R$")[1];
    total += parseFloat(valorTexto);
  }

  totalSpan.innerText = `Total: R$ ${total.toFixed(2)}`;
});



document.getElementById("limpar").addEventListener("click", function(){
    lista.innerHTML = ""

    totalSpan.innerText = "Total: R$ 0.000";
})





// document.getElementById("calcular").addEventListener("click", function(){
    
//     let itens =  lista.getElementsByTagName("li");
//     let total = 0;

//     for(let i = 0; i < itens.length; i++){
//         let valorTexto = itens[i].innerText.split("= R$")[1];
//         total += parseFloat(valorTexto);
//     }

//     totalSpan.innerText = `Total: R$${total.toFixed(2)}`;

// });



