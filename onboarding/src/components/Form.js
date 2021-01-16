import * as yup from "yup";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { schema } from "../validations";

export default function Form() {
  const initialForm = {
    name: "",
    email: "",
    password: "",
    terms: false,
  };

  const [form, setForm] = useState(initialForm);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState(initialForm);
  const [users, setUsers] = useState([]);

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  useEffect(() => {
    schema.isValid(form).then((valid) => {
      setDisabled(!valid);
    });
  }, [form]);

  const handleChange = (e) => {
    let val;
    const { checked, value, name, type } = e.target;
    type === "checkbox" ? (val = checked) : (val = value);
    setFormErrors(name, val);
    setForm({ ...form, [name]: val });
  };

  const submitFunction = (e) => {
    let user = { first_name: form.name, email: form.email };
    e.preventDefault();
    axios
      .post(`https://reqres.in/api/users`, user)
      .then((val) => {
        let newUsers = users.push(val.data);
        setUsers([...users, newUsers]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      This is a form
      <form onSubmit={(e) => submitFunction(e)}>
        <div style={{ color: "red" }}>
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.terms}</div>
        </div>
        <div className="name">
          <label htmlFor="">
            Name
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="email">
          <label htmlFor="">
            Email
            <input
              name="email"
              type="text"
              value={form.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="password">
          <label htmlFor="">
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="terms">
          <label htmlFor="">
            Terms of Service
            <input
              name="terms"
              type="checkbox"
              checked={form.terms}
              onChange={handleChange}
            />
          </label>
        </div>
        <button name="submit" disabled={disabled}>
          Submit
        </button>
      </form>
      <div className="users">
        {users ? users.map((x, i) => <div key={i}>{x.first_name}</div>) : null}
      </div>
    </div>
  );
}
