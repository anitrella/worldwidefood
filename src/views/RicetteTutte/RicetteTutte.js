import React, { useState, useEffect } from "react";
import RicettaGrid from "../../components/RicettaGrid/RicettaGrid";
import {
  Container,
  Input,
  Form,
  FormGroup,
  Label,
  Collapse,
  Button,
  Row,
  Col,
  Spinner,
  Card,
} from "reactstrap";
import style from "./RicetteTutte.module.css";

function RicetteTutte(props) {
  const { allRecipe, allRecipeComplete } = props;
  const [allAreas, setAllAreas] = useState();
  const [activeFilter, setActiveFilter] = useState([]);
  const [recipeFiltered, setRecipeFiltered] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Imposto la funzione per cambiare il filtro per l'area geografica inserita
  const changeFilter = (item) => {
    let newFilter = activeFilter.slice();
    let indexArea = newFilter.indexOf(item);
    if (indexArea !== -1) {
      newFilter.splice(indexArea, 1);
    } else {
      newFilter.push(item);
    }
    setActiveFilter(newFilter);
  };

  // Estraggo tutte le aree geografiche e le salvo in allAreas
  useEffect(() => {
    if (allRecipeComplete.length === 283) {
      const areas = allRecipeComplete.map((recipe) => recipe.strArea);
      let areasNoDouble = new Set(areas);
      areasNoDouble = [...areasNoDouble];
      const areaAdjusted = areasNoDouble.filter((el) => el !== "Unknown");
      setAllAreas(areaAdjusted);
    }
  }, [allRecipeComplete]);

  // Filtro solo le ricette che provengono dall'area geografica specificata
  useEffect(() => {
    setRecipeFiltered(
      allRecipeComplete.filter((recipe) =>
        activeFilter.includes(recipe.strArea)
      )
    );
  }, [activeFilter]);

  // Creo il toggle per visualizzare i filtri
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container className="mb-5">
      <Row>
        <h3 className="my-5 text-center text-primary">Tutte le ricette</h3>
      </Row>

      <div>
        <Button onClick={toggle} className={style.buttonFiltri}>
          Filtri per area
        </Button>
        <Collapse isOpen={isOpen}>
          <Card className="p-3 mb-3">
            {allRecipeComplete.length < 283 && (
              <div className="d-flex align-items-center">
                <Spinner className="me-3">Loading...</Spinner>
                <span>Attendi un momento, stiamo cucinando per te...</span>
              </div>
            )}
            <Form>
              {allAreas &&
                allAreas.map((area, index) => {
                  return (
                    <FormGroup check inline key={index}>
                      <Input
                        className={style.casella}
                        type="checkbox"
                        onClick={() => changeFilter(area)}
                      />
                      <Label check>{area}</Label>
                    </FormGroup>
                  );
                })}
            </Form>
          </Card>
        </Collapse>
      </div>
      <Row>
        <Col>
          {allRecipe.length !== 0 && (
            <RicettaGrid
              recipesList={
                recipeFiltered.length === 0 ? allRecipe : recipeFiltered
              }
              col={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default RicetteTutte;
