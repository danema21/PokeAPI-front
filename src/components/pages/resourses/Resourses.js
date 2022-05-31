import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import PokeAPIServices from "../../../services/PokeAPIServices";
import "./resourses.css";


const Resourses = () => {
    const [list, setList] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        getList(offset, 10);
    }, []);

    const getList = (offset, limit) => {
        PokeAPIServices.getAll(offset, limit).then(response => {
            setList(response.data.results);
            console.log(response.data.results);
            console.log(offset);
        }).catch(e => {
            console.log(e);
        })
    }

    const prevList = () => {
        if(offset >= 10){
            getList(offset - 10, 10);
            setOffset(offset - 10);
        }
    }

    const nextList = () => {
        if(offset < 880){
            getList(offset + 10, 10);
            setOffset(offset + 10);
        }else if(offset == 880){
            getList(offset + 10, 8);
        }
    }

    return(
        <Container>
            {list.map((data, index) => (
                <p className="list-item" key={index}>{data.name}</p>
            ))}
            
            <div className="prev-next-container">
                <Button onClick={prevList}>prev</Button>
                <Button onClick={nextList}>next</Button>
            </div>
        </Container>
    );
}

export default Resourses;