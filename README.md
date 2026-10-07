# RolêRadar

Giovani Boldrini Custoias 2040482423006\
João Vitor Evangelista da Silva 2040482423021\
Jonathas Pinheiro de Arruda 2040482423040\
Sarah Bianca Tambalo da Silva 2040482423044

## Como executar

1. Clone o repositório e entre na pasta do projeto:

```bash
   git clone https://github.com/jonathas-arruda/role-radar.git
   cd role-radar
```

2. Instale as dependências:

```bash
   npm install
```

3. Preencha as duas chaves no arquivo `src/utils/chaves.js`, substituindo os valores `COLOQUE_SUA_CHAVE_AQUI`:

   - `GEOAPIFY_KEY`: crie uma conta gratuita em https://myprojects.geoapify.com, crie um projeto e copie a sua API key. A mesma chave serve para a Places API e para a Static Maps API.
   - `PRIMEUI_LICENSE`: obtenha a chave da licença Community da PrimeUI, gratuita para estudantes, necessária para a PrimeReact a partir da versão 11.

4. Inicie a aplicação:

```bash
   npm run dev
```

5. Abra no navegador o endereço indicado no terminal (por padrão, http://localhost:5173).

Ao abrir a aplicação, o navegador pedirá permissão para acessar a sua localização. É preciso permitir o acesso para que a aplicação funcione.