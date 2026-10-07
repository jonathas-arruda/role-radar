import { Component } from 'react';
import { MapMarker } from '@primeicons/react/map-marker';
import './../styles.css';
import Cartao from './Cartao';
import Creditos from './Creditos';
import Loading from './Loading';
import MeuPonto from './MeuPonto';
import Busca from './Busca';
import ListaLugares from './ListaLugares';
import MapaRadar from './MapaRadar';
import geoapifyClient from '../utils/geoapifyClient';


class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    horarioLocalizacao: null,
    mensagemDeErro: null,
    lugares: null,
    buscando: false,
    erroBusca: null,
    raioBuscado: null
  };

  componentDidMount() {
    this.obterLocalizacao();
  }

  obterLocalizacao = () => {
    window.navigator.geolocation.getCurrentPosition(
      (posicao) => {
        this.setState({
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude,
          horarioLocalizacao: Date.now(),
          mensagemDeErro: null
        });
      },
      (erro) => {
        console.log(erro);
        this.setState({
          mensagemDeErro:
            'Não foi possível obter sua localização. Libere o acesso no navegador e atualize a página.'
        });
      }
    );
  };

  onBuscaRealizada = (categoria, raio) => {
    this.setState({ buscando: true, erroBusca: null, raioBuscado: raio });
    geoapifyClient.get('/places', {
      params: {
        categories: categoria,
        filter: `circle:${this.state.longitude},${this.state.latitude},${raio}`,
        bias: `proximity:${this.state.longitude},${this.state.latitude}`,
        limit: 20
      }
    })
    .then(result => {
      this.setState({ lugares: result.data.features, buscando: false });
    })
    .catch(erro => {
      console.log(erro);
      this.setState({
        buscando: false,
        erroBusca: 'Não foi possível consultar os lugares. Tente novamente.'
      });
    });
  };

  obterResumo = () => {
    const quantidade = this.state.lugares.length;
    return quantidade === 1 ?
      `1 lugar encontrado em até ${this.state.raioBuscado} m`
    :
      `${quantidade} lugares encontrados em até ${this.state.raioBuscado} m`;
  };

  estiloSubtitulo = {
    color: '#666',
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '10px'
  };

  obterAno = () => new Date().getFullYear();

  render() {
    return (
      <div className="grid">
        <div className="col-12">
          <h1 className="titulo">
            <MapMarker />
            RolêRadar
          </h1>
          <p style={this.estiloSubtitulo}>Descubra o que existe perto de você</p>
          <Creditos />
        </div>
        <div className="col-6">
          {this.state.mensagemDeErro ? (
            <p>{this.state.mensagemDeErro}</p>
          ) : !this.state.latitude ? (
            <Loading mensagem="Aguardando permissão de localização..." />
          ) : (
            <div>
              <Cartao cabecalho="Você está aqui">
                <MeuPonto
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                  horarioLocalizacao={this.state.horarioLocalizacao}
                  onAtualizar={this.obterLocalizacao}
                />
              </Cartao>
              <div className="mt-3">
                <Cartao cabecalho="O que você procura?">
                  <Busca onBuscaRealizada={this.onBuscaRealizada} />
                </Cartao>
              </div>
            </div>
          )}
        </div>
        <div className="col-6">
          {
            this.state.buscando ?
              <Loading mensagem="Procurando lugares..." />
            : this.state.erroBusca ?
              <p>{this.state.erroBusca}</p>
            : !this.state.lugares ?
              null
            : this.state.lugares.length === 0 ?
              <p>Nenhum lugar encontrado. Tente aumentar o raio.</p>
            :
              <div>
                <p><strong>{this.obterResumo()}</strong></p>
                <Cartao cabecalho="Radar">
                  <MapaRadar
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                    lugares={this.state.lugares} />
                </Cartao>
                <div className="mt-3">
                  <ListaLugares lugares={this.state.lugares} />
                </div>
              </div>
          }
        </div>
        <div className="col-12">
          <footer>RolêRadar © {this.obterAno()}</footer>
        </div>
      </div>
    );
  }
}

export default App;