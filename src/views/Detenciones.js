import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//import TextField from '@material-ui/core/TextField';
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
//import Button from '@material-ui/core/Button';
import axios from "axios";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

// core components
// import {
//   chartExample1,
//   chartExample2,
//   chartExample3,
//   chartExample4,
// } from "variables/charts.js";
// import { data } from 'jquery';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [Equipo, setEquipo] = React.useState("");
  const [MotDet, setMotDet] = React.useState("");
  const [Tag, setTag] = React.useState("");
  const [Imputacion, setImputacion] = React.useState("");

  const [idMotivos, setIdMotivos] = useState(-1);

  const handlerCargarMotivos = function (e) {
    const opcion = e.target.value;
    console.log(opcion);
    setIdMotivos(opcion);
  };

  const equipoChange = (event) => {
    setEquipo(event.target.value);
  };

  //Motivo

  const motdetChange = (event) => {
    setMotDet(event.target.value);
  };

  const tagChange = (event) => {
    setTag(event.target.value);
  };

  const imputacionChange = (event) => {
    setImputacion(event.target.value);
  };

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [motivos, setMotivos] = useState([]);

  console.log("Motivos lenght fuera " + motivos.length);

  // useEffect(() => {
  //   if (motivos.length === 0) {
  //     axios.get({
  //       baseURL: "https://localhost:5001/api/motivo",
  //       withCredentials: false,
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //       }
  //     })
  //       .then((response) => {
  //         console.log("Respuesta: " + response);
  //         this.setState({ motivos: response })
  //       })
  //       .catch((error) => {
  //         console.log("Error: " + error);
  //       });
  //     console.log("Motivos lenght dentro" + motivos.length)
  //   }
  // }, [motivos])

  const url = "https://localhost:5001/api/motivo";
  const [respuestaAPI, setRespuestaAPI] = useState({ respuesta: "KO" });

  useEffect(() => {
    axios
      .get({
        baseURL: url,
        withCredentials: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((response) => {
        debugger;
        setRespuestaAPI(response.data);
      })
      .catch((error) => {
        debugger;
        console.log("SimpleSelect -> error", error);
        setRespuestaAPI(error);
      });
  });

  // if (motivos.length === 0) {
  //   motivos.map((motivos, idx) => (
  //     console.log("Motivos prueba: " + motivos)
  //   ))
  // }

  return (
    <div className="content">
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <Row>
                <Col className="text-left" sm="12">
                  <h5 className="card-category">Procesos</h5>
                  <CardTitle tag="h2">Detenciones</CardTitle>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col sm="4">
                  <FormControl className={classes.formControl}>
                    <InputLabel id="select-motivo-label">Equipo</InputLabel>
                    <Select
                      labelId="select-motivo-label"
                      id="elect-motivo-helper"
                      value={Equipo}
                      onChange={equipoChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>100-FE-001</MenuItem>
                      <MenuItem value={2}>100-BF-001</MenuItem>
                      <MenuItem value={3}>100-BF-002</MenuItem>
                      <MenuItem value={4}>100-BF-003</MenuItem>
                    </Select>
                    <FormHelperText>Equipo</FormHelperText>
                  </FormControl>
                </Col>
                <Col sm="4">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker1"
                        label="Hora Inicio"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Col>
                <Col sm="4">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker2"
                        label="Hora Fin"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <FormControl className={classes.formControl}>
                    <InputLabel id="select-motivo-label">Motivo</InputLabel>
                    <Select
                      labelId="select-motivo-label"
                      id="elect-motivo-helper"
                      value={motivos.id}
                      onChange={handlerCargarMotivos}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>

                      {motivos
                        ? motivos.map((motivos, idx) => (
                            <MenuItem key={motivos.id} value={idx}>
                              {motivos.descripcion}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                    <FormHelperText>Motivo</FormHelperText>
                  </FormControl>
                </Col>
                <Col sm="4">
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Motivo Detalle
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={MotDet}
                      onChange={motdetChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>O1_Falla_de_cinta</MenuItem>
                      <MenuItem value={2}>02__Demora_de_camión</MenuItem>
                      <MenuItem value={3}>03__Limpieza_de_frente</MenuItem>
                      <MenuItem value={4}>
                        04__Problema_en_equipo_de_carga
                      </MenuItem>
                      <MenuItem value={5}>05__Emergencia</MenuItem>
                      <MenuItem value={6}>06__Frente_de_carga_angosto</MenuItem>
                      <MenuItem value={7}>
                        07__Reubicación_de_equipos_de_carga
                      </MenuItem>
                    </Select>
                    <FormHelperText>Motivo Detalle</FormHelperText>
                  </FormControl>
                </Col>
                <Col sm="4">
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Tag
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={Tag}
                      onChange={tagChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>100-CV-001</MenuItem>
                      <MenuItem value={2}>100-CV-002</MenuItem>
                      <MenuItem value={3}>100-CV-003</MenuItem>
                      <MenuItem value={4}>100-CV-004</MenuItem>
                      <MenuItem value={5}>100-CV-005</MenuItem>
                      <MenuItem value={6}>100-CV-006</MenuItem>
                      <MenuItem value={7}>100-CV-007</MenuItem>
                    </Select>
                    <FormHelperText>Tag</FormHelperText>
                  </FormControl>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Imputacion
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={Imputacion}
                      onChange={imputacionChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>MINA</MenuItem>
                      <MenuItem value={2}>OPN</MenuItem>
                      <MenuItem value={3}>MEC</MenuItem>
                      <MenuItem value={4}>ELEC</MenuItem>
                      <MenuItem value={5}>OTR</MenuItem>
                    </Select>
                    <FormHelperText>Imputacion</FormHelperText>
                  </FormControl>
                </Col>
                <Col sm="4">
                  <Button variant="contained" color="primary">
                    Cargar Detencion
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
