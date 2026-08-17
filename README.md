# Metro Urbano SP

MVP para explorar o planejamento de uma nova linha de metrô em São Paulo. O sistema combina pontos de interesse, zonas de demanda e a rede existente para sugerir estações, comparar traçados e simular a operação de uma linha proposta.

> Este projeto é uma ferramenta de demonstração para hackathon. Estimativas de demanda, custos e implantação são indicativas e não substituem estudos técnicos, ambientais, urbanísticos ou de engenharia.

## Objetivo do produto

O fluxo principal da aplicação é:

1. Carregar pontos de interesse e demanda territorial.
2. Visualizar a rede metroviária como um grafo.
3. Identificar polos de demanda.
4. Gerar estações candidatas.
5. Criar e pontuar alternativas de traçado.
6. Estimar demanda atendida, tempo economizado e custo.
7. Simular frequência, ocupação e capacidade da operação.

## Escopo do MVP

- Mapa interativo com rede, polos, estações candidatas e linha proposta.
- Dados de demonstração versionados em GeoJSON.
- Geração heurística e explicável de alternativas, em vez de otimização de engenharia completa.
- Comparação de viagem antes/depois com rotas de menor tempo.
- Simulação agregada por intervalo de tempo; passageiros não são simulados individualmente.

Não fazem parte do MVP: projeto civil detalhado, previsão calibrada com bilhetagem, licenciamento, desapropriações ou dados operacionais em tempo real.

## Stack escolhida

| Camada | Tecnologia | Motivo |
| --- | --- | --- |
| Frontend | React, Vite e TypeScript | Desenvolvimento e iteração rápidos. |
| Mapa | MapLibre GL JS | Renderização de camadas GeoJSON e interação geográfica. |
| Backend | Python e FastAPI | APIs tipadas, documentação automática e ecossistema científico. |
| Grafos | NetworkX | Modelagem simples da rede e algoritmos de caminho mínimo. |
| Geometria | Shapely (GeoPandas opcional) | Cálculos de distância, buffers e geometrias. |
| Dados | GeoJSON + SQLite | Portabilidade e baixa complexidade operacional. |

## Organização prevista

```text
metro-urbano/
├── frontend/                 # Aplicação React
├── backend/                  # API FastAPI e regras de negócio
├── data/                     # Dados de demonstração GeoJSON/SQLite
├── docs/                     # Materiais complementares
├── README.md                 # Visão geral e convenções do projeto
└── ARCHITECTURE.md           # Decisões e fluxo técnico do MVP
```

Consulte [ARCHITECTURE.md](ARCHITECTURE.md) antes de alterar modelos, APIs ou algoritmos.

## Convenções para implementação

- Coordenadas geográficas externas usam `longitude, latitude` em WGS84 (EPSG:4326), como GeoJSON.
- Distâncias usadas em cálculos devem ser projetadas ou calculadas geodesicamente; não usar graus como quilômetros.
- Valores monetários são estimativas em BRL e devem trazer unidade e ano-base quando exibidos.
- Tempos são armazenados em minutos e distâncias em quilômetros nas respostas de domínio.
- A API deve manter contratos JSON simples e schemas Pydantic explícitos.
- Dados de demonstração devem permanecer pequenos, versionados e sem informações pessoais.

## Jornada de demonstração

1. Abrir o mapa com a rede existente e os dados de demanda.
2. Identificar polos ou ajustar o peso de categorias de POI.
3. Gerar estações candidatas e selecionar uma proposta.
4. Otimizar e visualizar alternativas de linha.
5. Comparar métricas da proposta escolhida.
6. Alterar frequência/capacidade e executar a simulação operacional.

## Referência rápida de APIs

| Método | Endpoint | Responsabilidade |
| --- | --- | --- |
| `GET` | `/network` | Rede, estações e trechos existentes. |
| `GET` / `POST` | `/pois` | Consultar ou cadastrar POIs. |
| `POST` | `/demand/analyze` | Encontrar polos e demanda agregada. |
| `POST` | `/stations/generate` | Gerar estações candidatas. |
| `POST` | `/lines/optimize` | Criar alternativas de linha e suas métricas. |
| `POST` | `/route/compare` | Comparar rota antes/depois da proposta. |
| `POST` | `/costs/estimate` | Estimar custo de implantação. |
| `POST` | `/simulation/run` | Simular capacidade e operação. |

Os detalhes dos contratos e das decisões estão em [ARCHITECTURE.md](ARCHITECTURE.md).

