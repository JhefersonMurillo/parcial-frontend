import React from "react";

import Opciones from "../opciones/Opciones";
import data from "../data.json";
import Historial from "../historial/Historial";

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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contador !== this.state.contador) {
      this.setState({
        historial: [...this.state.historial, this.state.seleccionPrevia],
      });
    }
  }

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
