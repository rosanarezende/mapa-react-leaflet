import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export const MapaDeEscolas = () => {
  const [escolas, setEscolas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/escolas")
      .then((res) => res.json())
      .then((dados) => setEscolas(dados));
  }, []);

  console.log(escolas);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h2>Mapa de escolas</h2>
      <MapContainer
        center={[-20.3518222, -40.3066376]}
        zoom={8}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {escolas.map((escola) => (
          <Marker position={[escola.latitude, escola.longitude]}>
            <Popup>
              <h3>{escola.nome}</h3>
              <p>{escola.endereco}</p>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
};
