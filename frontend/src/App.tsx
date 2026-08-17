import { CityMap } from './components/map/CityMap'
import './styles.css'

export default function App() {
  return <main className="app">
    <header className="app-header">
      <div>
        <p className="eyebrow">Planejamento exploratório</p>
        <h1>Metro Urbano SP</h1>
        <p className="intro">Explore a rede existente e um cenário inicial de expansão.</p>
      </div>
      <div className="status"><span /> Cenário demonstrativo</div>
    </header>
    <CityMap />
    <footer>Dados cartográficos e indicadores usados neste mapa são simplificados para o MVP.</footer>
  </main>
}
