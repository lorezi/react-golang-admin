import axios from "axios";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";
import Wrapper from "../../components/Wrapper";

const ProductEdit = (props: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const [redirect, setRedirect] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  let id = props.match.params.id;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`products/${id}`);
      setTitle(data.title);
      setDescription(data.description);
      setImage(data.image);
      setPrice(data.price);
    })();
    return () => {};
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const p = parseFloat(price);

    const data = {
      title,
      description,
      image,
      price: p,
    };

    await axios.patch(`products/${id}`, data);
    setRedirect(true);
  };

  const updateImage = (url: string) => {
    if (ref.current) {
      ref.current.value = url;
    }
    setImage(url);
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
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={description}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Image</label>
            <div className="input-group">
              <input
                className="form-control"
                ref={ref}
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <ImageUpload uploaded={updateImage} />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              defaultValue={price}
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>

          <Link to="/products" className="btn btn-danger float-end">
            Back
          </Link>
        </form>
      </div>
    </Wrapper>
  );
};

export default ProductEdit;
