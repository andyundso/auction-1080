import React, {useEffect, useState} from 'react';
import './App.css';
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import firebase from './initializer/firebase';
import {firestore} from 'firebase';

interface Bid {
  bid: number;
  created_at: firestore.Timestamp
  name: string,
}

interface NewBid {
  bid: number
  name: string
}

const App: React.FC = () => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [newBid, setNewBid] = useState<NewBid>({name: '', bid: 0});

  async function getFirebaseDocs() {
    const db = firebase.firestore();
    const snapshot = await db.collection('bids').get();
    const fireBaseBids = (snapshot.docs.map(doc => doc.data()) as Bid[]).sort((a, b) => b.bid - a.bid);

    setBids(fireBaseBids);
    setNewBid({...newBid, bid: fireBaseBids[0].bid + 1});
  }

  useEffect(() => {
    getFirebaseDocs()
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewBid({
      ...newBid,
      [e.target.name]: e.target.value,
    });

  const addBid = (e: React.MouseEvent<any, MouseEvent>) => {
    e.preventDefault();

    const db = firebase.firestore();
    db.collection('bids').add({...newBid, created_at: firestore.Timestamp.now()});
    getFirebaseDocs()
  };

  if (bids.length > 0) {
    return <Container>
      <Row>
        <Col sm="12" md={{size: 6, offset: 3}}>
          <h1>OUHNDY'S 1080 AUKTION</h1>

          <br/>

          <Form>
            <FormGroup>
              <Label for={"name"}>Name</Label>
              <Input type={"text"} name={"name"} placeholder={"Max Müller"} value={newBid.name} onChange={handleChange}/>
            </FormGroup>

            <FormGroup>
              <Label for={"bid"}>Dein Angebot</Label>
              <Input type={"number"} min={bids[0].bid + 1} name={"bid"} value={newBid.bid} onChange={handleChange}/>
            </FormGroup>

            <Button onClick={addBid}>Einreichen</Button>
          </Form>

          <br/>

          {bids.map((bid: Bid) => (
            <Row key={bid.bid}>
              <Col>
                <h3>{bid.name}</h3>
              </Col>
              <Col className={"text-right"}>
                <h3>{bid.bid} CHF</h3>
                <p>{bid.created_at.toDate().toLocaleDateString('de-CH')} {bid.created_at.toDate().toLocaleTimeString('de-CH', {
                  hour: "numeric",
                  minute: "numeric"
                })}</p>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  } else {
    return <p>Einen Moment, die Seite wird geladen ..</p>;
  }
};

export default App;
