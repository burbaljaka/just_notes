import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';

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
      <div key={obj.node.id}>
          <h3>{obj.node.id}: {obj.node.title}</h3>
          <p>{obj.node.body}</p>
      </div>
  )});
}

export function CreateNote() {
    let inputTitle, inputBody;
    const [createNote, { data }  ] = useMutation(CREATE_NOTE);
    return (
        <div>
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
                <label>Title: </label>
                <input
                    ref={node => {
                        inputTitle = node;
                    }}
                    style={{ marginRight: '1em' }}
                />
                <label>Body: </label>
                <input
                    ref={node => {
                        inputBody = node;
                    }}
                    style={{ marginRight: '1em' }}
                />

                <button type="submit" style={{ cursor: 'pointer' }}>Add a Note</button>
            </form>
        </div>
    );}