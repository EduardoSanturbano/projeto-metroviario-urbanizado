import { Layer, Source } from 'react-map-gl/maplibre'
import type { FeatureCollection, LineString, Point } from 'geojson'
import type { MapFeatureProperties } from '../../types/map'

type Props = { line: FeatureCollection<LineString, MapFeatureProperties>; candidates: FeatureCollection<Point, MapFeatureProperties>; visible: boolean }

export function ProposedLineLayer({ line, candidates, visible }: Props) {
  const visibility = visible ? 'visible' : 'none'
  return <>
    <Source id="proposed-line" type="geojson" data={line}>
      <Layer id="proposed-line" type="line" layout={{ visibility, 'line-cap': 'round', 'line-join': 'round' }} paint={{ 'line-color': '#f97316', 'line-width': 5, 'line-dasharray': [2, 1] }} />
    </Source>
    <Source id="candidate-stations" type="geojson" data={candidates}>
      <Layer id="candidate-stations" type="circle" layout={{ visibility }} paint={{ 'circle-radius': 8, 'circle-color': '#fff7ed', 'circle-stroke-color': '#f97316', 'circle-stroke-width': 3 }} />
    </Source>
  </>
}
