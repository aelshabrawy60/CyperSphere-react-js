const PlatformCard = ({ platform }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
        <span className={`px-2 py-1 rounded text-xs ${platform.isPaid ? 'bg-blue-900 text-blue-200' : 'bg-green-900 text-green-200'}`}>
          {platform.isPaid ? 'Paid' : 'Free'}
        </span>
      </div>
      
      <a 
        href={platform.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 hover:underline break-all"
      >
        {platform.url}
      </a>

      {platform.note && (
        <p className="mt-2 text-sm text-gray-400">
          {platform.note === "بها اقسام مدفوعة" ? "Has paid sections" : platform.note}
        </p>
      )}
    </div>
  );
};

export default PlatformCard;
