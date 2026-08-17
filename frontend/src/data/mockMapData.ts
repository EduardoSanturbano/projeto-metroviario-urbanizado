import type { Feature, FeatureCollection, LineString, Point } from 'geojson'
import type { Coordinate, MapFeatureProperties } from '../types/map'

const point = (id: string, name: string, coordinates: Coordinate, extra: Omit<MapFeatureProperties, 'id' | 'name'> = {}): Feature<Point, MapFeatureProperties> => ({
  type: 'Feature',
  id,
  geometry: { type: 'Point', coordinates },
  properties: { id, name, ...extra },
})

const line = (id: string, name: string, coordinates: Coordinate[], color: string): Feature<LineString, MapFeatureProperties> => ({
  type: 'Feature',
  id,
  geometry: { type: 'LineString', coordinates },
  properties: { id, name, color },
})

// Referências cartográficas arredondadas, usadas apenas para a demonstração visual.
export const existingLines: FeatureCollection<LineString, MapFeatureProperties> = {
  type: 'FeatureCollection',
  features: [
    line('l1', 'Linha 1-Azul', [[-46.62, -23.48], [-46.63, -23.52], [-46.63, -23.55], [-46.64, -23.58], [-46.64, -23.63]], '#0097d9'),
    line('l2', 'Linha 2-Verde', [[-46.70, -23.54], [-46.67, -23.55], [-46.64, -23.57], [-46.61, -23.59], [-46.58, -23.59]], '#13a538'),
    line('l3', 'Linha 3-Vermelha', [[-46.69, -23.53], [-46.65, -23.54], [-46.63, -23.55], [-46.59, -23.55], [-46.49, -23.54]], '#e32636'),
    line('l4', 'Linha 4-Amarela', [[-46.63, -23.53], [-46.64, -23.55], [-46.67, -23.56], [-46.70, -23.56], [-46.72, -23.57]], '#eab308'),
    line('l5', 'Linha 5-Lilás', [[-46.72, -23.68], [-46.70, -23.64], [-46.69, -23.61], [-46.65, -23.59], [-46.61, -23.59]], '#8e44ad'),
  ],
}

export const existingStations: FeatureCollection<Point, MapFeatureProperties> = {
  type: 'FeatureCollection',
  features: [
    point('barra-funda', 'Palmeiras–Barra Funda', [-46.668, -23.525], { subtitle: 'Linha 3 · terminal' }),
    point('luz', 'Luz', [-46.633, -23.534], { subtitle: 'Linhas 1 e 4 · integração' }),
    point('republica', 'República', [-46.642, -23.544], { subtitle: 'Linhas 3 e 4 · integração' }),
    point('se', 'Sé', [-46.635, -23.55], { subtitle: 'Linhas 1 e 3 · integração' }),
    point('ana-rosa', 'Ana Rosa', [-46.638, -23.581], { subtitle: 'Linhas 1 e 2 · integração' }),
    point('santa-cruz', 'Santa Cruz', [-46.64, -23.598], { subtitle: 'Linhas 1 e 5 · integração' }),
    point('chacara-klabin', 'Chácara Klabin', [-46.628, -23.592], { subtitle: 'Linhas 2 e 5 · integração' }),
    point('pinheiros', 'Pinheiros', [-46.702, -23.567], { subtitle: 'Linha 4 · integração CPTM' }),
    point('butanta', 'Butantã', [-46.708, -23.57], { subtitle: 'Linha 4' }),
    point('tatuape', 'Tatuapé', [-46.577, -23.54], { subtitle: 'Linha 3 · integração CPTM' }),
    point('itaquera', 'Corinthians–Itaquera', [-46.474, -23.542], { subtitle: 'Linha 3 · terminal' }),
  ],
}

export const demandPoints: FeatureCollection<Point, MapFeatureProperties> = {
  type: 'FeatureCollection',
  features: [
    point('usp', 'Cidade Universitária (USP)', [-46.73, -23.56], { subtitle: 'Universidade', demandScore: 92 }),
    point('hc', 'Hospital das Clínicas', [-46.674, -23.555], { subtitle: 'Hospital', demandScore: 82 }),
    point('congonhas', 'Aeroporto de Congonhas', [-46.655, -23.627], { subtitle: 'Aeroporto', demandScore: 86 }),
    point('berrini', 'Eixo Berrini / Chucri Zaidan', [-46.695, -23.61], { subtitle: 'Centro empresarial', demandScore: 95 }),
    point('centro', 'Centro expandido', [-46.633, -23.548], { subtitle: 'Alta densidade', demandScore: 98 }),
    point('santo-amaro', 'Terminal Santo Amaro', [-46.705, -23.655], { subtitle: 'Terminal', demandScore: 78 }),
  ],
}

export const candidateStations: FeatureCollection<Point, MapFeatureProperties> = {
  type: 'FeatureCollection',
  features: [
    point('candidate-1', 'Campo Belo Norte', [-46.675, -23.605], { subtitle: 'Candidata · score ilustrativo', demandScore: 88 }),
    point('candidate-2', 'Vila Olímpia', [-46.689, -23.595], { subtitle: 'Candidata · score ilustrativo', demandScore: 91 }),
    point('candidate-3', 'Cidade Jardim', [-46.704, -23.588], { subtitle: 'Candidata · score ilustrativo', demandScore: 79 }),
  ],
}

export const proposedLine: FeatureCollection<LineString, MapFeatureProperties> = {
  type: 'FeatureCollection',
  features: [line('proposal-1', 'Linha proposta — cenário demonstrativo', [[-46.64, -23.598], [-46.675, -23.605], [-46.689, -23.595], [-46.704, -23.588], [-46.708, -23.57]], '#f97316')],
}
