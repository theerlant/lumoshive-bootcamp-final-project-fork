import React from "react";
import { Link } from "react-router-dom";

export const Breadcrumbs = ({ items }) => {
  return (
    <nav className="flex mb-10 text-sm">
      {items.map((v, i) => (
        <React.Fragment key={i}>
          {i === items.length - 1 ? (
            <span key={i} className="font-semibold text-black">
              {v.label}
            </span>
          ) : (
            <>
              <Link
                key={i}
                to={v.href}
                className="text-gray-400 hover:text-black"
              >
                {v.label}
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
