Vamos construir um servidor HTTP com endpoint de polling. O servidor mantém um array de mensagens em
memória e expõe GET /messages?since=TIMESTAMP que retorna apenas mensagens mais recentes que o
timestamp.
Você também construirá um cliente HTML com setInterval que faz requisições a cada 2s e exibe métricas
de eficiência em tempo real.