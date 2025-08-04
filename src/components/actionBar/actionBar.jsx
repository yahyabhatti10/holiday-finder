function ActionBar({onRefresh, onShowAll, onRegionSelect})
{
    return (
        <div>
            <button onClick={onRefresh}>Refresh</button>
            <button onClick={() => onShowAll(false)}>Next 30 Days</button>
            <button onClick={() => onShowAll(true)}>Show all</button>
            <br />
            <select onChange={(e) => onRegionSelect(e.target.value)}>
                <option value="all">All</option>
                <option value="england-and-wales">England and Wales</option>
                <option value="scotland">Scotland</option>
                <option value="northern-ireland">Northern Ireland</option>
            </select>
        </div>
    )
}
export default ActionBar;