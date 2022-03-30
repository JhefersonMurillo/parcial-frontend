import React from "react";

import Opciones from "../Opciones/Opciones";
import data from "../data.json";
import Historial from "../Historial/Historial";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contador: 1,
      historial: [],
      seleccionPrevia: "",
      historiaenPantalla: data[0],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contador !== this.state.contador) {
      console.log("Actualizado... ");
      this.setState({
        historial: [...this.state.historial, this.state.seleccionPrevia],
      });
    }
  }
  /*  handleClick = (e) => {
    const id = e.target.id;
    if (this.state.contador >= 7) {
      alert("Fin.");
    } else if (id === "A" && this.state.seleccionPrevia !== "A") {
      this.setState({
        contador: this.state.contador + 1,
        seleccionPrevia: "A",
      });
    } else if (id === "A" && this.state.seleccionPrevia === "A") {
      this.setState({
        contador: this.state.contador + 2,
      });
    } else if (id === "B" && this.state.seleccionPrevia === "A") {
      this.setState({
        contador: this.state.contador + 3,
        seleccionPrevia: "B",
      });
    } else if (id === "B") {
      this.setState({
        contador: this.state.contador + 2,
        seleccionPrevia: "B",
      });
    }
  }; */

  handleClick = ({ target }) => {
    const opcion = target.id;
    if (this.state.contador === 5) {
      window.alert("Fin del juego");
    } else {
      this.setState(
        {
          contador: this.state.contador + 1,
          seleccionPrevia: opcion,
        },
        () => {
          const historialActual = this.filtrarHistoriaporId();
          this.setState({
            historiaenPantalla: historialActual,
          });
        }
      );
    }
  };

  filtrarHistoriaporId = () => {
    const { contador, seleccionPrevia } = this.state;
    return data.find(
      (historia) =>
        historia.id === `${contador}${seleccionPrevia.toLowerCase()}`
    );
  };

  render() {
    const { historiaenPantalla, seleccionPrevia, historial } = this.state;
    const { historia, opciones } = historiaenPantalla;
    return (
      <div className="layout">
        <h1 className="historia">{historia}</h1>
        <Opciones
          opcionA={opciones.a}
          opcionB={opciones.b}
          handleClick={this.handleClick}
        />
        <Historial historial={historial} seleccionPrevia={seleccionPrevia} />
      </div>
    );
  }
}

export default Layout;
