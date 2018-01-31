import React from 'react';

const TestComponent = ({ value, children , another , someProp }) => <div onClick={another}>I am the Test Component.<br /><br />SomeProp: {someProp}</div>;

export default TestComponent;