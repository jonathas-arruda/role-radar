import Cartao from './Cartao'

const estiloCirculo = {
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: '#d32f2f',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const formatarDistancia = (distancia) => {
  if (distancia < 1000)
    return `${Math.round(distancia)} m`
  return `${(distancia / 1000).toFixed(1).replace('.', ',')} km`
}

const Lugar = ({numero, nome, endereco, distancia}) => {
  return (
    <div className="mb-3">
      <Cartao cabecalho={formatarDistancia(distancia)}>
        <div className="flex align-items-center">
          <div style={estiloCirculo}>{numero}</div>
          <div className="ml-3">
            <strong>{nome || 'Sem nome'}</strong>
            <p>{endereco}</p>
          </div>
        </div>
      </Cartao>
    </div>
  )
}

export default Lugar