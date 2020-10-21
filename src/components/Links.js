import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import { db } from "../firebase";

const Links = () => {
  const [links, setLinks] = useState([]);

  const addOrEditLink = async (linkObject) => {
    // console.log(linkObject);
    await db.collection("links").doc().set(linkObject);
    console.log("Agregado");
  };

  const getLinks = async () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        docs.push({ ...doc.data(), id: doc.id });
      });
      console.log(docs);
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
        <LinkForm addOrEditLink={addOrEditLink} />
      </div>
      <div className="col-md-6">
        {links.map((link) => (
          <div className="card mb-1">
            <div className="card-body">
              <h4>{link.name}</h4>
              <p>{link.description}</p>
              <a href={link.url} target="_blank">
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
