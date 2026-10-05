import { MapMarker } from '@primeicons/react/map-marker';
import './../styles.css';
import Cartao from './Cartao';
import Creditos from './Creditos';

function App() {
  const estiloSubtitulo = {
    color: '#666',
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '10px'
  };

  const obterAno = () => new Date().getFullYear();

  return (
    <>
      <h1 className="titulo">
        <MapMarker/>
        RolêRadar
      </h1>
      <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
      <Creditos/>
       <Cartao cabecalho="Teste">
        <p>Conteúdo do cartão</p>
      </Cartao>
      <footer>RolêRadar © {obterAno()}</footer>
    </>
  );
}

export default App;