import { Layer, Source } from 'react-map-gl/maplibre'
import type { FeatureCollection, LineString } from 'geojson'
import type { MapFeatureProperties } from '../../types/map'

type Props = { data: FeatureCollection<LineString, MapFeatureProperties>; visible: boolean }

export function LinesLayer({ data, visible }: Props) {
  return <Source id="existing-lines" type="geojson" data={data}>
    <Layer id="existing-lines-outline" type="line" layout={{ visibility: visible ? 'visible' : 'none', 'line-cap': 'round', 'line-join': 'round' }} paint={{ 'line-color': '#ffffff', 'line-width': 7, 'line-opacity': 0.9 }} />
    <Layer id="existing-lines" type="line" layout={{ visibility: visible ? 'visible' : 'none', 'line-cap': 'round', 'line-join': 'round' }} paint={{ 'line-color': ['get', 'color'], 'line-width': 4 }} />
  </Source>
}
