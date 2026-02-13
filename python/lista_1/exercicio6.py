# Escreva um script que: 

# Cria um dicionário com as chaves: nome, idade e cidade. 
# Adiciona uma nova chave profissão. 
# Verifica se a chave idade está no dicionário e imprime seu valor. 
# Remove a chave cidade. 
# Compare a sintaxe dessas operações em Python com o que você já viu em JavaScript, o que é diferente no python ?

# 🐍 Python:
# Usa in de forma bem natural para verificar chave
# pop() remove diretamente pela chave
# Estrutura é pensada para dados (mapa chave-valor)
# Sintaxe bem enxuta

# Criar dicionário
pessoa = {
    "nome": "Ana",
    "idade": 25,
    "cidade": "São Paulo"
}

print("Dicionário original:", pessoa)

# Adicionar nova chave
pessoa["profissao"] = "Desenvolvedora"

# Verificar se "idade" existe e imprimir
if "idade" in pessoa:
    print("Idade:", pessoa["idade"])

# Remover "cidade"
pessoa.pop("cidade")

print("Dicionário final:", pessoa)

# 💻 JavaScript
# Remove com delete (palavra-chave, não método)
# Pode acessar com . ou []
# Objetos JS têm mais funções além de armazenar dados
# Objetos são base de Programação Orientada a Objetos
# Em JS, quase tudo é objeto:
# Arrays
# Funções
# Datas
# Promises
# etc.

let pessoa = { nome: "Ana" };

# adicionar
pessoa.idade = 25;

# verificar
"idade" in pessoa;

# remover
delete pessoa.idade;
