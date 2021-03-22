import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <p>Hello</p>
  )
};

describe('App', () => {
   it('Should display the conents of the app component', () => {
       let container = document.createElement('div');
       document.body.appendChild(container);
       act(() => {
           ReactDOM.render(<App />, container);
       })
       const header = container.querySelector('p');
       expect(header.textContent).toBe("Hello")
   });
});
