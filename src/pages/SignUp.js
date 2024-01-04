import React from "react";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";
import { Form, Link, redirect } from "react-router-dom";
// import { toast } from "react-toastify";
import { customFetch } from "../utils";

// export const loader = async () => {
//   const response = await customFetch("/users");
//   console.log(response.data);
//   return response?.data;
// };

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const oldUsers = await customFetch("/users");
  // console.log(oldUsers,data);
  // data.avatar = "https://ionicframework.com/docs/img/demos/avatar.svg";
  
  // Check if the new email exists in the data obtained from the loader
  // const loaderData = await loader();
  const isNewEmailExists = oldUsers?.data.some((user) => user.email === data.email);

  if (isNewEmailExists) {
    // Email already exists, handle the error or return null
    console.log("Email already exists in the data");
    return null;
  }
  data.role = "user";
  data.favMovie = [];
  try {
    const response = await customFetch.post("/users", data);
    console.log(response);
    // toast.success("account created successfully");
    return redirect("/login");
  } catch (error) {
    const errorMessage = "please double check your credentials";
    // toast.error(errorMessage);
    console.log(errorMessage);
    return null;
  }
};

const SignUp = () => {


  return (
    <section className="">
      <Form method="POST" className="">
        <br />
        <br />
        <h1 className="font-bold	text-5xl">Register</h1>
        <br />
        <br />
        <br />
        <FormInput type="text" label="name" name="name" />
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        <br />
        <div className="btn btn-primary">
          <SubmitBtn text="SignUp" />
        </div>
        <br />
        <br />
        <p className="text-center">
          Already a member?
          <Link to="/login" className="btn btn-error">
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default SignUp;
