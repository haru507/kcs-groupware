import React from "react";
import { Link } from "react-router-dom";

export function Example() {
  return (
    <React.Fragment>
      <h1>ホーム画面</h1>
      <Link to="/task">タスク画面に遷移</Link>
    </React.Fragment>
  )
}