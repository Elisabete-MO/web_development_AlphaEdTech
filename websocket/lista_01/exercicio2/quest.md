## 1. Alteração de `2000` para `10000`

Ao alterar:

```javascript
setInterval(fetchMessages, 2000);
```

para:

```javascript
setInterval(fetchMessages, 10000);
```

o cliente passa a consultar o servidor a cada **10 segundos**, em vez de a cada **2 segundos**.

Isso provoca:

* **Maior latência:** uma mensagem nova pode demorar até aproximadamente 10 segundos para aparecer no cliente.
* **Menor carga no servidor:** serão realizadas menos requisições HTTP. Em um minuto, cada cliente fará aproximadamente 6 requisições, em vez de 30.

Portanto, aumentar o intervalo reduz o uso de recursos do servidor, mas faz com que as mensagens demorem mais para chegar ao cliente.

## 2. Atualização da variável `since`

A linha utilizada para atualizar `since` com o horário atual é:

```javascript
since = new Date().toISOString();
```

Ela deve ser executada depois que o cliente receber uma resposta contendo mensagens novas:

```javascript
if (data.length > 0) {
    since = new Date().toISOString();
}
```
