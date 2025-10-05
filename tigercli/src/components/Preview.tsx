import React from 'react';

export const Preview = () => {
  return (
    <div className="h-full bg-white text-black p-2">
      <div className="border-b border-gray-300 pb-1 mb-2">
        <h2 className="text-base font-semibold">Preview</h2>
      </div>
      <div className="p-4 border rounded-md border-gray-200">
        <h1 className="text-xl font-bold">Hello, TigerCLI!</h1>
        <p className="text-gray-600">This is a live preview of your component.</p>
        <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
          Click me
        </button>
      </div>
    </div>
  );
};