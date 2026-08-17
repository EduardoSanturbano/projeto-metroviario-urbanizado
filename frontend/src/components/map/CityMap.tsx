import { useState } from 'react'
import Map, { NavigationControl, Popup } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { candidateStations, demandPoints, existingLines, existingStations, proposedLine } from '../../data/mockMapData'
import type { LayerKey, MapFeatureProperties } from '../../types/map'
import { DemandPointsLayer } from './DemandPointsLayer'
import { LinesLayer } from './LinesLayer'
import { ProposedLineLayer } from './ProposedLineLayer'
import { StationsLayer } from './StationsLayer'

const initialVisibility: Record<LayerKey, boolean> = {
  existingLines: true,
  existingStations: true,
  demand: true,
  candidates: true,
  proposedLine: true,
}

const layerLabels: Array<{ key: LayerKey; label: string; swatch: string }> = [
  { key: 'existingLines', label: 'Rede existente', swatch: '#17324d' },
  { key: 'existingStations', label: 'Estações existentes', swatch: '#17324d' },
  { key: 'demand', label: 'Polos de demanda', swatch: '#d97706' },
  { key: 'candidates', label: 'Estações candidatas', swatch: '#f97316' },
  { key: 'proposedLine', label: 'Linha proposta', swatch: '#f97316' },
]

type SelectedFeature = { longitude: number; latitude: number; properties: MapFeatureProperties }

export function CityMap() {
  const [visibility, setVisibility] = useState(initialVisibility)
  const [selected, setSelected] = useState<SelectedFeature | null>(null)

  return <section className="map-shell" aria-label="Mapa da rede de metrô de São Paulo">
    <aside className="map-legend" aria-label="Camadas do mapa">
      <p className="legend-title">Camadas</p>
      {layerLabels.map(({ key, label, swatch }) => <label key={key} className="legend-item">
        <input type="checkbox" checked={visibility[key]} onChange={() => setVisibility(current => ({ ...current, [key]: !current[key] }))} />
        <span className={`legend-swatch ${key === 'proposedLine' ? 'dashed' : ''}`} style={{ '--swatch': swatch } as React.CSSProperties} />
        {label}
      </label>)}
      <p className="legend-note">Traçado e pontuações da proposta são demonstrativos.</p>
    </aside>

    <Map
      initialViewState={{ longitude: -46.65, latitude: -23.57, zoom: 11.25 }}
      minZoom={9}
      maxZoom={17}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      interactiveLayerIds={['existing-stations', 'demand-points', 'candidate-stations', 'proposed-line']}
      onClick={(event) => {
        const properties = event.features?.[0]?.properties as MapFeatureProperties | undefined
        setSelected(properties ? { longitude: event.lngLat.lng, latitude: event.lngLat.lat, properties } : null)
      }}
      onMouseEnter={(event) => { event.target.getCanvas().style.cursor = 'pointer' }}
      onMouseLeave={(event) => { event.target.getCanvas().style.cursor = '' }}
    >
      <NavigationControl position="bottom-right" showCompass />
      <LinesLayer data={existingLines} visible={visibility.existingLines} />
      <ProposedLineLayer line={proposedLine} candidates={candidateStations} visible={visibility.proposedLine || visibility.candidates} />
      <DemandPointsLayer data={demandPoints} visible={visibility.demand} />
      <StationsLayer data={existingStations} visible={visibility.existingStations} />
      {selected && <Popup longitude={selected.longitude} latitude={selected.latitude} anchor="bottom" onClose={() => setSelected(null)} closeButton>
        <strong>{selected.properties.name}</strong>
        {selected.properties.subtitle && <span>{selected.properties.subtitle}</span>}
        {selected.properties.demandScore && <small>Índice ilustrativo: {selected.properties.demandScore}/100</small>}
      </Popup>}
    </Map>
  </section>
}
