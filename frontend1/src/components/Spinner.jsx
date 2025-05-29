import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <section className="min-h-[525px] flex items-center justify-center">
      <ClipLoader size={150} />
    </section>
  );
};

export default Spinner;
