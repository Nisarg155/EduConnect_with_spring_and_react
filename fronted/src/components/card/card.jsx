import React from "react";

const Card = () => {
  return (
    <div class="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <img class="object-cover object-center w-full h-56" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />

      <div class="flex items-center justify-between px-6 py-3 bg-gray-900">
        <i class="material-icons w3-xxxlarge">person</i>

        <h1 class="mx-3 text-lg text-center font-semibold text-white">Java Technologies</h1>
      </div>

      <div class="px-6 py-4">
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white">Vaibhav Dhanani</h1>

        <p class="py-2 text-gray-700 dark:text-gray-400">Some descrption about Teacher and Subject</p>

      </div>
    </div>
  );
};

export default Card;
