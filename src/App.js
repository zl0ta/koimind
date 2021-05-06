import './App.css';
import {useState} from "react";
import React from "react";
import 'rsuite/dist/styles/rsuite-default.css';

import { Container, Content } from "rsuite"; // or 'rsuite/dist/styles/rsuite-default.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Menu from "./components/menu";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Sign_up from "./components/sign-up";
import CompanyCard from "./components/company.card";
import CompaniesList from "./components/companies.list";
import CustomFormulaSelector from "./components/customformula.selector";

function App() {
  const [company, setCompany] = useState({});
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);

  function startLoadCompanyHandler() {
      setLoading(true);
  }
  function selectCompanyHandler(c, t) {
      setCompany(c);
      setTables(t);
      setLoading(false);
  }

  let isAuthenticated = true;

  return (
      <div className="show-fake-browser sidebar-page">
        <Container style={{ display: 'flex', flexDirection: 'row' }}>
        <Router>
            <Menu />
            <Container>
              <Content>
                <Switch>
                  <Route exact path="/login"> <Login /> </Route>
                  <Route exact path="/sign-up"> <Sign_up /> </Route>
                  
                  <Route 
                    exact path="/" 
                    render={() => !isAuthenticated ? <Redirect to="/login" /> : <Dashboard />
                    }
                  />
                  <Route 
                    exact path="/companies" 
                    render={() => !isAuthenticated ? <Redirect to="/login" /> : 
                      <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                          <CompaniesList onCompanySelect={selectCompanyHandler} onCompanySelectStart={startLoadCompanyHandler}></CompaniesList>
                          <CompanyCard></CompanyCard>
                      </div>
                    }
                  />
                  <Route 
                    exact path="/formulas" 
                    render={() => !isAuthenticated ? <Redirect to="/login" /> : 
                      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                          <CompaniesList onCompanySelect={selectCompanyHandler} onCompanySelectStart={startLoadCompanyHandler}></CompaniesList>
                          { company && <CustomFormulaSelector selectedCompany={company} showLoading={loading} selectedTables={tables}></CustomFormulaSelector> }
                      </div>
                    }
                  />
                  <Route 
                    exact path="/subscribers" 
                    render={() => !isAuthenticated ? <Redirect to="/login" /> : 
                      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                          <h2>No content yet</h2>
                      </div>
                    }
                  />
                </Switch>
              </Content>
            </Container>
            </Router>
        </Container>
      </div>
  );
}

export default App;
