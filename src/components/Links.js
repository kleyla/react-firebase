import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const addOrEditLink = async (linkObject) => {
    try {
      if (currentId === "") {
        // console.log(linkObject);
        await db.collection("links").doc().set(linkObject);
        // console.log("Agregado");
        toast("New link added!", {
          type: "success",
          autoClose: 2000,
        });
      } else {
        await db.collection("links").doc(currentId).update(linkObject);
        toast("Link updated!", {
          type: "info",
          autoClose: 2000,
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteLink = async (id) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      await db.collection("links").doc(id).delete();
      // console.log("Deleted");
      toast("Link deleted!", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  const getLinks = async () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        docs.push({ ...doc.data(), id: doc.id });
      });
      // console.log(docs);
      setLinks(docs);
    });
  };
  useEffect(() => {
    // console.log("object");
    getLinks();
  }, []);

  return (
    <div className="row">
      <div className="col-md-6">
        <LinkForm {...{ addOrEditLink, currentId, links }} />
      </div>
      <div className="col-md-6">
        {links.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i
                    className="material-icons text-danger"
                    onClick={() => onDeleteLink(link.id)}
                  >
                    close
                  </i>
                  <i
                    className="material-icons text-success"
                    onClick={() => setCurrentId(link.id)}
                  >
                    create
                  </i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                Go to website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
