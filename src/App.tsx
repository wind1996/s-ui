import React from 'react';
import './App.css';
import {HashRouter as Router, Link} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import routes from "./router";
import {name} from "../package.json"

function App() {
    return (
        <Router>
            <div className={"page"}>
                <aside className={"aside"}>
                    <h1 className="logo">
                        <Link to={{pathname: "/",}}>
                            {name}
                        </Link>
                    </h1>
                    <ul>
                        {routes.map((item) => {
                            if (item.hidden) {
                                return null;
                            }
                            return (
                                <li key={item.path}>
                                    <Link to={{
                                        pathname: item.path,
                                    }}
                                    >
                                        <span className="nav-text">{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </aside>
                <div className={"content"}>
                    {renderRoutes(routes)}
                </div>
            </div>
        </Router>
    );
}

export default App;
