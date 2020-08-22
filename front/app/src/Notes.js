import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css';



const QUERY_NOTES = gql`
    query{
      notes{
        edges{
          node{
            id
            title
            body
          }
        }
      }
    }
`;

const CREATE_NOTE = gql`
    mutation noteCreate ($title:String!, $body: String!)
      { noteCreate (title: $title, body: $body)
        {
            note {
                id
                title
                body
        }
      }
    }
`;

export function TitleInfo() {
  // Polling: provides near-real-time synchronization with
  // your server by causing a query to execute periodically
  // at a specified interval
  const { data, loading } = useQuery(
      QUERY_NOTES, {
      pollInterval: 2500 // refetch the result every 0.5 second
    }
  );

  // should handle loading status
  if (loading) return <p>Loading...</p>;
  return data.notes.edges.map(function(obj){
      return (

          <Container key={obj.node.id}>
              <Row>
                  <Col><p>{obj.node.id}</p></Col>
                  <Col><p>{obj.node.title}</p></Col>
                  <Col><p>{obj.node.body}</p></Col>
              </Row>
          </Container>
  )});
}

export function CreateNote() {
    let inputTitle, inputBody;
    const [createNote, { data }  ] = useMutation(CREATE_NOTE);
    return (
        <Container>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    createNote({ variables: {
                            title: inputTitle.value,
                            body: inputBody.value
                        }});
                    inputTitle.value = '';
                    inputBody.value = '';
                }}
                style = {{ marginTop: '2em', marginBottom: '2em' }}
            >
                <Row>
                    <Col><label>Title: </label>
                    <input
                        ref={node => {
                            inputTitle = node;
                        }}
                        style={{ marginRight: '1em' }}
                    /></Col>
                    <Col><label>Body: </label>
                    <input
                        ref={node => {
                            inputBody = node;
                        }}
                        style={{ marginRight: '1em' }}
                    /></Col>
                    <button type="submit" style={{ cursor: 'pointer' }} class="btn btn-danger">Add a Note</button>
                </Row>
            </form>
        </Container>
    );}