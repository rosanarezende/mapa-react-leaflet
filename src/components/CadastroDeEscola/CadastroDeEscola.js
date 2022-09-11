import { useState } from "react";

const ACCESS_TOKEN_MAP_BOX = `access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`;

export const CadastroDeEscola = () => {
  const [formulario, setFormulario] = useState({});

  const formInputs = [
    {
      label: "Nome: ",
      name: "nome",
    },
    {
      label: "Endereço: ",
      name: "endereco",
    },
    {
      label: "Latitude: ",
      name: "latitude",
      disabled: true,
    },
    {
      label: "Longitude: ",
      name: "longitude",
      disabled: true,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    // envia o formulário para o backend
    fetch("http://localhost:3001/escolas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formulario),
    })

    // limpa o formulário
    setFormulario({
      nome: "",
      endereco: "",
      latitude: "",
      longitude: "",
    });
  };

  const handleGenerateData = (event) => {
    event.preventDefault();

    // gera dados de longitude e latitude
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${formulario.endereco}.json?${ACCESS_TOKEN_MAP_BOX}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log({ data })
        const [longitude, latitude] = data.features[0].center;
        setFormulario((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Cadastro de Escolas</h2>
      <form onSubmit={handleSubmit}>
        {formInputs.map((input) => {
          const { label, name } = input;
          return (
            <div key={label}>
              <label>{label}</label>
              <input
                name={name}
                value={formulario[name]}
                onChange={(event) => {
                  setFormulario((prev) => ({
                    ...prev,
                    [name]: event.target.value,
                  }));
                }}
                disabled={input.disabled}
                required
              />
              <br />
              <br />
            </div>
          );
        })}
        <button onClick={handleGenerateData}>Gerar dados de Localização</button>
        <br />
        <br />
        <button type="submit">Salvar</button>
        <br />
        <br />
      </form>
    </div>
  );
};

/* <form>
<div>
<label htmlFor="nome" >Nome</label>
<input type="text" id="nome" value={formulario.nome}
  onchange={(e) =>
    setFormulario((prev) =>
      setFormulario({ ...prev, nome: e.target.value })
    )
  }/>
</div>
<div>
<label htmlFor="endereco">Endereço</label>
<input type="text" id="endereco" />
</div>
<div>
<label htmlFor="latitude">Latitude</label>
<input type="text" id="latitude" />
</div>
<div>
<label htmlFor="longitude">Longitude</label>
<input type="text" id="longitude" />
</div>
<button type="submit">Cadastrar</button>
</form> */
