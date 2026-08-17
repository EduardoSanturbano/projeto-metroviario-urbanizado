# Dados urbanos do MVP

Esta pasta é a camada de entrada do domínio urbano. Ela é pequena, versionável e intencionalmente conservadora: nenhum dado assume precisão que não foi verificada.

| Arquivo | Conteúdo | Situação |
| --- | --- | --- |
| `lines.json` | Linhas e sequência de todas as estações do recorte | Referência pública de 2024-12-31; revisar em cada atualização da rede. |
| `stations.geojson` | Estações de integração selecionadas para exibição | Referência pública; sem coordenadas até haver fonte espacial validada. |
| `connections.json` | Transferências e regra para derivações adjacentes | Demonstrativo, sem tempos de transferência. |
| `places.geojson` | Aeroportos, universidades, hospitais, terminais, polos e POIs | Identidades reais quando indicado; geometria arredondada. Pesos demonstrativos. |
| `demand_zones.geojson` | Regiões de alta densidade/demanda | Integralmente demonstrativo. |
| `sources.json` | Procedência, CRS e contrato de substituição | Metadados do conjunto. |

## Regras de proveniência

Cada registro traz `provenance.status`:

- `reference`: nome ou relação obtida de referência pública; ainda pode precisar de revalidação de versão.
- `demonstrative`: cenário criado para a demonstração; nunca usar como dado observacional.
- `estimated`: valor derivado de hipótese documentada (reservado para próximos conjuntos).

`geometry_quality` informa a aptidão espacial: `none` não deve ser desenhada como ponto; `approximate` só permite visualização de contexto; `surveyed` será reservado para fontes geográficas verificadas.

## Substituição por dados reais

O `CityDataRepository` lê documentos sem expor o formato à lógica de negócio. Um adaptador futuro (PostGIS, GTFS, API pública ou pipeline de dados) deve devolver os mesmos contratos de `backend/app/models/city_data.py` e preservar `id`, `provenance`, CRS e as unidades dos indicadores. Não preencha tempos, distâncias, população ou demanda sem fonte, período de referência e método de cálculo.

Para desenhar a rede com precisão, incorporar uma fonte espacial licenciada de estações e trechos. A sequência em `lines.json` já permite criar as arestas adjacentes do grafo sem supor distância ou tempo.

## Recorte temporal

O catálogo de rede é um *snapshot* de 2024-12-31, declarado em `sources.json`; não é uma alegação de que expansões posteriores estejam em operação. A rotina de atualização deve comparar a rede com a publicação oficial vigente, atualizar `network_snapshot_as_of` e registrar a mudança de cada estação/linha.
