import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { loginUser } from "../features/user/userSlice";
import SubmitBtn from "../components/SubmitBtn";
import FormInput from "../components/FormInput";



export const action = (store) => async ({ request }) => {
    const formData = await request.formData();
    const newData = Object.fromEntries(formData);
    // console.log(data);
    try {
      const usersData = await customFetch("/users");
      // console.log(usersData.data);

      const isEmailExists = usersData.data.some(
        (user) => ((user.email === newData.email) && (user.password === newData.password))
      );

      if (isEmailExists) {
        // Email exists, proceed with login
        const curentUser = usersData.data.filter((user) => ((user.email === newData.email) && (user.password === newData.password))
      );
        // console.log(curentUser[0]);
        store.dispatch(
          loginUser({
            user: curentUser[0],
          })
        );
        return redirect("/");
      } else {
        // Email doesn't exist, handle the error or return null
        const errorMessage = "Invalid email or password";
        console.log(errorMessage);
        alert(errorMessage);
        return null;
      }
    } 
    catch (error) {
      const errorMessage = "please double check your credentials";
      // toast.error(errorMessage);
      console.log(errorMessage);
      return null;
    }
  };

const Login = () => {
  return (
    <section className="loginHeader">
      <Form method="post" className="formcontrol">
        <br />
        <br />
        <h1 className="font-bold	text-5xl">Login</h1>
        <br />
        <br />
        <br />
        <FormInput type="email" label="Email" name="email" />
        <FormInput type="password" label="Password" name="password" />
        <br />
        <div className="btn btn-primary">
          <SubmitBtn text="login" />
        </div>
        <br /> <br />
        <p className="">
          Not a member yet?{" "}
          <Link className="btn btn-danger" to="/signup">
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
