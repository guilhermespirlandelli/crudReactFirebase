import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './styles.css';
import firebaseDb from '../../config/firebase.js';
import { toast } from 'react-toastify';

const AddEdit = () => {
  const initialState = {
    name: "",
    email: "",
    contact: "",
  };
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const { name, email, contact } = state;

  const history = useHistory();

  const { id } = useParams();
  useEffect(() => {
    firebaseDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({
          ...snapshot.val(),
        });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }
    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Preencha os campos");
    } else {
      if (!id) {
        // No id mean user is adding record for the first time
        firebaseDb.child("contacts").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contato adicionado com SUCESSO");
          }
        });
      } else {
        firebaseDb.child(`/contacts/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contato atualizado com SUCESSO");
          }
        });
      }
      setTimeout(() => history.push("/"), 500);
    }
  };
  return (
    <div className="add-edit">
      <form
        className="add-edit__form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Digite seu nome"
          value={name || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu email"
          value={email || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="contact">Telefone:</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Digite seu númeo de telefone"
          value={contact || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "ATUALIZAR" : "SALVAR"} />
      </form>
    </div>
  );
};

export default AddEdit;