import React, { Component } from 'react';
import { MapMarker } from '@primeicons/react/map-marker';
import { Button } from '@primereact/ui/button';
import './../styles.css';
import Cartao from './Cartao';
import Creditos from './Creditos';
import Loading from './Loading';
import MeuPonto from './MeuPonto';
import geoapifyClient from '../utils/geoapifyClient';


class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    horarioLocalizacao: null,
    mensagemDeErro: null
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

  onBuscaRealizada = async (categoria, raio) => {
    const result = await geoapifyClient.get('/places', {
      params: {
        categories: categoria,
        filter: `circle:${this.state.longitude},${this.state.latitude},${raio}`,
        bias: `proximity:${this.state.longitude},${this.state.latitude}`,
        limit: 20
      }
    });
    console.log(result.data.features);
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
      <div>
        <h1 className="titulo">
          <MapMarker />
          RolêRadar
        </h1>
        <p style={this.estiloSubtitulo}>Descubra o que existe perto de você</p>
        <Creditos />
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
            <Button
              onClick={() => this.onBuscaRealizada('catering.cafe', 1000)}>
              Testar busca
            </Button>
          </div>
        )}
        <footer>RolêRadar © {this.obterAno()}</footer>
      </div>
    );
  }
}

export default App;