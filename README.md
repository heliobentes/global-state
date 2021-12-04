<!-- <p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p> -->

<h3 align="center">React Global State</h3>
<br>
<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/heliobentes/global-state)](https://github.com/heliobentes/global-state/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/heliobentes/global-state)](https://github.com/heliobentes/global-state/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Manage your Application-Wide States in 1 line of code without the need of Redux or any other complex state management packages.
    <br> 

</p>

## Start here

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Authors](#authors)

## About <a name = "about"></a>

Reducers... Actions... Dispatcher... Providers... Why so complicated?
<br>
Manage your App-Wide States with a single line of code. 100% compatible with default React useState(). 

## Getting Started <a name = "getting_started"></a>

### Prerequisites

Global State requires only React and is a React Hook component only. It won't work for classes (you are more than welcome to modify it and make it work with classes! Thanks in advance!)

### Installing

Install it using npm

```
npm i @heliobentes/globalstate
```

## Usage <a name="usage"></a>

Use Global State as you would use the default React useState() hook (<a href="https://reactjs.org/docs/hooks-state.html">learn more</a>) and simply add an identifier to it on every component you want to manage the state on.
<br>  

### Regular useState
```
const [loading, setLoading] = useState(false);
```

### Normal usage
```
//add this line to every component you want to manage the state on
const [loading, setLoading] = useGlobalState("page-loader", false); 
```

### Forcing a state reset
Your state will assume `value` for the first time the hook is called in your application. Every subsequent render will ignore the `value` unless you specify `forceNewState` as `true`. This will force your global state to assume the new `value` passed. 

```
//this will forcec the globalstate to the specified value
const [loading, setLoading] = useGlobalState("page-loader", false, true);
```


## Authors <a name = "authors"></a>

- [@heliobentes](https://github.com/heliobentes) - Idea & Initial work

<!-- See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project. -->

