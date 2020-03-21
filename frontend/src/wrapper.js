import React from 'react';
import * as ClientContext from './context/client';
import * as NavContext from './context/nav';

let imported = { ...ClientContext, ...NavContext };
let keys = Object.keys(imported);
console.log(imported, keys);
let Provider = [];
const providerKey = 'Provider';

let Hook = {};
const hookKey = 'use';

let Context = {};
const contextKey = 'Context';

for (const key of keys) {
  if (key.includes(providerKey)) {
    Provider.push(imported[key]);
  }
  if (key.includes(hookKey)) {
    Hook[key] = imported[key];
  }
  if (key.includes(contextKey)) {
    Context[key] = imported[key];
  }
}

function ProvideLoop(params) {
  let { props, children } = params;
  // console.log(props, children);
  const ExtractContext = props.pop();
  if (props.length === 0) {
    return <ExtractContext>{children}</ExtractContext>;
  } else {
    return (
      <ExtractContext>
        <ProvideLoop props={props}>{children}</ProvideLoop>
      </ExtractContext>
    );
  }
}

class Provide extends React.Component {
  render() {
    return <ProvideLoop props={Provider}>{this.props.children}</ProvideLoop>;
  }
}

export { Provide, Context };

export default Hook;
