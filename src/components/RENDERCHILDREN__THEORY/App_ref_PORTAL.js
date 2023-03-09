import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {Container} from 'react-bootstrap';
import './App.css';

class Form extends Component {
  // Можно создавать много ссылок
  myRef = React.createRef();
  mySecondRef = React.createRef();
  state = {
    advOpen: false,
  }

  // Второй вариант создания ссылки:
  // через метод: тогда у ссылки не будет current
  setMyRef = (elem) => {
    this.myMethodRef = elem;
  }

  handleClick = () => {
    this.setState(({ advOpen }) => ({
      advOpen: !advOpen,
    }))
  }
    componentDidMount() {
        // при перерисовке и удалении эл-в или компонентов, ссылка становится null,
        // удалять в componentWillUnmout ее не надо
      this.myRef.current.focus();
      //у такой ссылки(через колбэк) нет current
      this.myMethodRef.focus();

      setTimeout(this.handleClick, 3000);
    }

    focusFirstTextInpunt= () => {
        this.myRef.current.focus();
    }

    render() {
        return (
          <Container>
            <form className="w-50 border mt-5 p-3 m-auto"
              style={{'overflow': 'hidden',
                      'position': 'relative'}}
              ref={this.setMyRef}
            onClick={this.handleClick}>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email address
                </label>
                <input
                  ref={this.myRef}
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                />
                {/* На функциональные компоненты нельзя добавить ref, только на классовые */}
                {/* <TextInput ref={this.myRef} />
                но здесь получается ссылка не на конкретный элемент, а на экземпляр класса - поэтому
                фокус не сработает, нелья установить фокус на объект
                но вместо метода фокус можно использовать другой метод класса
                То есть вот здесь
                  componentDidMount() {
                    this.myRef.current.smtDO();
                    }
                */}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Example textarea
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onClick={this.focusFirstTextInpunt}
                ></textarea>
              </div>
              {
                this.state.advOpen ?
                  <Portal>
                    <Mes/>
                  </Portal> : null
              }
            </form>
          </Container>
        );
    }
}

const Portal = (props) => {
  const node = document.createElement("div");
  document.body.append(node);
  return ReactDOM.createPortal(props.children, node);
}

const Mes = () => {
  return (
    <div
      style={{'width': '500px',
              'height': '150px',
              'backgroundColor': 'red',
              'position': 'absolute',
              'right': '0',
              'bottom': '0'}}>
          Hello
    </div>
  )
}

class TextInput extends Component {
    smtDO = () => {
    console.log("something do");
    }
    render() {
        return (
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        );
    }
}

function App() {
    return (
        <Form/>
    );
}

export default App;
