import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";
import Wrapper from "../../components/Wrapper";

const ProductCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const p = parseFloat(price);

    const data = {
      title,
      description,
      image,
      price: p,
    };

    await axios.post("products", data);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/products" />;
  }

  return (
    <Wrapper>
      <div className="container-fluid mt-3">
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Image</label>
            <div className="input-group">
              <input
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <ImageUpload uploaded={setImage} />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Create
          </button>

          <Link to="/products" className="btn btn-danger float-end">
            Back
          </Link>
        </form>
      </div>
    </Wrapper>
  );
};

export default ProductCreate;
