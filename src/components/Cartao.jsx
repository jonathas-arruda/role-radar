const Cartao = (props) => {
  return (
    <div className="border-1 border-black-alpha-20 border-round-lg p-3">
      <div className="text-sm text-black-alpha-60 pb-2 mb-3 border-bottom-1 border-black-alpha-20">
        {props.cabecalho}
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default Cartao;