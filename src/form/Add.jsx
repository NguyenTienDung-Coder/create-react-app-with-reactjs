import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { reactMembers, javaMembers } from "./Recoil";


const Add = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm();
  const onSubmit = (data) => {
    if (data.classType === "react") {
      setReactMember([
        ...reactMember,
        {
          name: data.name,
          age: +data.age,
        },
      ]);
    } else if (data.classType === "java") {
      setJavaMember([
        ...javaMember,
        {
          name: data.name,
          age: +data.age,
        },
      ]);
    } else {
      alert("can not add member, an occur may be appeared");
    }
    reset();
  };
  const [reactMember, setReactMember] = useRecoilState(reactMembers);
  const [javaMember, setJavaMember] = useRecoilState(javaMembers);
  return (
    <div>
      <Link to="/home">return to home page</Link>
      <h3>Add member to class</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          {" "}
          name
          <input {...register("name", { required: true })} />
          {errors.name?.type === "required" && (
            <span style={{ color: "red" }}>name is required</span>
          )}
        </label>
        <label htmlFor="age">
          {" "}
          age
          <input
            type="number"
            {...register("age", { required: true, min: 1, max: 150 })}
          />
          {errors.age && (
            <span style={{ color: "red" }}>
              age is required and has type of number
            </span>
          )}
        </label>
        <select {...register("classType")}>
          <option value="react">React</option>
          <option value="java">Java</option>
        </select>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Add;