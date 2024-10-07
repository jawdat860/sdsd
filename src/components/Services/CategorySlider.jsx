import React from 'react';

const CategorySlider = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
   
      <ul className="flex overflow-x-scroll justify-between space-x-4 px-4 rounded-lg scrollbar-hide">
        {categories.map((category) => (
          <li
            key={category}
            className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full  cursor-pointer transition-all duration-300 
               ${selectedCategory === category ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} hover:bg-primary hover:text-white`}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    
  );
};

export default CategorySlider;
