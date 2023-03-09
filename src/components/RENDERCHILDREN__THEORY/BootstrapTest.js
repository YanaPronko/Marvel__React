import {Container, Row, Col} from 'react-bootstrap';

const BootstrapTest = (props) => {
    // МОЖНО УКАЗЫВАТЬ ЧТО ИМЕННО РЕНДЕРИТЬ и В КАКОМ МЕСТЕ ЧЕРЕЗ ПРОПСЫ
    // Смотри App
    return (
        <Container className="mt-5 mb-5">
            <Row>
                <Col>
                    {props.left}
                </Col>
                <Col>
                    {props.right}
                </Col>
            </Row>
        </Container>
    )
}

export default BootstrapTest;