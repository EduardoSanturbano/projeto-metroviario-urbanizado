import { Layer, Source } from 'react-map-gl/maplibre'
import type { FeatureCollection, Point } from 'geojson'
import type { MapFeatureProperties } from '../../types/map'

type Props = { data: FeatureCollection<Point, MapFeatureProperties>; visible: boolean }

export function DemandPointsLayer({ data, visible }: Props) {
  return <Source id="demand-points" type="geojson" data={data}>
    <Layer id="demand-halos" type="circle" layout={{ visibility: visible ? 'visible' : 'none' }} paint={{ 'circle-radius': ['interpolate', ['linear'], ['get', 'demandScore'], 70, 12, 100, 20], 'circle-color': '#f59e0b', 'circle-opacity': 0.16 }} />
    <Layer id="demand-points" type="circle" layout={{ visibility: visible ? 'visible' : 'none' }} paint={{ 'circle-radius': 6, 'circle-color': '#d97706', 'circle-stroke-color': '#fff', 'circle-stroke-width': 2 }} />
  </Source>
}
