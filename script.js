document.addEventListener("DOMContentLoaded", function () {
  const inputValue = document.getElementById("user-input");

  // Lógica para números
  document.querySelectorAll(".numbers").forEach(function (item) {
    item.addEventListener("click", function (e) {
      if (inputValue.innerText === "NaN" || inputValue.innerText === "0") {
        inputValue.innerText = ""; // Limpa se estiver NaN ou 0
      }
      inputValue.innerText += e.target.innerHTML.trim(); // Adiciona número
    });
  });

  // Lógica para operações
  document.querySelectorAll(".operations").forEach(function (item) {
    item.addEventListener("click", function (e) {
      let lastValue = inputValue.innerText.substring(
        inputValue.innerText.length - 1
      );

      if (e.target.innerHTML === "=") {
        // Substitui símbolos `×` e `÷` pelos operadores corretos
        let expression = inputValue.innerText.replace(/×/g, "*").replace(/÷/g, "/");

        try {
          // Verifica se há divisão por zero
          if (expression.includes("/0")) {
            inputValue.innerText = "Erro"; // Exibe erro se houver divisão por zero
          } else {
            inputValue.innerText = eval(expression); // Executa a expressão matemática
          }
        } catch (error) {
          inputValue.innerText = "Erro"; // Exibe erro se a expressão não for válida
        }
      } else if (e.target.innerHTML === "AC") {
        // Limpa tudo
        inputValue.innerText = 0;
      } else if (e.target.innerHTML === "DEL") {
        // Deleta último caractere
        inputValue.innerText = inputValue.innerText.slice(0, -1);
        if (inputValue.innerText.length == 0) {
          inputValue.innerText = 0;
        }
      } else if (e.target.innerHTML === "%" && !isNaN(lastValue)) {
        // Aplica porcentagem
        inputValue.innerText = (parseFloat(inputValue.innerText) / 100).toString();
      } else {
        // Adiciona operação apenas se o último valor for um número
        if (!isNaN(lastValue) || lastValue === ".") {
          inputValue.innerText += e.target.innerHTML.trim();
        }
      }
    });
  });
});
