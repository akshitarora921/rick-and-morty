import React, { useState } from "react";
import axios from "axios";
import { InputGroup, FormControl, Card, CardColumns, Button } from "react-bootstrap";
import "./App.css";
const URL = "https://rickandmortyapi.com/api/episode/";
const App = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState({});

  const fetchData = async (n) => {
    
    await axios
      .get(URL, {
        params: {
          page: n,
        },
      })
      .then((data1) => {
        // console.log(data1.data)
        setData(data1.data);
        // console.log(data1.data.results)
      });
  };
  const search = async (e) => {
    if (e.key === "Enter") {
        setData({})
      await axios
        .get(URL, {
          params: {
            name: query,
          },
        })
        .then((data) => {
          setData(data.data);
        });
      setQuery("");
    }
  };
  return (
    <div className="main-container">
      <h1 className="heading">Rick and Morty Search</h1>
      <InputGroup size="lg" className=" search lg-3">
        <FormControl
          aria-label="large"
          aria-describedby="inputGroup-sizing-lg"
          value={query}
          placeholder="Name"
          className="search"
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
      </InputGroup>
    <CardColumns style={{textAlign:'center'}}>
      {data.results &&
        data.results.map((ep, id) => (
            <Card style={{ width: '30rem' }} className='episode' key={id}>
            <Card.Title className='title'>#{ep.id}  {ep.name}</Card.Title>
            <Card.Body>
              <p><b>onAir: </b> {ep.air_date}</p>
            </Card.Body>
          </Card>
        ))}

        </CardColumns>
        {data.results && (
            <div>
            <Button
              variant="light"
              value="1"
              onClick={() => {
                fetchData(1);
              }}
            >1</Button>
            { }
            <Button
              variant="dark"
              value="2"
              onClick={() => {
                fetchData(2);
              }}
            >2</Button>
          </div>
        )}
    </div>
  );
};


export default App;
