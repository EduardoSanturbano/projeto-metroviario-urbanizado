import { Layer, Source } from 'react-map-gl/maplibre'
import type { FeatureCollection, Point } from 'geojson'
import type { MapFeatureProperties } from '../../types/map'

type Props = { data: FeatureCollection<Point, MapFeatureProperties>; visible: boolean }

export function StationsLayer({ data, visible }: Props) {
  return <Source id="existing-stations" type="geojson" data={data}>
    <Layer id="existing-stations" type="circle" layout={{ visibility: visible ? 'visible' : 'none' }} paint={{ 'circle-radius': 6, 'circle-color': '#17324d', 'circle-stroke-color': '#fff', 'circle-stroke-width': 2 }} />
  </Source>
}
