import React from "react";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";
import { Form, Link, redirect } from "react-router-dom";
import { customFetch } from "../utils";


export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const oldUsers = await customFetch("/users");
  const isNewEmailExists = oldUsers?.data?.some((user) => user.email === data.email);

  if (isNewEmailExists) {
    // Email already exists
    alert("Email already exists in the data");
    return null;
  }
  data.role = "user";
  data.favMovie = [];
  try {
    const response = await customFetch.post("/users.json", data);
    console.log(response);
    alert("suceessfully created account");
    return redirect("/login");
  } catch (error) {
    const errorMessage = "please double check your credentials";
    alert(errorMessage);
    return null;
  }
};

const SignUp = () => {
  return (
    <div style={{backgroundImage: "linear-gradient(to right, #7bd0f9, #68c3ff, #78b1ff, #a299ff, #d277fc)",minHeight:'100vh'}} className="p-5">

      <section className="container bg-white rounded mt-5" style={{width:"30%",minWidth:'275px'}}>
        <Form method="POST" className="p-4 rounded">
          <h1 className="font-bold text-5xl text-center mb-5 mt-4 authheader">Register</h1>

          <FormInput type="text" label="Username" name="name" />
          <FormInput type="email" label="Email" name="email" />
          <FormInput type="password" label="Password" name="password" />

          <div className="d-grid gap-2 mt-5">
            <SubmitBtn text="SignUp" />
          </div>

          <p className="mt-3">
            Already a member?
            <Link to="/login" className="btn btn-outline-danger ms-2">
              Login
            </Link>
          </p>
        </Form>
      </section>
    </div>
  );
};

export default SignUp;
