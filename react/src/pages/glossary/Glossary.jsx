import { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router";
import http from "@api/api";
import { Button, LoadingButton } from "@components/Button";
import Navbar from "@components/Navbar";

export default function Glossary() {
  const [isLoading, setIsLoading] = useState(false);
  const [glossaries, setGlossaries] = useState([]);

  const fetchGlossaries = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await http.get("/glossary");
      setGlossaries(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGlossaries();
  }, [fetchGlossaries]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <LoadingButton content="Loading..." />
      </div>
    );
  }

  if (!isLoading && glossaries.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
        <Navbar></Navbar>
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Glossaries Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Create your first glossary term to get started!
          </p>
          <NavLink to="/create-glossary">
            <Button content="Create Glossary"/>
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <Navbar></Navbar>
      <div className=" mt-20 bg-white w-full max-w-4xl rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Glossary 📘</h1>
          <NavLink to="/create-glossary">
            <Button content="Add New"/>
          </NavLink>
          
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {glossaries.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {item.term}
              </h2>
              <p className="text-gray-600 text-sm mb-3">
                {item.definition}
              </p>
              {item.source && (
                <p className="text-xs text-gray-500">
                  <span className="font-semibold">Source:</span> {item.source}
                </p>
              )}

              <div className="mt-4 flex justify-end gap-2">
                <Button
                  content="Edit"
                  onClick={() => navigate(`/update-glossary/${item.id}`)}
                />
              </div>
            </div>
          ))}
        </section>
      </div>

      <footer className="mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} My App. All rights reserved.
      </footer>
    </div>
  );
}
