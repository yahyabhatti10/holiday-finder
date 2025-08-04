function RegionCard({ region, holidays }) {
  return (
    <div className="region-card">
      <h2>{region}</h2>
      <ul>
        {holidays.map((holiday, index) => (
          <li key={index}>
            {holiday.title} — {holiday.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default RegionCard;