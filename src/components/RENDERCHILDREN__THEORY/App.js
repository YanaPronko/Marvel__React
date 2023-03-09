import React,{ Component } from 'react';
import styled from 'styled-components';
import BootstrapTest from './BootstrapTest';

import './App.css';

const EmpItem = styled.div`
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0,0,0, .2);
    a {
        display: block;
        margin: 10px 0 10px 0;
        color: ${props => props.active ? 'orange' : 'black'};
    }
    input {
        display: block;
        margin-top: 10px;
    }
`;

const Header = styled.h2`
    font-size: 22px;
`;

export const Button = styled.button`
    display: block;
    padding: 5px 15px;
    background-color: gold;
    border: 1px solid rgba(0,0,0, .2);
    box-shadow: 5px 5px 10px rgba(0,0,0, .2);
`;

class WhoAmI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            years: 27,
            position: ''
        }
    }

    nextYear = () => {
        this.setState(state => ({
            years: state.years + 1
        }))
    }

    commitInputChanges = (e, color) => {
        console.log(color);
        this.setState({
            position: e.target.value
        })
    }

    render() {
        const {name, surname, link} = this.props;
        const {position, years} = this.state;

        return (
            <EmpItem active>
                <Button onClick={this.nextYear}>+++</Button>
                <Header>My name is {name}, surname - {surname},
                    age - {years},
                    position - {position}</Header>
                <a href={link}>My profile</a>
                <form>
                    <span>Введите должность</span>
                    <input type="text" onChange={(e) => this.commitInputChanges(e, 'some color')} />
                </form>
            </EmpItem>
        )
    }
}

const Wrapper = styled.div`
    width: 600px;
    margin: 80px auto 0 auto;
`;
// КОМПОЗИЦИЯ В РЕАКТЕ ВМЕСТО НАСЛЕДОВАНИЯ

const HelloGreating = () => {
  return (
    <div style={{ width: "600px", margin: "0 auto" }}>
      <DynamicGreating color={"primary"}>
        <h2>Hello world!</h2>
      </DynamicGreating>
    </div>
  );
};

// RENDER PROPS


const Message = (props) => {
  return <h2>The counter is {props.counter}</h2>;
};

class Counter extends Component {
  state = {
    counter: 0,
  };

  changeCounter = () => {
    this.setState(({ counter }) => ({
      counter: counter + 1,
    }));
  };

  render() {
    return (
      <>
        <button className={"btn btn-primary"} onClick={this.changeCounter}>
          Click me
        </button>

        // Если сделать так как ниже: это жесткая привязка 1го компонента к другому
        /*    <Message counter={this.state.counter}/> */

        // Лучше просто при создании счетчика в пропсы передать функцию, которая
        // вызывается внутри счетчика и создает нужный нам компонент

        {this.props.render(this.state.counter)}
      </>
    );
  }
}

const DynamicGreating = (props) => {
    return (
      <div className={"mb-3 p-3 border border-" + props.color}>
        {
          //1й аргумент - это ребенок или массив детей, второй аргумент - функция, которую выполнит map
                React.Children.map(props.children, (child) => {
            //   для сохранения иммутабельности, элементы клонируем
            // в метод клон передается сам элемент, то, что хотим менять, еще могут передаваться
            // дети ([...children])
            return React.cloneElement(child, {
              className: "shadow p-3 m-3 border rounded",
            });
          })
        }
      </div>
    );
}

function App() {
  return (
      <Wrapper>
        // Передавать можно несколько таких render пропсов и вызвать там где нужно
      <Counter render={(counter) => <Message counter={counter} />} />

      <HelloGreating />
      <BootstrapTest
        // здесь указываем название пропса и то, что будет рендериться в этом месте
        left={
          <DynamicGreating color={"primary"}>
            <h2>This weel was hard</h2>
            <h2>Hello world!</h2>
          </DynamicGreating>
        }
        right={
          <DynamicGreating color={"primary"}>
            <h2>RIGHT!</h2>
          </DynamicGreating>
        }
      />

      <WhoAmI name="John" surname="Smith" link="facebook.com" />
      <WhoAmI name="Alex" surname="Shepard" link="vk.com" />
    </Wrapper>
  );
}

export default App;
