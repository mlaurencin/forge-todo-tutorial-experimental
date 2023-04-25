import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import CloseButton from 'react-bootstrap/CloseButton';

/* Structure of valuesList
valuesList = [
    {id:1, label: "Cras justo odio"},
    {id:2,label: "Dapibus ac facilisis in"},
    {id:3,label: "Morbi leo risus"},
    {id:4,label: "Porta ac consectetur ac"},
    {id:5,label: "Vestibulum at eros"},
];
*/

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
    //Convert to JSX element 
    function EntriesToListItems({entryList}){
        return entryList.map((r) => (
            <ToDoItem key={r.id} id={r.id} label={r.label} onRemoveClick={() => {remove(r.id);}} />
        ));
    }

    //Variable that will track the info to form the list
    //Load any saved data when initializing
    console.log(input);
    const [valuesList, setValuesList] = useState((input === '') ? [] : JSON.parse(input));

    function updateTodo(newValue){
        window.todo.saveContent(newValue);
    }

    function remove(id){
        setValuesList(currentValues => {
            const updatedValues = currentValues.filter(item => item.id != id);
            updateTodo(JSON.stringify(updatedValues));

            return updatedValues;
        });
    }

    function add(label){
        setValuesList(currentValues => {
            const updatedValues = valuesList.slice(0);
            updatedValues.push({id: crypto.randomUUID(), label: label});
            updateTodo(JSON.stringify(updatedValues));

            return updatedValues;
        });
    }

    //Variable that will track the text in the input text field
    const [text, setText] = useState('');

    function onInput(evt){
        setText(evt.target.value); 
    }

    function onFormSubmit(evt) {
        if (text !== ''){
            add(text);
        }
        evt.preventDefault();
        setText('');
    }

    return(
        <Form onSubmit={onFormSubmit}>
            <ListGroup as="ul">
                <EntriesToListItems entryList={valuesList} />
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