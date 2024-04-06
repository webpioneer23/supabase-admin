import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const Home = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getTest();
  }, []);

  const getTest = async () => {
    const { data, error } = await supabase
      .from("countries")
      .select()
      .order("id", { ascending: true });
    setList(data);
  };

  const handleAddRecord = async () => {
    const res = await supabase
      .from("countries")
      .insert([
        { name: "new-country" + Date.now() },
        { name: "new-again-country" + Date.now() },
      ]);
    console.log({ res });
    await getTest();
  };

  const handleShow = async (id) => {
    const { data, error } = await supabase
      .from("countries")
      .select()
      .eq("id", id)
      .single();
    console.log({ data, error });
  };

  const handleDelete = async (id) => {
    const data = await supabase.from("countries").delete().eq("id", id);
    console.log({ data });
    await getTest();
  };

  const handlUpdate = async (country) => {
    const data = await supabase
      .from("countries")
      .update({ name: country.name + "-updated" })
      .eq("id", country.id);
    console.log({ data });
    await getTest();
  };

  return (
    <div className="page home">
      <h2>Home11</h2>
      {list.map((item) => (
        <div key={item.id} style={{ display: "flex" }}>
          <span>{item.name}</span>
          <button onClick={() => handlUpdate(item)}>Update</button>
          <button onClick={() => handleDelete(item.id)}>Remove</button>
          <button onClick={() => handleShow(item.id)}>show</button>
        </div>
      ))}
      <button onClick={() => handleAddRecord()}>Add</button>
    </div>
  );
};

export default Home;
