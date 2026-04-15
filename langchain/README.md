# 🟨 Exercícios de LangChain

Este repositório contém exercícios práticos utilizando **LangChain**, com foco no desenvolvimento de aplicações baseadas em **LLMs (Large Language Models)** e **IA generativa**.

Os exercícios foram desenvolvidos ao longo dos estudos e exploram conceitos essenciais para construção de aplicações inteligentes, como:

- Criação de prompts
- Chains (cadeias de execução)
- Integração com modelos de linguagem
- Uso de ferramentas (tools)
- Agentes autônomos
- Memória em aplicações com IA
- Processamento de documentos
- Retrieval-Augmented Generation (RAG)
- Integração com APIs externas

O objetivo é consolidar o conhecimento em LangChain e criar exemplos reutilizáveis para projetos futuros.

---

## 📂 Estrutura do Repositório
```text
.
├── lista-01/
│   ├── exercicio-01/
│   ├── exercicio-02/
│   └── ...
├── lista-02/
│   ├── exercicio-01/
│   ├── exercicio-02/
│   └── ...
└── README.md
```

> Cada exercício contém:
> - Código Python organizado e comentado
> - Scripts ou notebooks (`.py` ou `.ipynb`)
> - Exemplos de uso
> - Um README explicando o problema e a solução implementada, se necessário

> Alguns exercícios utilizam integrações com APIs, documentos externos ou bases vetoriais.

> Novos exercícios serão adicionados conforme a evolução dos estudos.

---

## 🛠️ Tecnologias utilizadas

1. **Python**

- Linguagem principal do projeto.
- Base para desenvolvimento com LangChain.

2. **LangChain**

- Framework para desenvolvimento de aplicações com LLMs.
- Permite criação de chains, agentes, ferramentas, memória, etc.

3. **OpenAI (ou outros provedores de LLM)**

- Modelos de linguagem utilizados nos exemplos.
- Responsáveis por geração de texto e raciocínio.

4. **FAISS / Chroma (Vector Stores)**

- Armazenamento e busca semântica de embeddings.
- Utilizados em aplicações de RAG.

5. **Embeddings**

- Representação vetorial de textos.
- Base para busca semântica e similaridade.

6. **Jupyter Notebook**

- Ambiente interativo para experimentação.
- Ideal para testes e visualização dos resultados.

7. **APIs externas**

- Integração com serviços externos para enriquecer aplicações.

8. **Git & GitHub**

- Controle de versão dos exercícios.
- Registro da evolução do aprendizado.
  
---

## 🚀 Como executar os exercícios

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
```

2. Acesse a pasta do projeto:
```bash
cd nome-do-repositorio
```

3. Crie um ambiente virtual:
```bash
python -m venv .venv
```

4. Ative o ambiente virtual:
```bash
source .venv/bin/activate  # Linux/Mac
.venv\Scripts\activate  # Windows
```

5. Instale as dependências:
```bash
pip install -r requirements.txt
```

6. Configure as variáveis de ambiente (ex: chave de API):
```bash
export OPENAI_API_KEY="sua-chave-aqui"  # Linux/Mac
setx OPENAI_API_KEY "sua-chave-aqui"   # Windows
```

7. Execute os notebooks ou scripts:
```bash
jupyter notebook
# ou
python arquivo.py
``` 

---

## 🎯 Objetivo

Este repositório serve como:

- Material de estudo prático
- Base para projetos com IA generativa
- Referência de implementação com LangChain
- Registro da evolução no aprendizado de LLMs