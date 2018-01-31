---
imports:
   'reduce': 'reduce-object'
   'TestComponent': './TestComponent'
---

##### Markdown source for above:
```jsx show-source
<div className={"${props.value}"} onClick={props.func}>
    {props.value}
    
    {props.someComponent}
</div>
```