import PropTypes from 'prop-types';

const ToolCard = ({ category }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-700">
      <h3 className="text-xl font-semibold text-gray-100 mb-2">{category}</h3>
      <div className="mt-4">
        <button className="bg-blue-600 text-gray-100 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
          Explore Tools
        </button>
      </div>
    </div>
  );
};

ToolCard.propTypes = {
  category: PropTypes.string.isRequired,
};

export default ToolCard;
