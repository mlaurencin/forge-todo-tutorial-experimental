import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import CloseButton from 'react-bootstrap/CloseButton';

/* Example entries
let entries = [
    {id:1, label: "Cras justo odio"},
    {id:2,label: "Dapibus ac facilisis in"},
    {id:3,label: "Morbi leo risus"},
    {id:4,label: "Porta ac consectetur ac"},
    {id:5,label: "Vestibulum at eros"},
];
*/

let entries = [];
let hasLoadedData = false;

function ToDoItem({id, label, onRemoveClick}){
    return(
        <ListGroup.Item as="li">
            <Form.Check
                type="checkbox"
                id={`default-checkbox-${id}`}>
                <Form.Check.Input type="checkbox"/>
                <Form.Check.Label>{label}</Form.Check.Label>
                <CloseButton className="item-x" aria-label="Delete" onClick={onRemoveClick}/>
            </Form.Check>
        </ListGroup.Item>
    )
}

function ToDoList({input}){
    //Load any saved data
    if (!hasLoadedData){
        if (input !== undefined && input.length != 0){
            entries = JSON.parse(input);
        }
        hasLoadedData = true;
    }

    //Convert to JSX element 
    function EntriesToListItems(entryList){
        return entryList.map((r) => (
            <ToDoItem key={r.id} id={r.id} label={r.label} onRemoveClick={() => {Remove(r.id);}} />
        ));
    }

    //Variable that will track the info to form the list
    const [values, setValuesList] = useState(entries);

    function updateTodo(newValue){
        window.todo.saveContent(newValue);
    }

    function Remove(id){
        const updated = entries.filter(item => item.id != id);
        entries = updated;
        updateTodo(JSON.stringify(entries));
        setValuesList(entries);
    }

    function Add(label){
        entries.push({id: crypto.randomUUID(), label: label});
        updateTodo(JSON.stringify(entries));
        setValuesList(entries);
    }

    //Variable that will track the text in the input text field
    const [text, setText] = useState('');

    function onInput(evt){
        setText(evt.target.value); 
    }

    function onFormSubmit(evt) {
        if (text !== ''){
            Add(text);
        }
        evt.preventDefault();
        setText('');
    }

    return(
        <Form onSubmit={onFormSubmit}>
            <ListGroup as="ul">
                {EntriesToListItems(values)}
            </ListGroup>
            <Form.Group className="mb-3" controlId="myId">
            <Form.Control 
                type="text" 
                placeholder="Add new item here" 
                onChange={onInput}
                value={text}/>
            </Form.Group>
            <Button variant="primary" type="submit" name="test">
                Add
            </Button>
        </Form> 
    );
}

export default function App({items}) {
    return <ToDoList input={items}/>
}