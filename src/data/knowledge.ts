export type KnowledgeSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type KnowledgeArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  keywords: string;
  icon: "brain" | "search" | "hybrid" | "code" | "workflow" | "building";
  summary: string;
  updated: string;
  sections: KnowledgeSection[];
  faqs: { question: string; answer: string }[];
};

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: "rag",
    title: "RAG — Retrieval Augmented Generation",
    seoTitle: "O que é RAG (Retrieval Augmented Generation) | Anderson Mautone",
    description:
      "Guia de RAG: como Retrieval Augmented Generation combina busca em bases de conhecimento com LLMs. Chunking, embeddings, pgvector, Python, Go e arquitetura corporativa.",
    keywords:
      "RAG, Retrieval Augmented Generation, embeddings, chunking, LLM, knowledge base, pgvector, GenAI, Python, FastAPI, Go",
    icon: "brain",
    summary:
      "RAG conecta um LLM a documentos reais: recupera trechos relevantes e gera respostas com contexto, reduzindo alucinação e permitindo IA sobre dados corporativos.",
    updated: "2026-08-19",
    sections: [
      {
        heading: "O que é RAG",
        paragraphs: [
          "RAG (Retrieval Augmented Generation) é um padrão de arquitetura de Inteligência Artificial Generativa em que o modelo de linguagem não responde só com o que foi treinado: primeiro recupera trechos de uma base de conhecimento e depois gera a resposta com esse contexto.",
          "Em sistemas corporativos, isso significa consultar contratos, manuais, tickets, normas e bases internas — com Semantic Search, Vector Search e, em muitos casos, Hybrid Search — antes de chamar o LLM (OpenAI, Gemini, Claude ou modelos via API).",
        ],
      },
      {
        heading: "Como o pipeline funciona",
        paragraphs: [
          "O fluxo típico de um RAG em produção separa ingestão (offline) e pergunta (online).",
        ],
        bullets: [
          "Ingestão: documentos → extração de texto → chunking → embeddings → armazenamento vetorial (PostgreSQL/pgvector, MongoDB Atlas Vector Search ou similar).",
          "Consulta: pergunta do usuário → embedding da query → retrieval dos chunks mais relevantes → montagem do prompt com contexto → LLM → resposta citada ou rastreável.",
          "Opcional: reranking, filtros de metadados (cliente, data, módulo), tool calling e automações em n8n.",
        ],
      },
      {
        heading: "Por que RAG importa em projetos reais",
        paragraphs: [
          "Sem retrieval, o LLM inventa ou desconhece políticas internas. Com RAG, a IA passa a ser uma camada sobre o conhecimento da empresa — o mesmo princípio usado em plataformas de knowledge base, assistentes de suporte e busca documental avançada, como no projeto de Hybrid Search + RAG para a CADBRASIL.",
          "RAG também escala melhor do que fine-tuning para conteúdo que muda o tempo todo: atualiza-se o índice, não o modelo.",
        ],
      },
      {
        heading: "Stack recomendada",
        paragraphs: [
          "Python (FastAPI) é forte em embeddings, orquestração de chunks e integração com bibliotecas de IA. Go (Golang) entra bem em microservices de alta concorrência: APIs de retrieval, filas e serviços cloud-native. O banco vetorial pode ser PostgreSQL com pgvector; MongoDB cobre documentos e, em alguns desenhos, busca vetorial nativa.",
        ],
      },
    ],
    faqs: [
      {
        question: "RAG substitui fine-tuning?",
        answer:
          "Na maioria dos casos corporativos, não. RAG é o caminho para conhecimento atualizado e rastreável. Fine-tuning ajuda em estilo, formato ou domínio estável — os dois podem coexistir.",
      },
      {
        question: "Qual a diferença entre RAG e um chatbot comum?",
        answer:
          "O chatbot comum gera texto a partir do modelo. O RAG primeiro busca evidência na sua base (semantic/hybrid search) e só então gera, com contexto e menor alucinação.",
      },
    ],
  },
  {
    slug: "semantic-search",
    title: "Semantic Search — busca semântica",
    seoTitle: "Semantic Search: busca semântica com embeddings | Anderson Mautone",
    description:
      "O que é Semantic Search, como embeddings capturam significado, Vector Search com pgvector/MongoDB e quando usar busca semântica em vez de keyword search.",
    keywords:
      "Semantic Search, busca semântica, embeddings, Vector Search, pgvector, vector database, RAG, similaridade de cosseno",
    icon: "search",
    summary:
      "Semantic Search encontra conteúdo pelo significado, não só pelas palavras digitadas — usando embeddings e busca vetorial.",
    updated: "2026-08-19",
    sections: [
      {
        heading: "O que é Semantic Search",
        paragraphs: [
          "Semantic Search (busca semântica) recupera documentos ou trechos com base no significado da consulta, não apenas em palavras-chave exatas. “prazo de entrega do pedido” pode encontrar um parágrafo que fala em “SLA de fulfillment”, mesmo sem as mesmas palavras.",
          "Isso é possível porque textos são transformados em embeddings — vetores numéricos — e a busca compara proximidade no espaço vetorial (em geral similaridade de cosseno ou distância L2).",
        ],
      },
      {
        heading: "Embeddings e Vector Search",
        paragraphs: [
          "Um modelo de embedding (via OpenAI, Gemini ou modelos open source) gera um vetor para cada chunk. Esses vetores ficam em um Vector Database ou extensão como PostgreSQL/pgvector. Na consulta, a pergunta vira um vetor e o banco devolve os vizinhos mais próximos (k-NN / ANN).",
          "Metadados (fonte, data, cliente, idioma) permitem filtrar antes ou depois da busca vetorial — essencial em RAG corporativo.",
        ],
      },
      {
        heading: "Limitações",
        paragraphs: [
          "Busca só semântica pode falhar em códigos, SKUs, números de processo e termos jurídicos literais. Por isso, em produção, Semantic Search costuma ser combinada com keyword/BM25 — o que chamamos de Hybrid Search.",
        ],
      },
    ],
    faqs: [
      {
        question: "Semantic Search precisa de LLM?",
        answer:
          "Não. A busca semântica usa embeddings. O LLM entra depois, no RAG, para redigir a resposta com os trechos recuperados.",
      },
      {
        question: "PostgreSQL/pgvector serve para Semantic Search?",
        answer:
          "Sim. pgvector é uma escolha sólida para Vector Search junto de dados relacionais, filtros SQL e transações — muito usada em RAG corporativo.",
      },
    ],
  },
  {
    slug: "hybrid-search",
    title: "Hybrid Search — busca híbrida",
    seoTitle: "Hybrid Search avançado: semantic + keyword | Anderson Mautone",
    description:
      "Hybrid Search combina Semantic Search (embeddings) e busca tradicional (BM25/keyword). Ranking, rerank, RAG, n8n e o caso CADBRASIL.",
    keywords:
      "Hybrid Search, busca híbrida, BM25, semantic search, RAG, reranking, CADBRASIL, n8n, embeddings, pgvector",
    icon: "hybrid",
    summary:
      "Hybrid Search mistura busca por significado e por termo exato, com ranking único — o padrão mais robusto para bases documentais grandes.",
    updated: "2026-08-19",
    sections: [
      {
        heading: "O que é Hybrid Search",
        paragraphs: [
          "Hybrid Search (busca híbrida) combina dois retrievers: um semântico (embeddings / Vector Search) e um lexical (palavra-chave, full-text, BM25). Os resultados são fundidos por um score (RRF — Reciprocal Rank Fusion — ou pesos calibrados) e, em sistemas avançados, passam por reranking.",
          "O objetivo é acertar tanto a intenção (“como cancelo o contrato”) quanto identificadores rígidos (“processo 2024/8891”).",
        ],
      },
      {
        heading: "Arquitetura em produção",
        paragraphs: [
          "Uma API de busca (Go ou Python) dispara as duas queries em paralelo, normaliza scores, aplica filtros (ACL, tenant, data) e devolve chunks. Essa camada alimenta o RAG: o LLM só vê o que o hybrid retrieval escolheu.",
          "No projeto para a CADBRASIL, a busca híbrida avançada foi integrada a pipeline RAG e automações em n8n, permitindo consultar bases documentais e produzir respostas contextualizadas com IA.",
        ],
        bullets: [
          "Canal semântico: embedding da query + pgvector / MongoDB vector.",
          "Canal lexical: PostgreSQL full-text, Elasticsearch/OpenSearch ou MongoDB text index.",
          "Fusão: RRF ou weighted sum; rerank com modelo cross-encoder quando a precisão importa.",
          "Orquestração: n8n para ingestão, reindexação e webhooks de sistemas corporativos.",
        ],
      },
      {
        heading: "Quando usar",
        paragraphs: [
          "Use Hybrid Search quando o acervo mistura linguagem natural e termos de negócio (códigos, leis, SKUs). É o desenho que eu recomendo para knowledge bases, help desk inteligente e RAG em escala.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hybrid Search é o mesmo que RAG?",
        answer:
          "Não. Hybrid Search é a estratégia de retrieval. RAG é o padrão completo: retrieval + geração com LLM. O hybrid costuma ser o retriever dentro do RAG.",
      },
      {
        question: "O que foi feito na CADBRASIL?",
        answer:
          "Busca híbrida avançada com RAG e n8n: semantic search + retrieval tradicional, embeddings e automações para consultar documentos e responder com contexto.",
      },
    ],
  },
  {
    slug: "golang-python-ia",
    title: "Go e Python com Inteligência Artificial",
    seoTitle: "Golang e Python para IA, RAG e microservices | Anderson Mautone",
    description:
      "Como usar Go (Golang) e Python com IA: FastAPI, embeddings, RAG, microservices, concorrência, LLMs e quando cada linguagem brilha em projetos GenAI.",
    keywords:
      "Golang, Go, Python, FastAPI, IA, GenAI, RAG, microservices, embeddings, LLM API, concurrent processing",
    icon: "code",
    summary:
      "Python acelera o ciclo de IA (embeddings, orquestração, FastAPI). Go entrega APIs e microservices de alta concorrência na frente do RAG.",
    updated: "2026-08-19",
    sections: [
      {
        heading: "Papel de cada linguagem",
        paragraphs: [
          "Python é o ecossistema padrão de IA: clientes de LLM, geração de embeddings, notebooks, FastAPI para serviços de RAG e scripts de chunking. Bibliotecas e SDKs chegam primeiro em Python.",
          "Go (Golang) é excelente para a borda cloud-native: APIs REST, microservices, concorrência (goroutines), processamento assíncrono, gateways e workers que aguentam carga. Em um desenho maduro, o Python calcula embeddings e o Go serve retrieval, auth e fan-out para outros serviços.",
        ],
      },
      {
        heading: "Como usar Python com IA",
        paragraphs: [
          "Um serviço FastAPI recebe o documento ou a pergunta, chama o modelo de embedding, grava no pgvector/MongoDB e, no path de chat, monta o contexto RAG e invoca OpenAI, Gemini ou Claude. Workers Celery/RQ ou filas tratam ingestão em lote.",
        ],
        bullets: [
          "FastAPI + Pydantic para contratos da API de RAG.",
          "Clientes oficiais de LLM e embeddings.",
          "SQLAlchemy/psycopg para PostgreSQL e pgvector.",
          "Jobs de chunking, OCR e reindexação.",
        ],
      },
      {
        heading: "Como usar Go com IA",
        paragraphs: [
          "Em Go, o serviço tipicamente não treina modelo: ele orquestra. Chama APIs de embedding/LLM via HTTP, consulta o vector store, aplica Hybrid Search, cache e limites de taxa. Goroutines permitem buscar canais semântico e lexical em paralelo — um padrão natural de Hybrid Search.",
        ],
        bullets: [
          "Microservices e APIs de baixa latência.",
          "Workers para filas (Pub/Sub, NATS, Redis).",
          "Integração com Python via HTTP interno ou gRPC.",
          "Deploy simples em containers (Docker / Kubernetes / Cloud Run).",
        ],
      },
      {
        heading: "Arquitetura combinada",
        paragraphs: [
          "Um desenho que uso em projetos: ingestão e embedding em Python; API de query, auth e fan-out em Go; frontend em React/Next.js; automações em n8n. O usuário fala com um único endpoint; por trás, cada linguagem faz o que faz melhor.",
        ],
      },
    ],
    faqs: [
      {
        question: "Dá para fazer RAG só em Go ou só em Python?",
        answer:
          "Sim. Python sozinho é o caminho mais rápido para um MVP. Go sozinho funciona se você encapsular chamadas HTTP aos modelos. A combinação escala melhor em times e em carga.",
      },
      {
        question: "Go é linguagem de machine learning?",
        answer:
          "O treinamento clássico continua em Python. Go brilha na engenharia em volta da IA: APIs, concorrência e serviços de produção.",
      },
    ],
  },
  {
    slug: "ia-n8n",
    title: "IA + n8n — automações e agentes",
    seoTitle: "IA e n8n: RAG, AI Agents e automações | Anderson Mautone",
    description:
      "Como integrar Inteligência Artificial com n8n: workflows, RAG, webhooks, AI Agents, tool calling, LLMs e automação de processos corporativos.",
    keywords:
      "n8n, IA, AI Agents, RAG, automação, webhooks, tool calling, GenAI, workflow, LLM",
    icon: "workflow",
    summary:
      "n8n orquestra IA no mundo real: dispara RAG, chama LLMs, conecta ERP/CRM e transforma eventos em fluxos de AI Agents.",
    updated: "2026-08-19",
    sections: [
      {
        heading: "Por que n8n com IA",
        paragraphs: [
          "n8n é uma plataforma de automação (workflows) que conecta APIs, bancos, webhooks e nós de IA. Em vez de só um chat, você amarra o LLM a sistemas que já existem: e-mail, CRM, ERP, filas e knowledge bases.",
          "Para GenAI, o n8n funciona como orquestrador: recebe um evento, busca contexto (RAG / Hybrid Search), chama o modelo e grava o resultado de volta no sistema de origem.",
        ],
      },
      {
        heading: "Padrões que funcionam",
        paragraphs: [
          "Os fluxos mais úteis em empresas não são demos de chat — são pipelines.",
        ],
        bullets: [
          "Ingestão: arquivo no Cloud Storage / e-mail → extração → API de chunking/embeddings → índice vetorial.",
          "Pergunta: webhook do produto → serviço RAG (Python/Go) → LLM → resposta no Slack, ticket ou UI.",
          "Agentes: n8n como tool runner — o modelo pede “buscar cliente” ou “abrir chamado” e o workflow executa com credenciais controladas (function/tool calling).",
          "Human-in-the-loop: rascunho da IA, aprovação, depois persistência.",
        ],
      },
      {
        heading: "IA + n8n no RAG",
        paragraphs: [
          "No desenho CADBRASIL, n8n entra junto do Hybrid Search e do RAG: automações de processamento documental e integração da camada de IA com o restante da operação. Isso evita que o índice fique defasado e que cada sistema precise de um conector artesanal.",
        ],
      },
      {
        heading: "Cuidados de produção",
        paragraphs: [
          "Segredos no Secret Manager, retries, idempotência, logs e limites de token. O workflow não deve mandar PII desnecessária ao LLM. ACL do documento precisa chegar até o retrieval — senão a automação vaza contexto entre tenants.",
        ],
      },
    ],
    faqs: [
      {
        question: "n8n substitui o backend de RAG?",
        answer:
          "Não. n8n orquestra. O retrieval pesado, embeddings e regras de ranking ficam melhor em serviços Go/Python. O n8n chama esses serviços.",
      },
      {
        question: "n8n serve para AI Agents?",
        answer:
          "Sim, como executor de ferramentas: o agente decide a ferramenta; o n8n (ou uma API) executa com governança, logs e integrações.",
      },
    ],
  },
  {
    slug: "rag-projetos-grandes",
    title: "RAG em projetos grandes com IA",
    seoTitle: "Como usar RAG em projetos grandes de IA | Anderson Mautone",
    description:
      "Arquitetura de RAG em escala: chunking, Hybrid Search, avaliação, ACL, microservices Go/Python, n8n, observabilidade e knowledge bases corporativas.",
    keywords:
      "RAG em escala, projetos grandes, GenAI corporativo, Hybrid Search, chunking, ACL, avaliação RAG, microservices, n8n",
    icon: "building",
    summary:
      "RAG grande não é um único prompt: é pipeline, busca híbrida, segurança, avaliação contínua e serviços desacoplados.",
    updated: "2026-08-19",
    sections: [
      {
        heading: "O erro de tratar RAG como um chat",
        paragraphs: [
          "Em um piloto, um script Python + um vector store resolve. Em um projeto grande — milhares de documentos, vários tenants, SLA, auditoria — RAG vira produto de plataforma: ingestão confiável, retrieval de qualidade, geração controlada e operação.",
        ],
      },
      {
        heading: "Blocos de uma arquitetura séria",
        paragraphs: [
          "Separe responsabilidades em serviços (Go e Python combinam bem) e automatize a borda com n8n.",
        ],
        bullets: [
          "Ingestão: conectores, OCR, chunking com overlap, metadados (fonte, versão, permissão).",
          "Índice: Vector Search + full-text (Hybrid Search); reindexação incremental.",
          "Query: embedding da pergunta, filtros ACL, fusão de ranks, rerank, limite de tokens no contexto.",
          "Geração: prompts versionados, citações, recusa quando não há evidência.",
          "Operação: traces, custo por chamada, avaliação (hit rate, faithfulness), feature flags.",
        ],
      },
      {
        heading: "Chunking e qualidade do retrieval",
        paragraphs: [
          "Chunks grandes demais diluem o sinal; pequenos demais perdem contexto. Em bases jurídicas ou técnicas, preserve títulos e IDs nos metadados. Meça: se o chunk certo não entra no top-k, o LLM não tem como acertar — Hybrid Search e rerank resolvem boa parte disso.",
        ],
      },
      {
        heading: "Segurança e multi-tenant",
        paragraphs: [
          "Filtros de permissão no retrieval, não só no frontend. Cada embedding deve carregar tenant_id. Logs sem payload sensível. Isso é tão importante quanto a escolha do modelo.",
        ],
      },
      {
        heading: "Como eu estruturo na prática",
        paragraphs: [
          "Python para pipeline de embeddings e experimentos; Go para APIs concorrentes de busca; PostgreSQL/pgvector e/ou MongoDB; React/Next no cliente; n8n para ingestão e integrações. Avaliação contínua com perguntas de ouro do negócio. Foi nessa linha que evoluí soluções de RAG e Hybrid Search em contexto corporativo, incluindo o trabalho com a CADBRASIL.",
        ],
      },
    ],
    faqs: [
      {
        question: "Qual o maior gargalo de RAG em escala?",
        answer:
          "Retrieval ruim e dados mal preparados. Modelo mais caro não corrige índice ruim, ACL errada ou chunking sem metadados.",
      },
      {
        question: "Como saber se o RAG está bom?",
        answer:
          "Conjunto de perguntas reais, métricas de retrieval (recall@k) e de geração (fidelidade ao contexto), além de revisão humana amostral.",
      },
    ],
  },
  {
    slug: "golang-producao",
    title: "Como entrar em um projeto Go em produção sem prejuízo",
    seoTitle:
      "Go em produção: riscos, onboarding e como não gerar prejuízo | Anderson Mautone",
    description:
      "Como assumir um microserviço Golang em produção: mapa de riscos (downtime, dados, concorrência), canary, rollback, testes, observabilidade e um plano para não gerar prejuízo ao negócio.",
    keywords:
      "Go produção, Golang produção, riscos Go, canary deploy, rollback, goroutines, microservices, onboarding Go, SRE",
    icon: "code",
    summary:
      "Entrar em um Go de produção não é “subir um binário”: é mapear riscos, não tocar no caminho crítico no dia 1 e só mudar o que dá para reverter.",
    updated: "2026-08-19",
    sections: [
      {
        heading: "O problema real",
        paragraphs: [
          "Um serviço Go em produção costuma ser API, worker ou gateway com concorrência alta, contratos HTTP/gRPC e dinheiro ou operação na ponta (pedidos, licitações, faturamento, RAG servindo clientes). O prejuízo não vem do “não saber a sintaxe” — vem de deploy sem rollback, race condition, timeout errado, migration irreversível ou log que vaza segredo.",
          "A forma segura de entrar no projeto é tratar as primeiras semanas como operação assistida: observar, reproduzir, mudar atrás de flag, medir, só então ampliar.",
        ],
      },
      {
        heading: "Primeiros 7–14 dias (sem prejuízo)",
        paragraphs: [
          "Não comece refatorando o pacote inteiro. Comece por um mapa operacional.",
        ],
        bullets: [
          "Quem chama o serviço, SLA, pico de tráfego e o que acontece se ele cair.",
          "Como builda, testa, publica (CI/CD), e como volta a versão anterior em minutos.",
          "Config e secrets (env, Secret Manager) — nunca commitar chave.",
          "Dependências: banco, fila, LLM, n8n, outros microservices.",
          "Onde estão métricas, traces, logs e alertas (latência p95, erros 5xx, saturacão de goroutines).",
          "Testes existentes: rode a suíte local e no pipeline antes de qualquer PR grande.",
        ],
      },
      {
        heading: "Riscos típicos em Go de produção",
        paragraphs: [
          "Estes são os que mais geram incidente e custo.",
        ],
        bullets: [
          "Goroutine leak e falta de context.WithTimeout — o serviço “anda” e depois estoura memória ou fila.",
          "Race em map/slice compartilhado sem mutex ou channels bem desenhados.",
          "Nil pointer em JSON parcial ou erro ignorado (`_ = err`).",
          "Migration de banco sem backward compatibility (quebra o binário antigo no rollback).",
          "Mudança de contrato JSON/gRPC sem versionar — clientes pagam o preço.",
          "Retry sem idempotência — duplica cobrança, e-mail ou índice RAG.",
          "Pânico não recuperado no handler derruba o processo (dependendo do runtime).",
          "Feature “pequena” no caminho quente (hot path) aumenta p95 e estoura SLA.",
        ],
      },
      {
        heading: "Como mudar sem prejuízo",
        paragraphs: [
          "A regra: toda alteração precisa de saída de emergência. Se não dá para desligar em 1 flag ou 1 rollback, não é mudança de produção — é projeto.",
        ],
        bullets: [
          "Feature flags / config remota: código novo morto até ligar para 1% do tráfego.",
          "Canary ou dark launch: a versão nova recebe uma fatia; compare erro e latência com a estável.",
          "Expand/contract em banco: adicione coluna, publique código que lê os dois formatos, só depois remova o antigo.",
          "Contratos: novos campos opcionais; nunca renomeie sem versão `/v2`.",
          "Timeouts e circuit breaker em chamadas a LLM, HTTP e banco — falha rápida é mais barata que fila infinita.",
          "Idempotency key em POST que move dinheiro, ticket ou índice.",
          "Load test no palco com perfil de produção (não só “funciona na minha máquina”).",
          "PR pequeno, reversível, com teste do caso que quebrou na última vez.",
        ],
      },
      {
        heading: "Checklist antes do primeiro deploy seu",
        paragraphs: [
          "Se algum item estiver vermelho, não publique em horário de pico e não publique sexta à noite.",
        ],
        bullets: [
          "Rollback documentado e ensaiado (imagem anterior no registry).",
          "Health check e readiness reais (não só `return 200`).",
          "Alertas de 5xx e p95 no seu canal.",
          "Owner de plantão nas primeiras horas.",
          "Dados de teste que não sujam produção; never-run migration não revisada.",
        ],
      },
      {
        heading: "Onde Go + IA aumenta o risco",
        paragraphs: [
          "Quando o serviço Go chama LLM ou RAG, o custo deixa de ser só infra: token, timeout longo e retry podem multiplicar fatura e ainda duplicar efeitos colaterais. Sempre isole a chamada de modelo atrás de limite de concorrência, budget e fallback (resposta segura ou “não sei”).",
        ],
      },
    ],
    faqs: [
      {
        question: "Posso reescrever o serviço Go no primeiro mês?",
        answer:
          "Não, se ele já fatura ou atende SLA. Reescrita é o caminho mais caro de prejuízo. Extraia uma fatia atrás de interface, cubra com teste e migre com canary.",
      },
      {
        question: "Qual o rollback mínimo aceitável?",
        answer:
          "Voltar a imagem anterior em minutos, sem migration destrutiva. Se o banco não volta, o deploy não é seguro.",
      },
    ],
  },
  {
    slug: "embeddings",
    title: "Embeddings — a base da busca semântica e do RAG",
    seoTitle: "Embeddings em GenAI: como funcionam no RAG | Anderson Mautone",
    description:
      "O que são embeddings, como geram Vector Search, qualidade de modelo, dimensão, atualização de índice e uso com PostgreSQL/pgvector, Python e Go.",
    keywords:
      "embeddings, vector embeddings, pgvector, Vector Search, RAG, semantic search, modelos de embedding",
    icon: "brain",
    summary:
      "Embeddings transformam texto em vetores. Sem eles não existe Semantic Search nem RAG de verdade — e modelo errado ou índice velho quebra a qualidade.",
    updated: "2026-08-19",
    sections: [
      {
        heading: "O que é um embedding",
        paragraphs: [
          "Embedding é uma representação numérica de um texto (ou imagem) em um espaço de alta dimensão. Textos com significado próximo ficam vetores próximos. É isso que permite Semantic Search e o retrieval do RAG.",
        ],
      },
      {
        heading: "Boas práticas em produção",
        paragraphs: [
          "Não misture modelos no mesmo índice: dimensão e espaço mudam. Quando trocar o modelo, reincorpore tudo. Guarde no metadado a versão do modelo de embedding. Python gera os vetores; Go pode só consultar.",
        ],
        bullets: [
          "Chunk estável + overlap pequeno para não perder frases de fronteira.",
          "Normalização e similaridade de cosseno consistentes na query e na ingestão.",
          "Reindexação quando o documento muda — embedding velho é busca velha.",
        ],
      },
    ],
    faqs: [
      {
        question: "Preciso de GPU para embeddings em produção?",
        answer:
          "Não necessariamente. APIs (OpenAI, Gemini, Vertex) e modelos menores em CPU/Cloud Run resolvem a maioria dos RAG corporativos. GPU entra em volume muito alto ou modelos locais grandes.",
      },
    ],
  },
  {
    slug: "ai-agents",
    title: "AI Agents — tool calling e agentes em sistemas corporativos",
    seoTitle: "AI Agents e function calling em produção | Anderson Mautone",
    description:
      "O que são AI Agents, tool/function calling, riscos de autonomia, n8n como executor e como integrar agentes a APIs Go e Python com governança.",
    keywords:
      "AI Agents, tool calling, function calling, agentes de IA, n8n, GenAI, LLM tools",
    icon: "workflow",
    summary:
      "Um agente não é só chat: ele escolhe ferramentas. Em empresa, a ferramenta deve ser API governada — não o modelo com acesso irrestrito.",
    updated: "2026-08-19",
    sections: [
      {
        heading: "Agente versus RAG",
        paragraphs: [
          "RAG responde com evidência da base. O agente, além disso, pode chamar ferramentas: criar ticket, consultar ERP, disparar n8n, buscar no Hybrid Search. O LLM planeja; o backend executa.",
        ],
      },
      {
        heading: "Como não perder o controle",
        paragraphs: [
          "Cada tool é um contrato: schema, autenticação, limite, log, human-in-the-loop para ações irreversíveis. Go e Python expõem as tools; n8n orquestra as que já existem em SaaS. Nunca dê ao modelo uma shell aberta em produção.",
        ],
      },
    ],
    faqs: [
      {
        question: "Agente substitui o RAG?",
        answer:
          "Não. O retrieval (RAG/Hybrid Search) costuma ser a primeira tool do agente. Sem busca boa, o agente alucina a ação.",
      },
    ],
  },
  {
    slug: "pgvector-mongodb",
    title: "pgvector e MongoDB em busca vetorial",
    seoTitle: "pgvector e MongoDB Vector Search no RAG | Anderson Mautone",
    description:
      "Quando usar PostgreSQL/pgvector ou MongoDB para Vector Search, metadados, Hybrid Search, ACL e RAG corporativo.",
    keywords:
      "pgvector, PostgreSQL, MongoDB, Vector Search, Vector Database, RAG, Hybrid Search",
    icon: "search",
    summary:
      "O vector store não é detalhe: define filtro, custo e se o Hybrid Search convive com os dados de negócio.",
    updated: "2026-08-19",
    sections: [
      {
        heading: "PostgreSQL / pgvector",
        paragraphs: [
          "Ideal quando o restante do sistema já é relacional: transação, JOIN, ACL em SQL e vetor na mesma linha do chunk. Índices HNSW/IVF e filtros por tenant_id funcionam bem em RAG de médio/grande porte.",
        ],
      },
      {
        heading: "MongoDB",
        paragraphs: [
          "Forte quando o documento original já vive no Mongo e você quer Atlas Vector Search ou um padrão de persistência flexível. Combine text index + vector para Hybrid Search. Cuidado com consistência de embedding e com o tamanho do documento.",
        ],
      },
      {
        heading: "Como eu escolho",
        paragraphs: [
          "Se a fonte da verdade é SQL e há exigência de transação, pgvector. Se o domínio é documento/JSON pesado, Mongo. Em vários projetos os dois coexistem: operacional no Mongo, retrieval no Postgres — ou o inverso, desde que o serviço de query (Go/Python) esconda isso da UI.",
        ],
      },
    ],
    faqs: [
      {
        question: "Preciso de um vector DB dedicado (Pinecone, etc.)?",
        answer:
          "Só se volume, SLA de ANN ou operação de índice justificarem. pgvector e Mongo cobrem a maioria dos RAG corporativos com menos peça nova para operar.",
      },
    ],
  },
  {
    slug: "avaliacao-governanca-rag",
    title: "Avaliação e governança de RAG",
    seoTitle: "Avaliação de RAG, alucinação e governança de IA | Anderson Mautone",
    description:
      "Como medir RAG (recall, fidelidade), reduzir alucinação, ACL, PII, custo de tokens e governança para não gerar prejuízo jurídico ou operacional.",
    keywords:
      "avaliação RAG, governança de IA, alucinação, ACL, PII, faithfulness, recall@k, LLM safety",
    icon: "building",
    summary:
      "IA em produção se mede. Sem avaliação e ACL, o risco deixa de ser técnico e vira prejuízo jurídico, reputação e custo de token.",
    updated: "2026-08-19",
    sections: [
      {
        heading: "O que medir",
        paragraphs: [
          "Retrieval: o chunk certo está no top-k? Geração: a resposta só afirma o que está no contexto? Online: thumbs, tickets reabertos, custo por conversa. Um conjunto de “perguntas de ouro” do negócio vale mais que benchmark genérico.",
        ],
      },
      {
        heading: "Governança que evita prejuízo",
        paragraphs: [
          "Não envie PII desnecessária ao LLM. Separe tenants no índice. Recuse quando o retrieval vier vazio. Versionar prompt. Auditar tools de agentes. Isso é o equivalente ao rollback no mundo GenAI.",
        ],
      },
    ],
    faqs: [
      {
        question: "Como reduzir alucinação?",
        answer:
          "Melhor retrieval (Hybrid Search + rerank), prompt que exige citação, temperatura baixa e recusa explícita sem evidência. Modelo maior não substitui índice ruim.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return knowledgeArticles.find((item) => item.slug === slug);
}

export const knowledgeHub = {
  path: "/conhecimentos",
  title: "Conhecimentos de GenAI | RAG, Hybrid Search, Go, Python e n8n",
  description:
    "Guias técnicos de Anderson Mautone sobre RAG, Semantic Search, Hybrid Search, embeddings, AI Agents, Golang e Python com IA, Go em produção, n8n, pgvector e governança de RAG.",
  keywords:
    "RAG, Semantic Search, Hybrid Search, Golang, Go produção, Python, n8n, AI Agents, embeddings, pgvector, governança IA, conhecimentos",
};
