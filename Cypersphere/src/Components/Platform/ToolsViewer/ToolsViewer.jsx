import ToolCard from '../ToolCard/ToolCard';
import kaliTools from '../../../data/kaliTools';

const ToolsViewer = () => {
  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Kali Linux Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {kaliTools.map((tool) => (
          <ToolCard 
            key={tool.id} 
            category={tool.category}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolsViewer;
