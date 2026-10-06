import React, { Component } from 'react';
import { MapMarker } from '@primeicons/react/map-marker';
import './../styles.css';
import Cartao from './Cartao';
import Creditos from './Creditos';
import Loading from './Loading';


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

  estiloSubtitulo = {
    color: '#666',
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '10px'
  };

  obterAno = () => new Date().getFullYear();

  render() {
    return (
      <>
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
          <p>Localização obtida</p>
        )}
        <footer>RolêRadar © {this.obterAno()}</footer>
      </>
    );
  }
}

export default App;
