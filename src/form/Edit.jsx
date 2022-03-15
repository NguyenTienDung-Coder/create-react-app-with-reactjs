import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { reactMembers, javaMembers, editInfo } from "./Recoil";


const Edit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm();
  const navigate= useNavigate()
  const onSubmit = (data) => {
    if (data.classType === "react") {
      const e1=[...reactMember]
      e1[info.index]= data
      setReactMember([...e1])
    } else if (data.classType === "java") {
      const e1=[...javaMember]
      e1[info.index]= data
      setJavaMember([...e1])
    } else {
      alert("can not edit member, an occur may be appeared");
    }
    reset();
    setInfo({})
    navigate("/")
  };
  const [reactMember, setReactMember] = useRecoilState(reactMembers);
  const [javaMember, setJavaMember] = useRecoilState(javaMembers);
  const [info, setInfo] = useRecoilState(editInfo);
  
  return (
    <div>
      <Link to="/home">Return to home</Link>
      <h3>Edit member </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          {" "}
          name
          <input defaultValue={info.name} {...register("name", { required: true })} />
          {errors.name?.type === "required" && (
            <span style={{ color: "red" }}>name is required</span>
          )}
        </label>
        <label htmlFor="age">
          {" "}
          age
          <input
            defaultValue={info.age}
            type="number"
            {...register("age", { required: true, min: 1, max: 150 })}
          />
          {errors.age && (
            <span style={{ color: "red" }}>
              age is required and has type of number
            </span>
          )}
        </label>
        <select defaultValue={info.type} {...register("classType")}>
          <option value="react">React</option>
          <option value="java">Java</option>
        </select>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Edit;