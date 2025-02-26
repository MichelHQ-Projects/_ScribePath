import React, { useState } from "react";
import styles from "./Notes.module.sass";
import Icon from "../../../../components/Icon";
import Note from "../../../../components/Note";


// data
import { products } from "../../../../mocks/products";

const Notes = () => {

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  return (
    <>
        <div className={styles.wrapper}>
            <>
              <div className={styles.list}>
                {products.map((x, index) => (
                  <Note
                    className={styles.product}
                    value={selectedFilters.includes(x.id)}
                    onChange={() => handleChange(x.id)}
                    item={x}
                    key={index}
                    released
                  />
                ))}
              </div>
              <div className={styles.foot}>
                <button className={styles.arrow}>
                  <Icon name="arrow-left" size="20" />
                </button>
                <button className={styles.arrow}>
                  <Icon name="arrow-right" size="20" />
                </button>
              </div>
            </>
        </div>   
    </>
  );
};

export default Notes;