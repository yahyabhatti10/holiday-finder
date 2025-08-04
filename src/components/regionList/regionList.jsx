import RegionCard from "../regionCard/regionCard";

function RegionList({ data }) 
{
  return (
    <div>
      {data.map((regionData) => (
        <RegionCard
          region={regionData.region}
          holidays={regionData.holidays}
        />
      ))}
    </div>
  );
}
export default RegionList;